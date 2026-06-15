import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography, getTier, getTierColor } from '../theme/theme';
import { Card, ProgressBar } from '../components/UI';
import ScoreRing from '../components/ScoreRing';
import { mockUser, mockScoreEvents, mockScoreHistory } from '../data/mockData';

export default function ScoreDetailScreen({ navigation }: any) {
  const { score, projectedGain, projectedLoss } = mockUser;
  const tier = getTier(score);
  const tierColor = getTierColor(tier);

  const maxHistory = Math.max(...mockScoreHistory.map((h) => h.score));
  const minHistory = Math.min(...mockScoreHistory.map((h) => h.score));

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation?.goBack?.()}>
            <Ionicons name="chevron-back" size={24} color={colors.ink} />
          </TouchableOpacity>
          <Text style={[typography.h2, { color: colors.ink }]}>Your PAY·AI Score</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Big ring with both projections */}
        <Card style={styles.ringCard}>
          <ScoreRing score={score} size={220} strokeWidth={16} projectedGain={projectedGain} />
          <Text style={styles.tierDescription}>
            You're in the <Text style={{ color: tierColor, fontWeight: '800' }}>{tier}</Text> band ({tierBandRange(tier)})
          </Text>

          <View style={styles.projectionRow}>
            <View style={[styles.projectionPill, { backgroundColor: colors.greenTint }]}>
              <Ionicons name="arrow-up" size={16} color={colors.green} />
              <Text style={styles.projectionTextGreen}>Pay your float → +{projectedGain}</Text>
            </View>
            <View style={[styles.projectionPill, { backgroundColor: colors.redTint }]}>
              <Ionicons name="arrow-down" size={16} color={colors.red} />
              <Text style={styles.projectionTextRed}>Miss a payment → -{projectedLoss}</Text>
            </View>
          </View>
        </Card>

        {/* Score history mini chart */}
        <Text style={[typography.h3, styles.sectionTitle]}>Score history</Text>
        <Card style={styles.chartCard}>
          <View style={styles.chartRow}>
            {mockScoreHistory.map((h) => {
              const heightPct = ((h.score - minHistory) / (maxHistory - minHistory || 1)) * 0.7 + 0.3;
              return (
                <View key={h.label} style={styles.chartBarWrap}>
                  <View style={styles.chartBarTrack}>
                    <View style={[styles.chartBar, { height: `${heightPct * 100}%`, backgroundColor: tierColor }]} />
                  </View>
                  <Text style={styles.chartLabel}>{h.label}</Text>
                </View>
              );
            })}
          </View>
        </Card>

        {/* What moved your score */}
        <Text style={[typography.h3, styles.sectionTitle]}>What's moved your score</Text>
        <Card style={styles.eventsCard}>
          {mockScoreEvents.map((ev, idx) => (
            <View key={ev.id} style={[styles.eventRow, idx !== mockScoreEvents.length - 1 && styles.eventDivider]}>
              <View style={styles.eventLeft}>
                <View style={[styles.eventDot, { backgroundColor: ev.delta > 0 ? colors.green : colors.red }]} />
                <View>
                  <Text style={styles.eventLabel}>{ev.label}</Text>
                  <Text style={styles.eventDate}>{ev.date}</Text>
                </View>
              </View>
              <Text style={[styles.eventDelta, { color: ev.delta > 0 ? colors.green : colors.red }]}>
                {ev.delta > 0 ? '+' : ''}{ev.delta}
              </Text>
            </View>
          ))}
        </Card>

        {/* How the score works */}
        <Text style={[typography.h3, styles.sectionTitle]}>How your score works</Text>
        <Card style={styles.infoCard}>
          <Text style={styles.infoText}>
            Your PAY·AI Score ranges from 0–1000, just like the major Australian credit bureaus.
            Unlike a traditional credit score, yours updates in real time — every float you repay
            on time, every rent payment you make, and every perfect month builds your score.
          </Text>
          <ProgressBar progress={score / 1000} color={tierColor} />
          <View style={styles.scaleRow}>
            <Text style={styles.scaleLabel}>0</Text>
            <Text style={styles.scaleLabel}>500</Text>
            <Text style={styles.scaleLabel}>1000</Text>
          </View>
        </Card>

        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function tierBandRange(tier: string) {
  switch (tier) {
    case 'Building': return '0–299';
    case 'Fair': return '300–499';
    case 'Good': return '500–699';
    case 'Great': return '700–849';
    case 'Excellent': return '850–1000';
    default: return '';
  }
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
  iconButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },

  ringCard: { alignItems: 'center', marginBottom: spacing.xl },
  tierDescription: { ...typography.body, color: colors.gray600, marginTop: spacing.lg, textAlign: 'center' },

  projectionRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg, width: '100%' },
  projectionPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    gap: 6,
  },
  projectionTextGreen: { ...typography.caption, color: colors.green, fontWeight: '700' },
  projectionTextRed: { ...typography.caption, color: colors.red, fontWeight: '700' },

  sectionTitle: { marginBottom: spacing.md, color: colors.ink },

  chartCard: { marginBottom: spacing.xl },
  chartRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 120 },
  chartBarWrap: { alignItems: 'center', flex: 1 },
  chartBarTrack: { width: 16, height: 90, backgroundColor: colors.gray100, borderRadius: radius.pill, justifyContent: 'flex-end', overflow: 'hidden' },
  chartBar: { width: 16, borderRadius: radius.pill },
  chartLabel: { ...typography.tiny, color: colors.gray400, marginTop: spacing.sm },

  eventsCard: { marginBottom: spacing.xl, paddingVertical: spacing.sm },
  eventRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing.md },
  eventDivider: { borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  eventLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, flex: 1 },
  eventDot: { width: 8, height: 8, borderRadius: 4 },
  eventLabel: { ...typography.bodyBold, color: colors.ink },
  eventDate: { ...typography.caption, color: colors.gray400, marginTop: 2 },
  eventDelta: { ...typography.h3 },

  infoCard: { marginBottom: spacing.xl },
  infoText: { ...typography.body, color: colors.gray600, marginBottom: spacing.lg, lineHeight: 22 },
  scaleRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  scaleLabel: { ...typography.tiny, color: colors.gray400 },
});
