# UI Scaffold — Character Create + Report Pages
# SAVE ONLY — Reference for when building these pages
# These are the exact structures provided by the product owner

---

## CHARACTER CREATE PAGE SCAFFOLD

### Page: /app/create/character/page.tsx
```tsx
"use client";
import { useState } from "react";
import { CharacterSetupCard } from "@/components/character/CharacterSetupCard";
import { CharacterReferenceUpload } from "@/components/character/CharacterReferenceUpload";
import { CharacterVoiceCard } from "@/components/character/CharacterVoiceCard";
import { CharacterPreviewCard } from "@/components/character/CharacterPreviewCard";
import { CharacterActionsCard } from "@/components/character/CharacterActionsCard";

export default function CharacterCreatePage() {
  const [character, setCharacter] = useState<any>(null);
  const [uploadImageIds, setUploadImageIds] = useState<string[]>([]);
  const [uploadFileIds, setUploadFileIds] = useState<string[]>([]);

  return (
    <main className="min-h-screen bg-black text-white p-4 space-y-4">
      <section className="rounded-3xl border border-cyan-500/20 bg-slate-950 p-5">
        <h1 className="text-2xl font-bold">Character Create</h1>
        <p className="text-slate-300 text-sm">
          Build a reusable brand character once, then use it across content, videos, campaigns, and posting schedules.
        </p>
      </section>

      <CharacterSetupCard
        onCharacterBuilt={setCharacter}
        uploadImageIds={uploadImageIds}
        uploadFileIds={uploadFileIds}
      />
      <CharacterReferenceUpload
        onImageUploaded={(id) => setUploadImageIds((prev) => [...prev, id])}
        onFileUploaded={(id) => setUploadFileIds((prev) => [...prev, id])}
      />
      <CharacterVoiceCard character={character} onCharacterChanged={setCharacter} />
      <CharacterPreviewCard character={character} />
      <CharacterActionsCard character={character} />
    </main>
  );
}
```

### Component: CharacterSetupCard
```tsx
"use client";
import { useState } from "react";

export function CharacterSetupCard({ onCharacterBuilt, uploadImageIds, uploadFileIds }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Founder");
  const [personality, setPersonality] = useState("Friendly, confident, knowledgeable");
  const [style, setStyle] = useState("Modern, clean, premium");
  const [tone, setTone] = useState("Professional but warm");
  const [note, setNote] = useState("");

  async function buildCharacter() {
    const res = await fetch("/api/characters/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role, personality, style, tone, note, uploadImageIds, uploadFileIds })
    });
    const data = await res.json();
    onCharacterBuilt(data.character);
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
      <h2 className="text-xl font-semibold">Character Setup</h2>
      <div className="grid md:grid-cols-2 gap-3 mt-4">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Character name" className="bg-slate-900 rounded-xl p-3" />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="bg-slate-900 rounded-xl p-3">
          <option>Founder</option>
          <option>Brand Ambassador</option>
          <option>Store Staff</option>
          <option>Sales Rep</option>
          <option>Creator</option>
          <option>Custom</option>
        </select>
        <input value={personality} onChange={(e) => setPersonality(e.target.value)} placeholder="Personality" className="bg-slate-900 rounded-xl p-3" />
        <input value={style} onChange={(e) => setStyle(e.target.value)} placeholder="Visual style" className="bg-slate-900 rounded-xl p-3" />
        <input value={tone} onChange={(e) => setTone(e.target.value)} placeholder="Voice and tone" className="bg-slate-900 rounded-xl p-3" />
      </div>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional note, e.g. make them feel like a polished local expert" className="w-full mt-4 rounded-xl bg-slate-900 p-3 min-h-[100px]" />
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-xl px-4 py-2 bg-cyan-600" onClick={buildCharacter}>Create Character</button>
        <button className="rounded-xl px-4 py-2 bg-slate-800">Improve With AI</button>
      </div>
    </section>
  );
}
```

### Component: CharacterReferenceUpload
```tsx
import { UploadDropzone } from "@/components/UploadDropzone";

export function CharacterReferenceUpload({ onImageUploaded, onFileUploaded }) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
      <h2 className="text-xl font-semibold">Reference Uploads</h2>
      <p className="text-sm text-slate-400 mt-1">Upload an image, headshot, brand guide, voice brief, or reference file.</p>
      <div className="grid md:grid-cols-2 gap-3 mt-4">
        <UploadDropzone label="Upload character image" accept="image/*" endpoint="/api/assets/upload-image" onUploaded={onImageUploaded} />
        <UploadDropzone label="Upload reference file" accept=".pdf,.doc,.docx,.txt,.csv,.json" endpoint="/api/assets/upload-file" onUploaded={onFileUploaded} />
      </div>
    </section>
  );
}
```

