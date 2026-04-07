import { layout, topBar } from './layout'

export function uploadsPage(): string {
  const content = `
  ${topBar('Media Library', 'Upload, manage and reuse your brand assets', '<button onclick="document.getElementById(\"fileInput\").click()" style="background:linear-gradient(135deg,#00E5FF,#0070F3);color:#fff;font-size:12px;font-weight:700;padding:7px 14px;border-radius:999px;border:none;cursor:pointer;display:flex;align-items:center;gap:5px;"><i class="fas fa-cloud-upload-alt"></i> Upload</button><input type="file" id="fileInput" multiple accept="image/*,video/*" style="display:none;" onchange="handleUpload(this.files)">')}

  <div style="padding:24px 28px;">

    <!-- Filter Tabs + Stats -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        ${['All', 'AI Generated', 'Uploaded', 'Images', 'Videos'].map((tab, i) => `
        <button onclick="filterMedia(this,'${tab}')" class="media-filter-btn" style="padding:7px 14px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1px solid ${i===0?'rgba(0,229,255,0.5)':'rgba(255,255,255,0.1)'};background:${i===0?'rgba(0,229,255,0.12)':'transparent'};color:${i===0?'#00E5FF':'#9ca3af'};transition:all 0.2s;">${tab}</button>`).join('')}
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:8px 14px;display:flex;align-items:center;gap:8px;">
          <i class="fas fa-search" style="color:#6b7280;font-size:13px;"></i>
          <input id="searchMedia" type="text" placeholder="Search media..." onkeyup="searchMediaFiles()" style="background:transparent;border:none;outline:none;color:#fff;font-size:13px;width:160px;" placeholder="Search media...">
        </div>
        <div style="display:flex;gap:4px;">
          <button id="gridViewBtn" onclick="setView('grid')" style="background:rgba(0,229,255,0.12);border:1px solid rgba(0,229,255,0.3);color:#00E5FF;padding:8px 10px;border-radius:8px;cursor:pointer;">
            <i class="fas fa-grid-2"></i>
          </button>
          <button id="listViewBtn" onclick="setView('list')" style="background:transparent;border:1px solid rgba(255,255,255,0.1);color:#9ca3af;padding:8px 10px;border-radius:8px;cursor:pointer;">
            <i class="fas fa-list"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Bar -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px;" class="grid-4">
      ${[
        { label: 'Total Assets', value: '247', icon: 'fas fa-photo-film', color: '#00E5FF' },
        { label: 'AI Generated', value: '189', icon: 'fas fa-wand-magic-sparkles', color: '#A78BFA' },
        { label: 'Uploaded', value: '58', icon: 'fas fa-cloud-upload-alt', color: '#4ade80' },
        { label: 'Storage Used', value: '1.2 GB', icon: 'fas fa-hard-drive', color: '#fbbf24' },
      ].map(s => `
      <div class="gradient-card" style="border-radius:14px;padding:16px;display:flex;align-items:center;gap:12px;">
        <div style="width:38px;height:38px;border-radius:11px;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="${s.icon}" style="color:${s.color};font-size:16px;"></i>
        </div>
        <div>
          <div style="font-size:20px;font-weight:900;color:#fff;">${s.value}</div>
          <div style="font-size:12px;color:#9ca3af;">${s.label}</div>
        </div>
      </div>`).join('')}
    </div>

    <!-- Drop Zone -->
    <div id="dropZone" style="border:2px dashed rgba(0,229,255,0.2);border-radius:16px;padding:32px;text-align:center;margin-bottom:24px;transition:all 0.3s;cursor:pointer;" onclick="document.getElementById('fileInput').click()" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event)">
      <div style="width:56px;height:56px;border-radius:16px;background:rgba(0,229,255,0.08);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;">
        <i class="fas fa-cloud-upload-alt" style="color:#00E5FF;font-size:24px;"></i>
      </div>
      <div style="font-size:15px;font-weight:700;color:#fff;margin-bottom:4px;">Drop files here or click to upload</div>
      <div style="font-size:13px;color:#6b7280;">Supports PNG, JPG, GIF, MP4, WebP · Max 50MB per file</div>
    </div>

    <!-- Upload Progress (hidden) -->
    <div id="uploadProgress" style="display:none;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:16px;margin-bottom:20px;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
        <i class="fas fa-spinner fa-spin" style="color:#00E5FF;font-size:16px;"></i>
        <span style="font-size:14px;font-weight:700;color:#fff;" id="uploadStatusText">Uploading files...</span>
      </div>
      <div style="background:rgba(255,255,255,0.07);border-radius:999px;height:4px;overflow:hidden;">
        <div id="uploadProgressBar" style="background:linear-gradient(135deg,#00E5FF,#0070F3);height:4px;border-radius:999px;width:0%;transition:width 0.3s ease;"></div>
      </div>
    </div>

    <!-- Media Grid -->
    <div id="mediaGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;">
      ${generateMockMediaItems()}
    </div>

    <!-- Empty State (hidden by default) -->
    <div id="emptyMedia" style="display:none;text-align:center;padding:60px 20px;">
      <div style="font-size:48px;margin-bottom:16px;">🖼️</div>
      <h3 style="font-size:18px;font-weight:800;color:#fff;margin-bottom:8px;">No media found</h3>
      <p style="font-size:14px;color:#6b7280;margin-bottom:24px;">Upload images or generate AI visuals to populate your library.</p>
      <button onclick="document.getElementById('fileInput').click()" style="background:linear-gradient(135deg,#00E5FF,#0070F3);color:#001a22;font-size:14px;font-weight:800;padding:12px 24px;border-radius:12px;border:none;cursor:pointer;">
        <i class="fas fa-cloud-upload-alt" style="margin-right:8px;"></i> Upload First File
      </button>
    </div>

  </div>

  <!-- Image Preview Modal -->
  <div id="previewModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;" onclick="closePreview()">
    <div onclick="event.stopPropagation()" style="max-width:800px;width:100%;background:#0d1117;border:1px solid rgba(255,255,255,0.1);border-radius:20px;overflow:hidden;">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.07);">
        <span id="previewTitle" style="font-size:14px;font-weight:700;color:#fff;">Image Preview</span>
        <div style="display:flex;gap:8px;">
          <button id="previewDownload" onclick="downloadPreview()" style="background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.25);color:#00E5FF;font-size:12px;font-weight:700;padding:6px 12px;border-radius:8px;cursor:pointer;"><i class="fas fa-download"></i> Download</button>
          <button onclick="closePreview()" style="background:rgba(255,255,255,0.07);border:none;color:#9ca3af;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:16px;">✕</button>
        </div>
      </div>
      <div style="padding:20px;text-align:center;">
        <img id="previewImg" src="" alt="" style="max-width:100%;max-height:60vh;border-radius:12px;object-fit:contain;">
      </div>
      <div style="padding:0 20px 20px;display:flex;gap:8px;">
        <button onclick="copyPreviewUrl()" style="flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#d1d5db;font-size:13px;font-weight:600;padding:9px;border-radius:10px;cursor:pointer;"><i class="fas fa-link" style="margin-right:6px;"></i>Copy URL</button>
        <button onclick="useInContent()" style="flex:1;background:linear-gradient(135deg,#00E5FF,#0070F3);color:#001a22;font-size:13px;font-weight:800;padding:9px;border-radius:10px;border:none;cursor:pointer;"><i class="fas fa-wand-magic-sparkles" style="margin-right:6px;"></i>Use in Content</button>
      </div>
    </div>
  </div>

  <script>
    let currentView = 'grid';
    let currentFilter = 'All';
    let previewCurrentUrl = '';

    function filterMedia(btn, filter) {
      currentFilter = filter;
      document.querySelectorAll('.media-filter-btn').forEach(b => {
        b.style.borderColor = 'rgba(255,255,255,0.1)';
        b.style.background = 'transparent';
        b.style.color = '#9ca3af';
      });
      btn.style.borderColor = 'rgba(0,229,255,0.5)';
      btn.style.background = 'rgba(0,229,255,0.12)';
      btn.style.color = '#00E5FF';
      // In production: fetch filtered content from API
    }

    function setView(view) {
      currentView = view;
      const grid = document.getElementById('mediaGrid');
      if (view === 'grid') {
        grid.style.gridTemplateColumns = 'repeat(auto-fill,minmax(200px,1fr))';
        document.getElementById('gridViewBtn').style.background = 'rgba(0,229,255,0.12)';
        document.getElementById('gridViewBtn').style.color = '#00E5FF';
        document.getElementById('listViewBtn').style.background = 'transparent';
        document.getElementById('listViewBtn').style.color = '#9ca3af';
        grid.querySelectorAll('.media-item').forEach(el => { el.style.flexDirection = 'column'; });
      } else {
        grid.style.gridTemplateColumns = '1fr';
        document.getElementById('listViewBtn').style.background = 'rgba(0,229,255,0.12)';
        document.getElementById('listViewBtn').style.color = '#00E5FF';
        document.getElementById('gridViewBtn').style.background = 'transparent';
        document.getElementById('gridViewBtn').style.color = '#9ca3af';
      }
    }

    function searchMediaFiles() {
      const q = document.getElementById('searchMedia').value.toLowerCase();
      document.querySelectorAll('.media-item').forEach(el => {
        const title = el.getAttribute('data-title') || '';
        el.style.display = title.toLowerCase().includes(q) ? '' : 'none';
      });
    }

    function openPreview(url, title) {
      previewCurrentUrl = url;
      document.getElementById('previewImg').src = url;
      document.getElementById('previewTitle').textContent = title;
      document.getElementById('previewModal').style.display = 'flex';
    }

    function closePreview() {
      document.getElementById('previewModal').style.display = 'none';
    }

    function downloadPreview() {
      const a = document.createElement('a');
      a.href = previewCurrentUrl;
      a.download = 'social-strategy-asset';
      a.click();
    }

    function copyPreviewUrl() {
      navigator.clipboard.writeText(previewCurrentUrl).then(() => {
        alert('URL copied to clipboard!');
      });
    }

    function useInContent() {
      window.location.href = '/content-studio';
    }

    function handleDragOver(e) {
      e.preventDefault();
      document.getElementById('dropZone').style.borderColor = 'rgba(0,229,255,0.6)';
      document.getElementById('dropZone').style.background = 'rgba(0,229,255,0.05)';
    }

    function handleDragLeave(e) {
      document.getElementById('dropZone').style.borderColor = 'rgba(0,229,255,0.2)';
      document.getElementById('dropZone').style.background = 'transparent';
    }

    function handleDrop(e) {
      e.preventDefault();
      handleDragLeave(e);
      handleUpload(e.dataTransfer.files);
    }

    function handleUpload(files) {
      if (!files || files.length === 0) return;
      const prog = document.getElementById('uploadProgress');
      const bar = document.getElementById('uploadProgressBar');
      const txt = document.getElementById('uploadStatusText');
      prog.style.display = 'block';
      txt.textContent = 'Uploading ' + files.length + ' file(s)...';
      let pct = 0;
      const interval = setInterval(() => {
        pct += 10;
        bar.style.width = pct + '%';
        if (pct >= 100) {
          clearInterval(interval);
          txt.textContent = '✓ Upload complete! ' + files.length + ' file(s) added to library.';
          setTimeout(() => { prog.style.display = 'none'; }, 3000);
        }
      }, 150);
    }
  </script>
  `
  return layout('Media Library', content, 'uploads')
}

