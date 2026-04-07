import { layout, topBar } from './layout'

export function charactersPage(): string {
  const content = `
${topBar('AI Characters', 'Create persistent AI brand personas for all your content', '<button onclick="openCreateModal()" style="background:linear-gradient(135deg,#00E5FF,#0070F3);color:#fff;font-size:12px;font-weight:700;padding:7px 14px;border-radius:999px;border:none;cursor:pointer;display:flex;align-items:center;gap:5px;"><i class="fas fa-plus"></i> New Character</button>')}
<div style="padding:20px;">

<!-- STATS ROW -->
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;margin-bottom:28px;">
  <div class="stat-card" style="background:rgba(0,229,255,0.08);border:1px solid rgba(0,229,255,0.2);">
    <div style="font-size:28px;font-weight:900;color:#00E5FF;" id="totalCharacters">0</div>
    <div style="font-size:12px;color:#9ca3af;margin-top:4px;">Total Characters</div>
  </div>
  <div class="stat-card" style="background:rgba(124,58,237,0.08);border:1px solid rgba(124,58,237,0.2);">
    <div style="font-size:28px;font-weight:900;color:#a78bfa;" id="totalContent">0</div>
    <div style="font-size:12px;color:#9ca3af;margin-top:4px;">Posts Created</div>
  </div>
  <div class="stat-card" style="background:rgba(255,45,120,0.08);border:1px solid rgba(255,45,120,0.2);">
    <div style="font-size:28px;font-weight:900;color:#FF2D78;" id="totalVideos">0</div>
    <div style="font-size:12px;color:#9ca3af;margin-top:4px;">Video Scripts</div>
  </div>
  <div class="stat-card" style="background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);">
    <div style="font-size:28px;font-weight:900;color:#4ade80;" id="totalImages">0</div>
    <div style="font-size:12px;color:#9ca3af;margin-top:4px;">Images Generated</div>
  </div>
</div>

<!-- CHARACTERS GRID -->
<div id="charactersGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;"></div>

<!-- EMPTY STATE -->
<div id="emptyState" style="display:none;text-align:center;padding:60px 20px;">
  <div style="font-size:56px;margin-bottom:16px;">🤖</div>
  <h3 style="font-size:20px;font-weight:700;color:#fff;margin-bottom:8px;">No AI Characters Yet</h3>
  <p style="color:#6b7280;font-size:14px;max-width:400px;margin:0 auto 24px;">Create your first AI brand character or employee. They'll be your persistent voice across all content.</p>
  <button onclick="openCreateModal()" style="background:linear-gradient(135deg,#00E5FF,#7C3AED);border:none;color:#fff;padding:12px 24px;border-radius:12px;font-weight:700;cursor:pointer;">
    <i class="fas fa-plus" style="margin-right:8px;"></i> Create First Character
  </button>
</div>

<!-- ═══ CREATE / EDIT CHARACTER MODAL ═══ -->
<div id="createModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:1000;overflow-y:auto;padding:20px;">
  <div style="max-width:600px;margin:40px auto;background:#0d1117;border:1px solid rgba(255,255,255,0.1);border-radius:20px;overflow:hidden;">
    <!-- Modal Header -->
    <div style="padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:space-between;">
      <div>
        <h2 style="font-size:20px;font-weight:800;color:#fff;" id="modalTitle">Create AI Character</h2>
        <p style="font-size:13px;color:#6b7280;margin-top:4px;">Define their personality, voice, and appearance</p>
      </div>
      <button onclick="closeModal('createModal')" style="background:rgba(255,255,255,0.08);border:none;color:#9ca3af;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:18px;">✕</button>
    </div>

    <!-- Modal Body -->
    <div style="padding:28px;overflow-y:auto;max-height:70vh;">
      <input type="hidden" id="editCharId" value="">

      <!-- Avatar Preview -->
      <div style="display:flex;align-items:center;gap:20px;margin-bottom:28px;padding:20px;background:rgba(255,255,255,0.03);border-radius:16px;border:1px solid rgba(255,255,255,0.07);">
        <div id="avatarPreview" style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#00E5FF22,#7C3AED22);border:2px solid rgba(124,58,237,0.4);display:flex;align-items:center;justify-content:center;font-size:32px;overflow:hidden;flex-shrink:0;">🤖</div>
        <div>
          <div style="font-size:14px;font-weight:600;color:#fff;margin-bottom:4px;">Character Avatar</div>
          <div style="font-size:12px;color:#6b7280;margin-bottom:10px;">AI-generated from their description</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button onclick="generateAvatarPreview()" id="genAvatarBtn" style="background:rgba(124,58,237,0.2);border:1px solid rgba(124,58,237,0.4);color:#a78bfa;padding:7px 14px;border-radius:8px;cursor:pointer;font-size:12px;font-weight:600;">
              <i class="fas fa-magic" style="margin-right:6px;"></i>Generate Avatar
            </button>
            <button onclick="generateAvatarPreview()" id="regenAvatarBtn" style="display:none;background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.3);color:#00E5FF;padding:7px 14px;border-radius:8px;cursor:pointer;font-size:12px;font-weight:600;">
              <i class="fas fa-redo" style="margin-right:6px;"></i>Regenerate
            </button>
            <label style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#d1d5db;padding:7px 14px;border-radius:8px;cursor:pointer;font-size:12px;font-weight:600;display:inline-flex;align-items:center;gap:6px;">
              <i class="fas fa-upload"></i>Upload Custom
              <input type="file" accept="image/*" style="display:none;" onchange="uploadCustomAvatar(this)">
            </label>
          </div>
        </div>
      </div>

      <!-- Form Fields -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:#9ca3af;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.8px;">Character Name *</label>
          <input id="charName" type="text" placeholder="e.g. Alex, Mia, Coach Jay" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:10px 14px;border-radius:10px;font-size:14px;outline:none;">
        </div>
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:#9ca3af;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.8px;">Role / Title</label>
          <input id="charRole" type="text" placeholder="e.g. Brand Host, Sales Rep, Coach" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:10px 14px;border-radius:10px;font-size:14px;outline:none;">
        </div>
      </div>

      <div style="margin-bottom:16px;">
        <label style="display:block;font-size:12px;font-weight:600;color:#9ca3af;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.8px;">Personality Traits</label>
        <input id="charPersonality" type="text" placeholder="e.g. Energetic, witty, relatable, motivational" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:10px 14px;border-radius:10px;font-size:14px;outline:none;">
      </div>

      <div style="margin-bottom:16px;">
        <label style="display:block;font-size:12px;font-weight:600;color:#9ca3af;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.8px;">Voice & Writing Style</label>
        <input id="charVoice" type="text" placeholder="e.g. Casual, uses slang, short sentences, emoji-friendly" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:10px 14px;border-radius:10px;font-size:14px;outline:none;">
      </div>

      <div style="margin-bottom:16px;">
        <label style="display:block;font-size:12px;font-weight:600;color:#9ca3af;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.8px;">Physical Appearance <span style="color:#6b7280;font-weight:400;text-transform:none;">(for avatar & video)</span></label>
        <div style="display:grid;grid-template-columns:1fr auto;gap:8px;margin-bottom:8px;">
          <select id="charGender" style="background:rgba(10,15,30,0.9);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:9px 12px;border-radius:10px;font-size:13px;outline:none;">
            <option value="">Select gender (optional)</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Neutral / Robot">Neutral / Robot</option>
          </select>
        </div>
        <input id="charAppearance" type="text" placeholder="e.g. Athletic build, natural hair, always smiling, 28 years old, stylish streetwear" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:10px 14px;border-radius:10px;font-size:14px;outline:none;">
      </div>

      <div style="margin-bottom:16px;">
        <label style="display:block;font-size:12px;font-weight:600;color:#9ca3af;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.8px;">Backstory / Brand Origin</label>
        <textarea id="charBackstory" rows="3" placeholder="Who are they? What's their story? Why do they represent this brand?" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:10px 14px;border-radius:10px;font-size:14px;outline:none;resize:vertical;font-family:inherit;"></textarea>
      </div>

      <div style="margin-bottom:16px;">
        <label style="display:block;font-size:12px;font-weight:600;color:#9ca3af;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.8px;">Content Pillars <span style="color:#6b7280;font-weight:400;text-transform:none;">(topics they cover)</span></label>
        <input id="charPillars" type="text" placeholder="e.g. Fitness tips, healthy recipes, motivation, product reviews" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:10px 14px;border-radius:10px;font-size:14px;outline:none;">
      </div>

      <div style="margin-bottom:24px;">
        <label style="display:block;font-size:12px;font-weight:600;color:#9ca3af;margin-bottom:10px;text-transform:uppercase;letter-spacing:0.8px;">Active Platforms</label>
        <div style="display:flex;flex-wrap:wrap;gap:8px;" id="platformCheckboxes">
          ${[
            {id:'instagram',label:'Instagram',icon:'fa-instagram'},
            {id:'tiktok',label:'TikTok',icon:'fa-tiktok'},
            {id:'facebook',label:'Facebook',icon:'fa-facebook'},
            {id:'linkedin',label:'LinkedIn',icon:'fa-linkedin'},
            {id:'twitter',label:'X/Twitter',icon:'fa-x-twitter'},
            {id:'youtube',label:'YouTube',icon:'fa-youtube'},
            {id:'threads',label:'Threads',icon:'fa-at'},
            {id:'pinterest',label:'Pinterest',icon:'fa-pinterest'}
          ].map(p => `
          <label style="display:flex;align-items:center;gap:7px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:8px 14px;border-radius:20px;cursor:pointer;font-size:13px;color:#d1d5db;transition:all 0.2s;">
            <input type="checkbox" value="${p.id}" class="platformCheck" style="accent-color:#00E5FF;"> <i class="fab ${p.icon}"></i> ${p.label}
          </label>`).join('')}
        </div>
      </div>
    </div>

    <!-- Modal Footer -->
    <div style="padding:20px 28px;border-top:1px solid rgba(255,255,255,0.08);display:flex;gap:12px;justify-content:flex-end;">
      <button onclick="closeModal('createModal')" style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);color:#9ca3af;padding:10px 20px;border-radius:10px;cursor:pointer;font-size:14px;">Cancel</button>
      <button onclick="saveCharacter()" id="saveCharBtn" style="background:linear-gradient(135deg,#00E5FF,#7C3AED);border:none;color:#fff;padding:10px 24px;border-radius:10px;font-weight:700;cursor:pointer;font-size:14px;">
        <i class="fas fa-save" style="margin-right:8px;"></i>Save Character
      </button>
    </div>
  </div>
</div>

<!-- ═══ CHARACTER DETAIL MODAL ═══ -->
<div id="detailModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:1000;overflow-y:auto;padding:20px;">
  <div style="max-width:700px;margin:40px auto;background:#0d1117;border:1px solid rgba(255,255,255,0.1);border-radius:20px;overflow:hidden;">
    <div style="padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:space-between;">
      <h2 style="font-size:20px;font-weight:800;color:#fff;" id="detailName">Character</h2>
      <button onclick="closeModal('detailModal')" style="background:rgba(255,255,255,0.08);border:none;color:#9ca3af;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:18px;">✕</button>
    </div>
    <div style="padding:28px;" id="detailBody"></div>
    <div style="padding:20px 28px;border-top:1px solid rgba(255,255,255,0.08);display:flex;gap:10px;flex-wrap:wrap;">
      <button onclick="useCharacterForContent()" style="background:linear-gradient(135deg,#00E5FF,#0070F3);border:none;color:#fff;padding:10px 18px;border-radius:10px;font-weight:700;cursor:pointer;font-size:13px;flex:1;min-width:140px;">
        <i class="fas fa-pen-nib" style="margin-right:6px;"></i>Generate Posts
      </button>
      <button onclick="useCharacterForVideo()" style="background:linear-gradient(135deg,#FF2D78,#7C3AED);border:none;color:#fff;padding:10px 18px;border-radius:10px;font-weight:700;cursor:pointer;font-size:13px;flex:1;min-width:140px;">
        <i class="fas fa-video" style="margin-right:6px;"></i>Video Script
      </button>
      <button onclick="editCurrentCharacter()" style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);color:#d1d5db;padding:10px 18px;border-radius:10px;cursor:pointer;font-size:13px;">
        <i class="fas fa-edit"></i>
      </button>
      <button onclick="deleteCurrentCharacter()" style="background:rgba(248,113,113,0.1);border:1px solid rgba(248,113,113,0.3);color:#f87171;padding:10px 18px;border-radius:10px;cursor:pointer;font-size:13px;">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </div>
</div>

<!-- ═══ VIDEO SCRIPT MODAL ═══ -->
<div id="videoModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:1100;overflow-y:auto;padding:20px;">
  <div style="max-width:680px;margin:40px auto;background:#0d1117;border:1px solid rgba(255,255,255,0.1);border-radius:20px;overflow:hidden;">
    <div style="padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:space-between;">
      <div>
        <h2 style="font-size:20px;font-weight:800;color:#fff;">Generate Video Script</h2>
        <p style="font-size:13px;color:#6b7280;margin-top:4px;" id="videoModalSubtitle">with AI character</p>
      </div>
      <button onclick="closeModal('videoModal')" style="background:rgba(255,255,255,0.08);border:none;color:#9ca3af;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:18px;">✕</button>
    </div>
    <div style="padding:28px;" id="videoModalBody">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:#9ca3af;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.8px;">Brand Name</label>
          <input id="vsBrand" type="text" placeholder="Your brand" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:10px 14px;border-radius:10px;font-size:14px;outline:none;">
        </div>
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:#9ca3af;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.8px;">Industry</label>
          <input id="vsIndustry" type="text" placeholder="e.g. Fitness, SaaS, Fashion" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:10px 14px;border-radius:10px;font-size:14px;outline:none;">
        </div>
      </div>
      <div style="margin-bottom:16px;">
        <label style="display:block;font-size:12px;font-weight:600;color:#9ca3af;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.8px;">Video Topic</label>
        <input id="vsTopic" type="text" placeholder="What is this video about?" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:10px 14px;border-radius:10px;font-size:14px;outline:none;">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px;">
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:#9ca3af;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.8px;">Platform</label>
          <select id="vsPlatform" style="width:100%;background:#0d1117;border:1px solid rgba(255,255,255,0.1);color:#fff;padding:10px 12px;border-radius:10px;font-size:14px;outline:none;">
            <option value="TikTok">TikTok</option>
            <option value="Instagram Reels">Instagram Reels</option>
            <option value="YouTube Shorts">YouTube Shorts</option>
            <option value="YouTube">YouTube</option>
            <option value="Facebook">Facebook</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
        </div>
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:#9ca3af;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.8px;">Duration</label>
          <select id="vsDuration" style="width:100%;background:#0d1117;border:1px solid rgba(255,255,255,0.1);color:#fff;padding:10px 12px;border-radius:10px;font-size:14px;outline:none;">
            <option value="15">15 sec</option>
            <option value="30" selected>30 sec</option>
            <option value="60">60 sec</option>
            <option value="90">90 sec</option>
            <option value="180">3 min</option>
          </select>
        </div>
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:#9ca3af;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.8px;">Tone</label>
          <select id="vsTone" style="width:100%;background:#0d1117;border:1px solid rgba(255,255,255,0.1);color:#fff;padding:10px 12px;border-radius:10px;font-size:14px;outline:none;">
            <option value="Energetic">Energetic</option>
            <option value="Professional">Professional</option>
            <option value="Casual">Casual</option>
            <option value="Educational">Educational</option>
            <option value="Humorous">Humorous</option>
          </select>
        </div>
      </div>
      <div id="vsStatus" style="display:none;background:rgba(0,229,255,0.08);border:1px solid rgba(0,229,255,0.2);border-radius:12px;padding:14px;margin-bottom:16px;font-size:13px;color:#00E5FF;text-align:center;">
        <i class="fas fa-spinner fa-spin" style="margin-right:8px;"></i><span id="vsStatusText">Writing script...</span>
      </div>
      <div id="vsResult" style="display:none;"></div>
    </div>
    <div style="padding:20px 28px;border-top:1px solid rgba(255,255,255,0.08);display:flex;gap:12px;justify-content:flex-end;">
      <button onclick="closeModal('videoModal')" style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);color:#9ca3af;padding:10px 20px;border-radius:10px;cursor:pointer;font-size:14px;">Cancel</button>
      <button onclick="generateVideoScript()" id="vsGenBtn" style="background:linear-gradient(135deg,#FF2D78,#7C3AED);border:none;color:#fff;padding:10px 24px;border-radius:10px;font-weight:700;cursor:pointer;font-size:14px;">
        <i class="fas fa-film" style="margin-right:8px;"></i>Generate Script
      </button>
    </div>
  </div>
</div>

<style>
.stat-card { border-radius:16px;padding:20px;text-align:center; }
.char-card { background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:18px;overflow:hidden;transition:all 0.25s;cursor:pointer; }
.char-card:hover { border-color:rgba(0,229,255,0.35);transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,229,255,0.1); }
.char-card .card-header { padding:20px;display:flex;align-items:center;gap:16px; }
.char-card .card-body { padding:0 20px 20px; }
.char-card .avatar { width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#00E5FF22,#7C3AED22);border:2px solid rgba(124,58,237,0.4);display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;overflow:hidden; }
.char-card .avatar img { width:100%;height:100%;object-fit:cover; }
.trait-chip { display:inline-block;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);padding:4px 10px;border-radius:20px;font-size:11px;color:#9ca3af;margin:3px; }
.platform-dot { width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,0.08);display:inline-flex;align-items:center;justify-content:center;font-size:11px;color:#9ca3af;margin:2px; }
.section-card { background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:14px;margin-bottom:12px; }
</style>

<script>
let activeCharId = null;
let characters = [];

// ── Load characters on page load ────────────────────────────────────────────
async function loadCharacters() {
  try {
    const res = await fetch('/api/characters');
    const data = await res.json();
    characters = data.characters || [];
    document.getElementById('totalCharacters').textContent = characters.length;
    renderCharacters();
    loadContentStats();
  } catch(e) {
    console.error('Failed to load characters', e);
  }
}

async function loadContentStats() {
  try {
    const [postsRes, videosRes, imagesRes] = await Promise.all([
      fetch('/api/content-library?type=post&limit=1'),
      fetch('/api/content-library?type=video_script&limit=1'),
      fetch('/api/content-library?type=image&limit=1')
    ]);
    // We don't have count query - just show saved items
    const posts = await postsRes.json();
    const videos = await videosRes.json();
    const images = await imagesRes.json();
    // Fetch real counts
    const [allPosts, allVideos, allImages] = await Promise.all([
      fetch('/api/content-library?type=post&limit=1000').then(r=>r.json()),
      fetch('/api/content-library?type=video_script&limit=1000').then(r=>r.json()),
      fetch('/api/content-library?type=image&limit=1000').then(r=>r.json())
    ]);
    document.getElementById('totalContent').textContent = (allPosts.items||[]).length;
    document.getElementById('totalVideos').textContent = (allVideos.items||[]).length;
    document.getElementById('totalImages').textContent = (allImages.items||[]).length;
  } catch(e) {}
}

function renderCharacters() {
  const grid = document.getElementById('charactersGrid');
  const empty = document.getElementById('emptyState');
  if (!characters.length) {
    grid.style.display = 'none';
    empty.style.display = 'block';
    return;
  }
  grid.style.display = 'grid';
  empty.style.display = 'none';

  const platformIcons = {
    instagram: 'fa-instagram', tiktok: 'fa-tiktok', facebook: 'fa-facebook',
    linkedin: 'fa-linkedin', twitter: 'fa-x-twitter', youtube: 'fa-youtube',
    threads: 'fa-at', pinterest: 'fa-pinterest'
  };
  const platformColors = {
    instagram: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366)',
    tiktok: '#010101', facebook: '#1877f2', linkedin: '#0077b5',
    twitter: '#1DA1F2', youtube: '#FF0000', threads: '#000000', pinterest: '#E60023'
  };

  grid.innerHTML = characters.map(char => {
    const platforms = (() => { try { return JSON.parse(char.platforms || '[]'); } catch{return [];} })();
    const pillars = (() => { try { return JSON.parse(char.content_pillars || '[]'); } catch{return [];} })();
    const initials = char.name.split(' ').map((w) => w[0]).join('').substring(0,2).toUpperCase();

    return \`<div class="char-card" onclick="viewCharacter(\${char.id})">
      <div class="card-header">
        <div class="avatar">
          \${char.avatar_url
            ? \`<img src="\${char.avatar_url}" alt="\${char.name}">\`
            : \`<span style="font-size:22px;font-weight:900;color:#a78bfa;">\${initials}</span>\`}
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:16px;font-weight:800;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">\${char.name}</div>
          <div style="font-size:12px;color:#00E5FF;margin-top:2px;">\${char.role || 'Brand Ambassador'}</div>
          <div style="display:flex;gap:4px;margin-top:8px;flex-wrap:wrap;">
            \${platforms.slice(0,5).map(p => \`<span class="platform-dot"><i class="fab \${platformIcons[p] || 'fa-globe'}"></i></span>\`).join('')}
            \${platforms.length > 5 ? \`<span class="platform-dot">+\${platforms.length-5}</span>\` : ''}
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end;">
          <button onclick="event.stopPropagation();openEditModal(\${char.id})" style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);color:#9ca3af;width:30px;height:30px;border-radius:8px;cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center;">
            <i class="fas fa-edit"></i>
          </button>
          <button onclick="event.stopPropagation();deleteCharacter(\${char.id})" style="background:rgba(248,113,113,0.08);border:1px solid rgba(248,113,113,0.2);color:#f87171;width:30px;height:30px;border-radius:8px;cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center;">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="card-body">
        \${char.personality ? \`<div style="font-size:12px;color:#9ca3af;margin-bottom:10px;line-height:1.5;">\${char.personality}</div>\` : ''}
        \${pillars.length ? \`<div style="display:flex;flex-wrap:wrap;margin-bottom:10px;">
          \${pillars.slice(0,3).map(p => \`<span class="trait-chip">\${p}</span>\`).join('')}
          \${pillars.length > 3 ? \`<span class="trait-chip">+\${pillars.length-3} more</span>\` : ''}
        </div>\` : ''}
        <div style="display:flex;gap:8px;margin-top:12px;">
          <button onclick="event.stopPropagation();openVideoModal(\${char.id})" style="flex:1;background:linear-gradient(135deg,#FF2D7822,#7C3AED22);border:1px solid rgba(255,45,120,0.3);color:#FF2D78;padding:8px;border-radius:8px;cursor:pointer;font-size:12px;font-weight:600;">
            <i class="fas fa-video" style="margin-right:5px;"></i>Video Script
          </button>
          <button onclick="event.stopPropagation();window.location='/content-studio'" style="flex:1;background:rgba(0,229,255,0.08);border:1px solid rgba(0,229,255,0.2);color:#00E5FF;padding:8px;border-radius:8px;cursor:pointer;font-size:12px;font-weight:600;">
            <i class="fas fa-pen-nib" style="margin-right:5px;"></i>Content
          </button>
        </div>
      </div>
    </div>\`;
  }).join('');
}

// ── Open Create Modal ──────────────────────────────────────────────────────
function openCreateModal() {
  document.getElementById('modalTitle').textContent = 'Create AI Character';
  document.getElementById('editCharId').value = '';
  document.getElementById('charName').value = '';
  document.getElementById('charRole').value = '';
  document.getElementById('charPersonality').value = '';
  document.getElementById('charVoice').value = '';
  document.getElementById('charAppearance').value = '';
  document.getElementById('charBackstory').value = '';
  document.getElementById('charPillars').value = '';
  document.getElementById('avatarPreview').innerHTML = '🤖';
  document.querySelectorAll('.platformCheck').forEach(cb => cb.checked = false);
  document.getElementById('createModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// ── Open Edit Modal ────────────────────────────────────────────────────────
function openEditModal(id) {
  const char = characters.find(c => c.id === id);
  if (!char) return;
  document.getElementById('modalTitle').textContent = 'Edit Character';
  document.getElementById('editCharId').value = id;
  document.getElementById('charName').value = char.name || '';
  document.getElementById('charRole').value = char.role || '';
  document.getElementById('charPersonality').value = char.personality || '';
  document.getElementById('charVoice').value = char.voice_style || '';
  document.getElementById('charAppearance').value = char.appearance || '';
  document.getElementById('charBackstory').value = char.backstory || '';
  const pillars = (() => { try { return JSON.parse(char.content_pillars || '[]'); } catch{return [];} })();
  document.getElementById('charPillars').value = pillars.join(', ');
  const platforms = (() => { try { return JSON.parse(char.platforms || '[]'); } catch{return [];} })();
  document.querySelectorAll('.platformCheck').forEach(cb => {
    cb.checked = platforms.includes(cb.value);
  });
  if (char.avatar_url) {
    document.getElementById('avatarPreview').innerHTML = \`<img src="\${char.avatar_url}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">\`;
  } else {
    document.getElementById('avatarPreview').innerHTML = '🤖';
  }
  document.getElementById('createModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// ── Save Character ─────────────────────────────────────────────────────────
async function saveCharacter() {
  const name = document.getElementById('charName').value.trim();
  if (!name) { alert('Please enter a character name.'); return; }

  const editId = document.getElementById('editCharId').value;
  const platforms = Array.from(document.querySelectorAll('.platformCheck:checked')).map(cb => cb.value);
  const pillarsRaw = document.getElementById('charPillars').value;
  const contentPillars = pillarsRaw.split(',').map(s => s.trim()).filter(Boolean);

  const btn = document.getElementById('saveCharBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:8px;"></i>Saving...';

  const payload = {
    name,
    role: document.getElementById('charRole').value.trim() || 'Brand Ambassador',
    personality: document.getElementById('charPersonality').value.trim(),
    voiceStyle: document.getElementById('charVoice').value.trim(),
    appearance: document.getElementById('charAppearance').value.trim(),
    backstory: document.getElementById('charBackstory').value.trim(),
    platforms: JSON.stringify(platforms),
    contentPillars: JSON.stringify(contentPillars)
  };

  try {
    let res, data;
    if (editId) {
      res = await fetch(\`/api/characters/\${editId}\`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      data = await res.json();
    } else {
      res = await fetch('/api/characters', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      data = await res.json();
    }
    if (data.success !== false) {
      closeModal('createModal');
      loadCharacters();
    } else {
      alert(data.error || 'Save failed');
    }
  } catch(e) {
    alert('Save failed. Please try again.');
  }
  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-save" style="margin-right:8px;"></i>Save Character';
}

// ── Generate Avatar Preview ────────────────────────────────────────────────
async function generateAvatarPreview() {
  const name = (document.getElementById('charName')).value.trim();
  const appearance = (document.getElementById('charAppearance')).value.trim();
  const role = (document.getElementById('charRole')).value.trim();
  const personality = (document.getElementById('charPersonality')).value.trim();
  const gender = (document.getElementById('charGender')).value;

  const genBtn = document.getElementById('genAvatarBtn');
  const regenBtn = document.getElementById('regenAvatarBtn');
  const activeBtn = regenBtn && regenBtn.style.display !== 'none' ? regenBtn : genBtn;
  activeBtn.disabled = true;
  activeBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:6px;"></i>Generating...';

  const genderDesc = gender ? (gender + ' person, ') : '';
  const appearanceStr = appearance ? ('Appearance: ' + appearance + '.') : 'Friendly smile, modern professional style.';
  const personalityStr = personality ? ('Personality vibe: ' + personality + '.') : '';
  const prompt = \`Professional brand ambassador portrait. \${genderDesc}\${role || 'brand ambassador'}. \${appearanceStr} \${personalityStr} Style: polished, modern, digital illustration, vibrant gradient background, premium social media brand aesthetic. Clean headshot, confident, no text.\`;

  try {
    const res = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ prompt, style: 'vivid', size: '1024x1024', saveToLibrary: false })
    });
    const data = await res.json();
    if (data.success && data.url) {
      document.getElementById('avatarPreview').innerHTML = \`<img src="\${data.url}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" data-url="\${data.url}">\`;
      document.getElementById('avatarPreview').setAttribute('data-url', data.url);
      // Show regenerate button, hide generate button
      genBtn.style.display = 'none';
      if (regenBtn) regenBtn.style.display = 'inline-flex';
    } else {
      alert('Avatar generation failed: ' + (data.error || 'Unknown error'));
    }
  } catch(e) {
    alert('Avatar generation failed.');
  }
  activeBtn.disabled = false;
  if (activeBtn === regenBtn) {
    activeBtn.innerHTML = '<i class="fas fa-redo" style="margin-right:6px;"></i>Regenerate';
  } else {
    activeBtn.innerHTML = '<i class="fas fa-magic" style="margin-right:6px;"></i>Generate Avatar';
  }
}

function uploadCustomAvatar(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const url = e.target && e.target.result;
    document.getElementById('avatarPreview').innerHTML = \`<img src="\${url}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">\`;
    document.getElementById('avatarPreview').setAttribute('data-url', url);
    const genBtn = document.getElementById('genAvatarBtn');
    const regenBtn = document.getElementById('regenAvatarBtn');
    if (genBtn) genBtn.style.display = 'none';
    if (regenBtn) { regenBtn.style.display = 'inline-flex'; }
  };
  reader.readAsDataURL(file);
}

// Override saveCharacter to capture avatar URL
const _origSave = saveCharacter;
window.saveCharacter = async function() {
  // Patch avatarUrl into payload before saving
  const avatarEl = document.getElementById('avatarPreview');
  const avatarUrl = avatarEl.getAttribute('data-url') || '';
  // We'll add it by patching the fetch in saveCharacter
  window._pendingAvatarUrl = avatarUrl;
  await _origSave();
};

// Patch the REAL save to include avatarUrl
async function saveCharacter() {
  const name = document.getElementById('charName').value.trim();
  if (!name) { alert('Please enter a character name.'); return; }

  const editId = document.getElementById('editCharId').value;
  const platforms = Array.from(document.querySelectorAll('.platformCheck:checked')).map(cb => cb.value);
  const pillarsRaw = document.getElementById('charPillars').value;
  const contentPillars = pillarsRaw.split(',').map(s => s.trim()).filter(Boolean);
  const avatarEl = document.getElementById('avatarPreview');
  const avatarUrl = avatarEl.getAttribute('data-url') || (avatarEl.querySelector('img') ? avatarEl.querySelector('img').src : '');

  const btn = document.getElementById('saveCharBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:8px;"></i>Saving...';

  const payload = {
    name,
    role: document.getElementById('charRole').value.trim() || 'Brand Ambassador',
    personality: document.getElementById('charPersonality').value.trim(),
    voiceStyle: document.getElementById('charVoice').value.trim(),
    appearance: document.getElementById('charAppearance').value.trim(),
    backstory: document.getElementById('charBackstory').value.trim(),
    avatarUrl,
    platforms: JSON.stringify(platforms),
    contentPillars: JSON.stringify(contentPillars)
  };

  try {
    let res, data;
    if (editId) {
      res = await fetch('/api/characters/' + editId, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      data = await res.json();
    } else {
      res = await fetch('/api/characters', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      data = await res.json();
    }
    if (data.success !== false) {
      closeModal('createModal');
      loadCharacters();
    } else {
      alert(data.error || 'Save failed');
    }
  } catch(e) {
    alert('Save failed. Please try again.');
  }
  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-save" style="margin-right:8px;"></i>Save Character';
}

// ── View Character Detail ──────────────────────────────────────────────────
function viewCharacter(id) {
  const char = characters.find(c => c.id === id);
  if (!char) return;
  activeCharId = id;
  document.getElementById('detailName').textContent = char.name;
  const platforms = (() => { try { return JSON.parse(char.platforms || '[]'); } catch{return [];} })();
  const pillars = (() => { try { return JSON.parse(char.content_pillars || '[]'); } catch{return [];} })();
  const initials = char.name.split(' ').map(w => w[0]).join('').substring(0,2).toUpperCase();

  document.getElementById('detailBody').innerHTML = \`
    <div style="display:flex;align-items:center;gap:20px;margin-bottom:24px;">
      <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#00E5FF22,#7C3AED22);border:2px solid rgba(124,58,237,0.4);overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;">
        \${char.avatar_url ? \`<img src="\${char.avatar_url}" style="width:100%;height:100%;object-fit:cover;">\` : \`<span style="font-size:22px;font-weight:900;color:#a78bfa;">\${initials}</span>\`}
      </div>
      <div>
        <div style="font-size:22px;font-weight:900;color:#fff;">\${char.name}</div>
        <div style="font-size:13px;color:#00E5FF;margin-top:4px;">\${char.role || 'Brand Ambassador'}</div>
        <div style="font-size:11px;color:#6b7280;margin-top:4px;">Created \${new Date(char.created_at).toLocaleDateString()}</div>
      </div>
    </div>
    \${char.personality ? \`<div class="section-card"><div style="font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6px;">Personality</div><div style="font-size:14px;color:#d1d5db;">\${char.personality}</div></div>\` : ''}
    \${char.voice_style ? \`<div class="section-card"><div style="font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6px;">Voice & Style</div><div style="font-size:14px;color:#d1d5db;">\${char.voice_style}</div></div>\` : ''}
    \${char.appearance ? \`<div class="section-card"><div style="font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6px;">Appearance</div><div style="font-size:14px;color:#d1d5db;">\${char.appearance}</div></div>\` : ''}
    \${char.backstory ? \`<div class="section-card"><div style="font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6px;">Backstory</div><div style="font-size:14px;color:#d1d5db;line-height:1.7;">\${char.backstory}</div></div>\` : ''}
    \${pillars.length ? \`<div class="section-card"><div style="font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:8px;">Content Pillars</div><div>\${pillars.map(p=>\`<span class="trait-chip">\${p}</span>\`).join('')}</div></div>\` : ''}
    \${platforms.length ? \`<div class="section-card"><div style="font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:8px;">Active Platforms</div><div>\${platforms.map(p=>\`<span class="trait-chip"><i class="fab fa-\${p}" style="margin-right:4px;"></i>\${p}</span>\`).join('')}</div></div>\` : ''}
  \`;
  document.getElementById('detailModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function useCharacterForContent() {
  closeModal('detailModal');
  window.location = '/content-studio';
}

function useCharacterForVideo() {
  closeModal('detailModal');
  openVideoModal(activeCharId);
}

function editCurrentCharacter() {
  closeModal('detailModal');
  openEditModal(activeCharId);
}

async function deleteCurrentCharacter() {
  closeModal('detailModal');
  await deleteCharacter(activeCharId);
}

// ── Delete Character ───────────────────────────────────────────────────────
async function deleteCharacter(id) {
  if (!confirm('Delete this character? All their saved content will remain in the library.')) return;
  try {
    await fetch('/api/characters/' + id, { method: 'DELETE' });
    loadCharacters();
  } catch(e) { alert('Delete failed'); }
}

// ── Video Script Modal ─────────────────────────────────────────────────────
function openVideoModal(charId) {
  activeCharId = charId;
  const char = characters.find(c => c.id === charId);
  if (char) {
    document.getElementById('videoModalSubtitle').textContent = 'Starring: ' + char.name;
    document.getElementById('vsBrand').value = '';
  }
  document.getElementById('vsResult').style.display = 'none';
  document.getElementById('vsStatus').style.display = 'none';
  document.getElementById('videoModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

async function generateVideoScript() {
  const brand = document.getElementById('vsBrand').value.trim();
  const industry = document.getElementById('vsIndustry').value.trim();
  const topic = document.getElementById('vsTopic').value.trim();
  if (!brand || !topic) { alert('Please fill in Brand Name and Video Topic.'); return; }

  const btn = document.getElementById('vsGenBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:8px;"></i>Writing...';
  document.getElementById('vsStatus').style.display = 'block';
  document.getElementById('vsStatusText').textContent = 'GPT-4o is writing your video script...';
  document.getElementById('vsResult').style.display = 'none';

  try {
    const res = await fetch('/api/generate-video-script', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        brandName: brand,
        industry: industry || 'General',
        tone: document.getElementById('vsTone').value,
        topic,
        platform: document.getElementById('vsPlatform').value,
        duration: document.getElementById('vsDuration').value,
        characterId: activeCharId
      })
    });
    const data = await res.json();
    document.getElementById('vsStatus').style.display = 'none';
    if (data.success) {
      renderVideoScript(data);
    } else {
      alert(data.error || 'Script generation failed');
    }
  } catch(e) {
    document.getElementById('vsStatus').style.display = 'none';
    alert('Generation failed. Please try again.');
  }
  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-film" style="margin-right:8px;"></i>Generate Script';
}

function renderVideoScript(s) {
  const result = document.getElementById('vsResult');
  result.style.display = 'block';
  result.innerHTML = \`
    <div style="background:rgba(255,45,120,0.06);border:1px solid rgba(255,45,120,0.2);border-radius:14px;padding:18px;margin-bottom:14px;">
      <div style="font-size:16px;font-weight:800;color:#fff;margin-bottom:4px;">\${s.title || 'Video Script'}</div>
      <div style="font-size:12px;color:#FF2D78;">🎬 \${s.platform} · ~\${s.estimatedDuration || '30'}s</div>
    </div>
    <div style="background:rgba(255,193,7,0.06);border:1px solid rgba(255,193,7,0.2);border-radius:12px;padding:14px;margin-bottom:14px;">
      <div style="font-size:11px;font-weight:600;color:#fbbf24;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6px;">🎣 Hook (First 3 seconds)</div>
      <div style="font-size:14px;color:#fff;font-weight:600;">\${s.hook}</div>
    </div>
    \${s.scenes && s.scenes.length ? \`<div style="margin-bottom:14px;">
      <div style="font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:10px;">Scene Breakdown</div>
      \${s.scenes.map(sc => \`<div style="display:flex;gap:12px;padding:10px;background:rgba(255,255,255,0.03);border-radius:10px;margin-bottom:8px;border-left:3px solid rgba(0,229,255,0.4);">
        <div style="font-size:11px;color:#00E5FF;font-weight:700;min-width:52px;">\${sc.time}</div>
        <div><div style="font-size:12px;color:#9ca3af;margin-bottom:3px;">\${sc.action}</div><div style="font-size:13px;color:#d1d5db;font-style:italic;">&ldquo;\${sc.dialogue}&rdquo;</div></div>
      </div>\`).join('')}
    </div>\` : ''}
    <div style="background:rgba(0,229,255,0.05);border:1px solid rgba(0,229,255,0.15);border-radius:12px;padding:14px;margin-bottom:14px;">
      <div style="font-size:11px;font-weight:600;color:#00E5FF;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:8px;">📜 Full Script</div>
      <div style="font-size:13px;color:#d1d5db;line-height:1.8;white-space:pre-line;">\${s.script}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;">
      \${s.captions && s.captions.length ? \`<div style="background:rgba(255,255,255,0.03);border-radius:10px;padding:12px;border:1px solid rgba(255,255,255,0.07);">
        <div style="font-size:11px;font-weight:600;color:#9ca3af;margin-bottom:8px;text-transform:uppercase;">On-Screen Text</div>
        \${s.captions.map(cap => \`<div style="font-size:12px;color:#d1d5db;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.05);">&#x201C;\${cap}&#x201D;</div>\`).join('')}
      </div>\` : ''}
      <div style="background:rgba(255,255,255,0.03);border-radius:10px;padding:12px;border:1px solid rgba(255,255,255,0.07);">
        <div style="font-size:11px;font-weight:600;color:#9ca3af;margin-bottom:8px;text-transform:uppercase;">Details</div>
        <div style="font-size:12px;color:#d1d5db;margin-bottom:6px;"><strong style="color:#9ca3af;">CTA:</strong> \${s.callToAction || '—'}</div>
        <div style="font-size:12px;color:#d1d5db;margin-bottom:6px;"><strong style="color:#9ca3af;">Music:</strong> \${s.musicMood || '—'}</div>
        \${s.bRollSuggestions ? s.bRollSuggestions.map(b => \`<div style="font-size:11px;color:#6b7280;padding:2px 0;">📹 \${b}</div>\`).join('') : ''}
      </div>
    </div>
    \${s.hashtags ? \`<div style="display:flex;flex-wrap:wrap;gap:6px;">\${s.hashtags.map(h=>\`<span style="background:rgba(0,229,255,0.08);border:1px solid rgba(0,229,255,0.2);color:#00E5FF;padding:4px 10px;border-radius:20px;font-size:12px;">\${h}</span>\`).join('')}</div>\` : ''}
    <div style="margin-top:16px;padding:12px;background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.2);border-radius:10px;font-size:12px;color:#4ade80;">
      ✅ Saved to Content Library
    </div>
  \`;
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  document.body.style.overflow = '';
}

// Load on start
loadCharacters();
</script>
</div>
`

  return layout('AI Characters & Employees', content, 'characters')
}
