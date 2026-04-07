# Self-Learning Marketing Engine
## Social Strategy — Complete Architecture & Pseudocode
## Version 1.0.0 | Status: Implemented

---

## Core Goal

Build a system that:
1. Extracts everything useful from a client report (A-to-Z)
2. Understands the business deeply
3. Converts report insights into prompts, hooks, captions, SEO assets, hashtags, campaign ideas, and posting plans
4. Adapts by industry automatically
5. Improves over time based on results, user edits, and performance feedback
6. Feels "self-learning" and "self-revolving" inside the workflow

## System Philosophy

The engine always pulls from these layers:
- Business identity
- Offer and positioning
- Customer intent
- Growth goals
- SEO opportunities
- Content opportunities
- Industry-specific modifiers
- Platform-specific delivery
- Performance feedback
- Regeneration memory

**The pipeline:** Report in → Strategy extracted → Content system generated → Assets posted → Performance measured → Future outputs improved

---

## Module 01: Report Intake

```pseudocode
FUNCTION ingest_report(report_document):
    raw_text = extract_text(report_document)
    sections = segment_report(raw_text)
    extracted_data = {}

    extracted_data.business_name        = find_business_name(sections)
    extracted_data.industry             = find_industry(sections)
    extracted_data.sub_industry         = find_sub_industry(sections)
    extracted_data.target_audience      = find_target_audience(sections)
    extracted_data.growth_plans         = find_growth_plans(sections)
    extracted_data.services             = find_services(sections)
    extracted_data.products             = find_products(sections)
    extracted_data.brand_positioning    = find_positioning(sections)
    extracted_data.usp                  = find_unique_value(sections)
    extracted_data.seo_keywords         = find_keywords(sections)
    extracted_data.seo_topics           = find_topic_clusters(sections)
    extracted_data.hashtags             = find_hashtags(sections)
    extracted_data.content_recommendations = find_content_recommendations(sections)
    extracted_data.competitor_notes     = find_competitor_insights(sections)
    extracted_data.customer_pain_points = find_pain_points(sections)
    extracted_data.customer_goals       = find_customer_goals(sections)
    extracted_data.platform_recommendations = find_platform_recommendations(sections)
    extracted_data.visual_direction     = find_visual_direction(sections)
    extracted_data.cta_suggestions      = find_ctas(sections)
    extracted_data.location_terms       = find_local_terms(sections)
    extracted_data.industry_specific_terms = find_industry_terms(sections)
    extracted_data.compliance_notes     = find_compliance_requirements(sections)

    RETURN extracted_data
```

---

## Module 02: Business Profile Builder

```pseudocode
DATA_MODEL BusinessProfile:
    business_name, brand_name, industry, sub_industry, niche
    location, service_areas, target_audience, audience_segments
    demographics, psychographics, pain_points, desires, objections
    usp, brand_voice, tone_of_voice, visual_style
    product_list, service_list, offer_stack, pricing_position
    trust_signals, founder_story, testimonials, case_studies
    competitors, growth_plans, seasonal_focus, campaign_goals
    compliance_notes, preferred_platforms, posting_frequency
    content_pillars, seo_keywords, seo_topics, local_seo_terms
    hashtags, cta_preferences, report_history, performance_history
    prompt_history, user_edits, learning_flags

FUNCTION build_business_profile(extracted_data, previous_profile):
    profile = merge(previous_profile, extracted_data)
    profile.audience_segments   = derive_audience_segments(profile.target_audience)
    profile.content_pillars     = derive_content_pillars(profile)
    profile.offer_stack         = derive_offer_stack(profile.services, profile.products)
    profile.brand_voice         = infer_brand_voice(profile)
    profile.visual_style        = infer_visual_style(profile)
    profile.growth_stage        = infer_growth_stage(profile.growth_plans)
    profile.search_intent_map   = map_search_intent(profile.seo_keywords, profile.seo_topics)
    profile.customer_journey    = map_customer_journey(profile)
    profile.platform_priorities = rank_platforms(profile.platform_recommendations, profile.preferred_platforms)
    RETURN profile
```

---

## Module 03: A-to-Z Extraction Index

