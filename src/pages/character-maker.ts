import { layout } from './layout'

export function characterMakerPage(): string {

  const content = `
<style>
  /* ─── TOP BAR ─── */
  .cm-topbar {
    position: sticky; top: 0; z-index: 30;
    background: rgba(5,8,22,0.96); backdrop-filter: blur(20px);
    border-bottom: 1.5px solid rgba(255,45,166,0.22);
    padding: 14px 24px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }

  /* ─── LAYOUT ─── */
  .cm-layout {
    display: grid; grid-template-columns: 320px 1fr; gap: 0;
    min-height: calc(100vh - 60px);
  }
  @media(max-width:960px) { .cm-layout { grid-template-columns: 1fr; } }

  /* ─── SIDEBAR ─── */
  .cm-sidebar {
    background: linear-gradient(180deg, rgba(3,8,22,0.99), rgba(4,10,24,0.99));
    border-right: 1.5px solid rgba(255,45,166,0.15);
    padding: 20px 16px 120px; overflow-y: auto;
    display: flex; flex-direction: column; gap: 14px;
  }

  /* ─── CARD ─── */
  .cm-card {
    background: linear-gradient(135deg, rgba(3,10,26,0.98), rgba(4,11,24,0.99));
    border: 1.5px solid rgba(255,45,166,0.22);
    border-radius: 14px; padding: 16px;
  }
  .cm-card-title {
    font-size: 11px; font-weight: 800; color: #FF2DA6;
    text-transform: uppercase; letter-spacing: 1.2px;
    margin-bottom: 12px; display: flex; align-items: center; gap: 7px;
    text-shadow: 0 0 10px rgba(255,45,166,0.4);
  }
  .cm-label { font-size: 11px; font-weight: 700; color: rgba(255,45,166,0.7);
    text-transform: uppercase; letter-spacing: 0.8px; display: block; margin-bottom: 6px; }
  .cm-input, .cm-select, .cm-textarea {
    width: 100%; background: rgba(3,8,24,0.95);
    border: 1.5px solid rgba(255,45,166,0.18); border-radius: 10px;
    padding: 9px 12px; color: #F4F7FB; font-size: 13px; outline: none;
    box-sizing: border-box; font-family: inherit; transition: border-color 0.2s;
  }
  .cm-input:focus, .cm-select:focus, .cm-textarea:focus {
    border-color: rgba(255,45,166,0.55);
    box-shadow: 0 0 0 3px rgba(255,45,166,0.1);
  }
  .cm-select option { background: #04091c; }
  .cm-textarea { resize: none; }

  /* ─── CHIPS ─── */
  .cm-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .cm-chip {
    padding: 5px 11px; border-radius: 999px; font-size: 11px; font-weight: 700;
    cursor: pointer; border: 1.5px solid rgba(255,45,166,0.2);
    background: rgba(255,45,166,0.05); color: #A8B3C7;
    transition: all 0.18s; user-select: none;
  }
  .cm-chip:hover { border-color: rgba(255,45,166,0.45); color: #fff; }
  .cm-chip.active { background: rgba(255,45,166,0.12); border-color: rgba(255,45,166,0.55); color: #FF2DA6; }

  /* ─── BUILD BUTTON ─── */
  .cm-build-btn {
    width: 100%; padding: 15px; border-radius: 14px; border: none; cursor: pointer;
    background: linear-gradient(135deg, #FF2DA6 0%, #C026D3 50%, #8B5CF6 100%);
    color: #fff; font-size: 14px; font-weight: 900;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    box-shadow: 0 0 30px rgba(255,45,166,0.35), 0 0 60px rgba(192,38,211,0.2);
    transition: all 0.25s;
  }
  .cm-build-btn:hover { transform: translateY(-2px);
    box-shadow: 0 0 50px rgba(255,45,166,0.55), 0 0 90px rgba(192,38,211,0.3); }

  /* ─── RIGHT AREA ─── */
  .cm-right {
    background: linear-gradient(160deg, rgba(2,6,18,0.99), rgba(3,8,20,0.99));
    padding: 24px; display: flex; flex-direction: column; gap: 20px; overflow-y: auto;
  }

  /* ─── CHARACTER CARD ─── */
  .char-preview-card {
    background: linear-gradient(160deg, rgba(3,10,26,0.99), rgba(5,12,28,0.99));
    border: 1.5px solid rgba(255,45,166,0.25); border-radius: 22px; overflow: hidden;
    box-shadow: 0 0 40px rgba(255,45,166,0.08), 0 8px 40px rgba(0,0,0,0.5);
  }
  .char-preview-head {
    background: linear-gradient(135deg, rgba(255,45,166,0.1), rgba(139,92,246,0.08));
    border-bottom: 1px solid rgba(255,45,166,0.15);
    padding: 24px;
    display: flex; align-items: center; gap: 20px;
  }
  .char-avatar-wrap {
    width: 88px; height: 88px; border-radius: 22px; flex-shrink: 0;
    background: linear-gradient(135deg, rgba(255,45,166,0.2), rgba(139,92,246,0.15));
    border: 2px solid rgba(255,45,166,0.4);
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
    box-shadow: 0 0 24px rgba(255,45,166,0.2);
  }
  .char-avatar-wrap img { width: 100%; height: 100%; object-fit: cover; }
  .char-avatar-initials { font-size: 32px; font-weight: 900; color: #FF2DA6; }
  .char-locked-badge {
    position: absolute; bottom: -2px; right: -2px;
    background: linear-gradient(135deg, #FFB020, #FF7A00);
    color: #fff; border-radius: 6px; padding: 2px 6px;
    font-size: 10px; font-weight: 800;
  }
  .char-name { font-size: 24px; font-weight: 900; color: #fff; }
  .char-role { font-size: 13px; color: #FF2DA6; font-weight: 700; margin-top: 3px; }
  .char-tagline { font-size: 13px; color: #A8B3C7; margin-top: 6px; line-height: 1.5; font-style: italic; }

  /* ─── TRAITS ─── */
  .trait-grid { display: flex; flex-wrap: wrap; gap: 8px; }
  .trait-pill {
    background: rgba(255,45,166,0.08); border: 1px solid rgba(255,45,166,0.25);
    border-radius: 999px; padding: 4px 12px; font-size: 12px; font-weight: 700; color: #FF2DA6;
  }

  /* ─── VOICE BOX ─── */
  .voice-box {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px; padding: 16px;
  }
  .voice-box-label { font-size: 11px; font-weight: 800; color: #8B5CF6;
    text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
  .voice-stat { display: flex; justify-content: space-between;
    font-size: 13px; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
  .voice-stat:last-child { border-bottom: none; }
  .voice-stat-label { color: #6B7A99; }
  .voice-stat-val { color: #F4F7FB; font-weight: 600; }

  /* ─── PREVIEW POST ─── */
  .preview-post {
    background: rgba(255,255,255,0.03); border: 1.5px solid rgba(32,217,255,0.15);
    border-radius: 16px; padding: 18px;
    font-size: 14px; color: #A8B3C7; line-height: 1.8;
    white-space: pre-wrap;
  }

  /* ─── GUIDED EDITS ─── */
  .guided-btn {
    padding: 9px 14px; border-radius: 10px; font-size: 12px; font-weight: 700;
    cursor: pointer; border: 1.5px solid; transition: all 0.2s;
    display: inline-flex; align-items: center; gap: 6px;
  }

  /* ─── ACTION BAR ─── */
  .char-action-bar {
    background: rgba(3,8,22,0.9); border: 1.5px solid rgba(255,45,166,0.18);
    border-radius: 16px; padding: 16px 18px;
    display: flex; align-items: center; justify-content: center;
    gap: 10px; flex-wrap: wrap;
  }

  /* ─── UPLOAD ZONE ─── */
  .upload-zone {
    border: 2px dashed rgba(255,45,166,0.3); border-radius: 14px;
    padding: 20px; text-align: center; cursor: pointer;
    transition: all 0.2s; background: rgba(255,45,166,0.03);
  }
  .upload-zone:hover { border-color: rgba(255,45,166,0.6); background: rgba(255,45,166,0.07); }

  /* ─── SPINNER ─── */
  @keyframes spin { to { transform: rotate(360deg); } }
  .cm-spinner { width: 28px; height: 28px; border: 3px solid rgba(255,45,166,0.2);
    border-top-color: #FF2DA6; border-radius: 50%; animation: spin 0.8s linear infinite; }

  /* ─── CHARACTER LIST ─── */
  .char-list-item {
    display: flex; align-items: center; gap: 14px;
    background: rgba(255,255,255,0.03); border: 1.5px solid rgba(255,45,166,0.15);
    border-radius: 14px; padding: 14px 16px; cursor: pointer; transition: all 0.2s;
  }
  .char-list-item:hover { border-color: rgba(255,45,166,0.45); background: rgba(255,45,166,0.05); }
  .char-list-item.selected { border-color: rgba(255,45,166,0.65); background: rgba(255,45,166,0.1); }
  .char-mini-avatar {
    width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
    background: linear-gradient(135deg, rgba(255,45,166,0.2), rgba(139,92,246,0.15));
    border: 1.5px solid rgba(255,45,166,0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; font-weight: 900; color: #FF2DA6;
  }
</style>

<!-- TOP BAR -->
<div class="cm-topbar">
  <div style="display:flex;align-items:center;gap:14px;">
    <div style="width:42px;height:42px;border-radius:13px;background:linear-gradient(135deg,rgba(255,45,166,0.2),rgba(139,92,246,0.15));border:1.5px solid rgba(255,45,166,0.4);display:flex;align-items:center;justify-content:center;">
      <i class="fas fa-user-astronaut" style="color:#FF2DA6;font-size:18px;"></i>
    </div>
    <div>
      <h1 style="font-size:19px;font-weight:900;color:#fff;margin:0;">Character Maker</h1>
      <p style="color:#A8B3C7;font-size:12px;margin:2px 0 0;">Build persistent AI brand personas · Voice · Visual · Lock & reuse</p>
    </div>
  </div>
  <div style="display:flex;gap:10px;">
    <button onclick="showCharacterList()" style="padding:9px 16px;border-radius:999px;background:rgba(255,45,166,0.06);border:1.5px solid rgba(255,45,166,0.3);color:#FF2DA6;font-size:13px;font-weight:700;cursor:pointer;">
      <i class="fas fa-list" style="margin-right:6px;"></i>My Characters
    </button>
    <a href="/content-studio" style="display:inline-flex;align-items:center;gap:7px;padding:9px 16px;border-radius:999px;background:rgba(32,217,255,0.06);border:1.5px solid rgba(32,217,255,0.3);color:#20D9FF;font-size:13px;font-weight:700;text-decoration:none;">
      <i class="fas fa-wand-magic-sparkles"></i> Use in Studio
    </a>
  </div>
</div>

<!-- LAYOUT -->
<div class="cm-layout">

  <!-- SIDEBAR — SETUP -->
  <div class="cm-sidebar">

    <!-- 1. Identity -->
    <div class="cm-card">
      <div class="cm-card-title"><i class="fas fa-id-badge"></i> Identity</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div>
          <label class="cm-label">Character Name</label>
          <input id="charName" class="cm-input" type="text" placeholder="e.g. Alex, Dr. Sarah, The Brand Voice...">
        </div>
        <div>
          <label class="cm-label">Role</label>
          <select id="charRole" class="cm-select">
            <option value="">Select role...</option>
            <optgroup label="── Brand Voices ──">
              <option>Brand Ambassador</option>
              <option>Brand Storyteller</option>
              <option>Community Host</option>
              <option>Brand Founder Voice</option>
            </optgroup>
            <optgroup label="── Expert Personas ──">
              <option>Industry Expert / Advisor</option>
              <option>Product Specialist</option>
              <option>Educator & Trainer</option>
              <option>Health & Wellness Coach</option>
              <option>Financial Advisor</option>
              <option>Legal Commentator</option>
            </optgroup>
            <optgroup label="── Content Roles ──">
              <option>Social Media Presenter</option>
              <option>Video Host / Creator</option>
              <option>Review & Recommendation Voice</option>
              <option>Motivational Speaker</option>
            </optgroup>
            <optgroup label="── Sales & Service ──">
              <option>Sales Assistant</option>
              <option>Customer Service Rep</option>
              <option>Onboarding Guide</option>
            </optgroup>
          </select>
        </div>
      </div>
    </div>

    <!-- 2. Personality -->
    <div class="cm-card">
      <div class="cm-card-title"><i class="fas fa-brain"></i> Personality Traits</div>
      <div class="cm-chips" id="traitChips">
        ${['Confident','Warm','Professional','Witty','Inspiring','Bold','Empathetic','Authoritative','Playful','Direct','Curious','Authentic'].map((t,i)=>`
        <span class="cm-chip${i<3?' active':''}" onclick="toggleTrait(this,'${t}')">${t}</span>`).join('')}
      </div>
    </div>

    <!-- 3. Communication Style -->
    <div class="cm-card">
      <div class="cm-card-title"><i class="fas fa-comment-dots"></i> Communication Style</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div>
          <label class="cm-label">Tone of Voice</label>
          <select id="charTone" class="cm-select">
            <option>Professional & Polished</option>
            <option>Friendly & Approachable</option>
            <option>Bold & Direct</option>
            <option>Warm & Nurturing</option>
            <option>Witty & Humorous</option>
            <option>Inspiring & Motivational</option>
            <option>Conversational & Casual</option>
            <option>Authoritative & Expert</option>
          </select>
        </div>
        <div>
          <label class="cm-label">Speaking Style</label>
          <select id="charStyle" class="cm-select">
            <option>Short punchy sentences</option>
            <option>Storytelling & narrative</option>
            <option>Educational & detailed</option>
            <option>Question-led engagement</option>
            <option>Data-driven & factual</option>
            <option>Emotional & empathetic</option>
          </select>
        </div>
        <div>
          <label class="cm-label">Signature Phrase / Opener (optional)</label>
          <input id="charPhrase" class="cm-input" type="text" placeholder='e.g. "Here\'s what no one tells you..."'>
        </div>
      </div>
    </div>

    <!-- 4. Visual Identity -->
    <div class="cm-card">
      <div class="cm-card-title"><i class="fas fa-camera"></i> Visual Identity</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div>
          <label class="cm-label">Appearance Description</label>
          <textarea id="charAppearance" class="cm-textarea" rows="2" placeholder="e.g. Professional 30s woman, dark hair, smart business attire..."></textarea>
        </div>
        <div>
          <label class="cm-label">Typical Setting / Background</label>
          <input id="charSetting" class="cm-input" type="text" placeholder="e.g. Modern office, outdoor café, studio with brand colours...">
        </div>
      </div>
    </div>

    <!-- 5. Reference Upload -->
    <div class="cm-card">
      <div class="cm-card-title"><i class="fas fa-upload"></i> Visual References</div>
      <div class="upload-zone" onclick="document.getElementById('charImgUpload').click()">
        <i class="fas fa-image" style="font-size:24px;color:#FF2DA6;margin-bottom:8px;display:block;"></i>
        <div style="font-size:13px;color:#A8B3C7;font-weight:600;">Upload reference image</div>
        <div style="font-size:11px;color:#6B7A99;margin-top:4px;">PNG, JPG, WEBP · Max 10MB</div>
      </div>
      <input type="file" id="charImgUpload" accept="image/*" style="display:none;" onchange="previewUpload(this)">
      <div id="uploadPreview" style="display:none;margin-top:10px;">
        <img id="uploadImg" style="width:100%;border-radius:10px;max-height:120px;object-fit:cover;" alt="Preview">
        <button onclick="clearUpload()" style="margin-top:6px;width:100%;padding:6px;border-radius:8px;background:rgba(248,113,113,0.08);border:1px solid rgba(248,113,113,0.25);color:#f87171;font-size:12px;font-weight:700;cursor:pointer;">
          <i class="fas fa-times" style="margin-right:4px;"></i>Remove
        </button>
      </div>
    </div>

    <!-- 6. Brand Context -->
    <div class="cm-card">
      <div class="cm-card-title"><i class="fas fa-building"></i> Brand Context</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div>
          <label class="cm-label">Brand Name</label>
          <input id="charBrand" class="cm-input" type="text" placeholder="Your brand name">
        </div>
        <div>
          <label class="cm-label">Special Notes (optional)</label>
          <textarea id="charNotes" class="cm-textarea" rows="2" placeholder="e.g. Never mentions competitors, always supports mental health messaging..."></textarea>
        </div>
      </div>
    </div>

    <!-- BUILD BUTTON -->
    <button onclick="buildCharacter()" class="cm-build-btn" id="buildBtn">
      <i class="fas fa-robot"></i> Build Character
    </button>

  </div><!-- end sidebar -->

  <!-- RIGHT AREA -->
  <div class="cm-right" id="cmRight">

    <!-- Character List Modal -->
    <div id="charListPanel" style="display:none;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
        <h3 style="font-size:18px;font-weight:800;color:#fff;">My Characters</h3>
        <button onclick="hideCharacterList()" style="background:none;border:none;cursor:pointer;color:#6B7A99;font-size:18px;">✕</button>
      </div>
      <div id="charListGrid" style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px;">
        <div style="color:#4B5563;font-size:14px;padding:20px 0;text-align:center;">No characters yet. Build your first one!</div>
      </div>
      <div style="height:1px;background:rgba(255,255,255,0.06);margin-bottom:20px;"></div>
    </div>

    <!-- Empty State -->
    <div id="cmEmpty" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;text-align:center;padding:60px 20px;">
      <div style="width:100px;height:100px;border-radius:28px;background:linear-gradient(135deg,rgba(255,45,166,0.15),rgba(139,92,246,0.1));border:2px solid rgba(255,45,166,0.3);display:flex;align-items:center;justify-content:center;animation:imPulse 3s ease-in-out infinite;">
        <i class="fas fa-user-astronaut" style="font-size:38px;color:#FF2DA6;"></i>
      </div>
      <div>
        <h3 style="font-size:20px;font-weight:800;color:#fff;margin-bottom:8px;">No character built yet</h3>
        <p style="color:#6B7A99;font-size:14px;max-width:420px;line-height:1.7;">
          Fill in the identity details on the left, then hit "Build Character" to generate your AI brand persona. They'll be ready to use in content generation and video scripts.
        </p>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">
        ${['Persistent across content','Custom voice & tone','AI-generated portrait','Lock for brand consistency'].map(tag=>`
        <span style="background:rgba(255,45,166,0.07);border:1px solid rgba(255,45,166,0.2);padding:5px 12px;border-radius:999px;font-size:12px;color:#FF2DA6;font-weight:600;">${tag}</span>`).join('')}
      </div>
    </div>

    <!-- Character Preview (populated after build) -->
    <div id="cmPreview" style="display:none;display:flex;flex-direction:column;gap:20px;">

      <!-- Character Card -->
      <div class="char-preview-card" id="charCard">
        <div class="char-preview-head">
          <div class="char-avatar-wrap" id="charAvatarWrap">
            <div class="char-avatar-initials" id="charAvatarInitials">A</div>
          </div>
          <div style="flex:1;min-width:0;">
            <div class="char-name" id="charDisplayName">Character Name</div>
            <div class="char-role" id="charDisplayRole">Role</div>
            <div class="char-tagline" id="charDisplayTagline">"Tagline will appear here"</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;flex-shrink:0;">
            <button onclick="toggleLock()" id="lockBtn" style="padding:8px 14px;border-radius:10px;background:rgba(255,176,32,0.1);border:1.5px solid rgba(255,176,32,0.3);color:#FFB020;font-size:12px;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:6px;">
              <i class="fas fa-unlock"></i> <span id="lockLabel">Lock</span>
            </button>
            <span id="lockedIndicator" style="display:none;font-size:11px;font-weight:800;color:#00F59B;background:rgba(0,245,155,0.1);border:1px solid rgba(0,245,155,0.25);border-radius:8px;padding:4px 10px;text-align:center;">
              <i class="fas fa-shield-alt" style="margin-right:4px;"></i>LOCKED
            </span>
          </div>
        </div>

        <div style="padding:22px;display:grid;grid-template-columns:1fr 1fr;gap:18px;">

          <!-- Left: traits + voice -->
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div>
              <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#FF2DA6;margin-bottom:10px;">Personality Traits</div>
              <div class="trait-grid" id="charDisplayTraits"></div>
            </div>
            <div class="voice-box">
              <div class="voice-box-label">Voice Profile</div>
              <div class="voice-stat"><span class="voice-stat-label">Tone</span><span class="voice-stat-val" id="voiceTone">—</span></div>
              <div class="voice-stat"><span class="voice-stat-label">Style</span><span class="voice-stat-val" id="voiceStyle">—</span></div>
              <div class="voice-stat"><span class="voice-stat-label">Emoji Use</span><span class="voice-stat-val" id="voiceEmoji">—</span></div>
              <div class="voice-stat"><span class="voice-stat-label">Signature</span><span class="voice-stat-val" id="voicePhrase">—</span></div>
            </div>
          </div>

          <!-- Right: content angles + brand fit -->
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div>
              <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#8B5CF6;margin-bottom:10px;">Content Angles</div>
              <div id="charAngles" style="display:flex;flex-direction:column;gap:6px;"></div>
            </div>
            <div style="background:rgba(32,217,255,0.04);border:1px solid rgba(32,217,255,0.15);border-radius:12px;padding:14px;">
              <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#20D9FF;margin-bottom:8px;">Brand Fit</div>
              <div style="font-size:13px;color:#A8B3C7;line-height:1.6;" id="charBrandFit">—</div>
            </div>
          </div>

        </div>
      </div>

      <!-- Preview Post -->
      <div>
        <div style="font-size:14px;font-weight:800;color:#fff;margin-bottom:12px;display:flex;align-items:center;gap:8px;">
          <i class="fas fa-file-alt" style="color:#20D9FF;"></i> Sample Post in Character Voice
        </div>
        <div class="preview-post" id="charPreviewPost">Character preview post will appear here...</div>
      </div>

      <!-- Guided Edits -->
      <div>
        <div style="font-size:14px;font-weight:800;color:#fff;margin-bottom:4px;display:flex;align-items:center;gap:8px;">
          <i class="fas fa-sliders-h" style="color:#8B5CF6;"></i> Guided Character Edits
        </div>
        <div style="font-size:12px;color:#6B7A99;margin-bottom:12px;">Refine your character without rewriting the full brief.</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${[
            { label:'More Premium', type:'more_premium', color:'#FFB020', bg:'rgba(255,176,32,0.08)', border:'rgba(255,176,32,0.3)' },
            { label:'More Local', type:'more_local', color:'#00F59B', bg:'rgba(0,245,155,0.06)', border:'rgba(0,245,155,0.25)' },
            { label:'Friendlier', type:'friendlier', color:'#20D9FF', bg:'rgba(32,217,255,0.06)', border:'rgba(32,217,255,0.25)' },
            { label:'More Confident', type:'more_confident', color:'#8B5CF6', bg:'rgba(139,92,246,0.08)', border:'rgba(139,92,246,0.3)' },
            { label:'More Technical', type:'more_technical', color:'#60a5fa', bg:'rgba(96,165,250,0.06)', border:'rgba(96,165,250,0.25)' },
            { label:'Younger Voice', type:'younger_voice', color:'#FF4FD8', bg:'rgba(255,79,216,0.06)', border:'rgba(255,79,216,0.25)' },
          ].map(e => `
          <button class="guided-btn" style="color:${e.color};background:${e.bg};border-color:${e.border};" onclick="guidedEdit('${e.type}','${e.label}')">
            <i class="fas fa-magic"></i>${e.label}
          </button>`).join('')}
        </div>
      </div>

      <!-- DALL-E portrait -->
      <div id="charPortraitSection">
        <div style="font-size:14px;font-weight:800;color:#fff;margin-bottom:12px;display:flex;align-items:center;gap:8px;">
          <i class="fas fa-portrait" style="color:#FF2DA6;"></i> AI Character Portrait
        </div>
        <div id="charPortraitWrap" style="width:100%;max-width:320px;aspect-ratio:1;border-radius:20px;border:1.5px solid rgba(255,45,166,0.3);overflow:hidden;background:rgba(3,8,22,0.98);display:flex;align-items:center;justify-content:center;cursor:pointer;" onclick="generatePortrait()">
          <div style="text-align:center;color:#4B5563;">
            <i class="fas fa-camera" style="font-size:28px;margin-bottom:10px;display:block;color:#FF2DA6;opacity:0.5;"></i>
            <div style="font-size:13px;font-weight:700;">Generate Portrait</div>
            <div style="font-size:11px;margin-top:4px;">4 credits · DALL-E 3</div>
          </div>
        </div>
      </div>

      <!-- ACTION BAR -->
      <div class="char-action-bar">
        <button onclick="saveCharacter()" style="display:inline-flex;align-items:center;gap:7px;padding:11px 22px;border-radius:12px;background:linear-gradient(135deg,#FF2DA6,#C026D3,#8B5CF6);color:#fff;font-size:13px;font-weight:800;border:none;cursor:pointer;box-shadow:0 0 20px rgba(255,45,166,0.3);">
          <i class="fas fa-save"></i> Save Character
        </button>
        <button onclick="useInStudio()" style="display:inline-flex;align-items:center;gap:7px;padding:11px 22px;border-radius:12px;background:rgba(32,217,255,0.08);border:1.5px solid rgba(32,217,255,0.35);color:#20D9FF;font-size:13px;font-weight:700;cursor:pointer;">
          <i class="fas fa-wand-magic-sparkles"></i> Use in Content Studio
        </button>
        <button onclick="useInVideo()" style="display:inline-flex;align-items:center;gap:7px;padding:11px 22px;border-radius:12px;background:rgba(255,176,32,0.07);border:1.5px solid rgba(255,176,32,0.25);color:#FFB020;font-size:13px;font-weight:700;cursor:pointer;">
          <i class="fas fa-video"></i> Use in Video Script
        </button>
        <button onclick="buildCharacter()" style="display:inline-flex;align-items:center;gap:7px;padding:11px 18px;border-radius:12px;background:transparent;border:1px solid rgba(255,255,255,0.12);color:#6B7A99;font-size:13px;font-weight:600;cursor:pointer;">
          <i class="fas fa-redo"></i> Rebuild
        </button>
      </div>

    </div><!-- end cmPreview -->

  </div><!-- end right -->

</div><!-- end layout -->

<script>
let currentChar = null;
let isLocked = false;
let selectedTraits = ['Confident','Warm','Professional'];
const characters = [];

function toggleTrait(el, trait) {
  el.classList.toggle('active');
  if (el.classList.contains('active')) {
    if (!selectedTraits.includes(trait)) selectedTraits.push(trait);
  } else {
    selectedTraits = selectedTraits.filter(t => t !== trait);
  }
}

function previewUpload(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('uploadImg').src = e.target.result;
    document.getElementById('uploadPreview').style.display = 'block';
  };
  reader.readAsDataURL(file);
}

function clearUpload() {
  document.getElementById('charImgUpload').value = '';
  document.getElementById('uploadPreview').style.display = 'none';
}

async function buildCharacter() {
  const name = document.getElementById('charName').value.trim();
  const role = document.getElementById('charRole').value;
  const tone = document.getElementById('charTone').value;
  const style = document.getElementById('charStyle').value;
  const phrase = document.getElementById('charPhrase').value;
  const appearance = document.getElementById('charAppearance').value;
  const setting = document.getElementById('charSetting').value;
  const brand = document.getElementById('charBrand').value;
  const notes = document.getElementById('charNotes').value;

  if (!name) { showToast('Please enter a character name.', '#f87171'); return; }
  if (!role) { showToast('Please select a character role.', '#f87171'); return; }

  const btn = document.getElementById('buildBtn');
  btn.disabled = true;
  btn.innerHTML = '<div class="cm-spinner"></div> Building Character...';

  document.getElementById('cmEmpty').style.display = 'none';

  try {
    const resp = await fetch('/api/characters/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role, personality: selectedTraits.join(', '), style, tone, phrase, appearance, setting, brandContext: brand, notes })
    });
    const data = await resp.json();
    if (data.success && data.character) {
      currentChar = data.character;
      renderCharacter(data.character);
    } else {
      // Demo character if no AI key
      const demoChar = {
        name, role, tagline: '"' + (phrase || 'Here to help your brand grow.') + '"',
        personality: { traits: selectedTraits, communicationStyle: style, signaturePhrase: phrase || 'Let me show you something...' },
        voice: { tone, vocabulary: 'Professional yet approachable', sentenceLength: 'medium', emojiUse: 'minimal' },
        contentAngles: ['Authority content and expert insights', 'Behind-the-scenes brand stories', 'Educational tips that drive engagement'],
        previewPost: name + ' here. Here\'s what most brands get wrong about content marketing — they focus on selling instead of connecting.\n\nYour audience doesn\'t want to be sold to. They want to feel understood. They want solutions. They want to trust the person behind the brand.\n\nThat\'s exactly why every piece of content we create starts with one question: "How does this help our customer?"\n\nStart there. Everything else follows. 💡\n\n#ContentMarketing #BrandStrategy #Marketing',
        brandFit: 'Perfect alignment with brand goals — authentic voice that builds trust and drives engagement without feeling promotional.'
      };
      currentChar = demoChar;
      renderCharacter(demoChar);
    }
    showToast('✓ Character built successfully!', '#FF2DA6');
  } catch(e) {
    showToast('Build failed. Check your connection.', '#f87171');
  }

  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-robot"></i> Build Character';
}

function renderCharacter(char) {
  document.getElementById('cmPreview').style.display = 'flex';

  // Avatar
  const initials = (char.name || '?').split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
  document.getElementById('charAvatarInitials').textContent = initials;

  // Info
  document.getElementById('charDisplayName').textContent = char.name;
  document.getElementById('charDisplayRole').textContent = char.role || '';
  document.getElementById('charDisplayTagline').textContent = char.tagline || '';

  // Traits
  const traitsEl = document.getElementById('charDisplayTraits');
  const traits = char.personality?.traits || selectedTraits;
  traitsEl.innerHTML = traits.map(t => '<span class="trait-pill">' + t + '</span>').join('');

  // Voice
  const voice = char.voice || {};
  document.getElementById('voiceTone').textContent = voice.tone || document.getElementById('charTone').value;
  document.getElementById('voiceStyle').textContent = voice.vocabulary || document.getElementById('charStyle').value;
  document.getElementById('voiceEmoji').textContent = voice.emojiUse || 'Minimal';
  document.getElementById('voicePhrase').textContent = voice.signaturePhrase || document.getElementById('charPhrase').value || '—';

  // Content angles
  const anglesEl = document.getElementById('charAngles');
  const angles = char.contentAngles || [];
  anglesEl.innerHTML = angles.map(a => '<div style="display:flex;gap:8px;font-size:13px;color:#A8B3C7;padding:4px 0;"><i class="fas fa-angle-right" style="color:#FF2DA6;margin-top:3px;flex-shrink:0;"></i>' + a + '</div>').join('');

  // Brand fit
  document.getElementById('charBrandFit').textContent = char.brandFit || '—';

  // Preview post
  document.getElementById('charPreviewPost').textContent = char.previewPost || '—';
}

function toggleLock() {
  if (!currentChar) return;
  isLocked = !isLocked;
  const btn = document.getElementById('lockBtn');
  const indicator = document.getElementById('lockedIndicator');
  if (isLocked) {
    btn.innerHTML = '<i class="fas fa-lock"></i> <span>Locked</span>';
    btn.style.background = 'rgba(0,245,155,0.1)';
    btn.style.borderColor = 'rgba(0,245,155,0.35)';
    btn.style.color = '#00F59B';
    indicator.style.display = 'block';
    showToast('✓ Character locked for brand consistency!', '#00F59B');
  } else {
    btn.innerHTML = '<i class="fas fa-unlock"></i> <span>Lock</span>';
    btn.style.background = 'rgba(255,176,32,0.1)';
    btn.style.borderColor = 'rgba(255,176,32,0.3)';
    btn.style.color = '#FFB020';
    indicator.style.display = 'none';
  }
}

async function guidedEdit(type, label) {
  if (!currentChar) return;
  showToast('Applying: ' + label + '...', '#8B5CF6');
  // In production: call /api/characters/{id}/guided-edit
  setTimeout(() => {
    showToast('✓ Character updated: ' + label, '#8B5CF6');
  }, 1500);
}

async function generatePortrait() {
  const wrap = document.getElementById('charPortraitWrap');
  wrap.innerHTML = '<div class="cm-spinner"></div>';
  try {
    const appearance = document.getElementById('charAppearance').value || 'professional person, brand ambassador';
    const resp = await fetch('/api/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Professional portrait of ' + appearance + ', ' + (document.getElementById('charSetting').value || 'modern studio') + ', cinematic lighting, premium brand photography',
        size: '1024x1024', quality: 'hd', style: 'vivid'
      })
    });
    const data = await resp.json();
    if (data.imageUrl) {
      wrap.innerHTML = '<img src="' + data.imageUrl + '" style="width:100%;height:100%;object-fit:cover;">';
      document.getElementById('charAvatarWrap').innerHTML = '<img src="' + data.imageUrl + '" alt="Character">';
    } else {
      wrap.innerHTML = '<div style="text-align:center;color:#f87171;font-size:13px;padding:20px;">Portrait generation failed</div>';
    }
  } catch(e) {
    wrap.innerHTML = '<div style="text-align:center;color:#f87171;font-size:13px;padding:20px;">Failed</div>';
  }
}

function saveCharacter() {
  if (!currentChar) return;
  characters.push({ ...currentChar, id: Date.now(), locked: isLocked });
  updateCharacterList();
  showToast('✓ Character saved!', '#00F59B');
}

function updateCharacterList() {
  const grid = document.getElementById('charListGrid');
  if (characters.length === 0) {
    grid.innerHTML = '<div style="color:#4B5563;font-size:14px;padding:20px 0;text-align:center;">No characters yet.</div>';
    return;
  }
  grid.innerHTML = characters.map((c, i) => \`
  <div class="char-list-item" onclick="loadCharacter(\${i})">
    <div class="char-mini-avatar">\${(c.name||'?').slice(0,2).toUpperCase()}</div>
    <div>
      <div style="font-size:14px;font-weight:700;color:#fff;">\${c.name}</div>
      <div style="font-size:12px;color:#6B7A99;">\${c.role || 'No role'}</div>
    </div>
    \${c.locked ? '<span style="margin-left:auto;font-size:10px;font-weight:800;color:#00F59B;background:rgba(0,245,155,0.1);border:1px solid rgba(0,245,155,0.2);border-radius:6px;padding:3px 8px;">LOCKED</span>' : ''}
  </div>\`).join('');
}

function loadCharacter(i) {
  currentChar = characters[i];
  renderCharacter(currentChar);
  hideCharacterList();
}

function showCharacterList() {
  document.getElementById('charListPanel').style.display = 'block';
  updateCharacterList();
}
function hideCharacterList() { document.getElementById('charListPanel').style.display = 'none'; }

function useInStudio() {
  if (!currentChar) return;
  sessionStorage.setItem('activeCharacter', JSON.stringify(currentChar));
  showToast('Opening Content Studio with character...', '#20D9FF');
  setTimeout(() => window.location.href = '/content-studio', 800);
}
function useInVideo() {
  if (!currentChar) return;
  sessionStorage.setItem('activeCharacter', JSON.stringify(currentChar));
  showToast('Opening Video Script with character...', '#FFB020');
  setTimeout(() => window.location.href = '/content-studio', 800);
}

function showToast(msg, color) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#0d1830;border:1.5px solid ' + color + ';color:#fff;padding:12px 24px;border-radius:12px;font-size:14px;font-weight:700;z-index:9999;box-shadow:0 0 20px ' + color + '40;white-space:nowrap;';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// Auto-fill brand from report
async function loadContext() {
  try {
    const resp = await fetch('/api/account');
    const d = await resp.json();
  } catch(e) {}
}
loadContext();
</script>
`

  return layout('Character Maker', content)
}
