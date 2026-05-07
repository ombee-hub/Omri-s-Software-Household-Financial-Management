// התוכנה של עמרי - JavaScript משותף

const STORAGE_KEYS = {
    CARDS: 'omri_cards',
    BILLS: 'omri_bills',
    TASKS: 'omri_tasks',
    DOCS: 'omri_docs',
    USER: 'omri_user',
    USERS: 'omri_users',
};

const LOGO_PATH = "Omri's%20Software%20%E2%80%93%20Household%20Financial%20Management.png";

// ===== SVG Icons (Lucide-style, clean line icons) =====
const ICONS = {
    dashboard: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>`,
    card: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/></svg>`,
    bill: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    task: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
    folder: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
    plus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    edit: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    trash: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    money: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 9V6a1 1 0 0 0-1-1H5"/><path d="M4 5v14h6"/><path d="M14 14h6V8"/><path d="M10 5v14"/><path d="M14 14v5"/></svg>`,
    clock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    chart: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    arrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
    logout: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
    calendar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    users: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
};

// ===== Crypto helper for password hashing =====
// Uses Web Crypto when available (HTTPS / localhost / http), falls back to a
// pure-JS implementation when not available (e.g. file:// in modern Chrome).
async function sha256(text) {
    if (typeof crypto !== 'undefined' && crypto.subtle && typeof crypto.subtle.digest === 'function') {
        try {
            const buf = new TextEncoder().encode(text);
            const hashBuf = await crypto.subtle.digest('SHA-256', buf);
            return Array.from(new Uint8Array(hashBuf))
                .map(b => b.toString(16).padStart(2, '0')).join('');
        } catch (e) {
            // fall through to pure-JS implementation below
        }
    }
    return sha256Sync(text);
}

// Pure-JS SHA-256 (FIPS 180-4) - fallback for environments without crypto.subtle
function sha256Sync(message) {
    const K = [
        0x428a2f98|0,0x71374491|0,0xb5c0fbcf|0,0xe9b5dba5|0,0x3956c25b|0,0x59f111f1|0,0x923f82a4|0,0xab1c5ed5|0,
        0xd807aa98|0,0x12835b01|0,0x243185be|0,0x550c7dc3|0,0x72be5d74|0,0x80deb1fe|0,0x9bdc06a7|0,0xc19bf174|0,
        0xe49b69c1|0,0xefbe4786|0,0x0fc19dc6|0,0x240ca1cc|0,0x2de92c6f|0,0x4a7484aa|0,0x5cb0a9dc|0,0x76f988da|0,
        0x983e5152|0,0xa831c66d|0,0xb00327c8|0,0xbf597fc7|0,0xc6e00bf3|0,0xd5a79147|0,0x06ca6351|0,0x14292967|0,
        0x27b70a85|0,0x2e1b2138|0,0x4d2c6dfc|0,0x53380d13|0,0x650a7354|0,0x766a0abb|0,0x81c2c92e|0,0x92722c85|0,
        0xa2bfe8a1|0,0xa81a664b|0,0xc24b8b70|0,0xc76c51a3|0,0xd192e819|0,0xd6990624|0,0xf40e3585|0,0x106aa070|0,
        0x19a4c116|0,0x1e376c08|0,0x2748774c|0,0x34b0bcb5|0,0x391c0cb3|0,0x4ed8aa4a|0,0x5b9cca4f|0,0x682e6ff3|0,
        0x748f82ee|0,0x78a5636f|0,0x84c87814|0,0x8cc70208|0,0x90befffa|0,0xa4506ceb|0,0xbef9a3f7|0,0xc67178f2|0
    ];
    const H = [0x6a09e667|0,0xbb67ae85|0,0x3c6ef372|0,0xa54ff53a|0,0x510e527f|0,0x9b05688c|0,0x1f83d9ab|0,0x5be0cd19|0];

    const utf8 = new TextEncoder().encode(message);
    const len = utf8.length;
    const padLen = ((len + 9 + 63) >> 6) << 6;
    const bytes = new Uint8Array(padLen);
    bytes.set(utf8);
    bytes[len] = 0x80;
    const view = new DataView(bytes.buffer);
    view.setBigUint64(padLen - 8, BigInt(len) * 8n, false);

    const rotr = (n, x) => (x >>> n) | (x << (32 - n));

    for (let i = 0; i < padLen; i += 64) {
        const W = new Int32Array(64);
        for (let t = 0; t < 16; t++) W[t] = view.getInt32(i + t * 4, false);
        for (let t = 16; t < 64; t++) {
            const s0 = rotr(7, W[t-15]) ^ rotr(18, W[t-15]) ^ (W[t-15] >>> 3);
            const s1 = rotr(17, W[t-2]) ^ rotr(19, W[t-2]) ^ (W[t-2] >>> 10);
            W[t] = (W[t-16] + s0 + W[t-7] + s1) | 0;
        }
        let a=H[0],b=H[1],c=H[2],d=H[3],e=H[4],f=H[5],g=H[6],h=H[7];
        for (let t = 0; t < 64; t++) {
            const S1 = rotr(6, e) ^ rotr(11, e) ^ rotr(25, e);
            const ch = (e & f) ^ (~e & g);
            const temp1 = (h + S1 + ch + K[t] + W[t]) | 0;
            const S0 = rotr(2, a) ^ rotr(13, a) ^ rotr(22, a);
            const maj = (a & b) ^ (a & c) ^ (b & c);
            const temp2 = (S0 + maj) | 0;
            h = g; g = f; f = e;
            e = (d + temp1) | 0;
            d = c; c = b; b = a;
            a = (temp1 + temp2) | 0;
        }
        H[0]=(H[0]+a)|0; H[1]=(H[1]+b)|0; H[2]=(H[2]+c)|0; H[3]=(H[3]+d)|0;
        H[4]=(H[4]+e)|0; H[5]=(H[5]+f)|0; H[6]=(H[6]+g)|0; H[7]=(H[7]+h)|0;
    }
    return H.map(x => (x >>> 0).toString(16).padStart(8, '0')).join('');
}

