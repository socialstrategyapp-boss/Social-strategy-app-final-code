// ============================================================
// Localization Service — Accent, speech profile, locale resolution
// ============================================================

// ---- Accent Library ----------------------------------------

const ACCENT_LIBRARY: Record<string, {
  label: string
  pace: 'slow' | 'medium' | 'fast'
  formality: 'casual' | 'professional'
  spelling: 'AU' | 'US' | 'UK'
  voice_style: string
}> = {
  'AU': {
    label: 'Australian Neutral',
    pace: 'medium',
    formality: 'casual',
    spelling: 'AU',
    voice_style: 'Friendly, direct, no-nonsense, slight informality'
  },
  'AU-QLD': {
    label: 'Queensland Australian',
    pace: 'medium',
    formality: 'casual',
    spelling: 'AU',
    voice_style: 'Relaxed, warm, outdoor-focused'
  },
  'AU-VIC': {
    label: 'Melbourne Australian',
    pace: 'medium',
    formality: 'professional',
    spelling: 'AU',
    voice_style: 'Artsy, progressive, coffee-culture aware'
  },
  'US': {
    label: 'American Neutral',
    pace: 'medium',
    formality: 'casual',
    spelling: 'US',
    voice_style: 'Energetic, direct, optimistic'
  },
  'US-CA': {
    label: 'California',
    pace: 'medium',
    formality: 'casual',
    spelling: 'US',
    voice_style: 'Laid back, wellness-aware, innovation-positive'
  },
  'US-NY': {
    label: 'New York',
    pace: 'fast',
    formality: 'professional',
    spelling: 'US',
    voice_style: 'Direct, fast-paced, no fluff'
  },
  'GB': {
    label: 'British Neutral',
    pace: 'medium',
    formality: 'professional',
    spelling: 'UK',
    voice_style: 'Understated, dry humour, measured'
  },
  'NZ': {
    label: 'New Zealand',
    pace: 'medium',
    formality: 'casual',
    spelling: 'UK', // NZ uses UK spelling
    voice_style: 'Friendly, outdoorsy, unpretentious'
  },
  'CA': {
    label: 'Canadian',
    pace: 'medium',
    formality: 'casual',
    spelling: 'UK', // CA uses UK spelling
    voice_style: 'Polite, inclusive, community-focused'
  },
  'SG': {
    label: 'Singapore',
    pace: 'fast',
    formality: 'professional',
    spelling: 'UK',
    voice_style: 'Efficient, multicultural awareness, achievement-focused'
  },
}

// ---- Resolve accent from business data --------------------

export function resolveAccent(opts: {
  country_code?: string
  state?: string
  phone?: string
  website_domain?: string
  manual_override?: string
}): string {
  // 1. Manual override takes priority
  if (opts.manual_override) return opts.manual_override

  // 2. Country + state combination
  if (opts.country_code) {
    const stateKey = opts.state ? `${opts.country_code}-${opts.state}` : null
    if (stateKey && ACCENT_LIBRARY[stateKey]) return stateKey
    if (ACCENT_LIBRARY[opts.country_code]) return opts.country_code
  }

  // 3. Phone country code fallback
  if (opts.phone) {
    if (opts.phone.startsWith('+61') || opts.phone.startsWith('04')) return 'AU'
    if (opts.phone.startsWith('+1')) return 'US'
    if (opts.phone.startsWith('+44')) return 'GB'
    if (opts.phone.startsWith('+64')) return 'NZ'
    if (opts.phone.startsWith('+65')) return 'SG'
  }

  // 4. Domain TLD fallback
  if (opts.website_domain) {
    if (opts.website_domain.endsWith('.com.au') || opts.website_domain.endsWith('.au')) return 'AU'
    if (opts.website_domain.endsWith('.co.uk') || opts.website_domain.endsWith('.uk')) return 'GB'
    if (opts.website_domain.endsWith('.co.nz') || opts.website_domain.endsWith('.nz')) return 'NZ'
    if (opts.website_domain.endsWith('.ca')) return 'CA'
    if (opts.website_domain.endsWith('.sg')) return 'SG'
  }

  // 5. Default
  return 'AU'
}

// ---- Get accent profile ------------------------------------

export function getAccentProfile(accentKey: string) {
  return ACCENT_LIBRARY[accentKey] ?? ACCENT_LIBRARY['AU']
}

// ---- Build speech profile ----------------------------------

export interface SpeechProfile {
  accent_key: string
  accent_label: string
  gender: 'male' | 'female' | 'neutral'
  pace: 'slow' | 'medium' | 'fast'
  tone: 'warm' | 'professional' | 'energetic' | 'calm'
  formality: 'casual' | 'professional'
  spelling_variant: 'AU' | 'US' | 'UK'
  voice_style: string
  pronunciation_notes: string[]
}

