import { layout, ssLogo } from './layout'

export function imageMakerPage(): string {

  const content = `
<style>
  /* ─── TOP BAR ─── */
  .im-topbar {
    position: sticky; top: 0; z-index: 30;
    background: rgba(5,8,22,0.96); backdrop-filter: blur(20px);
    border-bottom: 1.5px solid rgba(139,92,246,0.28);
    padding: 14px 24px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }

  /* ─── LAYOUT ─── */
  .im-layout {
    display: grid; grid-template-columns: 300px 1fr; gap: 0;
    min-height: calc(100vh - 60px);
  }
  @media(max-width:900px) { .im-layout { grid-template-columns: 1fr; } }

  /* ─── SIDEBAR ─── */
  .im-sidebar {
    background: linear-gradient(180deg, rgba(3,8,22,0.99), rgba(4,10,24,0.99));
    border-right: 1.5px solid rgba(139,92,246,0.2);
    padding: 20px 16px 120px; overflow-y: auto;
    display: flex; flex-direction: column; gap: 14px;
  }

  /* ─── CARD ─── */
  .im-card {
    background: linear-gradient(135deg, rgba(3,10,26,0.98), rgba(4,11,24,0.99));
    border: 1.5px solid rgba(139,92,246,0.25);
    border-radius: 14px; padding: 16px;
  }
  .im-card-title {
    font-size: 11px; font-weight: 800; color: #8B5CF6;
    text-transform: uppercase; letter-spacing: 1.2px;
    margin-bottom: 12px; display: flex; align-items: center; gap: 7px;
    text-shadow: 0 0 10px rgba(139,92,246,0.5);
  }
  .im-label { font-size: 11px; font-weight: 700; color: rgba(139,92,246,0.75);
    text-transform: uppercase; letter-spacing: 0.8px; display: block; margin-bottom: 6px; }
  .im-input, .im-select, .im-textarea {
    width: 100%; background: rgba(3,8,24,0.95);
    border: 1.5px solid rgba(139,92,246,0.2); border-radius: 10px;
    padding: 9px 12px; color: #F4F7FB; font-size: 13px; outline: none;
    box-sizing: border-box; font-family: inherit; transition: border-color 0.2s;
  }
  .im-input:focus, .im-select:focus, .im-textarea:focus {
    border-color: rgba(139,92,246,0.6);
    box-shadow: 0 0 0 3px rgba(139,92,246,0.1);
  }
  .im-select option { background: #04091c; }
  .im-textarea { resize: none; }

  /* ─── CHIPS ─── */
  .im-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .im-chip {
    padding: 5px 11px; border-radius: 999px; font-size: 11px; font-weight: 700;
    cursor: pointer; border: 1.5px solid rgba(139,92,246,0.22);
    background: rgba(139,92,246,0.05); color: #A8B3C7;
    transition: all 0.18s; user-select: none;
  }
  .im-chip:hover { border-color: rgba(139,92,246,0.5); color: #fff; }
  .im-chip.active { background: rgba(139,92,246,0.15); border-color: rgba(139,92,246,0.6);
    color: #8B5CF6; box-shadow: 0 0 8px rgba(139,92,246,0.2); }

  /* ─── CREDIT INDICATOR ─── */
  .im-credit-pill {
    display: flex; align-items: center; gap: 7px;
    background: rgba(255,176,32,0.08); border: 1px solid rgba(255,176,32,0.25);
    border-radius: 10px; padding: 8px 12px; font-size: 13px;
  }

  /* ─── GENERATE BUTTON ─── */
  .im-gen-btn {
    width: 100%; padding: 15px; border-radius: 14px; border: none; cursor: pointer;
    background: linear-gradient(135deg, #8B5CF6 0%, #C026D3 50%, #FF2DA6 100%);
    color: #fff; font-size: 14px; font-weight: 900;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    box-shadow: 0 0 30px rgba(139,92,246,0.4), 0 0 60px rgba(192,38,211,0.2);
    transition: all 0.25s;
  }
  .im-gen-btn:hover { transform: translateY(-2px);
    box-shadow: 0 0 50px rgba(139,92,246,0.6), 0 0 90px rgba(192,38,211,0.35); }

  /* ─── RIGHT AREA ─── */
  .im-right {
    background: linear-gradient(160deg, rgba(2,6,18,0.99), rgba(3,8,20,0.99));
    padding: 24px; display: flex; flex-direction: column; gap: 20px;
    overflow-y: auto;
  }

  /* ─── IMAGE GRID ─── */
  .im-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
  }
  .im-image-card {
    background: rgba(3,8,22,0.98); border: 1.5px solid rgba(139,92,246,0.2);
    border-radius: 18px; overflow: hidden;
    box-shadow: 0 0 20px rgba(139,92,246,0.05), 0 4px 16px rgba(0,0,0,0.4);
    transition: all 0.2s;
  }
  .im-image-card:hover { border-color: rgba(139,92,246,0.5);
    box-shadow: 0 0 35px rgba(139,92,246,0.15); transform: translateY(-2px); }
  .im-image-wrap {
    width: 100%; aspect-ratio: 1; background: rgba(3,8,22,0.99);
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .im-image-wrap img { width: 100%; height: 100%; object-fit: cover; }
  .im-image-placeholder {
    display: flex; flex-direction: column; align-items: center; gap: 12px;
    color: #4B5563;
  }
  .im-card-actions {
    padding: 12px 14px; display: flex; gap: 8px; flex-wrap: wrap;
    border-top: 1px solid rgba(139,92,246,0.12);
  }
  .im-action-btn {
    flex: 1; padding: 8px; border-radius: 10px; font-size: 12px; font-weight: 700;
    cursor: pointer; border: none; display: flex; align-items: center;
    justify-content: center; gap: 5px; transition: all 0.2s;
  }
  .im-action-save { background: rgba(0,245,155,0.1); color: #00F59B;
    border: 1px solid rgba(0,245,155,0.25); }
  .im-action-save:hover { background: rgba(0,245,155,0.2); }
  .im-action-copy { background: rgba(32,217,255,0.08); color: #20D9FF;
    border: 1px solid rgba(32,217,255,0.2); }
  .im-action-copy:hover { background: rgba(32,217,255,0.15); }
  .im-action-download { background: rgba(139,92,246,0.08); color: #8B5CF6;
    border: 1px solid rgba(139,92,246,0.2); }
  .im-action-download:hover { background: rgba(139,92,246,0.15); }
  .im-action-regen { background: rgba(255,176,32,0.08); color: #FFB020;
    border: 1px solid rgba(255,176,32,0.2); }
  .im-action-regen:hover { background: rgba(255,176,32,0.15); }

  /* ─── EMPTY STATE ─── */
  .im-empty {
    flex: 1; display: flex; flex-direction: column; align-items: center;
    justify-content: center; gap: 18px; text-align: center; padding: 60px 20px;
  }
  .im-empty-icon {
    width: 100px; height: 100px; border-radius: 28px;
    background: linear-gradient(135deg, rgba(139,92,246,0.15), rgba(192,38,211,0.08));
    border: 2px solid rgba(139,92,246,0.35);
    display: flex; align-items: center; justify-content: center;
    animation: imPulse 3s ease-in-out infinite;
  }
  @keyframes imPulse {
    0%,100% { box-shadow: 0 0 20px rgba(139,92,246,0.2); }
    50% { box-shadow: 0 0 45px rgba(139,92,246,0.45), 0 0 80px rgba(192,38,211,0.15); }
  }

  /* ─── SPINNER ─── */
  @keyframes spin { to { transform: rotate(360deg); } }
  .im-spinner {
    width: 32px; height: 32px; border: 3px solid rgba(139,92,246,0.2);
    border-top-color: #8B5CF6; border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* ─── LIBRARY SECTION ─── */
  .im-library-card {
    width: 80px; height: 80px; border-radius: 12px; overflow: hidden;
    border: 1.5px solid rgba(139,92,246,0.2); cursor: pointer;
    flex-shrink: 0; transition: all 0.2s;
  }
  .im-library-card:hover { border-color: rgba(139,92,246,0.6); transform: scale(1.05); }
  .im-library-card img { width: 100%; height: 100%; object-fit: cover; }
</style>

<!-- TOP BAR -->
<div class="im-topbar">
  <div style="display:flex;align-items:center;gap:14px;">
    <div class="im-empty-icon" style="width:40px;height:40px;border-radius:12px;animation:none;">
      <i class="fas fa-image" style="font-size:18px;color:#8B5CF6;"></i>
    </div>
    <div>
      <h1 style="font-size:19px;font-weight:900;color:#fff;margin:0;">AI Image Studio</h1>
      <p style="color:#A8B3C7;font-size:12px;margin:2px 0 0;">DALL-E 3 powered · Brand-consistent · Save to library</p>
    </div>
  </div>
  <div style="display:flex;align-items:center;gap:10px;">
    <div class="im-credit-pill">
      <i class="fas fa-bolt" style="color:#FFB020;font-size:12px;"></i>
      <span style="font-size:12px;font-weight:700;color:#FFB020;">4 cr per image</span>
    </div>
    <a href="/content-studio" style="display:inline-flex;align-items:center;gap:7px;padding:9px 16px;border-radius:999px;background:rgba(139,92,246,0.08);border:1.5px solid rgba(139,92,246,0.35);color:#8B5CF6;font-size:13px;font-weight:700;text-decoration:none;">
      <i class="fas fa-wand-magic-sparkles"></i> Content Studio
    </a>
  </div>
</div>

<!-- LAYOUT -->
<div class="im-layout">

  <!-- SIDEBAR -->
  <div class="im-sidebar">

    <!-- Image Prompt -->
    <div class="im-card">
      <div class="im-card-title"><i class="fas fa-pen-nib"></i> Image Prompt</div>
      <label class="im-label">Describe your image</label>
      <textarea id="imagePrompt" class="im-textarea" rows="4" placeholder="e.g. A professional woman holding a coffee in a minimalist Sydney cafe, soft morning light, cinematic quality..."></textarea>
      <button onclick="togglePromptIdeas()" style="margin-top:8px;width:100%;background:rgba(139,92,246,0.06);border:1.5px solid rgba(139,92,246,0.25);border-radius:10px;padding:7px;color:#8B5CF6;font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:space-between;">
        <span><i class="fas fa-lightbulb" style="margin-right:6px;"></i>Prompt Ideas</span>
        <i class="fas fa-chevron-down" id="ideaChevron" style="transition:transform 0.2s;"></i>
      </button>
      <div id="promptIdeas" style="display:none;margin-top:8px;display:flex;flex-direction:column;gap:5px;">
        ${[
          'Product hero shot on white marble, studio lighting',
          'Happy customer using product outdoors, golden hour',
          'Behind-the-scenes team working in modern office',
          'Flat lay of products with brand colours and props',
          'Professional headshot, confident, clean background',
          'Urban lifestyle shot, authentic, cinematic grain',
          'Social media-ready food photography, top-down',
          'Before/after transformation split image',
          'Motivational quote over brand-coloured background',
        ].map(idea => `
        <div onclick="usePromptIdea('${idea}')" style="padding:7px 10px;border-radius:8px;font-size:12px;color:#A8B3C7;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='rgba(139,92,246,0.08)';this.style.borderColor='rgba(139,92,246,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.03)';this.style.borderColor='rgba(255,255,255,0.06)'">
          <i class="fas fa-plus" style="color:#8B5CF6;font-size:9px;margin-right:6px;"></i>${idea}
        </div>`).join('')}
      </div>
    </div>

    <!-- Brand Context (auto-fill from report) -->
    <div class="im-card">
      <div class="im-card-title"><i class="fas fa-building"></i> Brand Context</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div>
          <label class="im-label">Brand Name</label>
          <input id="imBrandName" class="im-input" type="text" placeholder="Your brand name...">
        </div>
        <div>
          <label class="im-label">Industry</label>
          <input id="imIndustry" class="im-input" type="text" placeholder="e.g. Health & Wellness">
        </div>
      </div>
      <div style="margin-top:10px;font-size:11px;color:#4B5563;display:flex;align-items:center;gap:5px;">
        <i class="fas fa-magic" style="color:#8B5CF6;"></i> Auto-filled from your latest report
      </div>
    </div>

    <!-- Style -->
    <div class="im-card">
      <div class="im-card-title"><i class="fas fa-palette"></i> Style</div>
      <div class="im-chips" id="styleChips">
        ${['Photorealistic','Cinematic','Minimalist','Bold & Vibrant','Soft & Pastel','Dark & Moody','Editorial','Commercial','Illustrated'].map((s,i)=>`
        <span class="im-chip${i===0?' active':''}" onclick="selectStyle(this,'${s}')">${s}</span>`).join('')}
      </div>
    </div>

    <!-- Aspect Ratio -->
    <div class="im-card">
      <div class="im-card-title"><i class="fas fa-crop"></i> Aspect Ratio</div>
      <div class="im-chips" id="ratioChips">
        ${[
          { label:'Square 1:1', val:'1024x1024', hint:'Feed posts' },
          { label:'Portrait 9:16', val:'1024x1792', hint:'Stories/Reels' },
          { label:'Landscape 16:9', val:'1792x1024', hint:'YouTube/Cover' },
        ].map((r,i)=>`
        <span class="im-chip${i===0?' active':''}" onclick="selectRatio(this,'${r.val}')" style="flex:1;justify-content:center;flex-direction:column;padding:9px 10px;border-radius:12px;text-align:center;">
          <span style="font-size:12px;">${r.label}</span>
          <span style="font-size:10px;opacity:0.6;margin-top:2px;">${r.hint}</span>
        </span>`).join('')}
      </div>
    </div>

    <!-- Quality -->
    <div class="im-card">
      <div class="im-card-title"><i class="fas fa-star"></i> Quality</div>
      <div class="im-chips" id="qualChips">
        <span class="im-chip active" onclick="selectQual(this,'standard')" style="flex:1;text-align:center;">Standard<br><span style="font-size:10px;opacity:0.6;">4 cr</span></span>
        <span class="im-chip" onclick="selectQual(this,'hd')" style="flex:1;text-align:center;">HD<br><span style="font-size:10px;opacity:0.6;">6 cr</span></span>
      </div>
    </div>

    <!-- Count -->
    <div class="im-card">
      <div class="im-card-title"><i class="fas fa-layer-group"></i> Number of Images</div>
      <div class="im-chips" id="countChips">
        ${[1,2,3,4,5].map((n,i)=>`
        <span class="im-chip${i===0?' active':''}" onclick="selectCount(this,${n})" style="flex:1;text-align:center;">${n}<br><span style="font-size:10px;opacity:0.6;">${[4,8,12,14,18][i]}cr</span></span>`).join('')}
      </div>
    </div>

    <!-- Save to library toggle -->
    <div class="im-card" style="display:flex;align-items:center;justify-content:space-between;">
      <div>
        <div style="font-size:13px;font-weight:700;color:#F4F7FB;">Save to Library</div>
        <div style="font-size:11px;color:#6B7A99;margin-top:2px;">Auto-save generated images</div>
      </div>
      <div onclick="this.classList.toggle('on');document.getElementById('saveToggle').checked=!document.getElementById('saveToggle').checked;" style="width:44px;height:24px;border-radius:99px;background:rgba(139,92,246,0.15);border:1.5px solid rgba(139,92,246,0.35);cursor:pointer;position:relative;transition:all .2s;" id="saveToggleWrap">
        <div style="position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:#8B5CF6;transition:left .2s;" id="saveToggleBall"></div>
        <input type="checkbox" id="saveToggle" checked style="display:none;">
      </div>
    </div>

    <!-- Credit cost display -->
    <div style="background:rgba(255,176,32,0.06);border:1.5px solid rgba(255,176,32,0.2);border-radius:12px;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;">
      <div style="font-size:12px;color:#A8B3C7;">Generation cost</div>
      <div style="font-size:16px;font-weight:900;color:#FFB020;" id="totalCredits">4 credits</div>
    </div>

    <!-- Generate Button -->
    <button onclick="generateImages()" class="im-gen-btn" id="genImgBtn">
      <i class="fas fa-wand-magic-sparkles"></i>
      Generate <span id="genBtnCount">1 Image</span>
    </button>

  </div><!-- end sidebar -->

  <!-- RIGHT AREA -->
  <div class="im-right" id="imRight">

    <!-- Toolbar -->
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
      <div style="display:flex;align-items:center;gap:12px;">
        <h2 style="font-size:18px;font-weight:800;color:#fff;margin:0;">Generated Images</h2>
        <span id="imgCount" style="font-size:12px;color:#6B7A99;background:rgba(255,255,255,0.05);padding:3px 10px;border-radius:99px;"></span>
      </div>
      <div style="display:flex;gap:8px;">
        <button onclick="clearAll()" id="clearBtn" style="display:none;padding:8px 16px;border-radius:10px;border:1px solid rgba(248,113,113,0.3);background:rgba(248,113,113,0.06);color:#f87171;font-size:12px;font-weight:700;cursor:pointer;">
          <i class="fas fa-trash" style="margin-right:5px;"></i>Clear All
        </button>
        <button onclick="viewLibrary()" style="padding:8px 16px;border-radius:10px;border:1px solid rgba(139,92,246,0.3);background:rgba(139,92,246,0.06);color:#8B5CF6;font-size:12px;font-weight:700;cursor:pointer;">
          <i class="fas fa-photo-video" style="margin-right:5px;"></i>My Library
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div class="im-empty" id="imEmpty">
      <div class="im-empty-icon">
        <i class="fas fa-image" style="font-size:36px;color:#8B5CF6;"></i>
      </div>
      <div>
        <h3 style="font-size:18px;font-weight:800;color:#fff;margin-bottom:8px;">Your canvas is ready</h3>
        <p style="color:#6B7A99;font-size:14px;max-width:400px;line-height:1.7;">
          Describe your ideal image in the panel. Our AI will generate professional, brand-consistent visuals powered by DALL-E 3.
        </p>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:400px;">
        ${['Photorealistic','Cinematic quality','Brand-consistent','DALL-E 3 powered','HD available'].map(tag=>`
        <span style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);padding:5px 12px;border-radius:999px;font-size:12px;color:#8B5CF6;font-weight:600;">${tag}</span>`).join('')}
      </div>
    </div>

    <!-- Image Grid -->
    <div class="im-grid" id="imGrid" style="display:none;"></div>

    <!-- Library Section -->
    <div id="librarySection" style="display:none;">
      <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(139,92,246,0.3),transparent);margin:8px 0 20px;"></div>
      <h3 style="font-size:15px;font-weight:800;color:#8B5CF6;margin-bottom:14px;">
        <i class="fas fa-photo-video" style="margin-right:8px;"></i>Saved Library
      </h3>
      <div style="display:flex;gap:10px;flex-wrap:wrap;" id="libraryGrid">
        <div style="color:#4B5563;font-size:13px;padding:20px 0;">No saved images yet.</div>
      </div>
    </div>

  </div><!-- end right -->