// ===== Current logged-in user =====
function currentUser() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || 'null');
    } catch (e) { return null; }
}

// ===== Render the shared app header (with bottom nav for mobile) =====
function renderHeader() {
    const activePage = window.location.pathname.split('/').pop() || 'index.html';
    const links = [
        { href: 'index.html', label: 'דאשבורד', shortLabel: 'בית', icon: ICONS.dashboard },
        { href: 'credit-cards.html', label: 'כרטיסי אשראי', shortLabel: 'כרטיסים', icon: ICONS.card },
        { href: 'bills.html', label: 'חשבונות', shortLabel: 'חשבונות', icon: ICONS.bill },
        { href: 'tasks.html', label: 'משימות', shortLabel: 'משימות', icon: ICONS.task },
        { href: 'documents.html', label: 'מסמכים', shortLabel: 'מסמכים', icon: ICONS.folder },
    ];

    const u = currentUser();
    const displayName = (u && (u.displayName || u.name)) || 'עמרי';

    return `
    <header class="app-header">
        <div class="container">
            <div class="header-wrapper">
                <a href="index.html" class="logo">
                    <img src="${LOGO_PATH}" alt="התוכנה של עמרי - ניהול כלכלי למשק הבית">
                </a>
                <nav class="app-nav">
                    <ul class="nav-menu">
                        ${links.map(l => `
                            <li class="nav-item">
                                <a href="${l.href}" class="nav-link ${l.href === activePage ? 'active' : ''}">
                                    ${l.icon}
                                    <span>${l.label}</span>
                                </a>
                            </li>`).join('')}
                    </ul>
                </nav>
                <div class="user-menu">
                    <span class="user-name">שלום, ${escapeHtmlSafe(displayName)}</span>
                    <a href="users.html" class="logout-btn icon-only" title="ניהול משתמשים" aria-label="ניהול משתמשים">${ICONS.users}</a>
                    <button class="logout-btn" onclick="logout()" title="התנתק" aria-label="התנתק">${ICONS.logout}<span class="btn-text">התנתק</span></button>
                </div>
            </div>
        </div>
    </header>
    <nav class="app-bottom-nav" aria-label="ניווט">
        <ul>
            ${links.map(l => `
                <li>
                    <a href="${l.href}" class="${l.href === activePage ? 'active' : ''}">
                        ${l.icon}
                        <span>${l.shortLabel}</span>
                    </a>
                </li>`).join('')}
        </ul>
    </nav>`;
}

function mountHeader() {
    const slot = document.getElementById('appHeader');
    if (slot) slot.outerHTML = renderHeader();
}

// ===== Service worker registration (PWA / offline support) =====
if ('serviceWorker' in navigator && (location.protocol === 'http:' || location.protocol === 'https:')) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {});
    });
}

function escapeHtmlSafe(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);
}

// ===== Storage helpers =====
function loadList(key) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.error('Failed to load', key, e);
        return [];
    }
}

function saveList(key, list) {
    localStorage.setItem(key, JSON.stringify(list));
}