```pseudocode
FUNCTION build_A_to_Z_index(profile, extracted_data):
    A_to_Z = {}
    A_to_Z["audience"]              = profile.target_audience
    A_to_Z["audience_segments"]     = profile.audience_segments
    A_to_Z["brand_name"]            = profile.brand_name
    A_to_Z["business_name"]         = profile.business_name
    A_to_Z["competitor_notes"]      = extracted_data.competitor_notes
    A_to_Z["content_pillars"]       = profile.content_pillars
    A_to_Z["cta_options"]           = extracted_data.cta_suggestions
    A_to_Z["demographic_targets"]   = profile.demographics
    A_to_Z["growth_plans"]          = profile.growth_plans
    A_to_Z["hashtags"]              = extracted_data.hashtags
    A_to_Z["industry"]              = profile.industry
    A_to_Z["industry_terms"]        = extracted_data.industry_specific_terms
    A_to_Z["keyword_clusters"]      = extracted_data.seo_topics
    A_to_Z["keywords"]              = extracted_data.seo_keywords
    A_to_Z["local_terms"]           = extracted_data.location_terms
    A_to_Z["messaging_angles"]      = extract_messaging_angles(extracted_data)
    A_to_Z["niche"]                 = profile.niche
    A_to_Z["objectives"]            = profile.campaign_goals
    A_to_Z["offers"]                = profile.offer_stack
    A_to_Z["pain_points"]           = extracted_data.customer_pain_points
    A_to_Z["platforms"]             = profile.platform_priorities
    A_to_Z["products"]              = profile.product_list
    A_to_Z["promotional_angles"]    = extract_promotional_angles(extracted_data)
    A_to_Z["report_recommendations"]= extracted_data.content_recommendations
    A_to_Z["search_intent"]         = profile.search_intent_map
    A_to_Z["seasonal_focus"]        = profile.seasonal_focus
    A_to_Z["services"]              = profile.service_list
    A_to_Z["tone"]                  = profile.tone_of_voice
    A_to_Z["trust_signals"]         = profile.trust_signals
    A_to_Z["usp"]                   = profile.usp
    A_to_Z["visual_direction"]      = extracted_data.visual_direction
    RETURN A_to_Z
```

---

## Module 04: Growth Plan Mapping

```pseudocode
FUNCTION map_growth_to_content(profile, A_to_Z):
    IF profile.growth_plans contains "new regions":
        prioritize location_based_keywords
        add local_hashtags
        add trust_building_content_pillars

    IF profile.growth_plans contains "new product launch":
        add product_launch_prompts
        add unboxing_visual_prompts
        add social_proof_content

    IF profile.growth_plans contains "brand awareness":
        add founder_story_prompts
        add community_engagement_prompts
        add educational_content

    ALWAYS preserve:
        profile.business_name
        profile.brand_voice
        profile.growth_objectives
        profile.usp
    RETURN enriched_content_plan
```

---

## Module 05: Industry Modifier Library

```pseudocode
FUNCTION apply_industry_modifiers(profile, base_content_object):
    SWITCH profile.industry:

        CASE "dental":
            add_keywords(["smile", "family dentist", "cosmetic dentistry", "local dental care"])
            add_visual_styles(["clean clinic", "bright smile", "high trust"])
            add_content_angles(["before after", "anxiety reassurance", "oral health education"])

        CASE "real_estate":
            add_keywords(["local market", "open home", "property value", "buy sell invest"])
            add_visual_styles(["luxury interior", "suburban family home", "agent authority"])
            add_content_angles(["market update", "buyer tips", "seller tips", "neighborhood lifestyle"])

        CASE "restaurant":
            add_keywords(["best local food", "signature dishes", "private dining", "weekend specials"])
            add_visual_styles(["warm ambient dining", "chef plating", "close-up food texture"])
            add_content_angles(["menu spotlight", "customer atmosphere", "behind the kitchen"])

        CASE "legal":
            add_keywords(["trusted legal advice", "local lawyer", "case guidance"])
            add_visual_styles(["authority portrait", "modern office", "client consultation"])
            add_content_angles(["myth busting", "explainer content", "trust-building education"])

        CASE "fitness":
            add_keywords(["transformation", "strength", "mobility", "coaching results"])
            add_visual_styles(["dynamic motion", "training floor", "high energy"])
            add_content_angles(["member stories", "trainer authority", "routine breakdown"])

        CASE "medical":
            add_keywords(["trusted healthcare", "patient care", "specialist", "local clinic"])
            add_visual_styles(["clean medical environment", "compassionate care", "expert authority"])
            add_content_angles(["health education", "patient reassurance", "service explainer"])

        CASE "beauty":
            add_keywords(["transformation", "skin care", "beauty tips", "local beauty"])
            add_visual_styles(["soft lighting", "before after", "product close-up", "tutorial setup"])
            add_content_angles(["tutorial", "product reveal", "client transformation", "trend content"])

        CASE "finance":
            add_keywords(["financial advice", "investment", "wealth", "local financial planner"])
            add_visual_styles(["clean professional", "data visualization", "authority portrait"])
            add_content_angles(["myth busting", "educational tips", "market insight", "compliance safe"])
            add_compliance_notes(["general information only", "not financial advice"])

        DEFAULT:
            add_keywords(profile.seo_keywords)
            add_visual_styles(infer_visual_style(profile))
            add_content_angles(profile.content_pillars)

    RETURN base_content_object
```

