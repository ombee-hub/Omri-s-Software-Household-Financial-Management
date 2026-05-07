/**
 * fix-hebrew.js
 * סקריפט לעדכון כל הדפים לשימוש בכותרת "יומן משימות" בעברית
 * והסרת התפריטים הישנים
 */

const fs = require('fs');
const path = require('path');

console.log('=== מתחיל עדכון לעברית והסרת תפריטים ישנים ===');

// תוכן קובץ navigation.js המעודכן
const navigationJsContent = `// navigation.js - קובץ משותף לניהול תפריט הניווט בכל הדפים
// גרסה מתוקנת שמחליפה את כל התפריט בכל מקרה

// פונקציה ליצירת תפריט ניווט מלא בכל דף
function ensureNavigationLinks() {
    // הקישורים שצריכים להיות בכל דף
    const requiredLinks = [
        { href: 'dashboard.html', text: 'דאשבורד' },
        { href: 'status.html', text: 'סטטוס עריכה' },
        { href: 'index.html', text: 'יומן משימות' }, // שם מעודכן בעברית
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
    console.log('✅ קובץ navigation.js עודכן לעברית');
} catch (err) {
    console.error('❌ שגיאה בעדכון קובץ navigation.js:', err);
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
        
        // החלפת כל האזכורים של Diary of Exodus ל-יומן משימות
        if (content.includes('Diary of Exodus') || content.includes('יומן Every Day')) {
            content = content.replace(/Diary of Exodus/g, 'יומן משימות');
            content = content.replace(/יומן Every Day/g, 'יומן משימות');
            wasUpdated = true;
            console.log(`✅ הוחלפו אזכורים ל-Diary of Exodus/יומן Every Day בקובץ ${file}`);
        }
        
        // עדכון תגית הכותרת
        const titleRegex = /<title>(.*?)<\/title>/;
        if (titleRegex.test(content) && !content.includes('<title>יומן משימות</title>')) {
            content = content.replace(titleRegex, '<title>יומן משימות</title>');
            wasUpdated = true;
            console.log(`✅ עודכנה כותרת הדף ${file}`);
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

// עדכון ספציפי של index.html (יצירה מחדש אם צריך)
try {
    if (!fs.existsSync('index.html')) {
        // יצירת קובץ index.html חדש
        const indexHtmlContent = `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>יומן משימות</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎥</text></svg>">
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap" rel="stylesheet">
    <script src="navigation.js" defer></script>
    <style>
        body {
            font-family: 'Rubik', Arial, sans-serif !important;
            background-color: #f0f2f5;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }

        .container {
            margin: 0 auto;
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin-bottom: 2rem;
            padding: 1rem;
            position: relative;
        }

        .logo {
            font-size: 40px;
            margin-left: 5px;
        }

        h1 {
            text-align: center;
            color: #1a73e8;
            margin: 0;
            font-size: 2rem;
        }

        .nav-links {
            display: flex;
            justify-content: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }

        .nav-links a {
            padding: 0.75rem 1.5rem;
            background-color: #e3f2fd;
            color: #1a73e8;
            border: 2px solid #1a73e8;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
            font-size: 1rem;
            margin: 0.5rem;
            transition: all 0.3s ease;
        }

        .nav-links a.active {
            background-color: #1a73e8;
            color: white;
            border-color: #1a73e8;
            font-weight: bold;
            box-shadow: 0 2px 4px rgba(26, 115, 232, 0.2);
        }

        .logout-btn {
            position: absolute;
            left: 20px;
            top: 20px;
            padding: 0.5rem 1rem;
            background-color: #dc3545;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9rem;
            font-family: 'Rubik', Arial, sans-serif;
        }

        .logout-btn:hover {
            background-color: #c82333;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🎥</div>
            <h1>יומן משימות</h1>
            <button onclick="logout()" class="logout-btn">התנתק</button>
        </div>

        <div class="nav-links">
            <!-- התפריט יתמלא דינמית ע"י navigation.js -->
        </div>

        <!-- תוכן הדף -->
        <div style="text-align: center; padding: 3rem; color: #666;">
            <h2>ברוכים הבאים ליומן משימות</h2>
            <p>המערכת לניהול קלטות וידאו</p>
            <p>השתמש בתפריט למעלה כדי לנווט בין הדפים השונים</p>
        </div>
    </div>

    <script>
        // בדיקת התחברות
        if (!localStorage.getItem('isLoggedIn')) {
            window.location.href = 'login.html';
        }

        // פונקציית התנתקות
        function logout() {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'login.html';
        }
    </script>
</body>
</html>`;
        
        fs.writeFileSync('index.html', indexHtmlContent);
        console.log('✅ נוצר קובץ index.html חדש');
    }
} catch (err) {
    console.error('❌ שגיאה ביצירת קובץ index.html:', err);
}

// סיכום
console.log('\n=== סיכום עדכון לעברית והסרת תפריטים ישנים ===');
console.log(`✅ עודכנו ${updatedCount} מתוך ${htmlFiles.length} קבצים`);
console.log('✅ עודכן קובץ navigation.js לשימוש בעברית');
console.log('\n✅ הסקריפט סיים לרוץ. הפעל את השרת מחדש ובדוק שהתיקונים עובדים כראוי.');
console.log('\nפקודה להפעלת השרת: node server.js');
