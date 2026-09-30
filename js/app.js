// מערכת החתונה - Application JavaScript (Firebase backend)
// Requires firebase-init.js to be loaded first (auth + db globals)

// ===== Splash screen - shows ONLY on the first page load of a session =====
const SPLASH_KEY = 'wedding_splash_shown';
const SPLASH_MIN_MS = 1000;
const SPLASH_START = Date.now();
const SPLASH_ALREADY_SHOWN = (() => { try { return sessionStorage.getItem(SPLASH_KEY) === '1'; } catch (e) { return false; } })();

(function initSplash() {
    const el = document.getElementById('splash');
    if (!el) return;
    if (SPLASH_ALREADY_SHOWN) {
        el.remove();
    } else {
        try { sessionStorage.setItem(SPLASH_KEY, '1'); } catch (e) {}
    }
})();

function hideSplash() {
    if (SPLASH_ALREADY_SHOWN) return;
    const elapsed = Date.now() - SPLASH_START;
    const wait = Math.max(0, SPLASH_MIN_MS - elapsed);
    setTimeout(() => {
        const el = document.getElementById('splash');
        if (el) {
            el.classList.add('hide');
            setTimeout(() => el.remove(), 600);
        }
    }, wait);
}

// ===== SVG Icons (Lucide-style line icons) =====
const _svg = (inner, sw = 2) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
const ICONS = {
    dashboard: _svg('<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>'),
    guests: _svg('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
    users: _svg('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),
    wallet: _svg('<path d="M20 12V8H6a2 2 0 0 1 0-4h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>'),
    table: _svg('<circle cx="12" cy="12" r="5"/><circle cx="12" cy="3" r="1.5"/><circle cx="12" cy="21" r="1.5"/><circle cx="3" cy="12" r="1.5"/><circle cx="21" cy="12" r="1.5"/>'),
    sheet: _svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="12" y1="11" x2="12" y2="19"/>'),
    task: _svg('<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>'),
    menu: _svg('<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>'),
    heart: _svg('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'),
    plus: _svg('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'),
    edit: _svg('<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>'),
    trash: _svg('<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'),
    check: _svg('<polyline points="20 6 9 17 4 12"/>', 2.5),
    close: _svg('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'),
    clock: _svg('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'),
    chart: _svg('<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'),
    arrowLeft: _svg('<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>'),
    logout: _svg('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>'),
    calendar: _svg('<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'),
    lock: _svg('<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'),
    settings: _svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'),
    upload: _svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>'),
    download: _svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'),
    search: _svg('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),
    phone: _svg('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>'),
};

// ===== Display name mapping (email → Hebrew display name) =====
const DISPLAY_NAMES = {
    'omri@household.local': 'עמרי',
    'sapir@household.local': 'ספיר',
};

function getDisplayName(user) {
    if (!user) return 'משתמש';
    if (user.displayName) return user.displayName;
    if (user.email && DISPLAY_NAMES[user.email.toLowerCase()]) return DISPLAY_NAMES[user.email.toLowerCase()];
    if (user.email) return user.email.split('@')[0];
    return 'משתמש';
}

function currentUser() {
    return auth.currentUser;
}

// ===== Format helpers =====
function fmtCurrency(n) {
    if (n === null || n === undefined || n === '' || isNaN(n)) return '—';
    return '₪' + Number(n).toLocaleString('he-IL', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function fmtNum(n) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    return Number(n).toLocaleString('he-IL', { maximumFractionDigits: 2 });
}

function fmtPct(part, whole) {
    if (!whole) return '0%';
    return Math.round((part / whole) * 100) + '%';
}

function fmtDate(d) {
    if (!d) return '—';
    if (d && typeof d.toDate === 'function') d = d.toDate();
    // "YYYY-MM-DD" strings are parsed as UTC by Date(); build a local date instead
    if (typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d)) {
        const [y, m, day] = d.split('-').map(Number);
        d = new Date(y, m - 1, day);
    }
    const date = new Date(d);
    if (isNaN(date)) return String(d);
    return date.toLocaleDateString('he-IL');
}

// Local-time (not UTC) date, so late-night entries get today's date
function todayISO() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function daysUntil(iso) {
    if (!iso) return null;
    const [y, m, d] = iso.split('-').map(Number);
    const target = new Date(y, m - 1, d);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((target - today) / 86400000);
}

function escapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);
}
const escapeHtmlSafe = escapeHtml;

function parseNumber(raw) {
    if (raw === null || raw === undefined || raw === '') return NaN;
    if (typeof raw === 'number') return raw;
    const cleaned = String(raw).replace(/[₪$,\s]/g, '').replace(/[()]/g, '');
    if (cleaned === '' || !/^-?\d*\.?\d+$/.test(cleaned)) return NaN;
    return parseFloat(cleaned);
}

// ===== Modal helpers =====
function openModal(id) { document.getElementById(id)?.classList.add('show'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('show'); }

document.addEventListener('click', (e) => {
    if (e.target.classList?.contains('modal-backdrop') && e.target.id) {
        e.target.classList.remove('show');
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.show').forEach(m => m.classList.remove('show'));
    }
});

function confirmDelete(name) {
    return showConfirm('למחוק את "' + name + '"?\nפעולה זו אינה הפיכה.', {
        title: 'אישור מחיקה',
        confirmText: 'מחק',
        danger: true,
        emoji: '🗑️',
    });
}

function _sizedIcon(svg, size = 18) {
    return svg.replace('<svg ', `<svg width="${size}" height="${size}" style="flex-shrink:0" `);
}

function _dialog(html) {
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop show dialog-backdrop';
    modal.innerHTML = `<div class="modal dialog">${html}</div>`;
    document.body.appendChild(modal);
    return modal;
}

function showConfirm(message, opts = {}) {
    const { title = 'אישור', confirmText = 'אישור', cancelText = 'ביטול', danger = false, emoji = (danger ? '⚠️' : '❓') } = opts;
    return new Promise((resolve) => {
        const modal = _dialog(`
            <div class="dialog-emoji">${emoji}</div>
            <h3 class="dialog-title">${escapeHtml(title)}</h3>
            <p class="dialog-text">${escapeHtml(message)}</p>
            <div class="dialog-actions">
                <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" data-result="ok">${_sizedIcon(danger ? ICONS.trash : ICONS.check)}<span>${escapeHtml(confirmText)}</span></button>
                <button class="btn btn-outline" data-result="cancel">${_sizedIcon(ICONS.close)}<span>${escapeHtml(cancelText)}</span></button>
            </div>`);
        function done(ok) { modal.remove(); resolve(ok); }
        modal.querySelectorAll('button[data-result]').forEach(b => {
            b.addEventListener('click', () => done(b.dataset.result === 'ok'));
        });
        modal.addEventListener('click', (e) => { if (e.target === modal) done(false); });
    });
}

function showAlert(message, opts = {}) {
    const { title = '', confirmText = 'הבנתי', danger = false, emoji = (danger ? '⚠️' : 'ℹ️') } = opts;
    return new Promise((resolve) => {
        const modal = _dialog(`
            <div class="dialog-emoji">${emoji}</div>
            ${title ? `<h3 class="dialog-title">${escapeHtml(title)}</h3>` : ''}
            <p class="dialog-text">${escapeHtml(message)}</p>
            <div class="dialog-actions"><button class="btn btn-primary">${_sizedIcon(ICONS.check)}<span>${escapeHtml(confirmText)}</span></button></div>`);
        function done() { modal.remove(); resolve(); }
        modal.querySelector('button').addEventListener('click', done);
        modal.addEventListener('click', (e) => { if (e.target === modal) done(); });
    });
}

// ===== Logout =====
async function logout() {
    const ok = await showConfirm('תצטרך להזין שוב את הסיסמה בכניסה הבאה.', {
        title: 'להתנתק?', confirmText: 'כן, התנתק', emoji: '👋',
    });
    if (!ok) return;
    try { await auth.signOut(); } catch (e) { console.error('logout error', e); }
    window.location.href = 'login.html';
}

// ===== Wedding settings (shared doc: settings/main) =====
const SETTINGS_DEFAULTS = {
    groomName: '',
    brideName: '',
    weddingDate: '',
    venue: '',
    pricePerGuest: 0,
    totalBudget: 0,
    arrivalRate: 80,
};
const SETTINGS_CACHE_KEY = 'wedding_settings_cache';

function getCachedSettings() {
    try {
        const raw = localStorage.getItem(SETTINGS_CACHE_KEY);
        if (raw) return { ...SETTINGS_DEFAULTS, ...JSON.parse(raw) };
    } catch (e) {}
    return { ...SETTINGS_DEFAULTS };
}

let weddingSettings = getCachedSettings();

const Settings = {
    ref() { return db.collection('settings').doc('main'); },
    subscribe(callback) {
        return this.ref().onSnapshot(
            (snap) => {
                const data = { ...SETTINGS_DEFAULTS, ...(snap.exists ? snap.data() : {}) };
                delete data.updatedAt;
                try { localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(data)); } catch (e) {}
                callback(data);
            },
            (err) => { console.error('settings listener error', err); callback(getCachedSettings()); }
        );
    },
    async save(data) {
        await this.ref().set({ ...data, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
    },
};

function coupleTitle(s = weddingSettings) {
    if (s.groomName && s.brideName) return `${s.groomName} & ${s.brideName}`;
    return s.groomName || s.brideName || 'החתונה שלנו';
}

// ===== Side menu (shared by every page) =====
const NAV_LINKS = [
    { href: 'index.html', label: 'דאשבורד', icon: ICONS.dashboard },
    { href: 'guests.html', label: 'מוזמנים', icon: ICONS.guests },
    { href: 'budget.html', label: 'תקציב וספקים', icon: ICONS.wallet },
    { href: 'seating.html', label: 'סידורי הושבה', icon: ICONS.table },
    { href: 'sheets.html', label: 'קבצי אקסל', icon: ICONS.sheet },
    { href: 'tasks.html', label: 'משימות', icon: ICONS.task },
];
const ACCOUNT_LINKS = [
    { href: 'settings.html', label: 'הגדרות החתונה', icon: ICONS.settings },
    { href: 'users.html', label: 'משתמשים ופרופיל', icon: ICONS.users },
];

function renderHeader() {
    const activePage = window.location.pathname.split('/').pop() || 'index.html';
    const displayName = getDisplayName(currentUser());
    const link = (l) => `
        <a href="${l.href}" class="side-link ${l.href === activePage ? 'active' : ''}" ${l.href === activePage ? 'aria-current="page"' : ''}>
            ${l.icon}<span>${l.label}</span>
        </a>`;
    const brandText = `
        <span class="brand-text">
            <span class="brand-names" data-brand-names>${escapeHtml(coupleTitle())}</span>
            <span class="brand-sub">מערכת לניהול החתונה</span>
        </span>`;

    const logo = `<img src="images/heart-icon.png" alt="" class="brand-logo">`;

    return `
    <header class="mobile-topbar">
        <button type="button" class="menu-btn menu-btn-plain" onclick="toggleSidebar()" aria-label="תפריט" aria-controls="sidebar">${ICONS.menu}</button>
        <a href="index.html" class="brand">${logo}${brandText}</a>
    </header>
    <div class="sidebar-overlay" onclick="closeSidebar()"></div>
    <aside class="sidebar" id="sidebar" aria-label="תפריט ראשי">
        <div class="sidebar-brand">
            <a href="index.html" class="brand">${logo}${brandText}</a>
            <button type="button" class="menu-btn menu-btn-plain sidebar-close" onclick="closeSidebar()" aria-label="סגירת תפריט">${ICONS.close}</button>
        </div>
        <nav class="sidebar-nav">
            ${NAV_LINKS.map(link).join('')}
            <div class="sidebar-label">חשבון</div>
            ${ACCOUNT_LINKS.map(link).join('')}
        </nav>
        <div class="sidebar-footer">
            <div class="sidebar-user">
                <span class="sidebar-avatar">${escapeHtml(displayName.trim().charAt(0) || '?')}</span>
                <span class="sidebar-user-name">שלום, ${escapeHtml(displayName)}</span>
            </div>
            <button type="button" class="side-link danger" onclick="logout()">${ICONS.logout}<span>התנתקות</span></button>
        </div>
    </aside>`;
}

function mountHeader() {
    const slot = document.getElementById('appHeader');
    if (!slot) return;
    slot.innerHTML = renderHeader();
    document.body.classList.add('has-sidebar');
    let collapsed = false;
    try { collapsed = localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === '1'; } catch (e) {}
    document.body.classList.toggle('sidebar-collapsed', collapsed);
}

// Desktop: the menu is docked and the hamburger / X collapse it (remembered).
// Phone: the menu is a drawer that the hamburger opens and the X closes.
const SIDEBAR_COLLAPSED_KEY = 'wedding_sidebar_collapsed';
const isDrawerMode = () => window.matchMedia('(max-width: 900px)').matches;

function setCollapsed(collapsed) {
    document.body.classList.toggle('sidebar-collapsed', collapsed);
    try { localStorage.setItem(SIDEBAR_COLLAPSED_KEY, collapsed ? '1' : '0'); } catch (e) {}
}
function openSidebar() {
    if (isDrawerMode()) document.body.classList.add('sidebar-open');
    else setCollapsed(false);
}
function closeSidebar() {
    if (isDrawerMode()) document.body.classList.remove('sidebar-open');
    else setCollapsed(true);
}
function toggleSidebar() {
    const open = isDrawerMode()
        ? document.body.classList.contains('sidebar-open')
        : !document.body.classList.contains('sidebar-collapsed');
    open ? closeSidebar() : openSidebar();
}
// Esc only dismisses the phone drawer (it also closes dialogs, so don't collapse the docked menu)
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.body.classList.remove('sidebar-open'); });

// ===== Auth guard =====
const AUTH_PAGE = 'login.html';
const isLoginPage = (window.location.pathname.split('/').pop() || 'index.html') === AUTH_PAGE;
let _settingsUnsub = null;

// Page scripts register their 'auth:ready' listeners after app.js runs, so never
// announce auth before the document has finished parsing (otherwise a fast auth
// response fires before anyone is listening and the page stays empty).
function whenDomReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true });
    else fn();
}

