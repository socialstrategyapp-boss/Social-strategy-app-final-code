// ============================================================
// Admin Actions Service
// ============================================================

import type { CloudflareBindings } from '../types'
import { adminAdjustCredits } from './credits'

// ---- Suspend Account ---------------------------------------

export async function suspendAccount(
  db: D1Database,
  adminId: string,
  accountId: string,
  reason: string,
  ipAddress?: string
): Promise<{ success: boolean; error?: string }> {
  const account = await db
    .prepare('SELECT id, status, email FROM accounts WHERE id = ?')
    .bind(accountId)
    .first<{ id: string; status: string; email: string }>()

  if (!account) return { success: false, error: 'Account not found' }
  if (account.status === 'suspended') return { success: false, error: 'Already suspended' }
  if (account.status === 'closed') return { success: false, error: 'Account is closed' }

  await db.batch([
    db.prepare(
      "UPDATE accounts SET status = 'suspended', suspended_at = CURRENT_TIMESTAMP, suspension_reason = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).bind(reason, accountId),
    // Cancel pending scheduled posts
    db.prepare(
      "UPDATE content_schedule SET status = 'cancelled' WHERE account_id = ? AND status = 'pending'"
    ).bind(accountId),
    // Audit log
    db.prepare(
      'INSERT INTO audit_logs (id, account_id, admin_id, action, entity_type, entity_id, after_state, ip_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      crypto.randomUUID(),
      accountId,
      adminId,
      'suspend_account',
      'account',
      accountId,
      JSON.stringify({ status: 'suspended', reason }),
      ipAddress ?? null
    ),
  ])

  return { success: true }
}

// ---- Restore Account ---------------------------------------

export async function restoreAccount(
  db: D1Database,
  adminId: string,
  accountId: string,
  ipAddress?: string
): Promise<{ success: boolean; error?: string }> {
  const account = await db
    .prepare('SELECT id, status FROM accounts WHERE id = ?')
    .bind(accountId)
    .first<{ id: string; status: string }>()

  if (!account) return { success: false, error: 'Account not found' }
  if (account.status !== 'suspended') return { success: false, error: 'Account is not suspended' }

  await db.batch([
    db.prepare(
      "UPDATE accounts SET status = 'active', suspended_at = NULL, suspension_reason = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).bind(accountId),
    db.prepare(
      'INSERT INTO audit_logs (id, account_id, admin_id, action, entity_type, entity_id, after_state, ip_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      crypto.randomUUID(),
      accountId,
      adminId,
      'restore_account',
      'account',
      accountId,
      JSON.stringify({ status: 'active' }),
      ipAddress ?? null
    ),
  ])

  return { success: true }
}

// ---- Change Account Plan -----------------------------------

export async function changeAccountPlan(
  db: D1Database,
  adminId: string,
  accountId: string,
  newPlan: string,
  reason: string,
  ipAddress?: string
): Promise<{ success: boolean; error?: string }> {
  const account = await db
    .prepare('SELECT id, plan FROM accounts WHERE id = ?')
    .bind(accountId)
    .first<{ id: string; plan: string }>()

  if (!account) return { success: false, error: 'Account not found' }

  const plan = await db
    .prepare('SELECT id, monthly_credits FROM plans WHERE name = ?')
    .bind(newPlan)
    .first<{ id: string; monthly_credits: number }>()

  if (!plan) return { success: false, error: 'Invalid plan' }

  const beforePlan = account.plan

  await db.batch([
    db.prepare(
      'UPDATE accounts SET plan = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind(newPlan, accountId),
    db.prepare(
      'UPDATE subscriptions SET plan_id = ?, updated_at = CURRENT_TIMESTAMP WHERE account_id = ?'
    ).bind(plan.id, accountId),
    db.prepare(
      'INSERT INTO audit_logs (id, account_id, admin_id, action, entity_type, entity_id, before_state, after_state, ip_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      crypto.randomUUID(),
      accountId,
      adminId,
      'change_plan',
      'account',
      accountId,
      JSON.stringify({ plan: beforePlan }),
      JSON.stringify({ plan: newPlan, reason }),
      ipAddress ?? null
    ),
  ])

  return { success: true }
}

// ---- Manual Credit Adjustment (Admin) ----------------------

export async function adminCreditAdjustment(
  db: D1Database,
  adminId: string,
  accountId: string,
  delta: number,
  reason: string,
  ipAddress?: string
): Promise<{ success: boolean; error?: string; new_balance?: number }> {
  const result = await adminAdjustCredits(db, accountId, delta, adminId, reason)

  if (result.success) {
    await db.prepare(
      'INSERT INTO audit_logs (id, account_id, admin_id, action, entity_type, entity_id, after_state, ip_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      crypto.randomUUID(),
      accountId,
      adminId,
      delta > 0 ? 'add_credits' : 'remove_credits',
      'token_wallet',
      accountId,
      JSON.stringify({ delta, reason, new_balance: result.new_balance }),
      ipAddress ?? null
    ).run()
  }

  return result
}

// ---- Close Account (Hard) ----------------------------------

export async function closeAccount(
  db: D1Database,
  adminId: string,
  accountId: string,
  reason: string,
  ipAddress?: string
): Promise<{ success: boolean; error?: string }> {
  const account = await db
    .prepare('SELECT id, status FROM accounts WHERE id = ?')
    .bind(accountId)
    .first<{ id: string; status: string }>()

  if (!account) return { success: false, error: 'Account not found' }
  if (account.status === 'closed') return { success: false, error: 'Account already closed' }

  await db.batch([
    // Close account
    db.prepare(
      "UPDATE accounts SET status = 'closed', closes_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).bind(accountId),
    // Cancel all schedules
    db.prepare(
      "UPDATE content_schedule SET status = 'cancelled' WHERE account_id = ? AND status = 'pending'"
    ).bind(accountId),
    // Zero out wallet (reserved credits released)
    db.prepare(
      'UPDATE token_wallets SET balance = 0, reserved = 0, updated_at = CURRENT_TIMESTAMP WHERE account_id = ?'
    ).bind(accountId),
    // Revoke connected accounts (mark all as revoked)
    db.prepare(
      "UPDATE connected_accounts SET status = 'revoked', access_token = NULL, refresh_token = NULL WHERE account_id = ?"
    ).bind(accountId),
    // Audit log
    db.prepare(
      'INSERT INTO audit_logs (id, account_id, admin_id, action, entity_type, entity_id, after_state, ip_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      crypto.randomUUID(),
      accountId,
      adminId,
      'close_account',
      'account',
      accountId,
      JSON.stringify({ status: 'closed', reason }),
      ipAddress ?? null
    ),
  ])

  return { success: true }
}

// ---- Get Account Overview (Admin) --------------------------

export async function getAccountOverview(
  db: D1Database,
  accountId: string
): Promise<Record<string, unknown> | null> {
  const [account, wallet, subscription, recentActions] = await Promise.all([
    db.prepare('SELECT * FROM accounts WHERE id = ?').bind(accountId).first(),
    db.prepare('SELECT * FROM token_wallets WHERE account_id = ?').bind(accountId).first(),
    db.prepare(
      'SELECT s.*, p.name as plan_name, p.monthly_credits FROM subscriptions s JOIN plans p ON s.plan_id = p.id WHERE s.account_id = ? ORDER BY s.created_at DESC LIMIT 1'
    ).bind(accountId).first(),
    db.prepare(
      'SELECT * FROM audit_logs WHERE account_id = ? ORDER BY created_at DESC LIMIT 10'
    ).bind(accountId).all(),
  ])

  if (!account) return null

  return {
    account,
    wallet,
    subscription,
    recent_audit: recentActions.results,
  }
}

// ---- List Accounts (Admin) ---------------------------------

export async function listAccounts(
  db: D1Database,
  opts: { status?: string; plan?: string; search?: string; limit?: number; offset?: number }
): Promise<{ accounts: unknown[]; total: number }> {
  const limit = opts.limit ?? 50
  const offset = opts.offset ?? 0

  let query = 'SELECT a.*, w.balance as credit_balance FROM accounts a LEFT JOIN token_wallets w ON a.id = w.account_id WHERE 1=1'
  let countQuery = 'SELECT COUNT(*) as total FROM accounts WHERE 1=1'
  const params: (string | number)[] = []
  const countParams: (string | number)[] = []

  if (opts.status) {
    query += ' AND a.status = ?'
    countQuery += ' AND status = ?'
    params.push(opts.status)
    countParams.push(opts.status)
  }
  if (opts.plan) {
    query += ' AND a.plan = ?'
    countQuery += ' AND plan = ?'
    params.push(opts.plan)
    countParams.push(opts.plan)
  }
  if (opts.search) {
    query += ' AND (a.email LIKE ? OR a.name LIKE ?)'
    countQuery += ' AND (email LIKE ? OR name LIKE ?)'
    params.push(`%${opts.search}%`, `%${opts.search}%`)
    countParams.push(`%${opts.search}%`, `%${opts.search}%`)
  }

  query += ' ORDER BY a.created_at DESC LIMIT ? OFFSET ?'
  params.push(limit, offset)

  const [accounts, countResult] = await Promise.all([
    db.prepare(query).bind(...params).all(),
    db.prepare(countQuery).bind(...countParams).first<{ total: number }>(),
  ])

  return {
    accounts: accounts.results,
    total: countResult?.total ?? 0,
  }
}
