/**
 * fix-all-pages.js
 * סקריפט אוטומטי לתיקון כל הבעיות בדפים
 * 
 * מה הסקריפט הזה עושה:
 * 1. יוצר קובץ navigation.js מתוקן
 * 2. מעדכן את כל הקישורים בכל הדפים
 * 3. משנה את כותרת דף ה-index ל"יומן Every Day"
 * 4. מוודא שקובץ navigation.js מקושר בכל הדפים
 * 
 * אופן השימוש:
 * 1. שמור את הקובץ בתיקיית הפרויקט (day)
 * 2. הרץ בטרמינל: node fix-all-pages.js
 */

const fs = require('fs');
const path = require('path');

console.log('=== מתחיל תיקון כל הדפים ===');

// תוכן קובץ navigation.js המתוקן
const navigationJsContent = `// navigation.js - קובץ משותף לניהול תפריט הניווט בכל הדפים
// גרסה מתוקנת שמחליפה את כל התפריט בכל מקרה

// פונקציה ליצירת תפריט ניווט מלא בכל דף
function ensureNavigationLinks() {
    // הקישורים שצריכים להיות בכל דף
    const requiredLinks = [
        { href: 'dashboard.html', text: 'דאשבורד' },
        { href: 'status.html', text: 'סטטוס עריכה' },
        { href: 'index.html', text: 'יומן Every Day' }, // שם מעודכן
        { href: 'details.html', text: 'פירוט קלטות' },
        { href: 'gallery.html', text: 'גלריה' }
    ];

    // איתור אלמנט תפריט הניווט
    const navLinksContainer = document.querySelector('.nav-links');
    if (!navLinksContainer) {
        console.error('תפריט הניווט לא נמצא בדף');
        return;
    }

    // מחיקת כל הקישורים הקיימים כדי להימנע מבעיות
    navLinksContainer.innerHTML = '';
    
    // מציאת הדף הנוכחי (טיפול בנתיבים שונים)
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'dashboard.html';

    console.log('דף נוכחי:', currentPage);

    // הוספת כל הקישורים הנדרשים
    requiredLinks.forEach(linkInfo => {
        const newLink = document.createElement('a');
        newLink.href = linkInfo.href;
        newLink.textContent = linkInfo.text;
        
        // הוספת סימון active אם זה הדף הנוכחי
        if (currentPage === linkInfo.href) {
            newLink.classList.add('active');
            console.log('מסמן כפעיל:', linkInfo.href);
        }
        
        navLinksContainer.appendChild(newLink);
    });
}

// הפעלת הפונקציה כשהדף נטען ובכל שינוי בנתיב
document.addEventListener('DOMContentLoaded', function() {
    console.log('טעינת הדף הושלמה, יוצר תפריט ניווט מלא');
    ensureNavigationLinks();
});

// להבטחה כפולה - בדיקה גם לאחר 1 שנייה (למקרה שיש טעינת תוכן מושהית)
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

// רשימת הדפים לעדכון
const htmlFiles = [
    'dashboard.html',
    'status.html',
    'index.html',
    'details.html',
    'gallery.html'
];

// בדיקה שכל הקבצים קיימים
const missingFiles = htmlFiles.filter(file => !fs.existsSync(file));
if (missingFiles.length > 0) {
    console.warn(`⚠️ שים לב: הקבצים הבאים לא נמצאו: ${missingFiles.join(', ')}`);
}

// עדכון כל הקבצים
let updatedCount = 0;

htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`⏩ דילוג על ${file} (הקובץ לא קיים)`);
        return;
    }

    try {
        let content = fs.readFileSync(file, 'utf8');
        let wasUpdated = false;
        
        // וידוא שקובץ navigation.js מקושר
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
        
        // עדכון שם הדף index.html
        if (file === 'index.html') {
            // שינוי כותרת הדף
            const titleRegex = /<title>(.*?)<\/title>/;
            if (titleRegex.test(content)) {
                content = content.replace(titleRegex, '<title>יומן Every Day</title>');
                wasUpdated = true;
                console.log('✅ עודכנה כותרת הדף index.html');
            }
            
            // שינוי כותרת בגוף הדף
            const h1Regex = /<h1>(.*?)<\/h1>/;
            if (h1Regex.test(content)) {
                content = content.replace(h1Regex, '<h1>יומן Every Day</h1>');
                wasUpdated = true;
                console.log('✅ עודכנה כותרת h1 בדף index.html');
            }
        }
        
        // תיקון מיוחד לדף status.html - החלפת תפריט הניווט
        if (file === 'status.html') {
            const navLinksRegex = /<div class="nav-links">[\s\S]*?<\/div>/;
            const newNavLinks = `<div class="nav-links">
    <a href="dashboard.html">דאשבורד</a>
    <a href="status.html" class="active">סטטוס עריכה</a>
    <a href="index.html">יומן Every Day</a>
    <a href="details.html">פירוט קלטות</a>
    <a href="gallery.html">גלריה</a>
</div>`;
            
            if (navLinksRegex.test(content)) {
                content = content.replace(navLinksRegex, newNavLinks);
                wasUpdated = true;
                console.log('✅ הוחלף תפריט הניווט בדף status.html');
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

// סיכום
console.log('\n=== סיכום תיקון כל הדפים ===');
console.log(`✅ עודכנו ${updatedCount} מתוך ${htmlFiles.length} קבצים`);
console.log('✅ נוצר קובץ navigation.js מתוקן');
console.log('\n✅ הסקריפט סיים לרוץ. הפעל את השרת מחדש ובדוק שהתיקונים עובדים כראוי.');
console.log('\nפקודה להפעלת השרת: node server.js');
