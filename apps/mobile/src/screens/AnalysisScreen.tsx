// ─────────────────────────────────────────────────────────────────────────────
//  apps/mobile/src/screens/AnalysisScreen.tsx
//  Website / Brand Analysis Screen
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState } from 'react'
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, TextInput, ActivityIndicator, Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@social-strategy/theme/tokens'

interface AnalysisResult {
  businessName:   string
  industry:       string
  seoScore:       number
  brandScore:     number
  usabilityScore: number
  contentScore:   number
  overallScore:   number
  websiteSummary: string
  topOpportunity: string
  quickWins:      string[]
  recommendations: string[]
}

export function AnalysisScreen() {
  const [url,      setUrl]      = useState('')
  const [loading,  setLoading]  = useState(false)
  const [result,   setResult]   = useState<AnalysisResult | null>(null)

  const analyse = async () => {
    if (!url.trim()) { Alert.alert('Required', 'Please enter a website URL'); return }
    setLoading(true); setResult(null)
    try {
      const res  = await fetch('https://socialstrategyapp.com.au/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await res.json() as AnalysisResult & { success: boolean; error?: string }
      if (data.success) setResult(data)
      else Alert.alert('Error', data.error || 'Analysis failed')
    } catch (_) {
      Alert.alert('Error', 'Failed to connect to server')
    } finally { setLoading(false) }
  }

  const ScoreCircle = ({ score, label, color }: { score: number; label: string; color: string }) => (
    <View style={[styles.scoreCircle, { borderColor: color + '44' }]}>
      <Text style={[styles.scoreNum, { color }]}>{score}</Text>
      <Text style={styles.scoreLabel}>{label}</Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>🔍 Website Analysis</Text>
        <Text style={styles.subtitle}>200+ signals analysed in ~2 minutes</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter website URL…"
            placeholderTextColor={colors.textDim}
            value={url}
            onChangeText={setUrl}
            autoCapitalize="none"
            keyboardType="url"
          />
          <TouchableOpacity style={styles.analyseBtn} onPress={analyse} disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" size="small" />
              : <Text style={styles.analyseBtnText}>Analyse</Text>
            }
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color={colors.cyan} />
            <Text style={styles.loadingText}>Analysing {url}…</Text>
            <Text style={styles.loadingSubText}>Checking 200+ signals across SEO, brand, content & UX</Text>
          </View>
        )}

        {result && (
          <>
            <View style={styles.resultCard}>
              <Text style={styles.businessName}>{result.businessName}</Text>
              <Text style={styles.industry}>{result.industry}</Text>
              <Text style={styles.summary}>{result.websiteSummary}</Text>
            </View>

            <View style={styles.scoresRow}>
              <ScoreCircle score={result.overallScore}   label="Overall"  color={colors.cyan}    />
              <ScoreCircle score={result.seoScore}        label="SEO"      color={colors.green}   />
              <ScoreCircle score={result.brandScore}      label="Brand"    color={colors.violet}  />
              <ScoreCircle score={result.usabilityScore}  label="UX"       color={colors.orange}  />
            </View>

            <View style={styles.opCard}>
              <Text style={styles.opTitle}>🚀 Top Opportunity</Text>
              <Text style={styles.opText}>{result.topOpportunity}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>⚡ QUICK WINS</Text>
              {result.quickWins.map((win, i) => (
                <View key={i} style={styles.listItem}>
                  <Text style={styles.listBullet}>{i + 1}</Text>
                  <Text style={styles.listText}>{win}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📋 RECOMMENDATIONS</Text>
              {result.recommendations.map((rec, i) => (
                <View key={i} style={styles.listItem}>
                  <Text style={styles.listBullet}>→</Text>
                  <Text style={styles.listText}>{rec}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: colors.bg0 },
  scroll:       { padding: 16, paddingBottom: 100 },
  title:        { fontSize: 24, fontWeight: '900', color: colors.textPrimary, marginBottom: 4 },
  subtitle:     { fontSize: 13, color: colors.textMuted, marginBottom: 20 },
  inputRow:     { flexDirection: 'row', gap: 10, marginBottom: 20 },
  input:        { flex: 1, backgroundColor: 'rgba(3,8,24,0.95)', borderWidth: 1.5, borderColor: 'rgba(32,217,255,0.18)', borderRadius: 12, padding: 12, color: colors.textPrimary, fontSize: 14 },
  analyseBtn:   { backgroundColor: colors.cyan, borderRadius: 12, paddingHorizontal: 18, justifyContent: 'center' },
  analyseBtnText: { color: '#050816', fontWeight: '900', fontSize: 14 },
  loadingCard:  { alignItems: 'center', padding: 30 },
  loadingText:  { color: colors.textPrimary, fontWeight: '700', marginTop: 14, fontSize: 15 },
  loadingSubText: { color: colors.textMuted, marginTop: 6, fontSize: 12, textAlign: 'center' },
  resultCard:   { backgroundColor: colors.bgCard, borderRadius: 18, borderWidth: 1.5, borderColor: colors.borderCyan, padding: 20, marginBottom: 16 },
  businessName: { fontSize: 20, fontWeight: '900', color: colors.textPrimary, marginBottom: 4 },
  industry:     { fontSize: 12, color: colors.cyan, fontWeight: '700', letterSpacing: 0.5, marginBottom: 10 },
  summary:      { fontSize: 14, color: colors.textMuted, lineHeight: 22 },
  scoresRow:    { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  scoreCircle:  { flex: 1, alignItems: 'center', backgroundColor: colors.bgCard, borderRadius: 14, borderWidth: 1.5, margin: 4, padding: 12 },
  scoreNum:     { fontSize: 24, fontWeight: '900' },
  scoreLabel:   { fontSize: 10, color: colors.textMuted, fontWeight: '700', marginTop: 4 },
  opCard:       { backgroundColor: 'rgba(32,217,255,0.06)', borderRadius: 14, borderWidth: 1.5, borderColor: colors.borderCyan, padding: 16, marginBottom: 16 },
  opTitle:      { fontSize: 13, fontWeight: '800', color: colors.cyan, marginBottom: 8 },
  opText:       { fontSize: 14, color: colors.textPrimary, lineHeight: 22 },
  section:      { marginBottom: 16 },
  sectionTitle: { fontSize: 11, fontWeight: '800', color: colors.textMuted, letterSpacing: 1, marginBottom: 10 },
  listItem:     { flexDirection: 'row', gap: 10, marginBottom: 8 },
  listBullet:   { color: colors.cyan, fontWeight: '900', fontSize: 14, minWidth: 20 },
  listText:     { flex: 1, color: colors.textPrimary, fontSize: 14, lineHeight: 21 },
})
