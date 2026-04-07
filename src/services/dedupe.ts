// ============================================================
// Deduplication Service — Prompt fingerprinting and similarity
// ============================================================

// ---- Normalize a prompt text -------------------------------

export function normalizePrompt(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s]/g, '') // strip punctuation
    .replace(/\b(a|an|the|and|or|but|in|on|at|to|for|of|with|by)\b/g, '') // strip stop words
    .trim()
}

// ---- Create a fingerprint hash ----------------------------

export async function fingerprintPrompt(text: string): Promise<string> {
  const normalized = normalizePrompt(text)
  const encoder = new TextEncoder()
  const data = encoder.encode(normalized)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// ---- Cosine similarity between two vectors ----------------

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0

  let dotProduct = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i]
    normA += vecA[i] ** 2
    normB += vecB[i] ** 2
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB)
  return denominator === 0 ? 0 : dotProduct / denominator
}

// ---- Check for duplicate prompts in DB --------------------

export async function isDuplicate(
  db: D1Database,
  accountId: string,
  fingerprint: string,
  embedding: number[],
  similarityThreshold = 0.90
): Promise<{ isDuplicate: boolean; matchedId?: string; similarity?: number }> {
  // First check exact fingerprint match
  const exactMatch = await db
    .prepare('SELECT id FROM prompts WHERE account_id = ? AND fingerprint = ?')
    .bind(accountId, fingerprint)
    .first<{ id: string }>()

  if (exactMatch) {
    return { isDuplicate: true, matchedId: exactMatch.id, similarity: 1.0 }
  }

  // Then check semantic similarity against recent prompts
  const recentPrompts = await db
    .prepare(
      'SELECT id, embedding FROM prompts WHERE account_id = ? AND embedding IS NOT NULL ORDER BY created_at DESC LIMIT 50'
    )
    .bind(accountId)
    .all<{ id: string; embedding: string }>()

  for (const prompt of recentPrompts.results) {
    if (!prompt.embedding) continue
    let storedEmbedding: number[]
    try {
      storedEmbedding = JSON.parse(prompt.embedding) as number[]
    } catch {
      continue
    }
    const similarity = cosineSimilarity(embedding, storedEmbedding)
    if (similarity >= similarityThreshold) {
      return { isDuplicate: true, matchedId: prompt.id, similarity }
    }
  }

  return { isDuplicate: false }
}

// ---- Build variation instruction to break similarity ------

export function buildVariationInstruction(basePrompt: string): string {
  const variationInstructions = [
    'Use a completely different opening hook — do not start with the same word or phrase.',
    'Change the emotional angle: if the original used inspiration, use education or humour instead.',
    'Use a different format: if the original was a tip, make this a story or question.',
    'Target a different audience segment with the same core message.',
    'Use a different CTA style: if the original had a direct CTA, use a soft engagement prompt instead.',
  ]

  const randomInstruction = variationInstructions[Math.floor(Math.random() * variationInstructions.length)]
  return `${basePrompt}\n\nIMPORTANT VARIATION RULE: ${randomInstruction} Ensure this output is structurally and tonally distinct from previous outputs.`
}

// ---- Save a prompt with fingerprint + embedding -----------

export async function savePrompt(
  db: D1Database,
  accountId: string,
  opts: {
    type: string
    input_text: string
    output_text: string
    fingerprint: string
    embedding?: number[]
    platform?: string
    pillar?: string
    credits_used?: number
  }
): Promise<string> {
  const id = crypto.randomUUID()

  await db.prepare(
    'INSERT INTO prompts (id, account_id, type, input_text, output_text, fingerprint, embedding, platform, pillar, credits_used) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(
    id,
    accountId,
    opts.type,
    opts.input_text,
    opts.output_text,
    opts.fingerprint,
    opts.embedding ? JSON.stringify(opts.embedding) : null,
    opts.platform ?? null,
    opts.pillar ?? null,
    opts.credits_used ?? 0
  ).run()

  return id
}

// ---- Get embedding from OpenAI ----------------------------

export async function getEmbedding(
  openaiKey: string,
  text: string
): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text.slice(0, 8000), // truncate to token limit
    }),
  })

  if (!response.ok) {
    throw new Error(`Embedding API error: ${response.status}`)
  }

  const data = await response.json() as { data: Array<{ embedding: number[] }> }
  return data.data[0].embedding
}