auth.onAuthStateChanged((user) => whenDomReady(() => handleAuthState(user)));

function handleAuthState(user) {
    if (!user && !isLoginPage) {
        window.location.replace(AUTH_PAGE);
        return;
    }
    if (user && isLoginPage) {
        window.location.replace('index.html');
        return;
    }
    if (!isLoginPage) {
        mountHeader();
        if (user) ensureUserDoc(user);
        if (!_settingsUnsub) {
            _settingsUnsub = Settings.subscribe((s) => {
                weddingSettings = s;
                document.querySelectorAll('[data-brand-names]').forEach(el => { el.textContent = coupleTitle(s); });
                document.dispatchEvent(new CustomEvent('settings:change', { detail: s }));
            });
        }
        document.dispatchEvent(new CustomEvent('auth:ready', { detail: { user } }));
    }
    hideSplash();
}

async function ensureUserDoc(user) {
    if (!user) return;
    try {
        const ref = db.collection('users').doc(user.uid);
        const snap = await ref.get();
        const update = {
            uid: user.uid,
            email: user.email,
            lastLoginAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        if (!snap.exists) {
            update.displayName = getDisplayName(user);
            update.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            await ref.set(update);
        } else {
            await ref.update(update);
        }
    } catch (e) {
        console.warn('ensureUserDoc failed', e);
    }
}

const Profiles = {
    subscribe(callback) {
        return db.collection('users').onSnapshot(
            (snap) => {
                const items = [];
                snap.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
                callback(items);
            },
            (err) => { console.error('users listener error', err); callback([]); }
        );
    },
    async updateMyDisplayName(uid, displayName) {
        await db.collection('users').doc(uid).update({ displayName });
        try { await auth.currentUser?.updateProfile({ displayName }); } catch (e) {}
    },
    async remove(uid) {
        await db.collection('users').doc(uid).delete();
    },
};

// Fallback: hide splash after 3s even if auth never resolves
setTimeout(() => hideSplash(), 3000);

// ===== Wedding domain constants =====
const GUEST_SIDES = [
    { value: 'groom', label: 'צד החתן' },
    { value: 'bride', label: 'צד הכלה' },
    { value: 'both', label: 'משותף' },
];

function sideLabel(value, s = weddingSettings) {
    if (value === 'groom') return s.groomName ? `צד ${s.groomName}` : 'צד החתן';
    if (value === 'bride') return s.brideName ? `צד ${s.brideName}` : 'צד הכלה';
    return 'משותף';
}

// RSVP status uses the reserved status palette - always shown with a text label
const RSVP_STATUSES = [
    { value: 'yes', label: 'מגיעים', short: 'מגיע', color: '#0ca30c', badge: 'badge-success' },
    { value: 'maybe', label: 'אולי', short: 'אולי', color: '#ec835a', badge: 'badge-maybe' },
    { value: 'pending', label: 'טרם השיבו', short: 'ממתין', color: '#fab219', badge: 'badge-warning' },
    { value: 'no', label: 'לא מגיעים', short: 'לא מגיע', color: '#d03b3b', badge: 'badge-danger' },
];
function getRsvp(value) { return RSVP_STATUSES.find(r => r.value === value) || RSVP_STATUSES[2]; }

const DEFAULT_GUEST_GROUPS = ['משפחה קרובה', 'משפחה', 'חברים', 'עבודה', 'צבא', 'לימודים', 'שכנים', 'חברים של ההורים'];

const EXPENSE_CATEGORIES = [
    { value: 'venue', label: 'אולם / גן אירועים' },
    { value: 'catering', label: 'קייטרינג' },
    { value: 'photo', label: 'צילום ווידאו' },
    { value: 'music', label: 'DJ / מוזיקה' },
    { value: 'design', label: 'עיצוב ופרחים' },
    { value: 'dress', label: 'שמלה וחליפה' },
    { value: 'beauty', label: 'איפור ושיער' },
    { value: 'rings', label: 'טבעות' },
    { value: 'rabbi', label: 'רב וחופה' },
    { value: 'invites', label: 'הזמנות' },
    { value: 'transport', label: 'הסעות' },
    { value: 'gifts', label: 'מתנות לאורחים' },
    { value: 'honeymoon', label: 'ירח דבש' },
    { value: 'other', label: 'אחר' },
];
function getExpenseCategory(value) { return EXPENSE_CATEGORIES.find(c => c.value === value) || { value: 'other', label: value || 'אחר' }; }

// ===== Guest counting =====
// Each guest record is ONE invitation (a person, a couple, a family) with:
//   invited   - how many people the invitation is for
//   status    - yes / maybe / pending / no
//   confirmed - how many actually confirmed (only meaningful when status = yes)
function guestInvited(g) {
    const n = Number(g.invited);
    return isNaN(n) || n < 0 ? 1 : n;
}
function guestConfirmed(g) {
    if (g.status !== 'yes') return 0;
    const n = Number(g.confirmed);
    return g.confirmed === '' || g.confirmed === null || g.confirmed === undefined || isNaN(n) ? guestInvited(g) : n;
}

function guestCounts(guests, arrivalRate = weddingSettings.arrivalRate) {
    const c = { invitations: guests.length, invited: 0, confirmed: 0, maybe: 0, pending: 0, declined: 0 };
    for (const g of guests) {
        const inv = guestInvited(g);
        c.invited += inv;
        if (g.status === 'yes') c.confirmed += guestConfirmed(g);
        else if (g.status === 'maybe') c.maybe += inv;
        else if (g.status === 'no') c.declined += inv;
        else c.pending += inv;
    }
    const rate = Math.min(100, Math.max(0, Number(arrivalRate) || 0)) / 100;
    c.expected = c.confirmed + Math.round((c.pending + c.maybe) * rate);
    c.answered = guests.filter(g => g.status === 'yes' || g.status === 'no').length;
    return c;
}

// ===== Budget =====
// Catering-style items can be priced per guest (unit price × expected arrivals)
function expenseTotal(e, expectedGuests) {
    if (e.perGuest) return (Number(e.unitPrice) || 0) * (expectedGuests || 0);
    return Number(e.total) || 0;
}

// ===== Charts (plain HTML - RTL-friendly, no external library) =====
// Categorical palette in fixed order (validated; never cycled)
const SERIES_COLORS = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300', '#4a3aa7', '#e34948'];
const OTHER_COLOR = '#94a3b8';

// Horizontal bar chart. items: [{ label, value, sub? }]
// A single measure uses one hue - color is not needed to tell the bars apart.
function renderBarChart(el, items, opts = {}) {
    if (!el) return;
    const { format = fmtNum, maxItems = 10, sort = true, emptyText = 'אין נתונים להצגה', color = SERIES_COLORS[0], total = null } = opts;
    let rows = items.filter(i => i && Number(i.value) !== 0 && !isNaN(i.value));
    if (rows.length === 0) {
        el.innerHTML = `<div class="chart-empty">${escapeHtml(emptyText)}</div>`;
        return;
    }
    if (sort) rows = [...rows].sort((a, b) => b.value - a.value);
    if (rows.length > maxItems) {
        const head = rows.slice(0, maxItems - 1);
        const rest = rows.slice(maxItems - 1);
        head.push({ label: `אחר (${rest.length})`, value: rest.reduce((s, r) => s + r.value, 0), isOther: true });
        rows = head;
    }
    const max = Math.max(...rows.map(r => Math.abs(r.value)));
    const sum = total ?? rows.reduce((s, r) => s + r.value, 0);
    el.innerHTML = `<div class="hbar-chart">${rows.map(r => {
        const w = max ? Math.max(1.5, Math.abs(r.value) / max * 100) : 0;
        const tip = `${r.label}: ${format(r.value)}${sum ? ' (' + fmtPct(r.value, sum) + ')' : ''}${r.sub ? ' · ' + r.sub : ''}`;
        return `<div class="hbar-row" data-tip="${escapeHtml(tip)}">
            <div class="hbar-label" title="${escapeHtml(r.label)}">${escapeHtml(r.label)}</div>
            <div class="hbar-track"><div class="hbar-fill" style="width:${w}%;background:${r.isOther ? OTHER_COLOR : (r.color || color)}"></div></div>
            <div class="hbar-value">${escapeHtml(format(r.value))}</div>
        </div>`;
    }).join('')}</div>`;
}

// Part-to-whole stacked bar with a legend. segments: [{ label, value, color }]
function renderStackBar(el, segments, opts = {}) {
    if (!el) return;
    const { format = fmtNum, emptyText = 'אין נתונים להצגה', showLegend = true } = opts;
    const segs = segments.filter(s => s.value > 0);
    const total = segs.reduce((s, x) => s + x.value, 0);
    if (!total) {
        el.innerHTML = `<div class="chart-empty">${escapeHtml(emptyText)}</div>`;
        return;
    }
    el.innerHTML = `
        <div class="stackbar">${segs.map(s => `<div class="stackbar-seg" style="flex:${s.value};background:${s.color}" data-tip="${escapeHtml(`${s.label}: ${format(s.value)} (${fmtPct(s.value, total)})`)}"></div>`).join('')}</div>
        ${showLegend ? `<div class="chart-legend">${segments.map(s => `
            <div class="legend-item">
                <span class="legend-swatch" style="background:${s.color}"></span>
                <span class="legend-label">${escapeHtml(s.label)}</span>
                <span class="legend-value">${escapeHtml(format(s.value))}</span>
                <span class="legend-pct">${fmtPct(s.value, total)}</span>
            </div>`).join('')}</div>` : ''}`;
}

// Shared hover tooltip for any element with data-tip
(function initTooltip() {
    let tip = null;
    function ensure() {
        if (!tip) {
            tip = document.createElement('div');
            tip.className = 'chart-tooltip';
            document.body.appendChild(tip);
        }
        return tip;
    }
    function place(e) {
        const t = ensure();
        const pad = 12;
        let x = e.clientX + pad;
        let y = e.clientY + pad;
        const r = t.getBoundingClientRect();
        if (x + r.width > window.innerWidth - 8) x = e.clientX - r.width - pad;
        if (y + r.height > window.innerHeight - 8) y = e.clientY - r.height - pad;
        t.style.left = Math.max(8, x) + 'px';
        t.style.top = Math.max(8, y) + 'px';
    }
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest?.('[data-tip]');
        if (!target) { if (tip) tip.classList.remove('show'); return; }
        ensure().textContent = target.dataset.tip;
        tip.classList.add('show');
        place(e);
    });
    document.addEventListener('mousemove', (e) => {
        if (tip && tip.classList.contains('show')) place(e);
    });
    document.addEventListener('scroll', () => { if (tip) tip.classList.remove('show'); }, true);
})();

