const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the entire s-settings body with robust, foolproof, beautiful markup
const oldSettingsFullMatch = /<div class="scr" id="s-settings">[\s\S]*?<\/div>\s*<\/div>\s*(?=<div class="scr" id="s-subscription">)/;

const newSettingsFullHtml = `<div class="scr" id="s-settings">
  <div class="nav">
    <h2 class="nav-title">Settings</h2>
  </div>
  <div class="bd" style="padding-bottom:120px;overflow-y:auto">
    
    <!-- Subscription usage -->
    <div class="slbl" style="font-size:11px;font-weight:800;color:var(--t3);text-transform:uppercase;letter-spacing:0.8px">Subscription</div>
    <div class="usage-card" style="background:#fff;border:1px solid #E8E9F3;border-radius:14px;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,0.04)">
      <div class="usage-top" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <div class="usage-plan" style="font-weight:800;color:#1A1A2E;font-size:15px">🌟 Family Plan</div>
        <div class="usage-num" style="font-weight:800;color:var(--p);font-size:14px">187 / 450 min</div>
      </div>
      <div class="ubar-bg" style="width:100%;height:8px;background:#F0F2F8;border-radius:4px;overflow:hidden;margin-bottom:8px">
        <div class="ubar-fill" style="width:41%;height:100%;background:var(--p);border-radius:4px"></div>
      </div>
      <div class="usage-label" style="font-size:12px;color:#9799B8">263 minutes remaining this month · Resets Sept 1</div>
    </div>
    <button class="btn bo bfull" onclick="go('s-subscription')" style="margin-top:6px;border:2px solid var(--p);color:var(--p);background:#fff;padding:14px;border-radius:14px;font-weight:800;font-size:15px;cursor:pointer;width:100%">Manage Subscription</button>

    <!-- Members section -->
    <div class="slbl" style="margin-top:16px;font-size:11px;font-weight:800;color:var(--t3);text-transform:uppercase;letter-spacing:0.8px">Members</div>
    <div class="smlist compact" id="settings-members-list" style="display:flex;flex-direction:column;gap:10px">
      <!-- Dynamically rendered -->
    </div>
    <button class="btn bo bfull" onclick="go('s-add-member')" style="margin-top:6px;border:2px solid var(--p);color:var(--p);background:#fff;padding:14px;border-radius:14px;font-weight:800;font-size:15px;cursor:pointer;width:100%">+ Add Member</button>

    <!-- App Settings section -->
    <div class="slbl" style="margin-top:18px;font-size:11px;font-weight:800;color:var(--t3);text-transform:uppercase;letter-spacing:0.8px">App Settings</div>
    <div class="slist" style="background:#fff;border-radius:14px;border:1px solid #E8E9F3;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);display:flex;flex-direction:column">
      <div class="srow srow-nc" style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #E8E9F3;font-size:14px;color:#1A1A2E">
        <span style="font-weight:700">App Language</span><span class="sval" style="color:#9799B8;font-size:13px;font-weight:700">English 🇺🇸</span>
      </div>
      <div class="srow srow-nc" style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #E8E9F3;font-size:14px;color:#1A1A2E">
        <span style="font-weight:700">Heritage Language</span><span class="sval" style="color:#9799B8;font-size:13px;font-weight:700">Korean 🇰🇷</span>
      </div>
      <div class="srow srow-nc" style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #E8E9F3;font-size:14px;color:#1A1A2E">
        <span style="font-weight:700">Target Language</span><span class="sval" style="color:#9799B8;font-size:13px;font-weight:700">English 🇺🇸</span>
      </div>
      <div class="srow" style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #E8E9F3;font-size:14px;color:#1A1A2E">
        <span style="font-weight:700">AI Hints for Parents</span>
        <div class="tgl on" onclick="toggleSw(this)"><div class="knob"></div></div>
      </div>
      <div class="srow" style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;font-size:14px;color:#1A1A2E">
        <span style="font-weight:700">Progress Notifications</span>
        <div class="tgl" onclick="toggleSw(this)"><div class="knob"></div></div>
      </div>
    </div>

    <!-- ── TRUST & PRIVACY PROMINENT TOGGLE BUTTON & CARD ── -->
    <div class="slbl" style="margin-top:20px;font-size:11px;font-weight:800;color:var(--t3);text-transform:uppercase;letter-spacing:0.8px">Trust & Privacy</div>
    
    <!-- Prominent Big Action Button with Toggle Switch -->
    <button type="button" id="btn-privacy-toggle" onclick="togglePrivacyAccordion()" style="width:100%;background:#F0F7FF;border:2px solid #2B88D9;border-radius:14px;padding:15px 16px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;box-shadow:0 3px 12px rgba(43,136,217,0.12);transition:all .2s ease;margin-top:6px;font-family:var(--font);box-sizing:border-box">
      <div style="display:flex;align-items:center;gap:12px;text-align:left">
        <div style="width:36px;height:36px;border-radius:10px;background:#2B88D9;color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <div>
          <div style="font-size:14.5px;font-weight:900;color:#1A1A2E">AI Safety & Privacy Policy</div>
          <div id="privacy-toggle-state-text" style="font-size:12px;color:#2B88D9;font-weight:800;margin-top:2px">Tap to view child safety terms ▼</div>
        </div>
      </div>
      <div class="tgl" id="tgl-privacy-terms" style="pointer-events:none;flex-shrink:0"><div class="knob"></div></div>
    </button>

    <!-- Expandable Rich Policy Details Container -->
    <div id="privacy-content" style="display:none;background:#FFFFFF;border:2px solid #2B88D9;border-radius:14px;padding:16px 18px 20px;margin-top:10px;box-shadow:0 8px 24px rgba(43,136,217,0.14)">
      
      <div style="font-size:13px;color:#242848;line-height:1.6;background:#F4F8FF;border:1px solid #D6E6FF;border-radius:10px;padding:12px 14px;margin-bottom:16px;font-weight:600">
        🛡️ At <strong>LULO</strong>, your child’s emotional safety, digital well-being, and family privacy are built into every layer of our technology.
      </div>

      <div style="display:flex;flex-direction:column;gap:16px">
        <!-- 1 -->
        <div>
          <div style="font-size:14px;font-weight:800;color:#1A1A2E;display:flex;align-items:center;gap:8px">
            <span>🛡️</span> 1. Zero Public AI Training on Child Voice
          </div>
          <div style="font-size:12.5px;color:#555770;line-height:1.65;margin-top:4px;padding-left:26px">
            Your child’s voice recordings and conversations are strictly isolated and <strong>never used to train public generative AI models</strong> (like ChatGPT, Claude, or open-source speech models) and never sold to third parties.
          </div>
        </div>

        <!-- 2 -->
        <div>
          <div style="font-size:14px;font-weight:800;color:#1A1A2E;display:flex;align-items:center;gap:8px">
            <span>👶</span> 2. Age-Appropriate AI Safety Guardrails
          </div>
          <div style="font-size:12.5px;color:#555770;line-height:1.65;margin-top:4px;padding-left:26px">
            Every storyline and AI dialogue response passes through strict pedagogical safety filters. Frightening themes, mature topics, violence, and unvetted content are proactively filtered out in real-time.
          </div>
        </div>

        <!-- 3 -->
        <div>
          <div style="font-size:14px;font-weight:800;color:#1A1A2E;display:flex;align-items:center;gap:8px">
            <span>🔒</span> 3. COPPA & GDPR-K Certified Standards
          </div>
          <div style="font-size:12.5px;color:#555770;line-height:1.65;margin-top:4px;padding-left:26px">
            Compliant with global child privacy regulations. All network transmissions use TLS 1.3, and cloud storage is encrypted with AES-256. Zero advertising SDKs or tracking scripts.
          </div>
        </div>

        <!-- 4 -->
        <div>
          <div style="font-size:14px;font-weight:800;color:#1A1A2E;display:flex;align-items:center;gap:8px">
            <span>⚙️</span> 4. 100% Parental Control & 1-Click Erasure
          </div>
          <div style="font-size:12.5px;color:#555770;line-height:1.65;margin-top:4px;padding-left:26px">
            You can turn off recording anytime before starting an adventure. Parents can also permanently erase all conversation history and vocabulary logs with a single tap in Settings.
          </div>
        </div>

        <!-- 5 -->
        <div>
          <div style="font-size:14px;font-weight:800;color:#1A1A2E;display:flex;align-items:center;gap:8px">
            <span>🧸</span> 5. Physical Toy Hardware Security
          </div>
          <div style="font-size:12.5px;color:#555770;line-height:1.65;margin-top:4px;padding-left:26px">
            The toy pairs strictly over encrypted Bluetooth with your verified parent app. The toy has no camera, no location GPS tracking, and no open internet connection.
          </div>
        </div>

        <!-- Contact Box -->
        <div style="background:#FFF9F2;border:1px solid #FFE0B2;border-radius:10px;padding:13px;text-align:center;margin-top:4px">
          <div style="font-size:13px;font-weight:800;color:#E65100">Questions or Data Privacy Inquiries?</div>
          <div style="font-size:12px;color:#FF6B35;font-weight:800;margin-top:2px">privacy@lulo-learning.com</div>
        </div>
      </div>
    </div>

  </div>
</div>\n\n`;

