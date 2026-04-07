// ============================================================
// Credits Service — Metering, reservation, settlement, refunds
// ============================================================

import type { AIAction, CloudflareBindings, TokenLedgerEntry, LedgerType } from '../types'
import { CREDIT_COSTS } from '../types'

// ---- Reserve credits for an in-flight job ------------------

export async function reserveCredits(
  db: D1Database,
  accountId: string,
  action: AIAction,
  jobId: string
): Promise<{ success: boolean; error?: string; reserved?: number }> {
  const cost = CREDIT_COSTS[action]

  // Check current wallet
  const wallet = await db
    .prepare('SELECT balance, reserved FROM token_wallets WHERE account_id = ?')
    .bind(accountId)
    .first<{ balance: number; reserved: number }>()

  if (!wallet) return { success: false, error: 'Wallet not found' }
  if (wallet.balance < cost) return { success: false, error: 'Insufficient credits', reserved: wallet.balance }

  const newBalance = wallet.balance - cost
  const newReserved = wallet.reserved + cost

  await db.batch([
    db.prepare(
      'UPDATE token_wallets SET balance = ?, reserved = ?, updated_at = CURRENT_TIMESTAMP WHERE account_id = ?'
    ).bind(newBalance, newReserved, accountId),
    db.prepare(
      'INSERT INTO token_ledger (id, account_id, type, amount, balance_after, job_id, description) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      crypto.randomUUID(),
      accountId,
      'reserve' satisfies LedgerType,
      -cost,
      newBalance,
      jobId,
      `Reserve for ${action}`
    ),
  ])

  return { success: true, reserved: cost }
}

// ---- Settle a completed job --------------------------------

export async function settleSuccess(
  db: D1Database,
  accountId: string,
  action: AIAction,
  jobId: string
): Promise<void> {
  const cost = CREDIT_COSTS[action]

  const wallet = await db
    .prepare('SELECT reserved, lifetime_spent FROM token_wallets WHERE account_id = ?')
    .bind(accountId)
    .first<{ reserved: number; lifetime_spent: number }>()

  if (!wallet) return

  const newReserved = Math.max(0, wallet.reserved - cost)
  const newLifetimeSpent = wallet.lifetime_spent + cost

  await db.batch([
    db.prepare(
      'UPDATE token_wallets SET reserved = ?, lifetime_spent = ?, updated_at = CURRENT_TIMESTAMP WHERE account_id = ?'
    ).bind(newReserved, newLifetimeSpent, accountId),
    db.prepare(
      'INSERT INTO token_ledger (id, account_id, type, amount, balance_after, job_id, description) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      crypto.randomUUID(),
      accountId,
      'settle' satisfies LedgerType,
      -cost,
      -1, // balance_after not recalculated here (already deducted at reserve)
      jobId,
      `Settled ${action}`
    ),
  ])
}

// ---- Refund a failed job -----------------------------------

export async function settleFailure(
  db: D1Database,
  accountId: string,
  action: AIAction,
  jobId: string,
  reason?: string
): Promise<void> {
  const cost = CREDIT_COSTS[action]

  const wallet = await db
    .prepare('SELECT balance, reserved FROM token_wallets WHERE account_id = ?')
    .bind(accountId)
    .first<{ balance: number; reserved: number }>()

  if (!wallet) return

  const newBalance = wallet.balance + cost
  const newReserved = Math.max(0, wallet.reserved - cost)

  await db.batch([
    db.prepare(
      'UPDATE token_wallets SET balance = ?, reserved = ?, updated_at = CURRENT_TIMESTAMP WHERE account_id = ?'
    ).bind(newBalance, newReserved, accountId),
    db.prepare(
      'INSERT INTO token_ledger (id, account_id, type, amount, balance_after, job_id, description) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      crypto.randomUUID(),
      accountId,
      'refund' satisfies LedgerType,
      cost,
      newBalance,
      jobId,
      `Refund for failed ${action}${reason ? ': ' + reason : ''}`
    ),
  ])
}

// ---- Manual admin credit adjustment -----------------------