</div><!-- end layout -->

<script>
let selectedStyle = 'Photorealistic';
let selectedRatio = '1024x1024';
let selectedQual = 'standard';
let selectedCount = 1;
const creditMap = {1:4,2:8,3:12,4:14,5:18};
const generatedImages = [];
const library = [];

function selectStyle(el, val) {
  document.querySelectorAll('#styleChips .im-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  selectedStyle = val;
}
function selectRatio(el, val) {
  document.querySelectorAll('#ratioChips .im-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  selectedRatio = val;
}
function selectQual(el, val) {
  document.querySelectorAll('#qualChips .im-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  selectedQual = val;
  updateCreditDisplay();
}
function selectCount(el, n) {
  document.querySelectorAll('#countChips .im-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  selectedCount = n;
  document.getElementById('genBtnCount').textContent = n + ' Image' + (n > 1 ? 's' : '');
  updateCreditDisplay();
}
function updateCreditDisplay() {
  const base = creditMap[selectedCount] || 4;
  const qual = selectedQual === 'hd' ? Math.round(base * 1.5) : base;
  document.getElementById('totalCredits').textContent = qual + ' credits';
}

function togglePromptIdeas() {
  const box = document.getElementById('promptIdeas');
  const ch = document.getElementById('ideaChevron');
  const isOpen = box.style.display !== 'none' && box.style.display !== '';
  box.style.display = isOpen ? 'none' : 'flex';
  ch.style.transform = isOpen ? '' : 'rotate(180deg)';
}
function usePromptIdea(idea) {
  document.getElementById('imagePrompt').value = idea;
}

async function generateImages() {
  const prompt = document.getElementById('imagePrompt').value.trim();
  if (!prompt) { showToast('Please enter an image prompt first.', '#f87171'); return; }

  const btn = document.getElementById('genImgBtn');
  btn.disabled = true;
  btn.innerHTML = '<div class="im-spinner"></div> Generating...';

  document.getElementById('imEmpty').style.display = 'none';
  document.getElementById('imGrid').style.display = 'grid';
  document.getElementById('clearBtn').style.display = 'flex';

  // Add loading placeholders
  const placeholders = [];
  for (let i = 0; i < selectedCount; i++) {
    const id = 'img_' + Date.now() + '_' + i;
    placeholders.push(id);
    addImageCard(id, null, prompt, true);
  }

  const brandName = document.getElementById('imBrandName').value;
  const industry = document.getElementById('imIndustry').value;
  const fullPrompt = [
    prompt,
    selectedStyle !== 'Photorealistic' ? selectedStyle + ' style' : '',
    brandName ? 'for ' + brandName + ' brand' : '',
    industry ? 'in the ' + industry + ' industry' : '',
    'professional quality, social media ready'
  ].filter(Boolean).join(', ');

  try {
    for (let i = 0; i < selectedCount; i++) {
      const resp = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: fullPrompt,
          size: selectedRatio,
          quality: selectedQual,
          style: 'vivid',
          saveToLibrary: document.getElementById('saveToggle').checked
        })
      });
      const data = await resp.json();
      if (data.imageUrl) {
        updateImageCard(placeholders[i], data.imageUrl);
        if (document.getElementById('saveToggle').checked) {
          addToLibrary(data.imageUrl);
        }
      } else {
        updateImageCard(placeholders[i], null, data.error || 'Generation failed');
      }
    }
    document.getElementById('imgCount').textContent = generatedImages.length + ' images';
    showToast('✓ ' + selectedCount + ' image' + (selectedCount > 1 ? 's' : '') + ' generated!', '#8B5CF6');
  } catch(e) {
    showToast('Generation failed. Please try again.', '#f87171');
    placeholders.forEach(id => updateImageCard(id, null, 'Failed'));
  }

  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> Generate <span id="genBtnCount">' + selectedCount + ' Image' + (selectedCount > 1 ? 's' : '') + '</span>';
}

