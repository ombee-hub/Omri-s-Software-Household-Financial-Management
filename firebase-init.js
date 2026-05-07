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

// Persist login across browser sessions ("remember me")
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(() => {});

// Enable Firestore offline persistence - app works even without internet.
// Data is cached locally (IndexedDB) and changes sync when connection returns.
db.enablePersistence({ synchronizeTabs: true }).catch((err) => {
    if (err && err.code === 'failed-precondition') {
        console.warn('Offline persistence: multiple tabs open, only one tab can persist');
    } else if (err && err.code === 'unimplemented') {
        console.warn('Offline persistence: browser does not support it');
    }
});