### Component: CharacterVoiceCard
```tsx
"use client";

export function CharacterVoiceCard({ character, onCharacterChanged }) {
  if (!character) return null;

  async function guidedEdit(editType: string) {
    const res = await fetch(`/api/characters/${character.id}/guided-edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ editType })
    });
    const data = await res.json();
    onCharacterChanged(data.character);
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
      <h2 className="text-xl font-semibold">Voice & Brand Fit</h2>
      <div className="mt-4 rounded-2xl bg-slate-900 p-4">
        <div><strong>Name:</strong> {character.name}</div>
        <div><strong>Role:</strong> {character.role}</div>
        <div><strong>Personality:</strong> {character.personality}</div>
        <div><strong>Tone:</strong> {character.tone}</div>
        <div><strong>Style:</strong> {character.style}</div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-full px-3 py-2 bg-slate-800" onClick={() => guidedEdit("more_premium")}>More Premium</button>
        <button className="rounded-full px-3 py-2 bg-slate-800" onClick={() => guidedEdit("more_local")}>More Local</button>
        <button className="rounded-full px-3 py-2 bg-slate-800" onClick={() => guidedEdit("friendlier")}>Friendlier</button>
        <button className="rounded-full px-3 py-2 bg-slate-800" onClick={() => guidedEdit("more_confident")}>More Confident</button>
      </div>
    </section>
  );
}
```

### Component: CharacterPreviewCard
```tsx
export function CharacterPreviewCard({ character }) {
  if (!character) return null;
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
      <h2 className="text-xl font-semibold">Character Preview</h2>
      <div className="mt-4 grid md:grid-cols-[220px_1fr] gap-4">
        <div className="rounded-2xl bg-slate-900 min-h-[220px] flex items-center justify-center text-slate-400">Preview image here</div>
        <div className="rounded-2xl bg-slate-900 p-4">
          <p className="text-sm text-slate-300 whitespace-pre-wrap">{character.previewText || "Character summary preview appears here."}</p>
        </div>
      </div>
    </section>
  );
}
```

### Component: CharacterActionsCard
```tsx
export function CharacterActionsCard({ character }) {
  if (!character) return null;
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
      <h2 className="text-xl font-semibold">Save & Use</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-xl px-4 py-2 bg-cyan-600">Save Character</button>
        <button className="rounded-xl px-4 py-2 bg-slate-800">Lock Character</button>
        <button className="rounded-xl px-4 py-2 bg-slate-800">Use In Campaign</button>
        <button className="rounded-xl px-4 py-2 bg-slate-800">Use In Create Studio</button>
      </div>
    </section>
  );
}
```

---

## REPORT PAGE SCAFFOLD

### Page: /app/report/page.tsx
```tsx
"use client";
import { useEffect, useState } from "react";
import { ReportHeroCard } from "@/components/report/ReportHeroCard";
import { ReportSnapshotCard } from "@/components/report/ReportSnapshotCard";
import { ReportInsightsCard } from "@/components/report/ReportInsightsCard";
import { ReportActionsCard } from "@/components/report/ReportActionsCard";

