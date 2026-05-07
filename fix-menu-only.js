/**
 * fix-menu-only.js
 * סקריפט להחלפת התפריט בכל הדפים לתפריט הקבוע המבוקש
 */

const fs = require('fs');
const path = require('path');

console.log('=== החלפת התפריט בכל הדפים לתפריט הקבוע המבוקש ===');

// CSS לתפריט
const navCssContent = `/* סגנון התפריט המדויק כפי שמופיע בתמונה */

.nav-links {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 10px;
}

.nav-links a {
    padding: 0.75rem 1.5rem;
    background-color: white;
    color: #1976d2;
    border: 1px solid #1976d2;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    font-size: 1rem;
    transition: all 0.3s ease;
    min-width: 60px;
    text-align: center;
}

.nav-links a.active {
    background-color: #1976d2;
    color: white;
    border-color: #1976d2;
    font-weight: normal;
}

.nav-links a:hover:not(.active) {
    background-color: #f0f7ff;
}`;

// שמירת קובץ CSS
try {
    fs.writeFileSync('nav-style.css', navCssContent);
    console.log('✅ נוצר קובץ nav-style.css');
} catch (err) {
    console.error('❌ שגיאה ביצירת קובץ nav-style.css:', err);
}

// תוכן קובץ navigation.js המעודכן
const navigationJsContent = `// navigation.js - קובץ לניהול תפריט הניווט בכל הדפים
// גרסה סופית - מציג רק את התפריט המבוקש

// פונקציה ליצירת תפריט ניווט קבוע
function createFixedNavigation() {
    // איתור אלמנט תפריט הניווט
    const navLinksContainer = document.querySelector('.nav-links');
    if (!navLinksContainer) {
        console.error('תפריט הניווט לא נמצא בדף');
        return;
    }

    // מחיקת כל הקישורים הקיימים
    navLinksContainer.innerHTML = '';
    
    // יצירת התפריט הקבוע המבוקש
    const links = [
        { href: 'gallery.html', text: 'גלריה', active: window.location.pathname.includes('gallery.html') },
        { href: 'details.html', text: 'פירוט קלטות', active: window.location.pathname.includes('details.html') },
        { href: 'index.html', text: 'יומן משימות', active: window.location.pathname.includes('index.html') },
        { href: 'status.html', text: 'סטטוס עריכה', active: window.location.pathname.includes('status.html') },
        { href: 'dashboard.html', text: 'דאשבורד', active: window.location.pathname.includes('dashboard.html') }
    ];
    
    // הוספת הקישורים לתפריט בסדר הרצוי
    links.forEach(link => {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.text;
        
        // הוספת סימון active אם זה הדף הנוכחי
        if (link.active) {
            newLink.classList.add('active');
        }
        
        navLinksContainer.appendChild(newLink);
    });
}

// הפעלת הפונקציה כשהדף נטען
document.addEventListener('DOMContentLoaded', function() {
    createFixedNavigation();
});`;

// שמירת קובץ navigation.js
try {
    fs.writeFileSync('navigation.js', navigationJsContent);
    console.log('✅ קובץ navigation.js נוצר בהצלחה');
} catch (err) {
    console.error('❌ שגיאה ביצירת קובץ navigation.js:', err);
}

// רשימת הדפים לעדכון
const htmlFiles = [
    'dashboard.html',
    'status.html',
    'index.html',
    'details.html',
    'gallery.html'
];

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
        
        // וידוא שקובץ nav-style.css מקושר
        if (!content.includes('nav-style.css')) {
            const headEndPos = content.indexOf('</head>');
            if (headEndPos === -1) {
                console.error(`❌ לא נמצאה תגית </head> בקובץ ${file}`);
            } else {
                // הוספת תגית link
                content = content.slice(0, headEndPos) + 
                    '\n    <link rel="stylesheet" href="nav-style.css">\n' + 
                    content.slice(headEndPos);
                wasUpdated = true;
                console.log(`✅ הוספת קישור ל-nav-style.css בקובץ ${file}`);
            }
        }
        
        // החלפת תפריט הניווט בתפריט ריק שיתמלא דינמית
        const navLinksRegex = /<div class="nav-links">[\s\S]*?<\/div>/;
        const newNavLinks = `<div class="nav-links">
    <!-- התפריט יתמלא דינמית ע"י navigation.js -->
</div>`;
        
        if (navLinksRegex.test(content)) {
            content = content.replace(navLinksRegex, newNavLinks);
            wasUpdated = true;
            console.log(`✅ הוסר התפריט הישן והוחלף בתפריט ריק בקובץ ${file}`);
        }
        
        // שמירת הקובץ המעודכן אם בוצעו שינויים
        if (wasUpdated) {
            fs.writeFileSync(file, content, 'utf8');
            updatedCount++;
            console.log(`✅ נשמר ${file} עם עדכונים`);
        } else {
            console.log(`⏩ דילוג על ${file} (לא נדרשו שינויים)`);
        }
        
    } catch (err) {
        console.error(`❌ שגיאה בעדכון ${file}:`, err);
    }
});

// סיכום
console.log('\n=== סיכום החלפת התפריט בכל הדפים ===');
console.log(`✅ עודכנו ${updatedCount} מתוך ${htmlFiles.length} קבצים`);
console.log('✅ נוצר קובץ navigation.js עם התפריט הקבוע המבוקש');
console.log('✅ נוצר קובץ nav-style.css עם העיצוב המדויק לתפריט');
console.log('\n✅ הסקריפט סיים לרוץ. הפעל את השרת מחדש ובדוק שהתפריט נראה כמו בתמונה.');
console.log('\nפקודה להפעלת השרת: node server.js');