function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// ===== Format helpers =====
function fmtCurrency(n) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    return '₪' + Number(n).toLocaleString('he-IL', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function fmtDate(d) {
    if (!d) return '—';
    const date = new Date(d);
    if (isNaN(date)) return d;
    return date.toLocaleDateString('he-IL');
}

function fmtMonth(m, y) {
    if (!m || !y) return '—';
    return String(m).padStart(2, '0') + '/' + String(y).slice(-2);
}

function todayISO() {
    return new Date().toISOString().slice(0, 10);
}

function currentYM() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
}

// ===== Modal helpers =====
function openModal(id) {
    document.getElementById(id)?.classList.add('show');
}

function closeModal(id) {
    document.getElementById(id)?.classList.remove('show');
}

// Click outside to close
document.addEventListener('click', (e) => {
    if (e.target.classList?.contains('modal-backdrop')) {
        e.target.classList.remove('show');
    }
});

// Close on Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.show').forEach(m => m.classList.remove('show'));
    }
});

// ===== Mount shared header on every page =====
document.addEventListener('DOMContentLoaded', () => {
    mountHeader();
});

// ===== Logout =====
function logout() {
    if (confirm('להתנתק מהתוכנה?')) {
        window.location.href = 'login.html';
    }
}

// ===== Confirm delete =====
function confirmDelete(name) {
    return confirm('למחוק את "' + name + '"? פעולה זו אינה הפיכה.');
}

// ===== Data accessors =====
const Cards = {
    all: () => loadList(STORAGE_KEYS.CARDS),
    save: (list) => saveList(STORAGE_KEYS.CARDS, list),
    add: (item) => { const list = Cards.all(); item.id = uid(); list.push(item); Cards.save(list); return item; },
    update: (id, data) => { const list = Cards.all(); const i = list.findIndex(x => x.id === id); if (i >= 0) { list[i] = { ...list[i], ...data }; Cards.save(list); } },
    remove: (id) => { Cards.save(Cards.all().filter(x => x.id !== id)); },
    findById: (id) => Cards.all().find(x => x.id === id),
};

const Bills = {
    all: () => loadList(STORAGE_KEYS.BILLS),
    save: (list) => saveList(STORAGE_KEYS.BILLS, list),
    add: (item) => { const list = Bills.all(); item.id = uid(); item.history = item.history || {}; list.push(item); Bills.save(list); return item; },
    update: (id, data) => { const list = Bills.all(); const i = list.findIndex(x => x.id === id); if (i >= 0) { list[i] = { ...list[i], ...data }; Bills.save(list); } },
    remove: (id) => { Bills.save(Bills.all().filter(x => x.id !== id)); },
    togglePaid: (id, ym) => {
        const list = Bills.all();
        const b = list.find(x => x.id === id);
        if (b) {
            b.history = b.history || {};
            b.history[ym] = !b.history[ym];
            Bills.save(list);
            return b.history[ym];
        }
        return false;
    },
    isPaidThisMonth: (b) => {
        const ym = currentYM();
        return !!(b.history && b.history[ym]);
    },
};

const Tasks = {
    all: () => loadList(STORAGE_KEYS.TASKS),
    save: (list) => saveList(STORAGE_KEYS.TASKS, list),
    add: (item) => { const list = Tasks.all(); item.id = uid(); item.done = false; list.push(item); Tasks.save(list); return item; },
    update: (id, data) => { const list = Tasks.all(); const i = list.findIndex(x => x.id === id); if (i >= 0) { list[i] = { ...list[i], ...data }; Tasks.save(list); } },
    remove: (id) => { Tasks.save(Tasks.all().filter(x => x.id !== id)); },
    toggleDone: (id) => { const list = Tasks.all(); const t = list.find(x => x.id === id); if (t) { t.done = !t.done; Tasks.save(list); } },
};

const Docs = {
    all: () => loadList(STORAGE_KEYS.DOCS),
    save: (list) => saveList(STORAGE_KEYS.DOCS, list),
    add: (item) => { const list = Docs.all(); item.id = uid(); list.push(item); Docs.save(list); return item; },
    update: (id, data) => { const list = Docs.all(); const i = list.findIndex(x => x.id === id); if (i >= 0) { list[i] = { ...list[i], ...data }; Docs.save(list); } },
    remove: (id) => { Docs.save(Docs.all().filter(x => x.id !== id)); },
};