html = html.replace(oldSettingsFullMatch, newSettingsFullHtml);

// Make sure togglePrivacyAccordion is robust
const togglePrivacyJs = `
function togglePrivacyAccordion() {
  const content = document.getElementById('privacy-content');
  const tgl = document.getElementById('tgl-privacy-terms');
  const txt = document.getElementById('privacy-toggle-state-text');
  const btn = document.getElementById('btn-privacy-toggle');
  
  if (!content) return;
  
  const isHidden = content.style.display === 'none' || content.style.display === '';
  
  if (isHidden) {
    content.style.display = 'block';
    if (tgl) tgl.classList.add('on');
    if (txt) {
      txt.textContent = 'Tap to hide child safety terms ▲';
      txt.style.color = '#0E6DB7';
    }
    if (btn) {
      btn.style.borderColor = '#0E6DB7';
      btn.style.boxShadow = '0 6px 20px rgba(43,136,217,0.25)';
    }
    setTimeout(() => {
      content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 40);
  } else {
    content.style.display = 'none';
    if (tgl) tgl.classList.remove('on');
    if (txt) {
      txt.textContent = 'Tap to view child safety terms ▼';
      txt.style.color = '#2B88D9';
    }
    if (btn) {
      btn.style.borderColor = '#2B88D9';
      btn.style.boxShadow = '0 3px 12px rgba(43,136,217,0.12)';
    }
  }
}
`;

// Replace existing togglePrivacyAccordion definition
html = html.replace(/function togglePrivacyAccordion\(\)\s*\{[\s\S]*?\n\}/, togglePrivacyJs.trim());

fs.writeFileSync('index.html', html, 'utf8');

// Validate script syntax and structure
const scriptMatches = html.matchAll(/<script>([\s\S]*?)<\/script>/g);
let valid = true;
for (const m of scriptMatches) {
  try {
    new Function(m[1]);
  } catch (e) {
    console.error('JS Syntax Error:', e);
    valid = false;
  }
}

console.log('Total doctypes:', (html.match(/<!DOCTYPE html>/g) || []).length);
console.log('Has Global Bottom Nav Bar:', html.includes('id="global-bnav"'));
console.log('Has Privacy Toggle Button:', html.includes('id="btn-privacy-toggle"'));
console.log('JS Valid:', valid);
