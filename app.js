// התוכנה של עמרי - Application JavaScript (Firebase backend)
// Requires firebase-init.js to be loaded first (auth + db globals)

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

// ===== Current logged-in user =====
function currentUser() {
    return auth.currentUser;
}

// ===== Format helpers =====
function fmtCurrency(n) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    return '₪' + Number(n).toLocaleString('he-IL', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function fmtDate(d) {
    if (!d) return '—';
    if (d && typeof d.toDate === 'function') d = d.toDate();
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

function escapeHtmlSafe(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);
}

// ===== Modal helpers =====
function openModal(id) { document.getElementById(id)?.classList.add('show'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('show'); }

document.addEventListener('click', (e) => {
    if (e.target.classList?.contains('modal-backdrop')) {
        e.target.classList.remove('show');
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.show').forEach(m => m.classList.remove('show'));
    }
});

function confirmDelete(name) {
    return confirm('למחוק את "' + name + '"? פעולה זו אינה הפיכה.');
}

// ===== Logout =====
async function logout() {
    if (!confirm('להתנתק מהתוכנה?')) return;
    try {
        await auth.signOut();
    } catch (e) {
        console.error('logout error', e);
    }
    window.location.href = 'login.html';
}

// ===== Render the shared app header =====
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
    const displayName = getDisplayName(u);

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
                    <a href="users.html" class="logout-btn icon-only" title="פרופיל" aria-label="פרופיל">${ICONS.users}</a>
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

// ===== Auth guard - redirect to login if not authenticated (except on login page) =====
const AUTH_PAGE = 'login.html';
const isLoginPage = (window.location.pathname.split('/').pop() || 'index.html') === AUTH_PAGE;

auth.onAuthStateChanged((user) => {
    if (!user && !isLoginPage) {
        window.location.replace(AUTH_PAGE);
        return;
    }
    if (user && isLoginPage) {
        window.location.replace('index.html');
        return;
    }
    // On non-login pages, mount header (which depends on currentUser)
    if (!isLoginPage) {
        mountHeader();
        // Notify app that auth is ready
        document.dispatchEvent(new CustomEvent('auth:ready', { detail: { user } }));
    }
});

// ===== Categories =====
const BILL_CATEGORIES = [
    { value: 'electricity', label: 'חשמל' },
    { value: 'water', label: 'מים' },
    { value: 'gas', label: 'גז' },
    { value: 'arnona', label: 'ארנונה' },
    { value: 'vaad', label: 'ועד בית' },
    { value: 'internet', label: 'אינטרנט' },
    { value: 'phone', label: 'סלולר' },
    { value: 'tv', label: 'טלוויזיה' },
    { value: 'insurance', label: 'ביטוח' },
    { value: 'mortgage', label: 'משכנתא' },
    { value: 'rent', label: 'שכר דירה' },
    { value: 'subscription', label: 'מנויים' },
    { value: 'other', label: 'אחר' },
];

const DOC_CATEGORIES = [
    { value: 'contract', label: 'חוזה' },
    { value: 'certificate', label: 'תעודה' },
    { value: 'invoice', label: 'חשבונית' },
    { value: 'warranty', label: 'אחריות' },
    { value: 'manual', label: 'הוראות הפעלה' },
    { value: 'medical', label: 'רפואי' },
    { value: 'tax', label: 'מסים' },
    { value: 'other', label: 'אחר' },
];

const CARD_TYPES = [
    { value: 'visa', label: 'Visa' },
    { value: 'mastercard', label: 'Mastercard' },
    { value: 'amex', label: 'American Express' },
    { value: 'isracard', label: 'ישראכרט' },
    { value: 'cal', label: 'כאל' },
    { value: 'max', label: 'Max' },
];

function getBillCategory(value) { return BILL_CATEGORIES.find(c => c.value === value) || { label: value || 'אחר' }; }
function getDocCategory(value) { return DOC_CATEGORIES.find(c => c.value === value) || { label: value || 'אחר' }; }
function getCardType(value) { return CARD_TYPES.find(c => c.value === value) || { label: value || '' }; }

// ===== Firestore data accessors (real-time, shared across all users) =====

function makeStore(collectionName) {
    const ref = () => db.collection(collectionName);

    return {
        // Subscribe to real-time updates. Returns unsubscribe function.
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
        // One-time fetch (for cases where real-time isn't needed)
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
        async add(data) {
            const u = currentUser();
            const payload = {
                ...data,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                createdBy: u ? u.uid : null,
                createdByEmail: u ? u.email : null,
            };
            const docRef = await ref().add(payload);
            return { id: docRef.id, ...payload };
        },
        async update(id, data) {
            await ref().doc(id).update({
                ...data,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
        },
        async remove(id) {
            await ref().doc(id).delete();
        },
    };
}

const Cards = makeStore('cards');
const Tasks = Object.assign(makeStore('tasks'), {
    async toggleDone(id) {
        const doc = await db.collection('tasks').doc(id).get();
        if (doc.exists) {
            await doc.ref.update({ done: !doc.data().done });
        }
    },
});
const Docs = makeStore('docs');

const Bills = Object.assign(makeStore('bills'), {
    isPaidThisMonth(b) {
        const ym = currentYM();
        return !!(b.history && b.history[ym]);
    },
    async togglePaid(id, ym) {
        const doc = await db.collection('bills').doc(id).get();
        if (!doc.exists) return false;
        const data = doc.data();
        const history = data.history || {};
        history[ym] = !history[ym];
        await doc.ref.update({ history });
        return history[ym];
    },
});