export function buildSpeechProfile(opts: {
  accent_key: string
  gender?: 'male' | 'female' | 'neutral'
  tone?: 'warm' | 'professional' | 'energetic' | 'calm'
  industry?: string
}): SpeechProfile {
  const accent = getAccentProfile(opts.accent_key)

  // Industry-based tone defaults
  const industryToneMap: Record<string, 'warm' | 'professional' | 'energetic' | 'calm'> = {
    health: 'calm',
    fitness: 'energetic',
    finance: 'professional',
    real_estate: 'professional',
    food: 'warm',
    beauty: 'warm',
    retail: 'energetic',
    education: 'calm',
    automotive: 'energetic',
    personal_development: 'energetic',
  }

  const tone = opts.tone ?? (opts.industry ? industryToneMap[opts.industry] ?? 'warm' : 'warm')

  // Australian-specific pronunciation corrections
  const pronunciationNotes: string[] = []
  if (opts.accent_key.startsWith('AU')) {
    pronunciationNotes.push(
      "Say 'ah-loo-min-ee-um' not 'ah-loo-min-um' for aluminium",
      "Say 'meh-tuh' not 'meh-tah' for better/butter",
      "Avoid American r-colouring",
      "Use 'rubbish' not 'garbage', 'boot' not 'trunk'"
    )
  }
  if (opts.accent_key.startsWith('GB')) {
    pronunciationNotes.push(
      "Non-rhotic: drop the r in 'car', 'better'",
      "Use 'flat' not 'apartment', 'autumn' not 'fall'"
    )
  }

  return {
    accent_key: opts.accent_key,
    accent_label: accent.label,
    gender: opts.gender ?? 'neutral',
    pace: accent.pace,
    tone,
    formality: accent.formality,
    spelling_variant: accent.spelling,
    voice_style: accent.voice_style,
    pronunciation_notes: pronunciationNotes,
  }
}

// ---- Locale config -----------------------------------------

export interface LocaleConfig {
  country_code: string
  city?: string
  timezone: string
  currency: string
  currency_symbol: string
  language: string
  spelling_variant: 'AU' | 'US' | 'UK'
  date_format: string
  seasonal_context: string
  holidays_context: string
}

export function getLocaleConfig(countryCode: string, city?: string): LocaleConfig {
  const locales: Record<string, LocaleConfig> = {
    AU: {
      country_code: 'AU',
      timezone: 'Australia/Sydney',
      currency: 'AUD',
      currency_symbol: 'A$',
      language: 'en',
      spelling_variant: 'AU',
      date_format: 'DD/MM/YYYY',
      seasonal_context: 'Southern Hemisphere — summer Dec–Feb, winter Jun–Aug',
      holidays_context: 'Australia Day (Jan), Easter, ANZAC Day (Apr), Christmas (Dec), Boxing Day (Dec 26)',
    },
    US: {
      country_code: 'US',
      timezone: 'America/New_York',
      currency: 'USD',
      currency_symbol: '$',
      language: 'en',
      spelling_variant: 'US',
      date_format: 'MM/DD/YYYY',
      seasonal_context: 'Northern Hemisphere — summer Jun–Aug, winter Dec–Feb',
      holidays_context: "Independence Day (Jul 4), Thanksgiving (Nov), Christmas (Dec), New Year's, Memorial Day",
    },
    GB: {
      country_code: 'GB',
      timezone: 'Europe/London',
      currency: 'GBP',
      currency_symbol: '£',
      language: 'en',
      spelling_variant: 'UK',
      date_format: 'DD/MM/YYYY',
      seasonal_context: 'Northern Hemisphere — mild summers, cold winters',
      holidays_context: "Bank Holidays, Christmas, Easter, Bonfire Night (Nov 5), Boxing Day (Dec 26)",
    },
    NZ: {
      country_code: 'NZ',
      timezone: 'Pacific/Auckland',
      currency: 'NZD',
      currency_symbol: 'NZ$',
      language: 'en',
      spelling_variant: 'UK',
      date_format: 'DD/MM/YYYY',
      seasonal_context: 'Southern Hemisphere — similar to AU',
      holidays_context: 'Waitangi Day (Feb 6), ANZAC Day (Apr 25), Christmas, Boxing Day',
    },
    CA: {
      country_code: 'CA',
      timezone: 'America/Toronto',
      currency: 'CAD',
      currency_symbol: 'CA$',
      language: 'en',
      spelling_variant: 'UK',
      date_format: 'DD/MM/YYYY',
      seasonal_context: 'Northern Hemisphere — harsh winters in east/central, mild on west coast',
      holidays_context: 'Canada Day (Jul 1), Thanksgiving (Oct), Christmas, Victoria Day',
    },
  }

  return locales[countryCode] ?? locales['AU']
}

// ---- Get seasonal content modifier ------------------------

export function getSeasonalModifier(locale: LocaleConfig): string {
  const month = new Date().getMonth() + 1

  // Southern hemisphere
  if (['AU', 'NZ'].includes(locale.country_code)) {
    if ([12, 1, 2].includes(month)) return 'summer — focus on outdoor, heat, beach, Christmas'
    if ([3, 4, 5].includes(month)) return 'autumn — focus on cosy, change, back-to-school'
    if ([6, 7, 8].includes(month)) return 'winter — focus on warmth, comfort, indoors'
    return 'spring — focus on fresh start, growth, spring cleaning'
  }

  // Northern hemisphere
  if ([12, 1, 2].includes(month)) return 'winter — focus on warmth, New Year goals, cosy'
  if ([3, 4, 5].includes(month)) return 'spring — focus on fresh start, outdoors, renewal'
  if ([6, 7, 8].includes(month)) return 'summer — focus on outdoor, travel, energy'
  return 'autumn — focus on cosy, harvest, back-to-school, Halloween'
}
