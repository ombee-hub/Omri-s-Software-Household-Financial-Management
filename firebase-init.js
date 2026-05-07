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
