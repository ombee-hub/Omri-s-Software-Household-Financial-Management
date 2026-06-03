// Firebase initialization for התוכנה של עמרי
// Loaded in every HTML page before app.js

const firebaseConfig = {
    apiKey: "AIzaSyCjmNnyJ3r_uCNI98zEWl8s2AzZaKYunWs",
    authDomain: "omri-s-software.firebaseapp.com",
    projectId: "omri-s-software",
    storageBucket: "omri-s-software.firebasestorage.app",
    messagingSenderId: "895452999282",
    appId: "1:895452999282:web:557136bd702dafa3eb5ceb",
    measurementId: "G-PG6LBZ157D"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Login persists until the user explicitly logs out (survives closing/reopening
// the tab or app). Sign-out happens only via the logout button.
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(() => {});

// Enable Firestore offline persistence - app works even without internet.
// Data is cached locally (IndexedDB) and changes sync when connection returns.
// Use single-tab persistence (multi-tab API is deprecated in newer SDKs).
db.enablePersistence().catch((err) => {
    if (err && err.code === 'failed-precondition') {
        // Multiple tabs open - persistence can only be enabled in one tab
    } else if (err && err.code === 'unimplemented') {
        // Browser doesn't support offline persistence
    }
});