---

## Module 06: SEO Engine

```pseudocode
FUNCTION enrich_with_SEO_and_hashtags(asset, profile, A_to_Z):
    asset.primary_keyword    = pick_primary_keyword(A_to_Z["keywords"], asset.content_type)
    asset.secondary_keywords = pick_secondary_keywords(A_to_Z["keywords"], asset.content_type)
    asset.topic_cluster      = map_to_topic_cluster(A_to_Z["keyword_clusters"], asset.primary_keyword)
    asset.local_terms        = A_to_Z["local_terms"]
    asset.industry_terms     = A_to_Z["industry_specific_terms"]

    asset.hashtag_groups = {
        "broad":    build_broad_hashtags(profile.industry, profile.niche),
        "niche":    build_niche_hashtags(profile.niche, asset.topic_cluster),
        "local":    build_local_hashtags(profile.location, profile.service_areas),
        "brand":    build_brand_hashtags(profile.business_name, profile.brand_name),
        "campaign": build_campaign_hashtags(profile.campaign_goals)
    }

    asset.recommended_hashtag_mix = mix_hashtags(
        broad=5, niche=8, local=5, brand=3, campaign=4
    )
    RETURN asset
```

---

## Module 07: Hashtag Engine

```pseudocode
FUNCTION build_hashtag_strategy(profile, content_type, platform):

    broad_tags    = generate_industry_broad_tags(profile.industry)       // 1M-10M posts
    niche_tags    = generate_niche_specific_tags(profile.niche)          // 100K-1M posts
    local_tags    = generate_local_discovery_tags(profile.city, profile.state) // 10K-500K
    brand_tags    = generate_brand_owned_tags(profile.brand_name)        // <10K
    campaign_tags = generate_campaign_tags(profile.active_campaign)      // custom

    platform_limits = {
        instagram: 30, tiktok: 8, facebook: 5,
        linkedin: 5, twitter: 3, youtube: 15,
        threads: 5, pinterest: 20
    }

    mix = smart_mix(broad_tags, niche_tags, local_tags, brand_tags, campaign_tags,
                    limit=platform_limits[platform])
    RETURN mix
```

---

## Module 08: Content Pillar Generator

```pseudocode
FUNCTION derive_content_pillars(profile):
    pillars = []

    // Universal pillars
    pillars.append("Educational — teach audience about [INDUSTRY] topics")
    pillars.append("Trust & Social Proof — testimonials, results, credentials")
    pillars.append("Behind the Scenes — authentic process and culture content")
    pillars.append("Promotional — offers, products, services with CTA")
    pillars.append("Community — local connection, shared values, engagement")

    // Industry-specific additions
    IF profile.industry == "real_estate":
        pillars.append("Market Updates — suburb trends, price data, buying tips")
        pillars.append("Property Showcase — listing reveals, virtual tours")

    IF profile.industry == "fitness":
        pillars.append("Transformation Stories — client results and journeys")
        pillars.append("Tips & Techniques — workout breakdowns, nutrition advice")

    IF profile.growth_stage == "awareness":
        prioritize(pillars, ["Educational", "Community", "Behind the Scenes"])

    IF profile.growth_stage == "conversion":
        prioritize(pillars, ["Promotional", "Trust & Social Proof"])

    RETURN pillars
```

---

## Module 09: Prompt Library Generator

```pseudocode
FUNCTION build_prompt_library(profile, strategy, A_to_Z):
    library = []

    FOR each content_bucket IN strategy.content_buckets:
        prompt = {
            business_name:   profile.business_name,
            industry:        profile.industry,
            target_audience: profile.target_audience,
            offer_stack:     profile.offer_stack,
            growth_plans:    profile.growth_plans,
            keywords:        select_relevant_keywords(A_to_Z, content_bucket),
            hashtags:        select_relevant_hashtags(A_to_Z, content_bucket),
            visual_style:    profile.visual_style,
            tone:            profile.tone_of_voice,
            cta:             select_best_cta(profile, content_bucket)
        }
        prompt = apply_industry_modifiers(profile, prompt)
        library.append(prompt)

    RETURN library
```

---

## Module 10: Content Generator

