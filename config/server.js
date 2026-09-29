// מערכת החתונה - שרת מקומי פשוט להגשת קבצים סטטיים
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// הגשת קבצי האתר מתיקיית public
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
app.use(express.static(PUBLIC_DIR));

// דף ברירת מחדל - דאשבורד
app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.listen(PORT, () => {
    console.log('=========================================');
    console.log(`מערכת החתונה - שרת פועל בפורט ${PORT}`);
    console.log(`פתח את הדפדפן בכתובת: http://localhost:${PORT}`);
    console.log('=========================================');
    console.log('כדי לעצור את השרת: Ctrl+C');
});