function addImageCard(id, imgSrc, prompt, loading = false) {
  const grid = document.getElementById('imGrid');
  const card = document.createElement('div');
  card.className = 'im-image-card';
  card.id = 'card_' + id;
  card.innerHTML = \`
    <div class="im-image-wrap" id="wrap_\${id}">
      \${loading ? \`<div class="im-image-placeholder"><div class="im-spinner"></div><div style="font-size:12px;margin-top:10px;color:#6B7A99;">Creating...</div></div>\` : (imgSrc ? \`<img src="\${imgSrc}" alt="Generated">\` : \`<div class="im-image-placeholder"><i class="fas fa-exclamation-triangle" style="font-size:24px;color:#f87171;"></i><div style="font-size:12px;color:#f87171;">Failed</div></div>\`)}
    </div>
    <div style="padding:10px 14px;">
      <div style="font-size:11px;color:#6B7A99;line-height:1.5;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">\${prompt.slice(0,60)}...</div>
    </div>
    <div class="im-card-actions">
      <button class="im-action-btn im-action-save" onclick="saveToLib('\${id}')"><i class="fas fa-bookmark"></i>Save</button>
      <button class="im-action-btn im-action-copy" onclick="copyPrompt('\${id}','${prompt.replace(/'/g,"\\'")}')"><i class="fas fa-copy"></i>Prompt</button>
      <button class="im-action-btn im-action-download" onclick="dlImg('\${id}')"><i class="fas fa-download"></i>DL</button>
      <button class="im-action-btn im-action-regen" onclick="regenImg('\${id}','${prompt.replace(/'/g,"\\'")}')"><i class="fas fa-redo"></i></button>
    </div>
  \`;
  grid.appendChild(card);
  generatedImages.push({ id, src: imgSrc, prompt });
}

function updateImageCard(id, src, error = null) {
  const wrap = document.getElementById('wrap_' + id);
  if (!wrap) return;
  if (src) {
    wrap.innerHTML = \`<img src="\${src}" alt="Generated" style="width:100%;height:100%;object-fit:cover;">\`;
    const entry = generatedImages.find(e => e.id === id);
    if (entry) entry.src = src;
  } else {
    wrap.innerHTML = \`<div class="im-image-placeholder"><i class="fas fa-exclamation-triangle" style="font-size:24px;color:#f87171;"></i><div style="font-size:12px;color:#f87171;">\${error || 'Failed'}</div></div>\`;
  }
}

function addToLibrary(src) {
  library.push(src);
  const libGrid = document.getElementById('libraryGrid');
  if (library.length === 1) libGrid.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'im-library-card';
  card.innerHTML = \`<img src="\${src}" alt="Saved">\`;
  libGrid.appendChild(card);
}

function saveToLib(id) {
  const entry = generatedImages.find(e => e.id === id);
  if (entry && entry.src) { addToLibrary(entry.src); showToast('✓ Saved to library!', '#00F59B'); }
}
function copyPrompt(id, prompt) {
  navigator.clipboard.writeText(prompt).then(() => showToast('✓ Prompt copied!', '#20D9FF'));
}
function dlImg(id) {
  const entry = generatedImages.find(e => e.id === id);
  if (entry && entry.src) {
    const a = document.createElement('a');
    a.href = entry.src; a.download = 'social-strategy-image.png'; a.click();
  } else { showToast('Image not available for download.', '#f87171'); }
}
function regenImg(id, prompt) {
  document.getElementById('imagePrompt').value = prompt;
  generateImages();
}
function clearAll() {
  if (!confirm('Clear all generated images?')) return;
  document.getElementById('imGrid').innerHTML = '';
  document.getElementById('imGrid').style.display = 'none';
  document.getElementById('imEmpty').style.display = 'flex';
  document.getElementById('clearBtn').style.display = 'none';
  document.getElementById('imgCount').textContent = '';
  generatedImages.length = 0;
}
function viewLibrary() {
  const sec = document.getElementById('librarySection');
  sec.style.display = sec.style.display === 'none' ? 'block' : 'none';
}

function showToast(msg, color) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#0d1830;border:1.5px solid ' + color + ';color:#fff;padding:12px 24px;border-radius:12px;font-size:14px;font-weight:700;z-index:9999;box-shadow:0 0 20px ' + color + '40;white-space:nowrap;';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// Auto-fill from report
async function loadBrandContext() {
  try {
    const resp = await fetch('/api/account');
    const d = await resp.json();
  } catch(e) {}
}
loadBrandContext();
</script>
`

  return layout('AI Image Studio', content)
}
