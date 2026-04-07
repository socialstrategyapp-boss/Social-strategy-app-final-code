# Credit & Pricing Model

## Overview

1 credit ≈ AUD $0.10–$0.20. All AI jobs consume credits from the account wallet before execution. Credits are pre-reserved, then settled on completion or refunded on failure.

---

## Exchange Rates & Margins

| Parameter | Value |
|---|---|
| USD → AUD conversion | 1 USD = 1.445 AUD |
| Margin multiplier | 3.0× |
| Minimum job charge | 25 tokens (ceil rounding) |

---

## OpenAI Model Costs (USD per million tokens)

| Model | Input | Output |
|---|---|---|
| GPT-5.4 | $2.50 | $15.00 |
| GPT-5.4-mini | $0.30 | $1.20 |
| GPT-4o-mini | $0.15 | $0.60 |
| DALL-E 3 (per image) | $0.04–$0.12 | — |
| TTS (per 1M chars) | $15.00 | — |
| Transcription (per min) | $0.006 | — |

---

## Video Generation Costs (USD per second)

| Resolution | Cost/sec | AUD/sec (×1.445) | AUD margin (×3) |
|---|---|---|---|
| 480p | $0.10 | $0.145 | $0.43 |
| 720p | $0.20 | $0.289 | $0.87 |
| 1080p | $0.40 | $0.578 | $1.73 |
| 4K | $0.70 | $1.012 | $3.03 |

### Video Credit Estimates (AUD at margin)

| Duration | 720p | 1080p |
|---|---|---|
| 5 sec | $4.35 | $8.65 |
| 10 sec | $8.70 | $17.30 |
| 20 sec | $17.40 | $34.60 |
| 30 sec | $26.10 | $51.90 |
| 60 sec | $52.20 | $103.80 |

---

## App Token Charges (credits per action)

### Text Generation
| Action | Credits |
|---|---|
| Short caption (1 platform) | 8 |
| Long caption + CTA + hashtags | 15 |
| SEO meta description | 10 |
| Hashtag pack | 6 |
| Blog draft | 30 |
| Video script | 20 |
| Full marketing report | 120 |
| Report summary | 20 |

### Image Generation
| Action | Credits |
|---|---|
| 1 image (standard) | 25 |
| 1 image (HD) | 50 |
| 2–3 images | 60 |
| 4–5 images | 100 |
| Image edit / variation | 10 |
| Character consistency image | 15 |

### Video Generation
| Action | Credits |
|---|---|
| 5-sec video (720p) | 350 |
| 10-sec video (720p) | 700 |
| 20-sec video (720p) | 1400 |
| 5-sec video (1080p) | 700 |

### Scheduling & Publishing
| Action | Credits |
|---|---|
| Publish 1 post (1 platform) | 2 |
| Publish 1 post (8 platforms) | 8 |
| Schedule 1 day | 18 |
| Schedule 1 week | 60 |
| Schedule 1 month | 180 |
| Repost | 1–4 |

### Audio / TTS
| Action | Credits |
|---|---|
| TTS voiceover 30 sec | 60 |
| TTS voiceover 60 sec | 120 |
| Audio transcription (per min) | 5 |

---

## Subscription Plans

| Plan | Monthly Credits | Cost (AUD) | Platforms | Posts/Day | Trial |
|---|---|---|---|---|---|
| Free | 80 | $0 | 2 | 2/week | No |
| Business | 900 | $79 | 8 | 1 | 14 days (300 trial credits) |
| Pro | 3,500 | $199 | 8 | 5 | 14 days (500 trial credits) |
| Enterprise | Custom | $699+ | Unlimited | 99 | No |

---

## One-Off Credit Packs (AUD)

| Pack | Credits | Price |
|---|---|---|
| Starter | 250 | $59 |
| Growth | 1,000 | $159 |
| Scale | 5,000 | $449 |
| Agency | 20,000 | $1,499 |

---

## Entitlement Matrix

| Feature | Free | Business | Pro | Enterprise |
|---|---|---|---|---|
| Text generation | ✅ | ✅ | ✅ | ✅ |
| Image generation | ❌ | ✅ | ✅ | ✅ |
| Video generation | ❌ | ❌ | ✅ | ✅ |
| Analytics reports | Basic | Standard | Advanced | Custom |
| Social platforms | 2 | 8 | 8 | Unlimited |
| Team seats | 1 | 3 | 10 | Custom |
| API access | ❌ | ❌ | ✅ | ✅ |
| Audit logs | ❌ | ❌ | ❌ | ✅ |
| White-label | ❌ | ❌ | ❌ | ✅ |

---

## Metering Flow

```
Job Request
  → reserve_tokens(job_id, cost)   // deduct from wallet, mark RESERVED
  → execute_ai_call()
  → if success: settle_success(job_id)   // mark SETTLED
  → if failure: settle_failure(job_id)   // refund RESERVED tokens
```

---

## Refund Matrix

| Reason | Refund % |
|---|---|
| Provider error / API failure | 100% |
| Poor AI quality (user reported) | 50% |
| Moderation rejection | 100% |
| User changed mind (within 1 hour) | 50% |
| Duplicate generation | 100% |
| Goodwill / support resolution | Admin discretion |
| Scheduled post failed to publish | 100% |

---

## Anti-Repetition Memory

Each generated output stores a normalized embedding. On new generation:
1. Normalize prompt → embedding vector
2. Fingerprint hash stored in `prompts` table
3. Compare cosine similarity against last 50 outputs
4. If similarity > 0.90: reject, re-generate with variation instruction
5. Variation instruction appended: "Use a completely different hook, emotional angle, and format from previous outputs."
