/**
 * Firestore Seed Script — Prompt Library
 * Generated: 2026-04-19
 *
 * Seeds all 47 unique prompts from master-prompts.json into the Firestore
 * `prompts` collection (or a sub-collection of your choosing).
 *
 * Usage:
 *   node data/prompts/seeds/firestore-seed-prompts-2026-04-19.js
 *
 * Prerequisites:
 *   npm install firebase-admin dotenv
 *   Set GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_SERVICE_ACCOUNT_KEY in .env
 *
 * Options (set via env vars):
 *   COLLECTION_NAME  - Firestore collection name (default: "prompts")
 *   DRY_RUN          - Set to "true" to log writes without executing (default: false)
 *   OVERWRITE        - Set to "true" to overwrite existing documents (default: false)
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { config } from 'dotenv';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const COLLECTION_NAME = process.env.COLLECTION_NAME || 'prompts';
const DRY_RUN = process.env.DRY_RUN === 'true';
const OVERWRITE = process.env.OVERWRITE === 'true';

// ---------------------------------------------------------------------------
// Firebase Admin initialisation
// ---------------------------------------------------------------------------
let db;

async function initFirebase() {
  const admin = (await import('firebase-admin')).default;

  if (admin.apps.length > 0) {
    db = admin.firestore();
    return;
  }

  // Support both service account key file path and inline JSON
  const credentialPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const credentialJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (credentialJson) {
    const serviceAccount = JSON.parse(credentialJson);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else if (credentialPath) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  } else {
    throw new Error(
      'Firebase credentials not found. Set GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_SERVICE_ACCOUNT_KEY in your environment.'
    );
  }

  db = admin.firestore();
}

// ---------------------------------------------------------------------------
// Load master prompts
// ---------------------------------------------------------------------------
function loadMasterPrompts() {
  const masterPath = resolve(__dirname, '../master-prompts.json');
  const raw = readFileSync(masterPath, 'utf-8');
  const data = JSON.parse(raw);
  return data.prompts;
}

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------
async function seedPrompts() {
  const prompts = loadMasterPrompts();

  console.log(`\n📚 Social Strategy — Prompt Library Seed Script`);
  console.log(`   Date:       2026-04-19`);
  console.log(`   Collection: ${COLLECTION_NAME}`);
  console.log(`   Prompts:    ${prompts.length}`);
  console.log(`   Dry run:    ${DRY_RUN}`);
  console.log(`   Overwrite:  ${OVERWRITE}`);
  console.log('');

  if (DRY_RUN) {
    console.log('🔍 DRY RUN — No writes will be made to Firestore.\n');
  }

  await initFirebase();

  const collection = db.collection(COLLECTION_NAME);
  const batch = db.batch();
  let batchCount = 0;
  const MAX_BATCH_SIZE = 500;

  let written = 0;
  let skipped = 0;
  let errors = 0;

  for (const prompt of prompts) {
    const docRef = collection.doc(prompt.id);

    try {
      if (!OVERWRITE && !DRY_RUN) {
        const existing = await docRef.get();
        if (existing.exists) {
          console.log(`  ⏭  Skipping ${prompt.id} — already exists (use OVERWRITE=true to replace)`);
          skipped++;
          continue;
        }
      }

      const docData = {
        id: prompt.id,
        title: prompt.title,
        prompt_text: prompt.prompt_text,
        tags: prompt.tags,
        industry: prompt.industry,
        example_use_case: prompt.example_use_case,
        source: prompt.source,
        created_at: prompt.created_at,
        seeded_at: new Date().toISOString(),
        version: '1.0.0',
      };

      if (DRY_RUN) {
        console.log(`  ✓  [DRY RUN] Would write ${prompt.id}: "${prompt.title}" → ${COLLECTION_NAME}/${prompt.id}`);
        written++;
        continue;
      }

      batch.set(docRef, docData, { merge: OVERWRITE });
      batchCount++;
      written++;

      console.log(`  ✓  Queued ${prompt.id}: "${prompt.title}"`);

      // Commit batch if at max size
      if (batchCount >= MAX_BATCH_SIZE) {
        await batch.commit();
        console.log(`\n  💾 Committed batch of ${batchCount} documents.\n`);
        batchCount = 0;
      }
    } catch (err) {
      console.error(`  ✗  Error processing ${prompt.id}: ${err.message}`);
      errors++;
    }
  }

  // Commit remaining batch
  if (!DRY_RUN && batchCount > 0) {
    await batch.commit();
    console.log(`\n  💾 Committed final batch of ${batchCount} documents.`);
  }

  console.log('\n' + '─'.repeat(50));
  console.log('Seed complete:');
  console.log(`  ✅ Written:  ${written}`);
  console.log(`  ⏭  Skipped:  ${skipped}`);
  console.log(`  ❌ Errors:   ${errors}`);
  console.log('─'.repeat(50) + '\n');

  if (errors > 0) {
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// Entrypoint
// ---------------------------------------------------------------------------
seedPrompts().catch((err) => {
  console.error('\n❌ Seed script failed:', err.message);
  process.exit(1);
});