export async function adminAdjustCredits(
  db: D1Database,
  accountId: string,
  delta: number,
  adminId: string,
  reason: string
): Promise<{ success: boolean; error?: string; new_balance?: number }> {
  const wallet = await db
    .prepare('SELECT balance FROM token_wallets WHERE account_id = ?')
    .bind(accountId)
    .first<{ balance: number }>()

  if (!wallet) return { success: false, error: 'Wallet not found' }
  if (delta < 0 && wallet.balance < Math.abs(delta)) {
    return { success: false, error: 'Cannot remove more credits than available' }
  }

  const newBalance = wallet.balance + delta
  const type: LedgerType = delta > 0 ? 'admin_credit' : 'admin_debit'

  await db.batch([
    db.prepare(
      'UPDATE token_wallets SET balance = ?, updated_at = CURRENT_TIMESTAMP WHERE account_id = ?'
    ).bind(newBalance, accountId),
    db.prepare(
      'INSERT INTO token_ledger (id, account_id, type, amount, balance_after, admin_id, description) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      crypto.randomUUID(),
      accountId,
      type,
      delta,
      newBalance,
      adminId,
      reason
    ),
  ])

  return { success: true, new_balance: newBalance }
}

// ---- Monthly subscription credit reset --------------------

export async function resetMonthlyCredits(
  db: D1Database,
  accountId: string,
  monthlyAllocation: number
): Promise<void> {
  const wallet = await db
    .prepare('SELECT balance FROM token_wallets WHERE account_id = ?')
    .bind(accountId)
    .first<{ balance: number }>()

  if (!wallet) return

  await db.batch([
    db.prepare(
      'UPDATE token_wallets SET balance = ?, lifetime_earned = lifetime_earned + ?, updated_at = CURRENT_TIMESTAMP WHERE account_id = ?'
    ).bind(monthlyAllocation, monthlyAllocation, accountId),
    db.prepare(
      'INSERT INTO token_ledger (id, account_id, type, amount, balance_after, description) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(
      crypto.randomUUID(),
      accountId,
      'subscription_reset' satisfies LedgerType,
      monthlyAllocation,
      monthlyAllocation,
      'Monthly subscription credit reset'
    ),
  ])
}

// ---- Check credits + entitlements before action -----------

export async function checkCredits(
  db: D1Database,
  accountId: string,
  action: AIAction
): Promise<{ allowed: boolean; reason?: string; balance?: number; cost?: number }> {
  const cost = CREDIT_COSTS[action]

  // Check account status
  const account = await db
    .prepare('SELECT status, plan, trial_ends_at FROM accounts WHERE id = ?')
    .bind(accountId)
    .first<{ status: string; plan: string; trial_ends_at: string | null }>()

  if (!account) return { allowed: false, reason: 'Account not found' }
  if (account.status === 'suspended') return { allowed: false, reason: 'Account suspended' }
  if (account.status === 'closed') return { allowed: false, reason: 'Account closed' }

  // Check trial expiry
  if (account.trial_ends_at && new Date(account.trial_ends_at) < new Date()) {
    return { allowed: false, reason: 'Trial period expired' }
  }

  // Check credits
  const wallet = await db
    .prepare('SELECT balance FROM token_wallets WHERE account_id = ?')
    .bind(accountId)
    .first<{ balance: number }>()

  if (!wallet || wallet.balance < cost) {
    return { allowed: false, reason: 'Insufficient credits', balance: wallet?.balance ?? 0, cost }
  }

  // Check plan feature entitlement
  const featureMap: Partial<Record<AIAction, string>> = {
    generate_image: 'image',
    generate_image_hd: 'image',
    generate_video_5s: 'video',
    generate_video_10s: 'video',
    generate_video_20s: 'video',
  }
  const requiredFeature = featureMap[action]
  if (requiredFeature) {
    const plan = await db
      .prepare('SELECT features FROM plans WHERE name = ?')
      .bind(account.plan)
      .first<{ features: string }>()

    if (plan) {
      const features = JSON.parse(plan.features) as Record<string, boolean>
      if (!features[requiredFeature]) {
        return { allowed: false, reason: `Your ${account.plan} plan does not include ${requiredFeature} generation` }
      }
    }
  }

  return { allowed: true, balance: wallet.balance, cost }
}

// ---- Get account wallet ------------------------------------

export async function getWallet(
  db: D1Database,
  accountId: string
): Promise<{ balance: number; reserved: number } | null> {
  return db
    .prepare('SELECT balance, reserved FROM token_wallets WHERE account_id = ?')
    .bind(accountId)
    .first<{ balance: number; reserved: number }>()
}

// ---- Get ledger history ------------------------------------

export async function getLedger(
  db: D1Database,
  accountId: string,
  limit = 50,
  offset = 0
): Promise<TokenLedgerEntry[]> {
  const result = await db
    .prepare(
      'SELECT * FROM token_ledger WHERE account_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?'
    )
    .bind(accountId, limit, offset)
    .all<TokenLedgerEntry>()

  return result.results
}