```pseudocode
FUNCTION generate_content_assets(profile, prompt_library):
    assets = []

    FOR prompt IN prompt_library:
        asset = {
            content_type:       determine_content_type(prompt),
            title:              generate_title(prompt),
            hook:               generate_hook(prompt),
            caption_short:      generate_short_caption(prompt),
            caption_long:       generate_long_caption(prompt),
            image_prompt:       generate_image_prompt(prompt),
            video_prompt:       generate_video_prompt(prompt),
            blog_outline:       generate_blog_outline(prompt),
            seo_meta_title:     generate_meta_title(prompt),
            seo_meta_description: generate_meta_description(prompt),
            keyword_targets:    prompt.keywords,
            hashtag_set:        prompt.hashtags,
            cta:                prompt.cta,
            platform_versions:  generate_platform_versions(asset, profile.platform_priorities)
        }
        assets.append(asset)

    RETURN assets
```

---

## Module 11: Posting Packages

```pseudocode
FUNCTION prepare_posting_package(asset, platform):
    package = {
        platform:       platform,
        caption:        adapt_caption_for_platform(asset.caption, platform),
        hashtags:       adapt_hashtags_for_platform(asset.hashtag_set, platform),
        image_prompt:   asset.image_prompt,
        video_prompt:   asset.video_prompt,
        cta:            adapt_cta_for_platform(asset.cta, platform),
        alt_text:       generate_alt_text(asset),
        link_strategy:  generate_link_strategy(platform, asset),
        posting_time:   recommend_posting_time(platform, asset.target_audience),
        tracking_tags:  generate_tracking_tags(asset, platform)
    }
    RETURN package
```

---

## Module 12: Performance Tracking

```pseudocode
FUNCTION track_performance(published_asset, platform_metrics):
    record = {
        asset_id:         published_asset.id,
        platform:         published_asset.platform,
        impressions:      platform_metrics.impressions,
        reach:            platform_metrics.reach,
        engagement_rate:  platform_metrics.engagements / platform_metrics.reach,
        clicks:           platform_metrics.link_clicks,
        saves:            platform_metrics.saves,
        shares:           platform_metrics.shares,
        hook_retention:   platform_metrics.watch_time_pct,  // video only
        posted_at:        published_asset.posted_at,
        content_pillar:   published_asset.pillar,
        industry:         published_asset.industry,
        hashtags_used:    published_asset.hashtags
    }

    score = calculate_performance_score(record)
    record.performance_score = score

    update_learning_memory(record)
    RETURN record
```

---

## Module 13: Self-Learning Memory

```pseudocode
DATA_MODEL LearningMemory:
    top_performing_hooks          // refreshed by engagement data
    top_performing_ctas           // refreshed by click/conversion data
    top_performing_visual_styles  // refreshed by save/share data
    top_performing_topics         // refreshed by reach data
    top_performing_keywords       // refreshed by SEO performance
    top_performing_hashtags       // refreshed by discovery data
    low_performing_patterns       // updated on poor engagement
    user_preferred_tone           // inferred from edits
    user_preferred_caption_length // inferred from edits
    user_preferred_visual_style   // inferred from kept/deleted assets
    user_rejected_outputs         // stored from delete/regenerate actions
    regeneration_patterns         // what triggers regeneration
    approval_history              // what gets approved vs revised
    industry_learnings            // niche-specific wins
    seasonal_learnings            // time-of-year performance patterns
    audience_learnings            // demographic response patterns

FUNCTION update_learning_memory(memory, new_results):
    memory.top_performing_hooks         = refresh_top_items(memory.top_performing_hooks, new_results.hooks)
    memory.top_performing_ctas          = refresh_top_items(memory.top_performing_ctas, new_results.ctas)
    memory.top_performing_visual_styles = refresh_top_items(memory.top_performing_visual_styles, new_results.visuals)
    memory.top_performing_topics        = refresh_top_items(memory.top_performing_topics, new_results.topics)
    memory.top_performing_keywords      = refresh_top_items(memory.top_performing_keywords, new_results.keywords)
    memory.top_performing_hashtags      = refresh_top_items(memory.top_performing_hashtags, new_results.hashtags)
    memory.low_performing_patterns      = refresh_low_items(memory.low_performing_patterns, new_results.failures)
    memory.user_preferred_tone          = infer_preference(new_results.user_edits, "tone")
    memory.user_preferred_caption_length = infer_preference(new_results.user_edits, "caption_length")
    memory.user_preferred_visual_style  = infer_preference(new_results.user_edits, "visual_style")
    memory.regeneration_patterns        = track_regeneration_behavior(new_results.regenerations)
    RETURN memory
```

---

## Module 14: Regeneration Engine

