// ─────────────────────────────────────────────────────────────────────────────
//  apps/mobile/src/screens/ContentStudioScreen.tsx
//  Content Studio — generate social media posts on mobile
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, radius } from '@social-strategy/theme/tokens'

const PLATFORMS = ['Instagram', 'TikTok', 'Facebook', 'LinkedIn', 'X (Twitter)', 'YouTube', 'Threads', 'Pinterest']
const TONES     = ['Professional', 'Friendly', 'Playful', 'Bold', 'Inspiring', 'Witty', 'Casual', 'Urgent']

interface GeneratedPost {
  platform:  string
  content:   string
  hashtags:  string[]
  type:      string
  tip:       string
}

export function ContentStudioScreen() {
  const [brandName,  setBrandName]  = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [industry,   setIndustry]   = useState('')
  const [tone,       setTone]       = useState('Professional')
  const [topic,      setTopic]      = useState('')
  const [platforms,  setPlatforms]  = useState<string[]>(['Instagram', 'Facebook', 'TikTok', 'LinkedIn'])
  const [generating, setGenerating] = useState(false)
  const [posts,      setPosts]      = useState<GeneratedPost[]>([])

  const togglePlatform = (p: string) => {
    setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  }

  const generate = async () => {
    if (!brandName.trim()) { Alert.alert('Required', 'Please enter a brand name'); return }
    setGenerating(true)
    try {
      const res  = await fetch('https://socialstrategyapp.com.au/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brandName, websiteUrl, industry, tone, topic, platforms }),
      })
      const data = await res.json() as { success: boolean; posts?: GeneratedPost[]; error?: string }
      if (data.success && data.posts) {
        setPosts(data.posts)
      } else {
        Alert.alert('Error', data.error || 'Generation failed')
      }
    } catch (_) {
      Alert.alert('Error', 'Failed to connect to the server')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>✍️ Content Studio</Text>
          <Text style={styles.subtitle}>AI-powered social media content</Text>
        </View>

        {/* Form */}
        <View style={styles.section}>
          <Text style={styles.label}>Brand Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Coffee House Sydney"
            placeholderTextColor={colors.textDim}
            value={brandName}
            onChangeText={setBrandName}
          />

          <Text style={styles.label}>Website URL</Text>
          <TextInput
            style={styles.input}
            placeholder="https://yourbusiness.com.au"
            placeholderTextColor={colors.textDim}
            value={websiteUrl}
            onChangeText={setWebsiteUrl}
            autoCapitalize="none"
            keyboardType="url"
          />

          <Text style={styles.label}>Industry</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Café & Coffee Shop"
            placeholderTextColor={colors.textDim}
            value={industry}
            onChangeText={setIndustry}
          />

          <Text style={styles.label}>Content Topic</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="e.g. Behind the scenes of our morning rush"
            placeholderTextColor={colors.textDim}
            value={topic}
            onChangeText={setTopic}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Tone selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TONE OF VOICE</Text>
          <View style={styles.chipRow}>
            {TONES.map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.chip, tone === t && styles.chipActive]}
                onPress={() => setTone(t)}
              >
                <Text style={[styles.chipText, tone === t && styles.chipTextActive]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Platform selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PLATFORMS</Text>
          <View style={styles.chipRow}>
            {PLATFORMS.map((p) => (
              <TouchableOpacity
                key={p}
                style={[styles.chip, platforms.includes(p) && styles.chipActivePink]}
                onPress={() => togglePlatform(p)}
              >
                <Text style={[styles.chipText, platforms.includes(p) && styles.chipTextPink]}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Generate button */}
        <TouchableOpacity
          style={styles.generateBtn}
          onPress={generate}
          disabled={generating}
          activeOpacity={0.8}
        >
          {generating
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.generateBtnText}>⚡ Generate Content</Text>
          }
        </TouchableOpacity>

        {/* Results */}
        {posts.map((post, i) => (
          <View key={i} style={styles.postCard}>
            <Text style={styles.postPlatform}>{post.platform}</Text>
            <Text style={styles.postType}>{post.type}</Text>
            <Text style={styles.postContent}>{post.content}</Text>
            <Text style={styles.postHashtags}>{post.hashtags.slice(0, 5).join(' ')}</Text>
            <Text style={styles.postTip}>💡 {post.tip}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: colors.bg0 },
  scroll:      { padding: 16, paddingBottom: 100 },
  header:      { marginBottom: 20 },
  title:       { fontSize: 24, fontWeight: '900', color: colors.textPrimary },
  subtitle:    { fontSize: 13, color: colors.textMuted, marginTop: 4 },
  section:     { marginBottom: 20 },
  sectionTitle:{ fontSize: 11, fontWeight: '800', color: colors.cyan, letterSpacing: 1, marginBottom: 10, textTransform: 'uppercase' },
  label:       { fontSize: 11, fontWeight: '700', color: 'rgba(32,217,255,0.7)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: 'rgba(3,8,24,0.95)',
    borderWidth: 1.5, borderColor: 'rgba(32,217,255,0.18)',
    borderRadius: 10, padding: 12, color: colors.textPrimary, fontSize: 14,
  },
  chipRow:      { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip:         { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, borderWidth: 1.5, borderColor: 'rgba(32,217,255,0.2)', backgroundColor: 'rgba(32,217,255,0.05)' },
  chipActive:   { backgroundColor: 'rgba(32,217,255,0.12)', borderColor: 'rgba(32,217,255,0.55)' },
  chipActivePink: { backgroundColor: 'rgba(255,45,166,0.12)', borderColor: 'rgba(255,45,166,0.55)' },
  chipText:     { fontSize: 12, fontWeight: '700', color: colors.textMuted },
  chipTextActive: { color: colors.cyan },
  chipTextPink: { color: colors.magenta },
  generateBtn: {
    marginVertical: 16, padding: 16, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.violet,
  },
  generateBtnText: { color: '#fff', fontSize: 15, fontWeight: '900' },
  postCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 14, borderWidth: 1.5, borderColor: 'rgba(32,217,255,0.18)',
    padding: 16, marginBottom: 12,
  },
  postPlatform:  { fontSize: 12, fontWeight: '800', color: colors.cyan, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  postType:      { fontSize: 11, color: colors.textMuted, marginBottom: 8 },
  postContent:   { fontSize: 14, color: colors.textPrimary, lineHeight: 22, marginBottom: 10 },
  postHashtags:  { fontSize: 12, color: colors.violet, marginBottom: 8 },
  postTip:       { fontSize: 11, color: colors.textDim, fontStyle: 'italic' },
})
