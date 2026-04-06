// ─────────────────────────────────────────────────────────────────────────────
//  apps/mobile/src/screens/DashboardScreen.tsx
//  Main dashboard screen — mirrors web /dashboard
//  Uses Social Strategy design tokens from @social-strategy/theme
// ─────────────────────────────────────────────────────────────────────────────
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, spacing, radius, typography } from '@social-strategy/theme/tokens'

interface AccountData {
  plan:             string
  creditsUsed:      number
  creditsMax:       number
  creditsRemaining: number
  creditsPct:       number
  reportsUsed:      number
  reportsMax:       number
  daysLeft:         number | null
}

const API_BASE = 'https://socialstrategyapp.com.au'

export function DashboardScreen() {
  const [account, setAccount]       = useState<AccountData | null>(null)
  const [loading, setLoading]       = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchAccount = async () => {
    try {
      const res  = await fetch(`${API_BASE}/api/account`)
      const data = await res.json() as AccountData & { success: boolean }
      if (data.success) setAccount(data)
    } catch (_) {}
    finally { setLoading(false); setRefreshing(false) }
  }

  useEffect(() => { fetchAccount() }, [])

  const statCards = [
    { label: 'Credits Used',      value: account?.creditsUsed ?? '--',      color: colors.cyan,    icon: '⚡' },
    { label: 'Credits Left',      value: account?.creditsRemaining ?? '--',  color: colors.green,   icon: '💎' },
    { label: 'Reports Used',      value: account?.reportsUsed ?? '--',       color: colors.violet,  icon: '📊' },
    { label: 'Days Left',         value: account?.daysLeft ?? '--',          color: colors.orange,  icon: '📅' },
  ]

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.cyan} />
        <Text style={styles.loadingText}>Loading your dashboard…</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAccount() }} tintColor={colors.cyan} />}
      >
        {/* Header */}
        <LinearGradient colors={['#050816', '#081026']} style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning 👋</Text>
            <Text style={styles.planBadge}>{account?.plan?.toUpperCase() ?? 'FREE'} PLAN</Text>
          </View>
          <TouchableOpacity style={styles.avatarBtn}>
            <Text style={styles.avatarText}>SS</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Credit progress */}
        {account && (
          <View style={styles.creditCard}>
            <Text style={styles.creditTitle}>Credit Usage</Text>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${account.creditsPct}%` as any }]} />
            </View>
            <Text style={styles.creditSub}>
              {account.creditsUsed.toLocaleString()} / {account.creditsMax.toLocaleString()} credits used ({account.creditsPct}%)
            </Text>
          </View>
        )}

        {/* Stat grid */}
        <View style={styles.statsGrid}>
          {statCards.map((card) => (
            <View key={card.label} style={[styles.statCard, { borderColor: card.color + '33' }]}>
              <Text style={styles.statIcon}>{card.icon}</Text>
              <Text style={[styles.statValue, { color: card.color }]}>{String(card.value)}</Text>
              <Text style={styles.statLabel}>{card.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick action buttons */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {[
            { label: 'Analyse Website', color: colors.cyan,    icon: '🔍', route: 'Analysis' },
            { label: 'Create Content',  color: colors.violet,  icon: '✍️', route: 'Studio'   },
            { label: 'AI Characters',   color: colors.magenta, icon: '🤖', route: 'Characters'},
            { label: 'View Analytics',  color: colors.green,   icon: '📈', route: 'Analytics' },
            { label: 'Image Maker',     color: colors.orange,  icon: '🎨', route: 'Images'    },
            { label: 'Upgrade Plan',    color: colors.yellow,  icon: '⭐', route: 'Pricing'   },
          ].map((action) => (
            <TouchableOpacity
              key={action.label}
              style={[styles.actionBtn, { borderColor: action.color + '44' }]}
              activeOpacity={0.7}
            >
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={[styles.actionLabel, { color: action.color }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:        { flex: 1, backgroundColor: colors.bg0 },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg0 },
  loadingText:      { color: colors.textMuted, marginTop: 12, fontSize: 14 },
  scroll:           { paddingBottom: 100 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 20, paddingTop: 10,
  },
  greeting:   { fontSize: 22, fontWeight: '800', color: colors.textPrimary },
  planBadge:  { fontSize: 11, fontWeight: '800', color: colors.cyan, letterSpacing: 1, marginTop: 4 },
  avatarBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(32,217,255,0.15)',
    borderWidth: 1.5, borderColor: colors.borderCyan,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText:   { color: colors.cyan, fontWeight: '900', fontSize: 13 },
  creditCard: {
    margin: 16, padding: 20,
    backgroundColor: colors.bgCard,
    borderRadius: 18, borderWidth: 1.5, borderColor: colors.borderCyan,
  },
  creditTitle:  { fontSize: 12, fontWeight: '800', color: colors.cyan, letterSpacing: 1, marginBottom: 10 },
  progressBg: {
    height: 8, backgroundColor: 'rgba(32,217,255,0.1)',
    borderRadius: 999, overflow: 'hidden', marginBottom: 8,
  },
  progressFill: {
    height: 8, backgroundColor: colors.cyan,
    borderRadius: 999,
  },
  creditSub:    { fontSize: 12, color: colors.textMuted },
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 12, gap: 10, marginBottom: 20,
  },
  statCard: {
    flex: 1, minWidth: '44%',
    backgroundColor: colors.bgCard,
    borderRadius: 14, borderWidth: 1.5, padding: 16,
    alignItems: 'center',
  },
  statIcon:   { fontSize: 24, marginBottom: 8 },
  statValue:  { fontSize: 22, fontWeight: '900' },
  statLabel:  { fontSize: 11, color: colors.textMuted, marginTop: 4, fontWeight: '600' },
  sectionTitle: {
    fontSize: 13, fontWeight: '800', color: colors.textMuted,
    letterSpacing: 1, paddingHorizontal: 16, marginBottom: 12,
    textTransform: 'uppercase',
  },
  actionsGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 12, gap: 10,
  },
  actionBtn: {
    flex: 1, minWidth: '44%',
    backgroundColor: colors.bgCard,
    borderRadius: 14, borderWidth: 1.5, padding: 16,
    alignItems: 'center',
  },
  actionIcon:  { fontSize: 28, marginBottom: 8 },
  actionLabel: { fontSize: 12, fontWeight: '700', textAlign: 'center' },
})