// ===== Firestore data accessors (real-time, shared across all users) =====
function makeStore(collectionName) {
    const ref = () => db.collection(collectionName);

    return {
        collectionName,
        subscribe(callback) {
            return ref().orderBy('createdAt', 'desc').onSnapshot(
                (snap) => {
                    const items = [];
                    snap.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
                    callback(items);
                },
                (err) => {
                    console.error(`${collectionName} listener error`, err);
                    callback([]);
                }
            );
        },
        async all() {
            const snap = await ref().orderBy('createdAt', 'desc').get();
            const items = [];
            snap.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
            return items;
        },
        async findById(id) {
            const doc = await ref().doc(id).get();
            return doc.exists ? { id: doc.id, ...doc.data() } : null;
        },
        _stamp(data) {
            const u = currentUser();
            return {
                ...data,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                createdBy: u ? u.uid : null,
                createdByEmail: u ? u.email : null,
            };
        },
        async add(data) {
            const payload = this._stamp(data);
            const docRef = await ref().add(payload);
            return { id: docRef.id, ...payload };
        },
        // Add many documents efficiently (Firestore batches are capped at 500 ops)
        async addMany(list, onProgress) {
            for (let i = 0; i < list.length; i += 400) {
                const batch = db.batch();
                list.slice(i, i + 400).forEach(d => batch.set(ref().doc(), this._stamp(d)));
                await batch.commit();
                if (onProgress) onProgress(Math.min(i + 400, list.length), list.length);
            }
        },
        async update(id, data) {
            await ref().doc(id).update({
                ...data,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
        },
        async updateMany(ids, data) {
            for (let i = 0; i < ids.length; i += 400) {
                const batch = db.batch();
                ids.slice(i, i + 400).forEach(id => batch.update(ref().doc(id), {
                    ...data,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                }));
                await batch.commit();
            }
        },
        async remove(id) {
            await ref().doc(id).delete();
        },
        async removeMany(ids) {
            for (let i = 0; i < ids.length; i += 400) {
                const batch = db.batch();
                ids.slice(i, i + 400).forEach(id => batch.delete(ref().doc(id)));
                await batch.commit();
            }
        },
    };
}

const Guests = makeStore('guests');
const Expenses = makeStore('expenses');
const Tables = makeStore('tables');
const Sheets = makeStore('sheets');
const Tasks = Object.assign(makeStore('tasks'), {
    async toggleDone(id) {
        const doc = await db.collection('tasks').doc(id).get();
        if (doc.exists) {
            await doc.ref.update({ done: !doc.data().done });
        }
    },
});

// ===== Excel helpers (SheetJS must be loaded on pages that use these) =====
async function readSpreadsheet(file) {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array', cellDates: true });
    return workbook.SheetNames.map(name => ({
        name,
        rows: XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1, raw: false, defval: '' }),
    })).filter(s => s.rows.some(r => r.some(c => String(c).trim() !== '')));
}

