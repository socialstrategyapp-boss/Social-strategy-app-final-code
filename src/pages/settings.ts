import { layout, topBar } from './layout'

export function settingsPage(): string {
  const content = `
  ${topBar('Settings', 'Manage your account, billing and preferences', '<button onclick="saveSettings()" style="background:linear-gradient(135deg,#00E5FF,#0070F3);color:#fff;font-size:12px;font-weight:700;padding:7px 14px;border-radius:999px;border:none;cursor:pointer;display:flex;align-items:center;gap:5px;"><i class="fas fa-save"></i> Save</button>')}

  <div style="padding:28px;max-width:900px;">

    <!-- Profile Card -->
    <div class="glass-dark" style="border-radius:18px;padding:24px;margin-bottom:24px;">
      <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0 0 20px;display:flex;align-items:center;gap:10px;">
        <i class="fas fa-user-circle" style="color:#00E5FF;"></i> Profile
      </h3>
      <div style="display:flex;align-items:center;gap:20px;margin-bottom:24px;flex-wrap:wrap;">
        <div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#00E5FF,#FF2D78);display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:900;color:#fff;flex-shrink:0;">SS</div>
        <div>
          <button style="background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.3);color:#00E5FF;font-size:13px;font-weight:700;padding:8px 16px;border-radius:10px;cursor:pointer;margin-right:8px;">
            <i class="fas fa-upload" style="margin-right:6px;"></i>Upload Photo
          </button>
          <button style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#9ca3af;font-size:13px;padding:8px 16px;border-radius:10px;cursor:pointer;">
            Remove
          </button>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;" class="grid-2">
        ${[
          { label: 'Full Name', id: 'fullName', type: 'text', placeholder: 'Your full name', icon: 'fas fa-user' },
          { label: 'Email Address', id: 'email', type: 'email', placeholder: 'your@email.com', icon: 'fas fa-envelope' },
          { label: 'Business Name', id: 'bizName', type: 'text', placeholder: 'Your business name', icon: 'fas fa-building' },
          { label: 'Website', id: 'website', type: 'url', placeholder: 'https://yourbusiness.com', icon: 'fas fa-globe' },
        ].map(f => `
        <div>
          <label style="font-size:11px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px;">${f.label}</label>
          <div style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:10px 14px;transition:border-color 0.2s;" onfocusin="this.style.borderColor='#00E5FF'" onfocusout="this.style.borderColor='rgba(255,255,255,0.1)'">
            <i class="${f.icon}" style="color:#6b7280;font-size:13px;flex-shrink:0;"></i>
            <input id="${f.id}" type="${f.type}" placeholder="${f.placeholder}" style="flex:1;background:transparent;border:none;outline:none;color:#fff;font-size:13px;">
          </div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Connected Accounts -->
    <div class="glass-dark" style="border-radius:18px;padding:24px;margin-bottom:24px;">
      <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0 0 20px;display:flex;align-items:center;gap:10px;">
        <i class="fas fa-link" style="color:#A78BFA;"></i> Connected Social Accounts
      </h3>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${[
          { platform: 'Instagram', icon: 'fab fa-instagram', bg: 'linear-gradient(135deg,#E1306C,#F77737)', connected: true, handle: '@yourbrand' },
          { platform: 'TikTok', icon: 'fab fa-tiktok', bg: 'linear-gradient(135deg,#010101,#69C9D0)', connected: true, handle: '@yourbrand' },
          { platform: 'Facebook', icon: 'fab fa-facebook', bg: 'linear-gradient(135deg,#1877F2,#0d5fcc)', connected: false, handle: '' },
          { platform: 'LinkedIn', icon: 'fab fa-linkedin', bg: 'linear-gradient(135deg,#0A66C2,#084c8f)', connected: false, handle: '' },
          { platform: 'X (Twitter)', icon: 'fab fa-twitter', bg: 'linear-gradient(135deg,#1DA1F2,#0d7abc)', connected: false, handle: '' },
          { platform: 'YouTube', icon: 'fab fa-youtube', bg: 'linear-gradient(135deg,#FF0000,#cc0000)', connected: false, handle: '' },
          { platform: 'Threads', icon: 'fas fa-at', bg: 'linear-gradient(135deg,#111,#333)', connected: false, handle: '' },
          { platform: 'Pinterest', icon: 'fab fa-pinterest', bg: 'linear-gradient(135deg,#E60023,#ad081b)', connected: false, handle: '' },
        ].map(acc => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:38px;height:38px;border-radius:12px;background:${acc.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <i class="${acc.icon}" style="color:#fff;font-size:16px;"></i>
            </div>
            <div>
              <div style="font-size:14px;font-weight:700;color:#fff;">${acc.platform}</div>
              <div style="font-size:12px;color:${acc.connected ? '#4ade80' : '#6b7280'};">${acc.connected ? acc.handle + ' · Connected' : 'Not connected'}</div>
            </div>
          </div>
          <button onclick="toggleAccount(this,'${acc.platform}')" style="font-size:12px;font-weight:700;padding:7px 14px;border-radius:10px;cursor:pointer;border:1px solid ${acc.connected ? 'rgba(248,113,113,0.3)' : 'rgba(0,229,255,0.3)'};background:${acc.connected ? 'rgba(248,113,113,0.08)' : 'rgba(0,229,255,0.08)'};color:${acc.connected ? '#f87171' : '#00E5FF'};">
            ${acc.connected ? '<i class="fas fa-unlink" style="margin-right:5px;"></i>Disconnect' : '<i class="fas fa-link" style="margin-right:5px;"></i>Connect'}
          </button>
        </div>`).join('')}
      </div>
    </div>

    <!-- Notifications -->
    <div class="glass-dark" style="border-radius:18px;padding:24px;margin-bottom:24px;">
      <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0 0 20px;display:flex;align-items:center;gap:10px;">
        <i class="fas fa-bell" style="color:#fbbf24;"></i> Notifications
      </h3>
      <div style="display:flex;flex-direction:column;gap:14px;">
        ${[
          { label: 'Post Published', sub: 'Get notified when a scheduled post goes live', on: true },
          { label: 'Weekly Analytics Report', sub: 'Receive a summary of your performance every Monday', on: true },
          { label: 'AI Insights', sub: 'Get notified about new growth opportunities detected', on: true },
          { label: 'Post Failed', sub: 'Alert if a post fails to publish', on: true },
          { label: 'Marketing Tips', sub: 'Receive AI-powered tips for your niche', on: false },
          { label: 'Product Updates', sub: 'New features and platform announcements', on: false },
        ].map(n => `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
          <div style="flex:1;">
            <div style="font-size:14px;font-weight:600;color:#fff;">${n.label}</div>
            <div style="font-size:12px;color:#6b7280;margin-top:2px;">${n.sub}</div>
          </div>
          <div class="toggle-wrap" onclick="toggleSwitch(this.querySelector('.toggle-switch'))">
            <div class="toggle-switch${n.on ? ' on' : ''}">
              <div class="toggle-knob"></div>
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Plan & Billing -->
    <div class="glass-dark" style="border-radius:18px;padding:24px;margin-bottom:24px;">
      <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0 0 20px;display:flex;align-items:center;gap:10px;">
        <i class="fas fa-gem" style="color:#FF2D78;"></i> Plan & Billing
      </h3>
      <div style="background:linear-gradient(135deg,rgba(0,229,255,0.07),rgba(0,112,243,0.07),rgba(124,58,237,0.07));border:2px solid rgba(0,229,255,0.3);border-radius:16px;padding:20px;margin-bottom:18px;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div>
            <div style="font-size:12px;font-weight:700;color:#00E5FF;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Current Plan</div>
            <div style="font-size:24px;font-weight:900;color:#fff;">Pro Plan</div>
            <div style="font-size:14px;color:#9ca3af;margin-top:2px;">$79/month · Renews May 4, 2026</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:13px;color:#4ade80;font-weight:700;margin-bottom:8px;">✓ Active</div>
            <a href="/pricing" style="background:linear-gradient(135deg,#00E5FF,#0070F3);color:#001a22;font-size:13px;font-weight:800;padding:9px 18px;border-radius:10px;text-decoration:none;display:inline-flex;align-items:center;gap:6px;">
              <i class="fas fa-arrow-up"></i> Upgrade to Business
            </a>
          </div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;" class="grid-3">
        ${[
          { label: 'AI Credits', value: '847/1000', bar: 84.7, color: '#00E5FF' },
          { label: 'Scheduled Posts', value: '24/Unlimited', bar: 100, color: '#4ade80' },
          { label: 'Connected Accounts', value: '2/8', bar: 25, color: '#A78BFA' },
        ].map(u => `
        <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:14px;">
          <div style="font-size:12px;color:#9ca3af;margin-bottom:6px;">${u.label}</div>
          <div style="font-size:16px;font-weight:800;color:#fff;margin-bottom:8px;">${u.value}</div>
          <div style="background:rgba(255,255,255,0.07);border-radius:999px;height:4px;overflow:hidden;">
            <div style="background:${u.color};height:4px;border-radius:999px;width:${Math.min(u.bar,100)}%;"></div>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Danger Zone -->
    <div style="background:rgba(248,113,113,0.04);border:1px solid rgba(248,113,113,0.15);border-radius:18px;padding:24px;">
      <h3 style="font-size:16px;font-weight:800;color:#f87171;margin:0 0 16px;display:flex;align-items:center;gap:10px;">
        <i class="fas fa-triangle-exclamation"></i> Danger Zone
      </h3>
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
        <div>
          <div style="font-size:14px;font-weight:700;color:#fff;">Delete Account</div>
          <div style="font-size:13px;color:#9ca3af;margin-top:2px;">Permanently delete your account and all data. This cannot be undone.</div>
        </div>
        <button onclick="confirmDelete()" style="background:rgba(248,113,113,0.08);border:1px solid rgba(248,113,113,0.3);color:#f87171;font-size:13px;font-weight:700;padding:9px 18px;border-radius:10px;cursor:pointer;">
          <i class="fas fa-trash" style="margin-right:6px;"></i>Delete Account
        </button>
      </div>
    </div>

    <!-- Save confirmation toast -->
    <div id="saveToast" style="display:none;position:fixed;bottom:90px;right:24px;z-index:100;background:rgba(74,222,128,0.15);border:1px solid rgba(74,222,128,0.3);border-radius:14px;padding:14px 20px;align-items:center;gap:10px;box-shadow:0 8px 24px rgba(0,0,0,0.4);">
      <i class="fas fa-check-circle" style="color:#4ade80;font-size:18px;"></i>
      <span style="font-size:14px;font-weight:700;color:#fff;">Settings saved successfully!</span>
    </div>
  </div>

  <script>
    function saveSettings() {
      const toast = document.getElementById('saveToast');
      toast.style.display = 'flex';
      setTimeout(() => { toast.style.display = 'none'; }, 3000);
    }

    function toggleAccount(btn, platform) {
      const isConnected = btn.textContent.includes('Disconnect');
      if (isConnected) {
        if (confirm('Disconnect ' + platform + '?')) {
          btn.innerHTML = '<i class="fas fa-link" style="margin-right:5px;"></i>Connect';
          btn.style.borderColor = 'rgba(0,229,255,0.3)';
          btn.style.background = 'rgba(0,229,255,0.08)';
          btn.style.color = '#00E5FF';
          const statusEl = btn.closest('[style*="border-radius:12px"]').querySelector('[style*="12px"]');
          if (statusEl) { statusEl.textContent = 'Not connected'; statusEl.style.color = '#6b7280'; }
        }
      } else {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:5px;"></i>Connecting...';
        btn.disabled = true;
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-unlink" style="margin-right:5px;"></i>Disconnect';
          btn.style.borderColor = 'rgba(248,113,113,0.3)';
          btn.style.background = 'rgba(248,113,113,0.08)';
          btn.style.color = '#f87171';
          btn.disabled = false;
          const statusEl = btn.closest('[style*="border-radius:12px"]').querySelector('[style*="12px"]');
          if (statusEl) { statusEl.textContent = '@yourbrand · Connected'; statusEl.style.color = '#4ade80'; }
        }, 1500);
      }
    }

    function confirmDelete() {
      if (confirm('Are you sure? This will permanently delete your account and all data. This cannot be undone.')) {
        alert('Account deletion request submitted. You will receive a confirmation email.');
      }
    }
  </script>
  `
  return layout('Settings', content, 'settings')
}
