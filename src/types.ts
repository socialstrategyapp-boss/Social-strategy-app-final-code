// ============================================================
// Social Strategy App — Core Type Definitions
// ============================================================

// ---- Account & Auth ----------------------------------------

export type PlanName = 'free' | 'business' | 'pro' | 'enterprise'
export type AccountStatus = 'active' | 'suspended' | 'trial' | 'closed'
export type UserRole = 'owner' | 'admin' | 'editor' | 'viewer'

export interface Account {
  id: string
  email: string
  name: string
  plan: PlanName
  status: AccountStatus
  trial_ends_at?: string
  suspended_at?: string
  suspension_reason?: string
  closes_at?: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  account_id: string
  email: string
  name: string
  role: UserRole
  avatar_url?: string
  last_active_at?: string
  created_at: string
}

// ---- Plans & Entitlements ----------------------------------

export interface Plan {
  id: string
  name: PlanName
  monthly_credits: number
  max_platforms: number
  max_posts_per_day: number
  max_team_seats: number
  features: PlanFeatures
  price_aud: number
  stripe_price_id?: string
  trial_days: number
  trial_credits: number
}

export interface PlanFeatures {
  text: boolean
  image: boolean
  video: boolean
  api: boolean
  white_label?: boolean
  audit_logs?: boolean
}

export interface Entitlement {
  id: string
  account_id: string
  feature: string
  enabled: boolean
  limit_value?: number
  override_reason?: string
}

// ---- Credits & Metering ------------------------------------

export type LedgerType =
  | 'credit'
  | 'debit'
  | 'reserve'
  | 'settle'
  | 'refund'
  | 'admin_credit'
  | 'admin_debit'
  | 'subscription_reset'

export interface TokenWallet {
  id: string
  account_id: string
  balance: number
  reserved: number
  lifetime_earned: number
  lifetime_spent: number
  updated_at: string
}

export interface TokenLedgerEntry {
  id: string
  account_id: string
  type: LedgerType
  amount: number
  balance_after: number
  job_id?: string
  description?: string
  admin_id?: string
  created_at: string
}

export type AIAction =
  | 'analyze'
  | 'generate_content'
  | 'generate_image'
  | 'generate_image_hd'
  | 'generate_video_5s'
  | 'generate_video_10s'
  | 'generate_video_20s'
  | 'generate_report'
  | 'report_summary'
  | 'seo_meta'
  | 'hashtag_pack'
  | 'schedule_7day'
  | 'schedule_30day'
  | 'publish_post'
  | 'platform_variant'
  | 'character_consistency'
  | 'tts_30s'
  | 'tts_60s'
  | 'transcription'

export const CREDIT_COSTS: Record<AIAction, number> = {
  analyze: 60,
  generate_content: 8,
  generate_image: 25,
  generate_image_hd: 50,
  generate_video_5s: 350,
  generate_video_10s: 700,
  generate_video_20s: 1400,
  generate_report: 120,
  report_summary: 20,
  seo_meta: 10,
  hashtag_pack: 6,
  schedule_7day: 60,
  schedule_30day: 180,
  publish_post: 2,
  platform_variant: 2,
  character_consistency: 15,
  tts_30s: 60,
  tts_60s: 120,
  transcription: 5,
}

// ---- Business Profile --------------------------------------

export interface BusinessProfile {
  id: string
  account_id: string
  business_name: string
  industry?: string
  tagline?: string
  description?: string
  website?: string
  phone?: string
  country_code: string
  city?: string
  timezone: string
  currency: string
  language: string
  spelling_variant: 'AU' | 'US' | 'UK'
  accent_style?: string
  seasonal_context?: string
  target_audience?: string
  brand_voice?: string
  primary_color?: string
  secondary_color?: string
  logo_url?: string
  created_at: string
  updated_at: string
}

export interface BrandVoice {
  id: string
  account_id: string
  voice_tone?: string
  personality_traits: string[]
  content_pillars: string[]
  banned_words: string[]
  approved_hashtags: string[]
  example_posts: string[]
}

// ---- Content & Assets --------------------------------------

export type AssetType = 'image' | 'video' | 'audio' | 'text'
export type AssetStatus = 'active' | 'archived' | 'deleted'

export interface GeneratedAsset {
  id: string
  account_id: string
  type: AssetType
  prompt_id?: string
  storage_url?: string
  thumbnail_url?: string
  metadata?: Record<string, unknown>
  status: AssetStatus
  credits_used: number
  created_at: string
}

export interface Prompt {
  id: string
  account_id: string
  type: string
  input_text?: string
  output_text?: string
  fingerprint?: string
  embedding?: number[]
  platform?: string
  pillar?: string
  credits_used?: number
  created_at: string
}