export default function ReportPage() {
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    async function loadReport() {
      const res = await fetch("/api/reports/latest");
      const data = await res.json();
      setReport(data.report);
    }
    loadReport();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-4 space-y-4">
      <ReportHeroCard report={report} />
      <ReportSnapshotCard report={report} />
      <ReportInsightsCard report={report} />
      <ReportActionsCard report={report} />
    </main>
  );
}
```

### Component: ReportHeroCard
```tsx
export function ReportHeroCard({ report }) {
  if (!report) return <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5">Loading report...</section>;

  return (
    <section className="rounded-3xl border border-cyan-500/20 bg-slate-950 p-5">
      <h1 className="text-2xl font-bold">Your Business Report</h1>
      <p className="text-slate-300 mt-1">Auto-generated from your business profile and website analysis.</p>
      <div className="mt-4 rounded-2xl bg-slate-900 p-4">
        <div className="text-lg font-semibold">{report.title}</div>
        <div className="text-slate-400 text-sm mt-1">{report.business_name}</div>
        <div className="text-slate-400 text-sm">{report.website_url}</div>
      </div>
      <div className="mt-4 text-slate-300">{report.summary || "Your business summary appears here."}</div>
    </section>
  );
}
```

### Component: ReportSnapshotCard
```tsx
export function ReportSnapshotCard({ report }) {
  if (!report) return null;
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
      <h2 className="text-xl font-semibold">Business Snapshot</h2>
      <div className="grid md:grid-cols-2 gap-3 mt-4">
        <div className="rounded-2xl bg-slate-900 p-4">
          <div className="text-slate-400 text-sm">Branding</div>
          <div className="mt-2">{report.branding_summary || "Branding summary here"}</div>
        </div>
        <div className="rounded-2xl bg-slate-900 p-4">
          <div className="text-slate-400 text-sm">SEO</div>
          <div className="mt-2">{report.seo_summary || "SEO summary here"}</div>
        </div>
        <div className="rounded-2xl bg-slate-900 p-4">
          <div className="text-slate-400 text-sm">Content Pillars</div>
          <div className="mt-2">{(report.content_pillars || []).join(", ")}</div>
        </div>
        <div className="rounded-2xl bg-slate-900 p-4">
          <div className="text-slate-400 text-sm">Growth Angle</div>
          <div className="mt-2">{report.growth_angle || "Growth opportunity summary here"}</div>
        </div>
      </div>
    </section>
  );
}
```

### Component: ReportInsightsCard
```tsx
export function ReportInsightsCard({ report }) {
  if (!report) return null;
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
      <h2 className="text-xl font-semibold">Top Opportunities</h2>
      <div className="mt-4 space-y-3">
        {(report.opportunities || []).map((item: string, index: number) => (
          <div key={index} className="rounded-2xl bg-slate-900 p-4">{item}</div>
        ))}
      </div>
    </section>
  );
}
```

### Component: ReportActionsCard
```tsx
export function ReportActionsCard({ report }) {
  if (!report) return null;
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
      <h2 className="text-xl font-semibold">Next Step</h2>
      <p className="text-slate-300 mt-1">Turn this report directly into content, campaigns, a schedule, and auto-posting.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-xl px-4 py-2 bg-cyan-600">Use This Report</button>
        <button className="rounded-xl px-4 py-2 bg-slate-800">Download PDF</button>
        <button className="rounded-xl px-4 py-2 bg-slate-800">Copy Report</button>
        <button className="rounded-xl px-4 py-2 bg-slate-800">Email Report</button>
      </div>
    </section>
  );
}
```

---

## API ROUTES

### POST /api/characters/create
```ts
export async function POST(req) {
  const body = await req.json();
  const character = {
    id: crypto.randomUUID(),
    name: body.name,
    role: body.role,
    personality: body.personality,
    style: body.style,
    tone: body.tone,
    previewText: `${body.name} is a ${body.role} character with a ${body.tone} tone and ${body.personality} personality.`
  };
  // TODO: save to DB
  return Response.json({ character });
}
```

### POST /api/characters/[characterId]/guided-edit
```ts
export async function POST(req) {
  const body = await req.json();
  // TODO: fetch character + rewrite with AI
  return Response.json({
    character: {
      id: "TODO",
      name: "Updated Character",
      role: "Founder",
      personality: "More polished and locally relevant",
      style: "Clean premium look",
      tone: "Warm and confident",
      previewText: `Guided edit applied: ${body.editType}`
    }
  });
}
```

### GET /api/reports/latest
```ts
export async function GET() {
  // TODO: load from DB
  const report = {
    id: "demo-report",
    title: "Ultimate Growth Report",
    business_name: "Demo Business",
    website_url: "https://example.com",
    summary: "This report identifies the strongest growth opportunities...",
    branding_summary: "Premium neon-led brand with strong modern digital appeal.",
    seo_summary: "SEO opportunities exist in service pages, local targeting, and category structure.",
    content_pillars: ["Education", "Product", "Behind the scenes", "Offers"],
    growth_angle: "Automate report-to-content-to-schedule pipeline.",
    opportunities: [
      "Improve report-to-content automation.",
      "Reduce manual prompt entry.",
      "Use guided edits instead of raw prompt editing.",
      "Push reports directly into 30-day schedules."
    ]
  };
  return Response.json({ report });
}
```

---

## DB TABLES (Supabase / D1)

```sql
CREATE TABLE IF NOT EXISTS character_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL,
  name TEXT NOT NULL,
  role TEXT,
  personality TEXT,
  style TEXT,
  tone TEXT,
  preview_text TEXT,
  avatar_url TEXT,
  locked_for_brand_consistency BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS character_references (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID NOT NULL,
  upload_reference_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