function generateMockMediaItems(): string {
  const mockItems = [
    { title: 'Product Hero Shot', type: 'AI Generated', date: '2 hrs ago', gradient: 'linear-gradient(135deg,#00E5FF,#0070F3)' },
    { title: 'Brand Logo Mockup', type: 'Uploaded', date: '5 hrs ago', gradient: 'linear-gradient(135deg,#7C3AED,#FF2D78)' },
    { title: 'Instagram Story BG', type: 'AI Generated', date: '1 day ago', gradient: 'linear-gradient(135deg,#E1306C,#F77737)' },
    { title: 'Team Photo Edit', type: 'Uploaded', date: '2 days ago', gradient: 'linear-gradient(135deg,#10B981,#059669)' },
    { title: 'TikTok Thumbnail', type: 'AI Generated', date: '3 days ago', gradient: 'linear-gradient(135deg,#010101,#69C9D0)' },
    { title: 'LinkedIn Banner', type: 'AI Generated', date: '4 days ago', gradient: 'linear-gradient(135deg,#0A66C2,#084c8f)' },
    { title: 'Facebook Ad Creative', type: 'Uploaded', date: '5 days ago', gradient: 'linear-gradient(135deg,#1877F2,#0d5fcc)' },
    { title: 'YouTube Thumbnail', type: 'AI Generated', date: '1 week ago', gradient: 'linear-gradient(135deg,#FF0000,#cc0000)' },
  ]
  return mockItems.map(item => `
  <div class="media-item glass" data-title="${item.title}" style="border-radius:14px;overflow:hidden;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 12px 32px rgba(0,0,0,0.4)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
    <div onclick="openPreview('https://picsum.photos/400/300?random=${Math.floor(Math.random()*100)}','${item.title}')" style="aspect-ratio:4/3;background:${item.gradient};display:flex;align-items:center;justify-content:center;position:relative;">
      <i class="fas fa-image" style="color:rgba(255,255,255,0.3);font-size:32px;"></i>
      <div style="position:absolute;top:8px;right:8px;background:rgba(0,0,0,0.5);border-radius:6px;padding:2px 6px;font-size:10px;font-weight:700;color:#fff;">${item.type === 'AI Generated' ? '✨ AI' : '☁ Upload'}</div>
    </div>
    <div style="padding:10px 12px;">
      <div style="font-size:12px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.title}</div>
      <div style="font-size:11px;color:#6b7280;margin-top:3px;">${item.date}</div>
    </div>
  </div>`).join('')
}