// ---- Characters --------------------------------------------

export interface Character {
  id: string
  account_id: string
  name: string
  role?: string
  age_range?: string
  appearance_description?: string
  personality?: string
  tone?: string
  content_purpose?: string
  approved_variations: string[]
  banned_variations: string[]
  avatar_url?: string
  reference_images: string[]
  created_at: string
  updated_at: string
}

// ---- Scheduling & Publishing -------------------------------

export type ScheduleStatus = 'pending' | 'published' | 'failed' | 'cancelled'
export type Platform = 'instagram' | 'tiktok' | 'facebook' | 'youtube' | 'linkedin' | 'pinterest' | 'x' | 'threads'

export interface ContentSchedule {
  id: string
  account_id: string
  campaign_id?: string
  asset_id?: string
  platform: Platform
  scheduled_at: string
  status: ScheduleStatus
  publish_attempt_count: number
  published_at?: string
  error_message?: string
  credits_used?: number
  created_at: string
}

export interface ConnectedAccount {
  id: string
  account_id: string
  platform: Platform
  platform_user_id?: string
  platform_username?: string
  access_token?: string
  refresh_token?: string
  token_expires_at?: string
  follower_count?: number
  status: 'active' | 'expired' | 'revoked'
  connected_at: string
}

// ---- Content Engine ----------------------------------------

export type FocusMode = 'mixed' | 'single_pillar' | 'campaign' | 'easy' | 'authority' | 'sales' | 'awareness' | 'community'

export interface ContentPillar {
  name: string
  type: 'service' | 'product' | 'education' | 'experience' | 'recurring' | 'brand'
  revenue_potential: 'low' | 'medium' | 'high'
  content_potential: 'low' | 'medium' | 'high'
  conversion_potential: 'low' | 'medium' | 'high'
  ease_score: number
  subtopics: string[]
  recommended_formats: string[]
  posting_frequency: number
}

export interface ContentEngineOutput {
  account_id: string
  generated_at: string
  focus_mode: FocusMode
  pillars: ContentPillar[]
  weekly_schedule: Record<string, ScheduledPost[]>
  monthly_calendar: Record<string, unknown>
  ready_to_generate_prompts: string[]
}

export interface ScheduledPost {
  day: string
  platform: Platform
  format: string
  pillar: string
  content_idea: string
  caption: string
  hashtags: string[]
  asset_instructions: string
}

// ---- Reports -----------------------------------------------

export type ReportType =
  | 'original_master'
  | 'strategic_expansion'
  | 'psychology_brand'
  | 'system_builder'
  | 'seo_discovery'
  | 'plateau_breaker'
  | 'rebrand'
  | 'youth_genz'
  | 'family_midmarket'
  | 'website_audit'
  | 'startup_launch'

export interface Report {
  id: string
  account_id: string
  business_name?: string
  report_type: ReportType
  status: 'pending' | 'processing' | 'complete' | 'failed'
  input_data?: Record<string, unknown>
  output_md?: string
  output_json?: Record<string, unknown>
  github_path?: string
  credits_used: number
  created_at: string
}

// ---- Admin -------------------------------------------------

export interface AdminAction {
  id: string
  admin_id: string
  target_account_id?: string
  action: string
  details?: Record<string, unknown>
  ip_address?: string
  created_at: string
}

export interface AuditLog {
  id: string
  account_id?: string
  admin_id?: string
  user_id?: string
  action: string
  entity_type?: string
  entity_id?: string
  before_state?: Record<string, unknown>
  after_state?: Record<string, unknown>
  ip_address?: string
  user_agent?: string
  created_at: string
}

// ---- Billing -----------------------------------------------

export interface Subscription {
  id: string
  account_id: string
  plan_id: string
  stripe_subscription_id?: string
  stripe_customer_id?: string
  status: 'active' | 'cancelled' | 'past_due' | 'trialing'
  current_period_start?: string
  current_period_end?: string
  cancel_at_period_end: boolean
  created_at: string
  updated_at: string
}

// ---- API Response Types ------------------------------------

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  code?: string
}

export interface PaginatedResponse<T = unknown> {
  items: T[]
  total: number
  page: number
  per_page: number
  has_more: boolean
}

// ---- Cloudflare Bindings -----------------------------------

export interface CloudflareBindings {
  DB: D1Database
  KV?: KVNamespace
  R2?: R2Bucket
  OPENAI_API_KEY: string
  STRIPE_SECRET_KEY: string
  STRIPE_WEBHOOK_SECRET: string
  ADMIN_TOKEN: string
  GITHUB_TOKEN?: string
  DEMO_MODE?: string
}