```pseudocode
FUNCTION regenerate_content(profile, memory, requested_output_type):
    prior_outputs    = get_prior_outputs(profile.business_name, requested_output_type)
    winning_patterns = get_winning_patterns(memory)
    rejected_patterns = get_rejected_patterns(memory)

    new_output = generate_new_variant(
        based_on = winning_patterns,
        avoid    = rejected_patterns + prior_outputs,
        preserve = [
            profile.business_name,
            profile.industry,
            profile.growth_plans,
            profile.usp,
            profile.target_audience
        ],
        vary = [
            "hook",
            "opening angle",
            "visual framing",
            "caption structure",
            "cta",
            "seo phrasing",
            "hashtag grouping"
        ]
    )
    RETURN new_output
```

---

## Module 15: Action Path Builder

```pseudocode
FUNCTION build_action_path(profile, strategy, assets):
    path = [
        "Step 01: Confirm business identity and growth direction",
        "Step 02: Review report insights extracted A-to-Z",
        "Step 03: Select priority campaign objective",
        "Step 04: Select content pillar",
        "Step 05: Select platform",
        "Step 06: Pull matching SEO keywords and hashtags",
        "Step 07: Generate content prompt variations",
        "Step 08: Create asset versions (text / image / video)",
        "Step 09: Review, edit, and approve content",
        "Step 10: Publish or schedule to platforms",
        "Step 11: Collect performance signals",
        "Step 12: Update learning memory",
        "Step 13: Regenerate improved versions"
    ]
    RETURN path
```

---

## Master System Rules (Enforced Always)

```
RULES:
  ✅ Always save business-specific context
  ✅ Always save accepted outputs to memory
  ✅ Always save rejected outputs to memory
  ✅ Always track regenerated versions
  ✅ Always connect content back to report insights
  ✅ Always offer keyword and hashtag enrichment
  ✅ Always adapt by industry automatically
  ✅ Always preserve business name and goals
  ✅ Always align content to growth plans
  ✅ Always vary future outputs without drifting off-brand
  ✅ Always enforce plan limits per account tier
  ✅ Always deduct credits before generation

  ❌ Never repeat identical outputs unless explicitly requested
  ❌ Never ignore SEO recommendations in the report
  ❌ Never ignore platform-specific formatting differences
  ❌ Never treat all industries the same
  ❌ Never generate without checking plan limits first
  ❌ Never store sensitive media in GitHub (use object storage)
```

---

## Full End-to-End Flow

```pseudocode
FUNCTION run_marketing_content_engine(report_document, previous_profile, previous_memory):
    extracted_data  = ingest_report(report_document)
    profile         = build_business_profile(extracted_data, previous_profile)
    A_to_Z          = build_A_to_Z_index(profile, extracted_data)
    strategy        = generate_content_strategy(profile, A_to_Z)
    prompt_library  = build_prompt_library(profile, strategy, A_to_Z)
    raw_assets      = generate_content_assets(profile, prompt_library)

    enriched_assets = []
    FOR asset IN raw_assets:
        asset = enrich_with_SEO_and_hashtags(asset, profile, A_to_Z)
        asset = apply_industry_modifiers(profile, asset)
        enriched_assets.append(asset)

    action_path    = build_action_path(profile, strategy, enriched_assets)
    option_branches = build_option_branches(enriched_assets, A_to_Z)

    RETURN {
        business_profile:          profile,
        A_to_Z_index:              A_to_Z,
        strategy:                  strategy,
        prompt_library:            prompt_library,
        assets:                    enriched_assets,
        action_path:               action_path,
        option_branches:           option_branches,
        regeneration_ready_memory: previous_memory
    }

LEARNING_LOOP:
    on_publish_results  -> collect_metrics -> update_learning_memory
    on_user_edit        -> save_preference -> update_learning_memory
    on_regenerate       -> avoid_duplicates -> generate_better_variant
    on_success          -> reinforce_patterns -> weight_up
    on_failure          -> reduce_pattern_weight -> weight_down
    repeat_forever
```

---

## Scoring Engine

```pseudocode
FUNCTION score_content_opportunity(opportunity, profile, memory):
    score = 0
    IF opportunity.matches_growth_plan:           score += 30
    IF opportunity.matches_high_intent_keyword:   score += 20
    IF opportunity.matches_top_performing_topic(memory): score += 15
    IF opportunity.matches_platform_preference(profile): score += 10
    IF opportunity.supports_conversion_goal:      score += 15
    IF opportunity.reuses_successful_visual_style(memory): score += 10
    RETURN score  // max 100
```

---

*This document is stored in /docs/SELF-LEARNING-ENGINE.md*
*Admin-only write access. Version controlled via Git.*
*Implements: Self-Learning Marketing Reporting System v1.0.0*
