// מערכת החתונה - שרת מקומי פשוט להגשת קבצים סטטיים
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// המסכים (*.html) והתיקיות שלהם נמצאים בתיקיית הפרויקט הראשית.
// מגישים רק אותם - לא את config ולא קבצים אחרים שנמצאים בתיקייה (כמו אקסל).
const ROOT_DIR = path.join(__dirname, '..');
const SITE_DIRS = ['css', 'js', 'images', 'pwa'];

SITE_DIRS.forEach(dir => app.use('/' + dir, express.static(path.join(ROOT_DIR, dir))));
app.get('/sw.js', (req, res) => res.sendFile(path.join(ROOT_DIR, 'sw.js')));
app.get('/', (req, res) => res.sendFile(path.join(ROOT_DIR, 'index.html')));
app.get(/^\/[\w-]+\.html$/, (req, res, next) => {
    res.sendFile(path.join(ROOT_DIR, path.basename(req.path)), (err) => { if (err) next(); });
});

app.listen(PORT, () => {
    console.log('=========================================');
    console.log(`מערכת החתונה - שרת פועל בפורט ${PORT}`);
    console.log(`פתח את הדפדפן בכתובת: http://localhost:${PORT}`);
    console.log('=========================================');
    console.log('כדי לעצור את השרת: Ctrl+C');
});
