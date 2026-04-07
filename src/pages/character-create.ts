import { layout, ssLogo, topBar } from './layout'

export function characterCreatePage(): string {

  const content = `
${topBar('Create Character', 'Build a reusable AI brand persona', '<a href="/characters" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#c0d0e0;font-size:12px;font-weight:700;padding:7px 14px;border-radius:999px;text-decoration:none;display:flex;align-items:center;gap:5px;"><i class="fas fa-arrow-left"></i> Back</a>')}

<style>
  /* ── Character Create page styles ── */
  .cc-wrap{padding:20px;max-width:860px;margin:0 auto;}
  .cc-card{background:rgba(4,12,32,0.92);border:1px solid rgba(0,229,255,0.18);border-radius:16px;padding:22px;margin-bottom:18px;}
  .cc-section-title{font-size:14px;font-weight:800;color:#fff;margin:0 0 16px;display:flex;align-items:center;gap:8px;}
  .cc-section-title .cc-section-icon{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .cc-label{font-size:11px;font-weight:700;color:#8aabcc;text-transform:uppercase;letter-spacing:1px;margin-bottom:7px;display:block;}
  .cc-input{width:100%;background:rgba(3,9,24,0.9);border:1px solid rgba(0,229,255,0.18);color:#c8e6ff;border-radius:10px;padding:11px 14px;font-size:14px;outline:none;transition:border-color 0.2s;}
  .cc-input:focus{border-color:rgba(0,229,255,0.5);box-shadow:0 0 0 3px rgba(0,229,255,0.07);}
  .cc-textarea{resize:vertical;min-height:80px;}
  .cc-select{appearance:none;-webkit-appearance:none;cursor:pointer;}
  .cc-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
  @media(max-width:600px){.cc-grid-2{grid-template-columns:1fr;}}
  .cc-field{margin-bottom:14px;}

  /* Voice sliders */
  .cc-slider-row{display:flex;align-items:center;gap:12px;margin-bottom:12px;}
  .cc-slider-label{font-size:12px;color:#8aabcc;width:80px;flex-shrink:0;}
  .cc-slider{flex:1;-webkit-appearance:none;height:4px;border-radius:2px;background:rgba(0,229,255,0.15);outline:none;}
  .cc-slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:linear-gradient(135deg,#00E5FF,#0070F3);cursor:pointer;box-shadow:0 0 6px rgba(0,229,255,0.5);}
  .cc-slider-val{font-size:12px;font-weight:700;color:#00E5FF;width:36px;text-align:right;flex-shrink:0;}

  /* Platform chips */
  .cc-chip-row{display:flex;flex-wrap:wrap;gap:8px;}
  .cc-chip{display:inline-flex;align-items:center;gap:6px;padding:6px 13px;border-radius:999px;
    font-size:12px;font-weight:600;cursor:pointer;border:1px solid rgba(255,255,255,0.12);
    background:rgba(255,255,255,0.04);color:#8ca3b8;transition:all 0.18s;user-select:none;}
  .cc-chip.sel{background:rgba(0,229,255,0.12);border-color:rgba(0,229,255,0.4);color:#00E5FF;}

  /* Upload zone */
  .cc-upload-zone{border:2px dashed rgba(0,229,255,0.22);border-radius:14px;padding:32px;text-align:center;cursor:pointer;transition:all 0.2s;}
  .cc-upload-zone:hover{border-color:rgba(0,229,255,0.4);background:rgba(0,229,255,0.03);}
  .cc-upload-thumbs{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px;}
  .cc-thumb{width:72px;height:72px;border-radius:10px;object-fit:cover;border:1px solid rgba(0,229,255,0.25);}

  /* Preview card */
  .cc-preview-card{background:linear-gradient(135deg,rgba(0,14,40,0.97),rgba(4,8,24,0.99));border:1px solid rgba(0,229,255,0.25);border-radius:16px;padding:20px;display:flex;flex-direction:column;align-items:center;gap:12px;}
  .cc-avatar{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#00E5FF,#7C3AED,#FF2D78);display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:900;color:#fff;flex-shrink:0;box-shadow:0 4px 16px rgba(0,229,255,0.3);}
  .cc-preview-name{font-size:18px;font-weight:900;color:#fff;}
  .cc-preview-role{font-size:12px;color:#00E5FF;font-weight:700;}
  .cc-preview-text{font-size:13px;color:#a0b8d4;line-height:1.6;text-align:center;font-style:italic;}
  .cc-preview-tags{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;}
  .cc-preview-tag{font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.25);color:#00E5FF;}

  /* AI builder section */
  .cc-ai-output{background:rgba(2,8,22,0.95);border:1px solid rgba(167,139,250,0.25);border-radius:12px;padding:16px;min-height:100px;color:#c8e6ff;font-size:13px;line-height:1.7;}

  /* Action bar */
  .cc-action-bar{display:flex;gap:12px;flex-wrap:wrap;}

  /* Locked badge */
  .cc-locked-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(255,214,0,0.08);border:1px solid rgba(255,214,0,0.25);border-radius:999px;padding:4px 12px;font-size:11px;font-weight:700;color:#FFD600;}
</style>

<div class="cc-wrap">

  <!-- Error/save banner -->
  <div id="ccBanner" style="display:none;background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.25);border-radius:12px;padding:12px 18px;margin-bottom:16px;display:none;align-items:center;gap:10px;color:#4ade80;font-weight:700;font-size:14px;"></div>

  <!-- ① CHARACTER SUMMARY HEADER -->
  <div class="cc-card" style="background:linear-gradient(135deg,rgba(0,229,255,0.06),rgba(124,58,237,0.04));border-color:rgba(0,229,255,0.25);">
    <div style="display:flex;align-items:center;gap:16px;">
      <div class="cc-avatar" id="previewAvatar">SS</div>
      <div>
        <div style="font-size:20px;font-weight:900;color:#fff;" id="previewName">Unnamed Character</div>
        <div style="font-size:13px;color:#00E5FF;font-weight:600;" id="previewRole">Define their role below</div>
        <div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:6px;" id="previewTags">
          <span class="cc-locked-badge"><i class="fas fa-lock"></i> Unsaved</span>
        </div>
      </div>
      <div style="margin-left:auto;">
        <span id="lockStatus" style="display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:700;background:rgba(255,68,68,0.1);border:1px solid rgba(255,68,68,0.3);border-radius:999px;padding:5px 12px;color:#ff6b6b;">
          <i class="fas fa-unlock"></i> Draft
        </span>
      </div>
    </div>
  </div>

  <!-- ② CHARACTER SETUP CARD -->
  <div class="cc-card">
    <div class="cc-section-title">
      <div class="cc-section-icon" style="background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.25);">
        <i class="fas fa-user-edit" style="color:#00E5FF;font-size:13px;"></i>
      </div>
      Character Setup
    </div>
    <div class="cc-grid-2">
      <div class="cc-field">
        <label class="cc-label">Character Name</label>
        <input class="cc-input" id="charName" type="text" placeholder="e.g. Alex, Luna, Max..." oninput="updatePreview()">
      </div>
      <div class="cc-field">
        <label class="cc-label">Role / Title</label>
        <input class="cc-input" id="charRole" type="text" placeholder="e.g. Brand Ambassador, Coach..." oninput="updatePreview()">
      </div>
    </div>
    <div class="cc-grid-2">
      <div class="cc-field">
        <label class="cc-label">Personality Type</label>
        <select class="cc-input cc-select" id="charPersonality" onchange="updatePreview()">
          <option value="">Select personality...</option>
          <option value="Professional & Authoritative">Professional & Authoritative</option>
          <option value="Friendly & Approachable">Friendly & Approachable</option>
          <option value="Bold & Motivational">Bold & Motivational</option>
          <option value="Playful & Creative">Playful & Creative</option>
          <option value="Empathetic & Supportive">Empathetic & Supportive</option>
          <option value="Expert & Educational">Expert & Educational</option>
          <option value="Edgy & Provocative">Edgy & Provocative</option>
          <option value="Calm & Mindful">Calm & Mindful</option>
        </select>
      </div>
      <div class="cc-field">
        <label class="cc-label">Content Style</label>
        <select class="cc-input cc-select" id="charStyle" onchange="updatePreview()">
          <option value="">Select style...</option>
          <option value="Long-form educational">Long-form educational</option>
          <option value="Short punchy posts">Short punchy posts</option>
          <option value="Story-driven narrative">Story-driven narrative</option>
          <option value="Data & stats driven">Data & stats driven</option>
          <option value="Visual-first captions">Visual-first captions</option>
          <option value="Behind-the-scenes">Behind-the-scenes</option>
          <option value="Humorous & witty">Humorous & witty</option>
        </select>
      </div>
    </div>
    <div class="cc-field">
      <label class="cc-label">Character Backstory / Bio</label>
      <textarea class="cc-input cc-textarea" id="charBio" placeholder="Describe who this character is, their background, expertise, values..." oninput="updatePreview()"></textarea>
    </div>
    <div class="cc-field">
      <label class="cc-label" style="margin-bottom:10px;">Active Platforms</label>
      <div class="cc-chip-row" id="platformChips">
        ${[
          {id:'ig',label:'Instagram'},
          {id:'tk',label:'TikTok'},
          {id:'fb',label:'Facebook'},
          {id:'yt',label:'YouTube'},
          {id:'tw',label:'X / Twitter'},
          {id:'li',label:'LinkedIn'},
          {id:'pi',label:'Pinterest'},
          {id:'th',label:'Threads'},
        ].map(p => `<span class="cc-chip" data-platform="${p.id}" onclick="togglePlatform(this,'${p.id}')">${p.label}</span>`).join('')}
      </div>
    </div>
  </div>

  <!-- ③ VISUAL REFERENCE UPLOAD -->
  <div class="cc-card">
    <div class="cc-section-title">
      <div class="cc-section-icon" style="background:rgba(167,139,250,0.1);border:1px solid rgba(167,139,250,0.25);">
        <i class="fas fa-image" style="color:#A78BFA;font-size:13px;"></i>
      </div>
      Visual Reference Upload
      <span style="font-size:11px;color:#6a8aaa;font-weight:400;margin-left:4px;">(optional)</span>
    </div>
    <div class="cc-upload-zone" onclick="document.getElementById('refImages').click()" id="uploadZone">
      <i class="fas fa-cloud-upload-alt" style="font-size:28px;color:#A78BFA;margin-bottom:10px;"></i>
      <div style="font-size:14px;font-weight:700;color:#fff;margin-bottom:4px;">Drop reference images here</div>
      <div style="font-size:12px;color:#6a8aaa;">Photos, brand images, style references · PNG, JPG, WebP · max 5MB each</div>
      <input type="file" id="refImages" accept="image/*" multiple style="display:none;" onchange="previewUploads(this)">
    </div>
    <div class="cc-upload-thumbs" id="uploadThumbs"></div>
  </div>

  <!-- ④ BRAND FIT & VOICE CONTROLS -->
  <div class="cc-card">
    <div class="cc-section-title">
      <div class="cc-section-icon" style="background:rgba(0,255,136,0.08);border:1px solid rgba(0,255,136,0.25);">
        <i class="fas fa-sliders" style="color:#00ff88;font-size:13px;"></i>
      </div>
      Brand Fit & Voice Controls
    </div>
    <div class="cc-field">
      <label class="cc-label">Tone</label>
      <div style="display:flex;gap:8px;flex-wrap:wrap;" id="toneChips">
        ${['Formal','Casual','Friendly','Direct','Inspiring','Humorous','Empathetic','Authoritative'].map(t => 
          `<span class="cc-chip" onclick="toggleTone(this,'${t}')">${t}</span>`
        ).join('')}
      </div>
    </div>
    <div style="margin-top:16px;">
      <div class="cc-slider-row">
        <span class="cc-slider-label">Formality</span>
        <input type="range" class="cc-slider" min="0" max="100" value="50" oninput="updateSlider(this,'formalVal')">
        <span class="cc-slider-val" id="formalVal">50</span>
      </div>
      <div class="cc-slider-row">
        <span class="cc-slider-label">Energy</span>
        <input type="range" class="cc-slider" min="0" max="100" value="65" oninput="updateSlider(this,'energyVal')">
        <span class="cc-slider-val" id="energyVal">65</span>
      </div>
      <div class="cc-slider-row">
        <span class="cc-slider-label">Creativity</span>
        <input type="range" class="cc-slider" min="0" max="100" value="70" oninput="updateSlider(this,'creativityVal')">
        <span class="cc-slider-val" id="creativityVal">70</span>
      </div>
      <div class="cc-slider-row">
        <span class="cc-slider-label">Emoji Use</span>
        <input type="range" class="cc-slider" min="0" max="100" value="40" oninput="updateSlider(this,'emojiVal')">
        <span class="cc-slider-val" id="emojiVal">40</span>
      </div>
    </div>
    <div class="cc-field" style="margin-top:16px;">
      <label class="cc-label">Brand Keywords (comma-separated)</label>
      <input class="cc-input" id="brandKeywords" type="text" placeholder="e.g. authentic, results-driven, community, innovation...">
    </div>
    <div class="cc-field">
      <label class="cc-label">Words / Phrases to Avoid</label>
      <input class="cc-input" id="avoidWords" type="text" placeholder="e.g. cheap, fast, discount, free...">
    </div>
  </div>

  <!-- ⑤ AI CHARACTER BUILDER -->
  <div class="cc-card" style="border-color:rgba(167,139,250,0.25);">
    <div class="cc-section-title">
      <div class="cc-section-icon" style="background:rgba(167,139,250,0.1);border:1px solid rgba(167,139,250,0.25);">
        <i class="fas fa-wand-magic-sparkles" style="color:#A78BFA;font-size:13px;"></i>
      </div>
      AI Character Builder
      <span style="margin-left:auto;" class="badge-neon badge-purple">AI Powered</span>
    </div>
    <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap;">
      <button onclick="generateCharacterBio()" class="btn-primary" style="font-size:12px;padding:8px 16px;">
        <i class="fas fa-magic"></i> Generate Bio
      </button>
      <button onclick="generateVoiceSamples()" style="background:rgba(167,139,250,0.1);border:1px solid rgba(167,139,250,0.3);color:#A78BFA;font-size:12px;font-weight:700;padding:8px 16px;border-radius:999px;border:none;cursor:pointer;display:flex;align-items:center;gap:6px;">
        <i class="fas fa-comment-dots"></i> Sample Posts
      </button>
      <button onclick="generateHashtags()" style="background:rgba(0,255,136,0.08);border:1px solid rgba(0,255,136,0.25);color:#00ff88;font-size:12px;font-weight:700;padding:8px 16px;border-radius:999px;cursor:pointer;display:flex;align-items:center;gap:6px;">
        <i class="fas fa-hashtag"></i> Hashtags
      </button>
    </div>
    <div id="aiOutput" class="cc-ai-output">
      <span style="color:#6a8aaa;font-style:italic;">Fill in the character setup above, then click "Generate Bio" to let AI build a complete character profile for you.</span>
    </div>
    <!-- Expert Mode (hidden by default) -->
    <details style="margin-top:12px;">
      <summary style="font-size:11px;color:#6a8aaa;cursor:pointer;user-select:none;font-weight:700;">⚙️ Expert: Raw Prompt Override</summary>
      <div style="margin-top:8px;">
        <textarea class="cc-input cc-textarea" id="expertPrompt" placeholder="Enter a custom system prompt to override AI behaviour..." style="min-height:60px;font-size:12px;"></textarea>
      </div>
    </details>
  </div>

  <!-- ⑥ CHARACTER PREVIEW -->
  <div class="cc-card">
    <div class="cc-section-title">
      <div class="cc-section-icon" style="background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.25);">
        <i class="fas fa-eye" style="color:#00E5FF;font-size:13px;"></i>
      </div>
      Character Preview
    </div>
    <div class="cc-preview-card">
      <div class="cc-avatar" id="bigAvatar">SS</div>
      <div class="cc-preview-name" id="bigName">Unnamed Character</div>
      <div class="cc-preview-role" id="bigRole">— No role defined —</div>
      <div class="cc-preview-text" id="bigBio">Complete the setup above to preview your character here. The AI will generate a sample post showing how they would write on social media.</div>
      <div class="cc-preview-tags" id="bigTags"></div>
    </div>
    <div style="margin-top:16px;">
      <div style="font-size:12px;font-weight:700;color:#6a8aaa;margin-bottom:10px;text-transform:uppercase;letter-spacing:1px;">Sample Post Preview</div>
      <div id="samplePost" style="background:rgba(2,8,22,0.9);border:1px solid rgba(0,229,255,0.15);border-radius:12px;padding:16px;font-size:14px;color:#c8e6ff;line-height:1.7;font-style:italic;min-height:60px;">
        <span style="color:#6a8aaa;">AI-generated sample post will appear here after generating the character...</span>
      </div>
    </div>
  </div>

  <!-- ⑦ LOCK & SAVE ACTIONS -->
  <div class="cc-card" style="border-color:rgba(255,214,0,0.22);">
    <div class="cc-section-title">
      <div class="cc-section-icon" style="background:rgba(255,214,0,0.08);border:1px solid rgba(255,214,0,0.28);">
        <i class="fas fa-lock" style="color:#FFD600;font-size:13px;"></i>
      </div>
      Lock & Save
    </div>
    <div style="display:flex;align-items:flex-start;gap:14px;flex-wrap:wrap;">
      <div style="flex:1;min-width:220px;">
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer;margin-bottom:12px;">
          <div class="toggle-switch" id="lockToggle" onclick="toggleLock()"><div class="toggle-knob"></div></div>
          <div>
            <div style="font-size:13px;font-weight:700;color:#fff;">Lock for Brand Consistency</div>
            <div style="font-size:11px;color:#6a8aaa;">Prevent accidental edits once published in campaigns</div>
          </div>
        </label>
      </div>
      <div class="cc-action-bar">
        <button onclick="saveCharacter(false)" class="btn-ghost" style="font-size:13px;padding:10px 20px;">
          <i class="fas fa-floppy-disk"></i> Save Draft
        </button>
        <button onclick="saveCharacter(true)" class="btn-primary" style="font-size:13px;padding:10px 22px;">
          <i class="fas fa-check"></i> Save & Lock
        </button>
      </div>
    </div>
  </div>

  <!-- ⑧ USE IN CAMPAIGN ACTIONS -->
  <div class="cc-card" style="border-color:rgba(255,45,120,0.22);">
    <div class="cc-section-title">
      <div class="cc-section-icon" style="background:rgba(255,45,120,0.1);border:1px solid rgba(255,45,120,0.25);">
        <i class="fas fa-rocket" style="color:#FF2D78;font-size:13px;"></i>
      </div>
      Use In Campaign
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">
      <a href="/content-studio" class="btn-pink" style="font-size:12px;padding:10px 14px;text-decoration:none;text-align:center;">
        <i class="fas fa-wand-magic-sparkles"></i><br>
        <span style="font-size:11px;margin-top:4px;display:block;">Create Studio</span>
      </a>
      <a href="/scheduler" style="background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.25);color:#00E5FF;font-size:12px;font-weight:700;padding:10px 14px;border-radius:999px;text-decoration:none;text-align:center;display:flex;flex-direction:column;align-items:center;gap:4px;">
        <i class="fas fa-calendar-plus"></i>
        <span style="font-size:11px;">Schedule Posts</span>
      </a>
      <a href="/report" style="background:rgba(167,139,250,0.1);border:1px solid rgba(167,139,250,0.25);color:#A78BFA;font-size:12px;font-weight:700;padding:10px 14px;border-radius:999px;text-decoration:none;text-align:center;display:flex;flex-direction:column;align-items:center;gap:4px;">
        <i class="fas fa-chart-line"></i>
        <span style="font-size:11px;">View Report</span>
      </a>
    </div>
    <div style="margin-top:14px;background:rgba(255,45,120,0.04);border:1px solid rgba(255,45,120,0.15);border-radius:10px;padding:12px 14px;font-size:12px;color:#a8b3c7;line-height:1.6;">
      <strong style="color:#FF2D78;">How it works:</strong> Once saved, this character will appear as a selectable voice in the Content Studio. All generated content will match their tone, style and brand voice automatically.
    </div>
  </div>

</div><!-- /.cc-wrap -->

<script>
var selectedPlatforms = [];
var selectedTones = [];
var isLocked = false;

function updatePreview() {
  var name = document.getElementById('charName').value || 'Unnamed Character';
  var role = document.getElementById('charRole').value || 'Define their role below';
  var personality = document.getElementById('charPersonality').value;
  var style = document.getElementById('charStyle').value;
  var initials = name.split(' ').map(function(w){ return w[0]||''; }).join('').substring(0,2).toUpperCase() || 'SS';

  // Update summary header
  document.getElementById('previewName').textContent = name;
  document.getElementById('previewRole').textContent = role;
  document.getElementById('previewAvatar').textContent = initials;
  document.getElementById('bigAvatar').textContent = initials;
  document.getElementById('bigName').textContent = name;
  document.getElementById('bigRole').textContent = role || '— No role defined —';

  // Tags
  var tags = [];
  if (personality) tags.push(personality);
  if (style) tags.push(style);
  var previewTags = document.getElementById('previewTags');
  var bigTags = document.getElementById('bigTags');
  var tagHtml = tags.map(function(t){ return '<span class="cc-preview-tag">' + t + '</span>'; }).join('') || '<span class="cc-locked-badge"><i class="fas fa-lock"></i> Unsaved</span>';
  previewTags.innerHTML = tagHtml;
  bigTags.innerHTML = tagHtml;
}

function togglePlatform(el, id) {
  el.classList.toggle('sel');
  if (selectedPlatforms.includes(id)) {
    selectedPlatforms = selectedPlatforms.filter(function(p){ return p !== id; });
  } else {
    selectedPlatforms.push(id);
  }
}

function toggleTone(el, tone) {
  el.classList.toggle('sel');
  if (selectedTones.includes(tone)) {
    selectedTones = selectedTones.filter(function(t){ return t !== tone; });
  } else {
    selectedTones.push(tone);
  }
}

function updateSlider(el, valId) {
  document.getElementById(valId).textContent = el.value;
}

function previewUploads(input) {
  var container = document.getElementById('uploadThumbs');
  container.innerHTML = '';
  Array.from(input.files).slice(0, 8).forEach(function(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = document.createElement('img');
      img.src = e.target.result;
      img.className = 'cc-thumb';
      container.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

function generateCharacterBio() {
  var name = document.getElementById('charName').value;
  var role = document.getElementById('charRole').value;
  var personality = document.getElementById('charPersonality').value;
  var style = document.getElementById('charStyle').value;
  var output = document.getElementById('aiOutput');

  if (!name || !role) {
    output.innerHTML = '<span style="color:#f87171;">Please enter a name and role first.</span>';
    return;
  }

  output.innerHTML = '<span style="color:#A78BFA;animation:pulse-anim 1s infinite;">\u2728 Generating character profile...</span>';

  // Demo AI output
  setTimeout(function() {
    output.innerHTML = '<strong style="color:#A78BFA;">' + name + '</strong> is a ' + (personality || 'professional') + ' ' + role.toLowerCase() + ' who brings authenticity and expertise to every post. ' +
      'With a ' + (style || 'engaging') + ' approach, ' + name + ' creates content that resonates deeply with their audience. ' +
      'They are known for their ability to translate complex ideas into relatable, actionable insights that drive real results. ' +
      'Whether on Instagram, LinkedIn or TikTok, ' + name + "'s voice remains consistent \u2014 always genuine, always value-driven.<br><br>" +
      '<strong style="color:#00E5FF;">Sample Post:</strong><br>' +
      '\u201cEvery big achievement started with a simple decision to begin. Stop waiting for the perfect moment \u2014 it doesn\u2019t exist. Start now, adjust as you go, and watch the compound effect do its magic. \ud83d\ude80 #' + (role.replace(/\s/g,'')) + ' #GrowthMindset #ActionOverPerfection\u201d';

    document.getElementById('samplePost').textContent = '\u201cEvery big achievement started with a simple decision to begin. Stop waiting for the perfect moment \u2014 it doesn\u2019t exist. Start now, adjust as you go, and watch the compound effect do its magic. \ud83d\ude80\u201d \u2014 ' + name;
  }, 1200);
}

function generateVoiceSamples() {
  var name = document.getElementById('charName').value || 'Your Character';
  var output = document.getElementById('aiOutput');
  output.innerHTML = '<span style="color:#A78BFA;">\u2728 Generating voice samples for ' + name + '...</span>';
  setTimeout(function() {
    output.innerHTML = '<strong style="color:#00E5FF;">Voice Samples for ' + name + ':</strong><br><br>' +
      '<div style="margin-bottom:10px;padding:10px;background:rgba(0,229,255,0.04);border-radius:8px;border-left:3px solid #00E5FF;"><strong style="color:#00E5FF;">Instagram:</strong><br>"The secret to consistency? Make it non-negotiable. 30 days in \u2014 here\u2019s what changed. \ud83d\udd25 #consistency #results"</div>' +
      '<div style="margin-bottom:10px;padding:10px;background:rgba(167,139,250,0.04);border-radius:8px;border-left:3px solid #A78BFA;"><strong style="color:#A78BFA;">LinkedIn:</strong><br>"After working with 200+ clients, I\u2019ve identified the #1 mistake businesses make with their social presence. Let me break it down..."</div>' +
      '<div style="padding:10px;background:rgba(255,45,120,0.04);border-radius:8px;border-left:3px solid #FF2D78;"><strong style="color:#FF2D78;">TikTok:</strong><br>"POV: You finally get your content strategy right and the algorithm starts working FOR you \ud83c\udf99\ufe0f\u2728 This changed everything..."</div>';
  }, 1000);
}

function generateHashtags() {
  var name = document.getElementById('charName').value || 'character';
  var role = document.getElementById('charRole').value || 'brand';
  var output = document.getElementById('aiOutput');
  output.innerHTML = '<strong style="color:#00ff88;">Recommended Hashtag Strategy:</strong><br><br>' +
    '<div style="color:#c8e6ff;">' +
    '<strong style="color:#00E5FF;">High Volume:</strong> #contentcreator #socialmedia #marketing #growthhacking<br><br>' +
    '<strong style="color:#A78BFA;">Mid Range:</strong> #' + role.replace(/\s+/g,'').toLowerCase() + 'tips #brandstrategy #contentmarketing<br><br>' +
    '<strong style="color:#FF2D78;">Niche:</strong> #' + name.replace(/\s+/g,'').toLowerCase() + ' #AIcontent #socialstrategy<br><br>' +
    '<strong style="color:#FFD600;">Always Use:</strong> #SocialStrategy #AIMarketing #AutoPost</div>';
}

function toggleLock() {
  isLocked = !isLocked;
  var toggle = document.getElementById('lockToggle');
  var status = document.getElementById('lockStatus');
  if (isLocked) {
    toggle.classList.add('on');
    status.innerHTML = '<i class="fas fa-lock"></i> Locked';
    status.style.cssText = 'display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:700;background:rgba(255,214,0,0.1);border:1px solid rgba(255,214,0,0.3);border-radius:999px;padding:5px 12px;color:#FFD600;';
  } else {
    toggle.classList.remove('on');
    status.innerHTML = '<i class="fas fa-unlock"></i> Draft';
    status.style.cssText = 'display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:700;background:rgba(255,68,68,0.1);border:1px solid rgba(255,68,68,0.3);border-radius:999px;padding:5px 12px;color:#ff6b6b;';
  }
}

function saveCharacter(lock) {
  var name = document.getElementById('charName').value;
  var role = document.getElementById('charRole').value;
  if (!name) {
    showBanner('\u26a0\ufe0f Please enter a character name.', false);
    return;
  }
  if (lock) toggleLock();
  var character = {
    name: name,
    role: role,
    personality: document.getElementById('charPersonality').value,
    style: document.getElementById('charStyle').value,
    bio: document.getElementById('charBio').value,
    tone: selectedTones,
    platforms: selectedPlatforms,
    keywords: document.getElementById('brandKeywords').value,
    avoidWords: document.getElementById('avoidWords').value,
    locked: isLocked,
    createdAt: new Date().toISOString()
  };
  // Save to localStorage for demo
  var chars = JSON.parse(localStorage.getItem('ssCharacters') || '[]');
  chars.push(character);
  localStorage.setItem('ssCharacters', JSON.stringify(chars));
  showBanner('\u2705 Character "' + name + '" saved successfully!', true);
  setTimeout(function(){ window.location.href = '/characters'; }, 1800);
}

function showBanner(msg, success) {
  var banner = document.getElementById('ccBanner');
  banner.textContent = msg;
  banner.style.display = 'flex';
  banner.style.color = success ? '#4ade80' : '#f87171';
  banner.style.borderColor = success ? 'rgba(74,222,128,0.25)' : 'rgba(248,113,113,0.25)';
  banner.style.background = success ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)';
  setTimeout(function(){ banner.style.display = 'none'; }, 4000);
}

// Initialize
updatePreview();
</script>
`

  return layout('Create Character', content, 'characters')
}
