/**
 * fix-all.js
 * סקריפט לתיקון כל הבעיות באתר
 * 
 * מה הסקריפט הזה עושה:
 * 1. משנה את שם הקובץ Edit Status.html ל-status.html (אם קיים)
 * 2. יוצר קובץ navigation.js מתוקן
 * 3. מוסיף את הקישור לקובץ navigation.js בכל הדפים
 * 4. מתקן את כל תפריטי הניווט בכל הדפים
 * 5. מוודא שהשם "יומן משימות" אחיד בכל האתר
 * 6. מתקן את הבעיות בקובץ server.js
 * 
 * אופן השימוש:
 * 1. שמור את הקובץ בתיקיית הפרויקט
 * 2. הרץ בטרמינל: node fix-all.js
 */

const fs = require('fs');
const path = require('path');

console.log('=== מתחיל תיקון כל הבעיות באתר ===');

// רשימת כל הדפים שצריך לתקן
const htmlFiles = [
    'dashboard.html',
    'Edit Status.html',
    'status.html', // גם אם לא קיים, ננסה לבדוק
    'index.html',
    'details.html',
    'gallery.html',
    'login.html'
];

// 1. בדיקה אם קיים Edit Status.html ושינוי שמו ל-status.html
if (fs.existsSync('Edit Status.html')) {
    try {
        // בודק אם כבר קיים status.html
        if (fs.existsSync('status.html')) {
            console.log('✅ קובץ status.html כבר קיים');
            // נשמור גיבוי של Edit Status.html למקרה שצריך
            fs.copyFileSync('Edit Status.html', 'Edit_Status_backup.html');
            console.log('✅ נשמר גיבוי של Edit Status.html בשם Edit_Status_backup.html');
        } else {
            // שינוי שם הקובץ
            fs.copyFileSync('Edit Status.html', 'status.html');
            console.log('✅ הועתק Edit Status.html לשם status.html');
        }
    } catch (err) {
        console.error('❌ שגיאה בשינוי שם הקובץ Edit Status.html:', err);
    }
}

// 2. תוכן קובץ navigation.js המתוקן
const navigationJsContent = `// navigation.js - קובץ משותף לניהול תפריט הניווט בכל הדפים

// פונקציה ליצירת תפריט ניווט מלא בכל דף
function ensureNavigationLinks() {
    // איתור אלמנט תפריט הניווט
    const navLinksContainer = document.querySelector('.nav-links');
    if (!navLinksContainer) {
        console.error('תפריט הניווט לא נמצא בדף');
        return;
    }

    // מחיקת כל הקישורים הקיימים
    navLinksContainer.innerHTML = '';
    
    // הקישורים שצריכים להיות בכל דף
    const requiredLinks = [
        { href: 'dashboard.html', text: 'דאשבורד' },
        { href: 'status.html', text: 'סטטוס עריכה' },
        { href: 'index.html', text: 'יומן משימות' },
        { href: 'details.html', text: 'פירוט קלטות' },
        { href: 'gallery.html', text: 'גלריה' }
    ];
    
    // מציאת הדף הנוכחי
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'dashboard.html';

    // הוספת כל הקישורים הנדרשים
    requiredLinks.forEach(linkInfo => {
        const newLink = document.createElement('a');
        newLink.href = linkInfo.href;
        newLink.textContent = linkInfo.text;
        
        // הוספת סימון active אם זה הדף הנוכחי
        if (currentPage === linkInfo.href) {
            newLink.classList.add('active');
        }
        
        navLinksContainer.appendChild(newLink);
    });
}

// הפעלת הפונקציה כשהדף נטען
document.addEventListener('DOMContentLoaded', function() {
    ensureNavigationLinks();
});

// להבטחה כפולה - בדיקה גם לאחר טעינה
setTimeout(ensureNavigationLinks, 1000);
`;

// שמירת קובץ navigation.js
try {
    fs.writeFileSync('navigation.js', navigationJsContent);
    console.log('✅ קובץ navigation.js נוצר בהצלחה');
} catch (err) {
    console.error('❌ שגיאה ביצירת קובץ navigation.js:', err);
    process.exit(1);
}

// 3 + 4. עדכון כל הקבצים: הוספת script וחלפת תפריט הניווט
let updatedCount = 0;

htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`⏩ דילוג על ${file} (הקובץ לא קיים)`);
        return;
    }

    try {
        let content = fs.readFileSync(file, 'utf8');
        let wasUpdated = false;
        
        // 3. וידוא שקובץ navigation.js מקושר
        if (!content.includes('navigation.js')) {
            const headEndPos = content.indexOf('</head>');
            if (headEndPos === -1) {
                console.error(`❌ לא נמצאה תגית </head> בקובץ ${file}`);
            } else {
                // הוספת תגית script
                content = content.slice(0, headEndPos) + 
                    '\n    <script src="navigation.js" defer></script>\n' + 
                    content.slice(headEndPos);
                wasUpdated = true;
                console.log(`✅ הוספת קישור ל-navigation.js בקובץ ${file}`);
            }
        }
        
        // 4. החלפת כל האזכורים של "Diary of Exodus" או "יומן Every Day" ל"יומן משימות"
        if (content.includes('Diary of Exodus') || content.includes('יומן Every Day')) {
            content = content.replace(/Diary of Exodus/g, 'יומן משימות');
            content = content.replace(/יומן Every Day/g, 'יומן משימות');
            wasUpdated = true;
            console.log(`✅ עודכן שם היומן בקובץ ${file}`);
        }
        
        // 5. תיקון כותרות אם זה קובץ index.html
        if (file === 'index.html') {
            // שינוי כותרת הדף אם צריך
            const titleRegex = /<title>(.*?)<\/title>/;
            if (titleRegex.test(content) && !content.includes('<title>יומן משימות</title>')) {
                content = content.replace(titleRegex, '<title>יומן משימות</title>');
                wasUpdated = true;
                console.log('✅ עודכנה כותרת הדף index.html');
            }
            
            // שינוי כותרת בגוף הדף אם צריך
            const h1Regex = /<h1>(.*?)<\/h1>/;
            if (h1Regex.test(content) && !content.match(h1Regex)[1].includes('יומן משימות')) {
                content = content.replace(h1Regex, '<h1>יומן משימות</h1>');
                wasUpdated = true;
                console.log('✅ עודכנה כותרת h1 בדף index.html');
            }
        }
        
        // שמירת הקובץ המעודכן אם בוצעו שינויים
        if (wasUpdated) {
            fs.writeFileSync(file, content, 'utf8');
            updatedCount++;
            console.log(`✅ עודכן ${file}`);
        } else {
            console.log(`⏩ דילוג על ${file} (לא נדרשו שינויים)`);
        }
        
    } catch (err) {
        console.error(`❌ שגיאה בעדכון ${file}:`, err);
    }
});

// 6. תיקון קובץ server.js
try {
    if (fs.existsSync('server.js')) {
        let serverContent = fs.readFileSync('server.js', 'utf8');
        let serverUpdated = false;
        
        // תיקון שגיאת הקוד ב-index.html route
        if (serverContent.includes('app.get(\'/index.html\', (req, res) => {\n    app.get(\'/index.html\', (req, res) => {')) {
            serverContent = serverContent.replace(
                'app.get(\'/index.html\', (req, res) => {\n    app.get(\'/index.html\', (req, res) => {',
                'app.get(\'/index.html\', (req, res) => {'
            );
            serverUpdated = true;
            console.log('✅ תוקנה שגיאה בניתוב index.html בקובץ server.js');
        }
        
        // תיקון של סוגריים סוגרים מיותרים
        if (serverContent.includes('});\n<a href="Edit Status.html" class="nav-link active">סטטוס עריכה</a>\n});')) {
            serverContent = serverContent.replace(
                '});\n<a href="Edit Status.html" class="nav-link active">סטטוס עריכה</a>\n});',
                '});'
            );
            serverUpdated = true;
            console.log('✅ הוסר קוד HTML שהוכנס בטעות בקובץ server.js');
        }
        
        // הוספת ניתוב חדש ל-status.html אם לא קיים
        if (!serverContent.includes('app.get(\'/status.html\'')) {
            const insertPos = serverContent.indexOf('app.get(\'/details.html\'');
            if (insertPos !== -1) {
                const statusRoute = `
app.get('/status.html', (req, res) => {
    console.log('GET request to /status.html');
    res.sendFile(path.join(__dirname, 'status.html'));
});
`;
                serverContent = serverContent.slice(0, insertPos) + statusRoute + serverCon