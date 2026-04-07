-- ============================================================
-- Social Strategy – Migration 0006
-- Character Identity Engine – Full Entity Blueprint System
-- Supports: humans, avatars, animals, vehicles, creatures,
--           mascots, robots, fantasy entities, objects, hybrids
-- ============================================================

-- ── MASTER ENTITY TABLE ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS entities (
  id                    INTEGER  PRIMARY KEY AUTOINCREMENT,
  entity_uuid           TEXT     NOT NULL UNIQUE DEFAULT (lower(hex(randomblob(16)))),
  account_id            INTEGER  NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  created_by_email      TEXT     NOT NULL DEFAULT '',
  entity_type           TEXT     NOT NULL DEFAULT 'human',
  -- human|employee_avatar|brand_spokesperson|cartoon_character|animal|
  -- vehicle|product_mascot|fantasy_creature|monster|robot|object|hybrid
  status                TEXT     NOT NULL DEFAULT 'draft',  -- draft|active|archived
  version               INTEGER  NOT NULL DEFAULT 1,
  display_name          TEXT     NOT NULL DEFAULT '',
  internal_name         TEXT     DEFAULT NULL,
  thumbnail_url         TEXT     DEFAULT NULL,
  preview_image_url     TEXT     DEFAULT NULL,
  tags                  TEXT     NOT NULL DEFAULT '[]',   -- JSON array
  last_used_at          DATETIME DEFAULT NULL,
  created_at            DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at            DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_entities_account    ON entities(account_id);
CREATE INDEX IF NOT EXISTS idx_entities_type       ON entities(entity_type);
CREATE INDEX IF NOT EXISTS idx_entities_status     ON entities(status);
CREATE INDEX IF NOT EXISTS idx_entities_uuid       ON entities(entity_uuid);

-- ── LAYER A: IDENTITY PROFILE ─────────────────────────────────
CREATE TABLE IF NOT EXISTS entity_identity (
  id                    INTEGER  PRIMARY KEY AUTOINCREMENT,
  entity_id             INTEGER  NOT NULL UNIQUE REFERENCES entities(id) ON DELETE CASCADE,
  display_name          TEXT     NOT NULL DEFAULT '',
  internal_name         TEXT     DEFAULT NULL,
  role                  TEXT     DEFAULT NULL,         -- sales rep|presenter|mascot|trainer|host
  archetype             TEXT     DEFAULT NULL,         -- luxury founder|everyday tradie|expert doctor
  purpose               TEXT     DEFAULT NULL,         -- ad videos|social UGC|training|explainer reels
  audience_fit          TEXT     DEFAULT NULL,         -- mums 30-45|gym audience|tradies
  origin_story          TEXT     DEFAULT NULL,
  personality_summary   TEXT     DEFAULT NULL,
  default_use_cases     TEXT     NOT NULL DEFAULT '[]',  -- JSON array
  updated_at            DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── LAYER B1: VISUAL PROFILE ──────────────────────────────────
CREATE TABLE IF NOT EXISTS entity_visual (
  id                    INTEGER  PRIMARY KEY AUTOINCREMENT,
  entity_id             INTEGER  NOT NULL UNIQUE REFERENCES entities(id) ON DELETE CASCADE,
  realism_mode          TEXT     NOT NULL DEFAULT 'photorealistic',
  -- stylized|semi_realistic|photorealistic|hyper_realistic|cinematic_real
  species_or_form       TEXT     DEFAULT NULL,
  gender_presentation   TEXT     DEFAULT NULL,
  age_appearance        TEXT     DEFAULT NULL,
  ethnicity_or_look     TEXT     DEFAULT NULL,
  body_type             TEXT     DEFAULT NULL,
  height_impression     TEXT     DEFAULT NULL,
  facial_structure      TEXT     DEFAULT NULL,
  skin_tone             TEXT     DEFAULT NULL,
  skin_texture          TEXT     DEFAULT NULL,
  eye_color             TEXT     DEFAULT NULL,
  eye_shape             TEXT     DEFAULT NULL,
  hair_color            TEXT     DEFAULT NULL,
  hair_style            TEXT     DEFAULT NULL,
  hair_texture          TEXT     DEFAULT NULL,
  facial_hair           TEXT     DEFAULT NULL,
  defining_features     TEXT     NOT NULL DEFAULT '[]',    -- JSON array
  imperfections         TEXT     NOT NULL DEFAULT '[]',    -- JSON array (pores, asymmetry, etc)
  signature_details     TEXT     NOT NULL DEFAULT '[]',    -- JSON array
  wardrobe_style        TEXT     DEFAULT NULL,
  wardrobe_defaults     TEXT     NOT NULL DEFAULT '[]',    -- JSON array
  accessories           TEXT     NOT NULL DEFAULT '[]',    -- JSON array
  grooming_style        TEXT     DEFAULT NULL,
  makeup_style          TEXT     DEFAULT NULL,
  posture               TEXT     DEFAULT NULL,
  silhouette            TEXT     DEFAULT NULL,
  attractiveness_style  TEXT     DEFAULT NULL,
  realism_constraints   TEXT     NOT NULL DEFAULT '[]',    -- JSON array
  updated_at            DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── LAYER B2: PERFORMANCE PROFILE ────────────────────────────
CREATE TABLE IF NOT EXISTS entity_performance (
  id                    INTEGER  PRIMARY KEY AUTOINCREMENT,
  entity_id             INTEGER  NOT NULL UNIQUE REFERENCES entities(id) ON DELETE CASCADE,
  movement_style        TEXT     DEFAULT NULL,
  gesture_style         TEXT     DEFAULT NULL,
  walking_style         TEXT     DEFAULT NULL,
  idle_behavior         TEXT     DEFAULT NULL,
  energy_level          TEXT     NOT NULL DEFAULT 'medium',  -- low|calm|medium|high|electric
  confidence_level      TEXT     NOT NULL DEFAULT 'confident',  -- shy|warm|confident|authoritative|charismatic
  emotional_range       TEXT     NOT NULL DEFAULT '[]',    -- JSON array
  comedic_timing        TEXT     DEFAULT NULL,
  camera_awareness      TEXT     DEFAULT NULL,
  performance_style     TEXT     DEFAULT NULL,
  micro_expressions     TEXT     NOT NULL DEFAULT '[]',    -- JSON array: half-smile|eyebrow lift|empathetic nod
  speaking_pace_visual  TEXT     DEFAULT NULL,
  lip_sync_style        TEXT     DEFAULT NULL,
  updated_at            DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── LAYER B3: VOICE PROFILE ───────────────────────────────────
CREATE TABLE IF NOT EXISTS entity_voice (
  id                    INTEGER  PRIMARY KEY AUTOINCREMENT,
  entity_id             INTEGER  NOT NULL UNIQUE REFERENCES entities(id) ON DELETE CASCADE,
  enabled               INTEGER  NOT NULL DEFAULT 1,
  voice_gender_style    TEXT     DEFAULT NULL,
  voice_age_impression  TEXT     DEFAULT NULL,
  accent                TEXT     NOT NULL DEFAULT 'General Australian',
  -- General Australian|Broad Australian|Cultivated Australian|General American|
  -- RP British|Soft Irish|Indian English - neutral professional|etc
  dialect_region        TEXT     DEFAULT NULL,
  speaking_pace         TEXT     NOT NULL DEFAULT 'moderate',  -- slow|moderate|fast|varied
  vocal_tone            TEXT     DEFAULT NULL,
  vocal_texture         TEXT     DEFAULT NULL,
  pitch_range           TEXT     DEFAULT NULL,
  emotional_delivery    TEXT     DEFAULT NULL,
  pronunciation_style   TEXT     DEFAULT NULL,
  energy_signature      TEXT     DEFAULT NULL,
  catchphrases          TEXT     NOT NULL DEFAULT '[]',    -- JSON array
  banned_phrases        TEXT     NOT NULL DEFAULT '[]',    -- JSON array
  updated_at            DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── LAYER B4: BEHAVIOR PROFILE ────────────────────────────────
CREATE TABLE IF NOT EXISTS entity_behavior (
  id                    INTEGER  PRIMARY KEY AUTOINCREMENT,
  entity_id             INTEGER  NOT NULL UNIQUE REFERENCES entities(id) ON DELETE CASCADE,
  personality_traits    TEXT     NOT NULL DEFAULT '[]',    -- JSON array
  communication_style   TEXT     DEFAULT NULL,
  persuasion_style      TEXT     DEFAULT NULL,
  humor_style           TEXT     DEFAULT NULL,
  empathy_style         TEXT     DEFAULT NULL,
  authority_style       TEXT     DEFAULT NULL,
  signature_phrases     TEXT     NOT NULL DEFAULT '[]',    -- JSON array
  forbidden_behaviors   TEXT     NOT NULL DEFAULT '[]',    -- JSON array
  default_cta_style     TEXT     DEFAULT NULL,
  conversation_do       TEXT     NOT NULL DEFAULT '[]',    -- JSON array
  conversation_dont     TEXT     NOT NULL DEFAULT '[]',    -- JSON array
  updated_at            DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── LAYER B5: BRAND PROFILE ───────────────────────────────────
CREATE TABLE IF NOT EXISTS entity_brand (
  id                    INTEGER  PRIMARY KEY AUTOINCREMENT,
  entity_id             INTEGER  NOT NULL UNIQUE REFERENCES entities(id) ON DELETE CASCADE,
  brand_name            TEXT     DEFAULT NULL,
  industry              TEXT     DEFAULT NULL,
  target_audience       TEXT     NOT NULL DEFAULT '[]',    -- JSON array
  brand_voice           TEXT     DEFAULT NULL,
  brand_tone            TEXT     DEFAULT NULL,
  brand_values          TEXT     NOT NULL DEFAULT '[]',    -- JSON array
  visual_brand_keywords TEXT     NOT NULL DEFAULT '[]',    -- JSON array
  prohibited_conflicts  TEXT     NOT NULL DEFAULT '[]',    -- JSON array
  campaign_fit          TEXT     NOT NULL DEFAULT '[]',    -- JSON array
  updated_at            DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── LAYER C1: CONSISTENCY PROFILE ────────────────────────────
CREATE TABLE IF NOT EXISTS entity_consistency (
  id                    INTEGER  PRIMARY KEY AUTOINCREMENT,
  entity_id             INTEGER  NOT NULL UNIQUE REFERENCES entities(id) ON DELETE CASCADE,
  anchor_prompt         TEXT     DEFAULT NULL,   -- master positive prompt for identity lock
  negative_prompt       TEXT     DEFAULT NULL,   -- what to always exclude
  locked_features       TEXT     NOT NULL DEFAULT '[]',    -- JSON array: face shape|eye color|hairline
  semi_locked_features  TEXT     NOT NULL DEFAULT '[]',    -- JSON array: can vary slightly
  changeable_features   TEXT     NOT NULL DEFAULT '[]',    -- JSON array: clothing|scene|props
  seed_strategy         TEXT     NOT NULL DEFAULT 'consistent',  -- consistent|varied|seeded
  reference_strength    REAL     NOT NULL DEFAULT 0.85,    -- 0.0-1.0 how strongly to apply refs
  identity_priority     INTEGER  NOT NULL DEFAULT 9,       -- 1-10 how much to prioritize identity
  wardrobe_rotation     TEXT     NOT NULL DEFAULT '[]',    -- JSON array of rotation rules
  scene_variation_rules TEXT     NOT NULL DEFAULT '[]',    -- JSON array
  camera_defaults       TEXT     NOT NULL DEFAULT '[]',    -- JSON array: 85mm portrait|eye-level|soft bokeh
  updated_at            DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── LAYER C2: SAFETY PROFILE ─────────────────────────────────
CREATE TABLE IF NOT EXISTS entity_safety (
  id                    INTEGER  PRIMARY KEY AUTOINCREMENT,
  entity_id             INTEGER  NOT NULL UNIQUE REFERENCES entities(id) ON DELETE CASCADE,
  consent_verified      INTEGER  NOT NULL DEFAULT 0,
  synthetic_only        INTEGER  NOT NULL DEFAULT 1,
  resembles_real_person INTEGER  NOT NULL DEFAULT 0,
  impersonation_risk    TEXT     NOT NULL DEFAULT 'low',  -- low|medium|high
  likeness_restrictions TEXT     NOT NULL DEFAULT '[]',   -- JSON array
  age_verified_adult    INTEGER  NOT NULL DEFAULT 1,
  restricted_use_cases  TEXT     NOT NULL DEFAULT '[]',   -- JSON array
  moderation_flags      TEXT     NOT NULL DEFAULT '[]',   -- JSON array of past flags
  reviewed_by_admin     INTEGER  NOT NULL DEFAULT 0,
  updated_at            DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── LAYER C3: STORAGE PROFILE ─────────────────────────────────
CREATE TABLE IF NOT EXISTS entity_storage (
  id                    INTEGER  PRIMARY KEY AUTOINCREMENT,
  entity_id             INTEGER  NOT NULL UNIQUE REFERENCES entities(id) ON DELETE CASCADE,
  save_folder_path      TEXT     DEFAULT NULL,
  preview_image_path    TEXT     DEFAULT NULL,
  reference_pack_path   TEXT     DEFAULT NULL,
  voice_sample_path     TEXT     DEFAULT NULL,
  metadata_path         TEXT     DEFAULT NULL,
  version_history_path  TEXT     DEFAULT NULL,
  thumbnail_path        TEXT     DEFAULT NULL,
  search_index_terms    TEXT     NOT NULL DEFAULT '[]',   -- JSON array
  favorite_flag         INTEGER  NOT NULL DEFAULT 0,
  total_generations     INTEGER  NOT NULL DEFAULT 0,
  storage_bytes_used    INTEGER  NOT NULL DEFAULT 0,
  updated_at            DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── LAYER C4: TRAINING FEEDBACK PROFILE ──────────────────────
CREATE TABLE IF NOT EXISTS entity_feedback (
  id                    INTEGER  PRIMARY KEY AUTOINCREMENT,
  entity_id             INTEGER  NOT NULL UNIQUE REFERENCES entities(id) ON DELETE CASCADE,
  quality_score_avg     REAL     NOT NULL DEFAULT 0.0,
  realism_score_avg     REAL     NOT NULL DEFAULT 0.0,
  consistency_score_avg REAL     NOT NULL DEFAULT 0.0,
  brand_fit_score_avg   REAL     NOT NULL DEFAULT 0.0,
  engagement_score_avg  REAL     NOT NULL DEFAULT 0.0,
  user_edits_common     TEXT     NOT NULL DEFAULT '[]',   -- JSON array of common edit requests
  winning_prompt_patterns TEXT   NOT NULL DEFAULT '[]',   -- JSON array
  rejected_patterns     TEXT     NOT NULL DEFAULT '[]',   -- JSON array
  learned_preferences   TEXT     NOT NULL DEFAULT '[]',   -- JSON array
  total_feedback_count  INTEGER  NOT NULL DEFAULT 0,
  last_feedback_at      DATETIME DEFAULT NULL,
  updated_at            DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── ENTITY SUBTYPE: HUMAN DATA ────────────────────────────────
CREATE TABLE IF NOT EXISTS entity_human_data (
  id                    INTEGER  PRIMARY KEY AUTOINCREMENT,
  entity_id             INTEGER  NOT NULL UNIQUE REFERENCES entities(id) ON DELETE CASCADE,
  occupation            TEXT     DEFAULT NULL,
  nationality_style     TEXT     DEFAULT NULL,
  accent_preference     TEXT     DEFAULT NULL,
  lifestyle_signal      TEXT     DEFAULT NULL,
  fashion_signal        TEXT     DEFAULT NULL,
  social_class_signal   TEXT     DEFAULT NULL,
  education_signal      TEXT     DEFAULT NULL,
  relationship_to_brand TEXT     DEFAULT NULL,
  updated_at            DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── ENTITY SUBTYPE: VEHICLE DATA ─────────────────────────────
CREATE TABLE IF NOT EXISTS entity_vehicle_data (
  id                    INTEGER  PRIMARY KEY AUTOINCREMENT,
  entity_id             INTEGER  NOT NULL UNIQUE REFERENCES entities(id) ON DELETE CASCADE,
  vehicle_type          TEXT     DEFAULT NULL,  -- car|truck|bus|motorcycle|boat|aircraft
  make_style            TEXT     DEFAULT NULL,
  model_style           TEXT     DEFAULT NULL,
  era                   TEXT     DEFAULT NULL,  -- modern|vintage|futuristic|classic
  paint_finish          TEXT     DEFAULT NULL,
  wear_level            TEXT     DEFAULT NULL,
  performance_feel      TEXT     DEFAULT NULL,
  interior_style        TEXT     DEFAULT NULL,
  anthropomorphic_personality TEXT DEFAULT NULL,
  updated_at            DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── ENTITY SUBTYPE: CREATURE DATA ────────────────────────────
CREATE TABLE IF NOT EXISTS entity_creature_data (
  id                    INTEGER  PRIMARY KEY AUTOINCREMENT,
  entity_id             INTEGER  NOT NULL UNIQUE REFERENCES entities(id) ON DELETE CASCADE,
  species_type          TEXT     DEFAULT NULL,
  anatomy_style         TEXT     DEFAULT NULL,
  limb_count            INTEGER  NOT NULL DEFAULT 4,
  head_count            INTEGER  NOT NULL DEFAULT 1,
  skin_or_hide_type     TEXT     DEFAULT NULL,
  teeth_style           TEXT     DEFAULT NULL,
  eye_count             INTEGER  NOT NULL DEFAULT 2,
  horn_style            TEXT     DEFAULT NULL,
  wing_style            TEXT     DEFAULT NULL,
  tail_style            TEXT     DEFAULT NULL,
  power_signature       TEXT     DEFAULT NULL,
  fear_factor           TEXT     DEFAULT NULL,  -- none|mild|moderate|terrifying
  mythology_inspiration TEXT     DEFAULT NULL,
  updated_at            DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── ENTITY SUBTYPE: OBJECT DATA ───────────────────────────────
CREATE TABLE IF NOT EXISTS entity_object_data (
  id                    INTEGER  PRIMARY KEY AUTOINCREMENT,
  entity_id             INTEGER  NOT NULL UNIQUE REFERENCES entities(id) ON DELETE CASCADE,
  object_category       TEXT     DEFAULT NULL,
  material_style        TEXT     DEFAULT NULL,
  wear_and_tear         TEXT     DEFAULT NULL,
  scale                 TEXT     DEFAULT NULL,
  mechanical_complexity TEXT     DEFAULT NULL,
  anthropomorphic_level TEXT     DEFAULT NULL,  -- none|subtle|moderate|full
  updated_at            DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── REFERENCE ASSETS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS entity_reference_assets (
  id                    INTEGER  PRIMARY KEY AUTOINCREMENT,
  entity_id             INTEGER  NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  asset_type            TEXT     NOT NULL DEFAULT 'reference_image',
  -- reference_image|voice_sample|style_board|texture_ref|wardrobe_ref|video_clip
  asset_url             TEXT     NOT NULL,
  asset_label           TEXT     DEFAULT NULL,
  weight                REAL     NOT NULL DEFAULT 1.0,  -- 0.0-1.0 influence weight
  notes                 TEXT     DEFAULT NULL,
  created_at            DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ref_assets_entity ON entity_reference_assets(entity_id);

-- ── PROMPT PRESETS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS entity_prompt_presets (
  id                    INTEGER  PRIMARY KEY AUTOINCREMENT,
  entity_id             INTEGER  NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  preset_name           TEXT     NOT NULL DEFAULT 'Default',
  use_case              TEXT     NOT NULL DEFAULT 'general',
  -- general|ad_video|social_post|product_shot|testimonial|explainer|thumbnail
  positive_prompt       TEXT     NOT NULL DEFAULT '',
  negative_prompt       TEXT     NOT NULL DEFAULT '',
  camera_spec           TEXT     NOT NULL DEFAULT '{}',  -- JSON object
  scene_spec            TEXT     NOT NULL DEFAULT '{}',  -- JSON object
  style_spec            TEXT     NOT NULL DEFAULT '{}',  -- JSON object
  is_default            INTEGER  NOT NULL DEFAULT 0,
  usage_count           INTEGER  NOT NULL DEFAULT 0,
  quality_score_avg     REAL     NOT NULL DEFAULT 0.0,
  created_at            DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at            DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_prompt_presets_entity ON entity_prompt_presets(entity_id);

-- ── GENERATION HISTORY ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS entity_generation_records (
  id                    INTEGER  PRIMARY KEY AUTOINCREMENT,
  entity_id             INTEGER  NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  account_id            INTEGER  NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  generation_type       TEXT     NOT NULL DEFAULT 'image',  -- image|video|text|voice
  prompt_used           TEXT     NOT NULL DEFAULT '',
  negative_prompt_used  TEXT     DEFAULT NULL,
  model_used            TEXT     DEFAULT NULL,
  parameters            TEXT     NOT NULL DEFAULT '{}',   -- JSON: size, style, seed, etc
  output_url            TEXT     DEFAULT NULL,
  credits_used          INTEGER  NOT NULL DEFAULT 4,
  provider_cost_usd     REAL     NOT NULL DEFAULT 0.0,
  quality_score         REAL     DEFAULT NULL,           -- user-rated 0-10
  consistency_score     REAL     DEFAULT NULL,           -- auto-measured
  user_kept             INTEGER  DEFAULT NULL,           -- 1=kept 0=discarded NULL=unknown
  user_feedback         TEXT     DEFAULT NULL,
  revision_of           INTEGER  REFERENCES entity_generation_records(id),
  created_at            DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_gen_records_entity  ON entity_generation_records(entity_id);
CREATE INDEX IF NOT EXISTS idx_gen_records_account ON entity_generation_records(account_id);
CREATE INDEX IF NOT EXISTS idx_gen_records_type    ON entity_generation_records(generation_type);
