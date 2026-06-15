import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../theme/theme';
import { Card, Pill, ProgressBar } from '../components/UI';
import ScoreRing from '../components/ScoreRing';
import { mockUser, mockTransactions } from '../data/mockData';

export default function DashboardScreen({ navigation }: any) {
  const { fullName, firstName, memberSinceDay, score, projectedGain, welcomeOffer, cardLast4, cardStatus } = mockUser;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation?.openDrawer?.()}>
            <Ionicons name="menu" size={24} color={colors.ink} />
          </TouchableOpacity>

          <View style={styles.wordmark}>
            <Text style={styles.wordmarkText}>PAY</Text>
            <View style={styles.wordmarkDot} />
            <Text style={styles.wordmarkText}>AI</Text>
          </View>

          <TouchableOpacity style={styles.avatar} onPress={() => navigation?.navigate?.('Profile')}>
            <Text style={styles.avatarText}>{firstName[0]}</Text>
          </TouchableOpacity>
        </View>

        {/* Greeting + day counter */}
        <View style={styles.greetingRow}>
          <View>
            <Text style={[typography.h1, { color: colors.ink }]}>Hi, {firstName}</Text>
            <Text style={styles.daySubtitle}>Member since Day {memberSinceDay}</Text>
          </View>
          <Pill label="Approved for rentals" color={colors.green} bg={colors.greenTint} />
        </View>

        {/* Card widget */}
        <View style={styles.cardWidget}>
          <View style={styles.cardTopRow}>
            <Ionicons name="flash" size={22} color={colors.white} />
            <Text style={styles.cardLabel}>PAY·AI CARD</Text>
          </View>
          <Text style={styles.cardNumber}>•••• •••• •••• {cardLast4}</Text>
          <View style={styles.cardBottomRow}>
            <View style={[styles.cardStatusDot, { backgroundColor: colors.green }]} />
            <Text style={styles.cardStatus}>{cardStatus}</Text>
            <View style={{ flex: 1 }} />
            <Text style={styles.cardVisa}>VISA</Text>
          </View>
        </View>

        {/* Score ring */}
        <Card style={styles.scoreCard}>
          <TouchableOpacity onPress={() => navigation?.navigate?.('ScoreDetail')} activeOpacity={0.8}>
            <View style={styles.scoreRingRow}>
              <ScoreRing score={score} projectedGain={projectedGain} size={180} strokeWidth={14} />
            </View>
            <View style={styles.predictionRow}>
              <Ionicons name="arrow-up-circle" size={18} color={colors.green} />
              <Text style={styles.predictionText}>
                Pay your float now → <Text style={styles.predictionBold}>+{projectedGain} points</Text>
              </Text>
            </View>
            <View style={styles.viewMoreRow}>
              <Text style={styles.viewMoreText}>View full score breakdown</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.gray400} />
            </View>
          </TouchableOpacity>
        </Card>

        {/* Welcome offer */}
        {welcomeOffer.active && (
          <Card style={styles.offerCard}>
            <View style={styles.offerHeaderRow}>
              <Ionicons name="gift" size={20} color={colors.blue} />
              <Text style={styles.offerTitle}>Welcome offer active</Text>
            </View>
            <Text style={styles.offerSubtitle}>
              Month {welcomeOffer.monthCurrent} of {welcomeOffer.monthsTotal} — free floats included
            </Text>
            <ProgressBar progress={welcomeOffer.monthCurrent / welcomeOffer.monthsTotal} color={colors.blue} />
          </Card>
        )}

        {/* Recent transactions */}
        <View style={styles.txnHeaderRow}>
          <Text style={[typography.h3, { color: colors.ink }]}>Recent activity</Text>
          <TouchableOpacity onPress={() => navigation?.navigate?.('Transactions')}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <Card style={styles.txnCard}>
          {mockTransactions.map((txn, idx) => (
            <View key={txn.id} style={[styles.txnRow, idx !== mockTransactions.length - 1 && styles.txnDivider]}>
              <View style={[styles.txnIcon, { backgroundColor: txn.type === 'repaid' ? colors.greenTint : colors.gray100 }]}>
                <Ionicons
                  name={txn.icon as any}
                  size={18}
                  color={txn.type === 'repaid' ? colors.green : colors.gray600}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.txnMerchant}>{txn.merchant}</Text>
                <Text style={styles.txnDate}>{txn.date}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[styles.txnAmount, { color: txn.amount > 0 ? colors.green : colors.ink }]}>
                  {txn.amount > 0 ? '+' : ''}${Math.abs(txn.amount).toFixed(2)}
                </Text>
                {txn.scoreImpact > 0 && (
                  <Text style={styles.txnScoreImpact}>+{txn.scoreImpact} pts</Text>
                )}
              </View>
            </View>
          ))}
        </Card>

        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordmark: { flexDirection: 'row', alignItems: 'center' },
  wordmarkText: { fontSize: 18, fontWeight: '800', color: colors.ink, letterSpacing: 1 },
  wordmarkDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.blue, marginHorizontal: 4 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: colors.white, fontWeight: '700', fontSize: 16 },

  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  daySubtitle: { ...typography.caption, color: colors.gray500, marginTop: 2 },

  cardWidget: {
    backgroundColor: colors.black,
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xl },
  cardLabel: { color: colors.white, fontWeight: '800', fontSize: 13, letterSpacing: 2, marginLeft: spacing.sm },
  cardNumber: { color: colors.white, fontSize: 20, fontWeight: '600', letterSpacing: 2, marginBottom: spacing.lg },
  cardBottomRow: { flexDirection: 'row', alignItems: 'center' },
  cardStatusDot: { width: 8, height: 8, borderRadius: 4, marginRight: spacing.xs },
  cardStatus: { color: colors.gray300, fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  cardVisa: { color: colors.white, fontSize: 14, fontWeight: '800', letterSpacing: 1 },

  scoreCard: { marginBottom: spacing.lg, alignItems: 'center' },
  scoreRingRow: { alignItems: 'center', marginBottom: spacing.md },
  predictionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.greenTint,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  predictionText: { ...typography.caption, color: colors.gray700, marginLeft: spacing.xs },
  predictionBold: { fontWeight: '800', color: colors.green },
  viewMoreRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs },
  viewMoreText: { ...typography.caption, color: colors.gray500, marginRight: 4 },

  offerCard: { marginBottom: spacing.xl, backgroundColor: colors.blueTint, borderColor: colors.blue },
  offerHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs },
  offerTitle: { ...typography.bodyBold, color: colors.ink, marginLeft: spacing.sm },
  offerSubtitle: { ...typography.caption, color: colors.gray600, marginBottom: spacing.md },

  txnHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  seeAll: { ...typography.caption, color: colors.blue, fontWeight: '700' },
  txnCard: { paddingVertical: spacing.sm },
  txnRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md },
  txnDivider: { borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  txnIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  txnMerchant: { ...typography.bodyBold, color: colors.ink },
  txnDate: { ...typography.caption, color: colors.gray400, marginTop: 2 },
  txnAmount: { ...typography.bodyBold },
  txnScoreImpact: { ...typography.tiny, color: colors.green, marginTop: 2 },
});