// Find the header row: the first row (within the first 20) with at least 2 non-empty text cells
function detectHeaderRow(rows, keywords = []) {
    const limit = Math.min(20, rows.length);
    if (keywords.length) {
        for (let i = 0; i < limit; i++) {
            const text = rows[i].map(c => String(c).toLowerCase()).join(' ');
            if (keywords.some(kw => text.includes(kw.toLowerCase()))) return i;
        }
    }
    for (let i = 0; i < limit; i++) {
        const filled = rows[i].filter(c => String(c).trim() !== '' && isNaN(parseNumber(c)));
        if (filled.length >= 2) return i;
    }
    return 0;
}

function exportToExcel(fileName, sheetName, rows) {
    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = (rows[0] || []).map(() => ({ wch: 18 }));
    const wb = XLSX.utils.book_new();
    wb.Workbook = { Views: [{ RTL: true }] };
    const safeSheet = String(sheetName || 'Sheet1').replace(/[\\\/\?\*\[\]:]/g, '').slice(0, 31) || 'Sheet1';
    XLSX.utils.book_append_sheet(wb, ws, safeSheet);
    XLSX.writeFile(wb, String(fileName).replace(/[\\\/\?\*\[\]:]/g, '_') + '.xlsx');
}

// ===== Service worker disabled - unregister any previously registered one =====
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((r) => r.unregister());
    }).catch(() => {});
}