// ===== Categories =====
const BILL_CATEGORIES = [
    { value: 'electricity', label: 'חשמל', icon: '⚡' },
    { value: 'water', label: 'מים', icon: '💧' },
    { value: 'gas', label: 'גז', icon: '🔥' },
    { value: 'arnona', label: 'ארנונה', icon: '🏛️' },
    { value: 'vaad', label: 'ועד בית', icon: '🏢' },
    { value: 'internet', label: 'אינטרנט', icon: '🌐' },
    { value: 'phone', label: 'סלולר', icon: '📱' },
    { value: 'tv', label: 'טלוויזיה', icon: '📺' },
    { value: 'insurance', label: 'ביטוח', icon: '🛡️' },
    { value: 'mortgage', label: 'משכנתא', icon: '🏠' },
    { value: 'rent', label: 'שכר דירה', icon: '🔑' },
    { value: 'subscription', label: 'מנויים', icon: '🔄' },
    { value: 'other', label: 'אחר', icon: '📄' },
];

const DOC_CATEGORIES = [
    { value: 'contract', label: 'חוזה', icon: '📜' },
    { value: 'certificate', label: 'תעודה', icon: '🎓' },
    { value: 'invoice', label: 'חשבונית', icon: '🧾' },
    { value: 'warranty', label: 'אחריות', icon: '🛡️' },
    { value: 'manual', label: 'הוראות הפעלה', icon: '📖' },
    { value: 'medical', label: 'רפואי', icon: '⚕️' },
    { value: 'tax', label: 'מסים', icon: '💼' },
    { value: 'other', label: 'אחר', icon: '📁' },
];

const CARD_TYPES = [
    { value: 'visa', label: 'Visa' },
    { value: 'mastercard', label: 'Mastercard' },
    { value: 'amex', label: 'American Express' },
    { value: 'isracard', label: 'ישראכרט' },
    { value: 'cal', label: 'כאל' },
    { value: 'max', label: 'Max' },
];

function getBillCategory(value) { return BILL_CATEGORIES.find(c => c.value === value) || { label: value, icon: '📄' }; }
function getDocCategory(value) { return DOC_CATEGORIES.find(c => c.value === value) || { label: value, icon: '📁' }; }
function getCardType(value) { return CARD_TYPES.find(c => c.value === value) || { label: value }; }

// ===== Users (login accounts) =====
const Users = {
    SEED: {
        username: 'Omri',
        displayName: 'עמרי',
        passwordHash: '020e8e13b353ab6186fecf9bc9843ff743270384e743cb09543486c56d5b219f',
    },
    all: () => {
        let list = loadList(STORAGE_KEYS.USERS);
        if (list.length === 0) {
            list = [{ id: uid(), ...Users.SEED, createdAt: new Date().toISOString() }];
            saveList(STORAGE_KEYS.USERS, list);
        }
        return list;
    },
    save: (list) => saveList(STORAGE_KEYS.USERS, list),
    add: async (data) => {
        const list = Users.all();
        const uname = (data.username || '').trim();
        if (!uname) throw new Error('שם משתמש חובה');
        if (list.some(u => u.username.toLowerCase() === uname.toLowerCase())) {
            throw new Error('שם המשתמש כבר קיים');
        }
        if (!data.password || data.password.length < 4) throw new Error('סיסמה קצרה מדי (לפחות 4 תווים)');
        const user = {
            id: uid(),
            username: uname,
            displayName: (data.displayName || uname).trim(),
            passwordHash: await sha256(data.password),
            createdAt: new Date().toISOString(),
        };
        list.push(user);
        Users.save(list);
        return user;
    },
    update: async (id, data) => {
        const list = Users.all();
        const i = list.findIndex(u => u.id === id);
        if (i < 0) return;
        if (data.displayName !== undefined && data.displayName.trim()) list[i].displayName = data.displayName.trim();
        if (data.password) {
            if (data.password.length < 4) throw new Error('סיסמה קצרה מדי (לפחות 4 תווים)');
            list[i].passwordHash = await sha256(data.password);
        }
        Users.save(list);
        return list[i];
    },
    remove: (id) => {
        const list = Users.all();
        if (list.length <= 1) throw new Error('לא ניתן למחוק את המשתמש האחרון');
        Users.save(list.filter(u => u.id !== id));
    },
    findById: (id) => Users.all().find(u => u.id === id),
    findByUsername: (username) => Users.all().find(u => u.username.toLowerCase() === (username || '').toLowerCase()),
    authenticate: async (username, password) => {
        const hash = await sha256(password);
        return Users.all().find(u =>
            u.username.toLowerCase() === (username || '').toLowerCase() &&
            u.passwordHash === hash
        );
    },
};
