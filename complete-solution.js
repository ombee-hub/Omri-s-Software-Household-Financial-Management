/**
 * complete-menu-solution.js
 * סקריפט מלא להסרת התפריט התחתון והשארת תפריט האייקונים העליון בלבד
 */

const fs = require('fs');
const path = require('path');

console.log('=== מתחיל עדכון מלא של התפריטים באתר ===');

// רשימת הדפים לעדכון
const htmlFiles = [
    'dashboard.html',
    'status.html',
    'Edit Status.html',
    'index.html',
    'details.html',
    'gallery.html',
    'login.html'
];

// תיקיית גיבויים
const backupDir = 'menu-backups-full';
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
    console.log(`✅ נוצרה תיקייה ${backupDir} לגיבויים`);
}

// קוד תפריט האייקונים המעודכן (יחיד במקום שני תפריטים)
const updatedIconsNavbarCode = `<!-- קוד תפריט האייקונים - יחיד -->
<style>
/* סגנון מעודכן לתפריט האייקונים ללא תפריט נוסף */
.icons-navbar {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e0e0e0;
    padding: 10px 0;
    margin-bottom: 20px; /* מרווח מתוכן העמוד */
}

.icons-container {
    display: flex;
    width: 100%;
    max-width: 600px;
    justify-content: space-between;
}

.icon-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #333;
    padding: 8px 10px; /* הגדלנו מעט את הפדינג האנכי */
    border-radius: 4px;
    position: relative;
}

.icon-link.active {
    color: #673ab7; /* הצבע הסגול שנראה בתמונה */
}

.icon-link.active::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: #673ab7; /* הקו התחתון בצבע סגול */
    border-radius: 1.5px;
}

.icon-img {
    font-size: 24px;
    margin-bottom: 5px;
}

.icon-label {
    font-size: 14px;
    text-align: center;
    font-family: 'Rubik', Arial, sans-serif;
}

/* עבור מסכים קטנים */
@media (max-width: 480px) {
    .icons-container {
        width: 100%;
    }
    
    .icon-img {
        font-size: 20px;
    }
    
    .icon-label {
        font-size: 12px;
    }
}
</style>

<!-- תפריט האייקונים היחיד -->
<div class="icons-navbar">
    <div class="icons-container">
        <a href="dashboard.html" class="icon-link" id="dashboard-link">
            <span class="icon-img">📊</span>
            <span class="icon-label">דאשבורד</span>
        </a>
        <a href="status.html" class="icon-link" id="status-link">
            <span class="icon-img">⚙️</span>
            <span class="icon-label">סטטוס עריכה</span>
        </a>
        <a href="index.html" class="icon-link" id="index-link">
            <span class="icon-img">📅</span>
            <span class="icon-label">יומן משימות</span>
        </a>
        <a href="details.html" class="icon-link" id="details-link">
            <span class="icon-img">📋</span>
            <span class="icon-label">פירוט קלטות</span>
        </a>
        <a href="gallery.html" class="icon-link" id="gallery-link">
            <span class="icon-img">🖼️</span>
            <span class="icon-label">גלריה</span>
        </a>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // זיהוי הדף הנוכחי
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'dashboard.html';
    
    // הסרת סיומת .html לצורך השוואה
    const pageId = pageName.replace('.html', '');
    
    // טיפול במקרים מיוחדים
    let linkId = pageId + '-link';
    if (pageName === 'Edit Status.html') {
        linkId = 'status-link';
    }
    
    // הוספת מחלקת 'active' לקישור הנוכחי
    const activeLink = document.getElementById(linkId);
    if (activeLink) {
        activeLink.classList.add('active');
    }
});
</script>
`;

// עדכון כל הקבצים
let updatedCount = 0;
let errorCount = 0;

htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`⏩ דילוג על ${file} (הקובץ לא קיים)`);
        return;
    }

    try {
        // קריאת תוכן הקובץ
        let content = fs.readFileSync(file, 'utf8');
        
        // יצירת גיבוי לקובץ המקורי
        const backupFile = path.join(backupDir, `${file}.backup`);
        fs.writeFileSync(backupFile, content, 'utf8');
        console.log(`✅ נוצר גיבוי של ${file} בנתיב ${backupFile}`);
        
        let wasUpdated = false;
        
        // 1. הסרת תפריט האייקונים הקיים (אם יש)
        if (content.includes('class="icons-navbar"') || content.includes('class="top-icons-navbar"')) {
            // מציאת תחילת בלוק הסגנון
            const styleStartPos = content.indexOf('<style>', content.indexOf('icons-navbar'));
            if (styleStartPos !== -1) {
                // מציאת סוף בלוק הסגנון
                const styleEndPos = content.indexOf('</style>', styleStartPos) + 8;
                if (styleEndPos > styleStartPos) {
                    // הסרת בלוק הסגנון
                    content = content.slice(0, styleStartPos) + content.slice(styleEndPos);
                    wasUpdated = true;
                }
            }
            
            // מציאת תחילת תפריט האייקונים
            const navStartPos = content.indexOf('<div class="icons-navbar"') || content.indexOf('<div class="top-icons-navbar"');
            if (navStartPos !== -1) {
                // מציאת סוף תפריט האייקונים (סגירת הדיב השני)
                const firstDivEnd = content.indexOf('</div>', navStartPos) + 6;
                const secondDivEnd = content.indexOf('</div>', firstDivEnd) + 6;
                if (secondDivEnd > firstDivEnd) {
                    // הסרת בלוק תפריט האייקונים
                    content = content.slice(0, navStartPos) + content.slice(secondDivEnd);
                    wasUpdated = true;
                }
            }
            
            // הסרת הסקריפט של תפריט האייקונים
            const scriptStartPos = content.indexOf('<script>', content.indexOf('document.addEventListener'));
            if (scriptStartPos !== -1) {
                const scriptEndPos = content.indexOf('</script>', scriptStartPos) + 9;
                if (scriptEndPos > scriptStartPos) {
                    content = content.slice(0, scriptStartPos) + content.slice(scriptEndPos);
                    wasUpdated = true;
                }
            }
            
            console.log(`✅ הוסר תפריט האייקונים הקיים מהקובץ ${file}`);
        }
        
        // 2. הסרת התפריט התחתון (navbar, nav-container וכו')
        [
            '<nav class="navbar"', 
            '<nav class="nav-container"', 
            '<div class="navbar"',
            '<div class="nav-container">',
            '<div class="navbar-container">',
            '<div class="nav-content">'
        ].forEach(navSelector => {
            if (content.includes(navSelector)) {
                // מציאת תחילת וסוף הבלוק
                const navStartPos = content.indexOf(navSelector);
                if (navStartPos !== -1) {
                    // מציאת סוף הבלוק - תגית סגירה מתאימה
                    let navEndPos;
                    if (navSelector.startsWith('<nav')) {
                        navEndPos = content.indexOf('</nav>', navStartPos) + 6;
                    } else { // div
                        // במקרה של div, צריך למצוא את תגית הסגירה הנכונה
                        let openCount = 1;
                        let pos = navStartPos + 5; // אחרי פתיחת ה-div
                        while (openCount > 0 && pos < content.length) {
                            const nextOpenPos = content.indexOf('<div', pos);
                            const nextClosePos = content.indexOf('</div>', pos);
                            
                            if (nextClosePos === -1) break;
                            
                            if (nextOpenPos !== -1 && nextOpenPos < nextClosePos) {
                                openCount++;
                                pos = nextOpenPos + 5;
                            } else {
                                openCount--;
                                pos = nextClosePos + 6;
                                if (openCount === 0) {
                                    navEndPos = nextClosePos + 6;
                                }
                            }
                        }
                    }
                    
                    if (navEndPos && navEndPos > navStartPos) {
                        // בדיקה שזה לא חלק מתפריט האייקונים
                        const menuContent = content.substring(navStartPos, navEndPos);
                        if (!menuContent.includes('icons-navbar') && !menuContent.includes('icons-container')) {
                            content = content.slice(0, navStartPos) + content.slice(navEndPos);
                            wasUpdated = true;
                            console.log(`✅ הוסר תפריט מסוג ${navSelector} מהקובץ ${file}`);
                        }
                    }
                }
            }
        });
        
        // 3. הסרת תגית <header> אם קיימת (נמצאת לפני התפריט בדרך כלל)
        if (content.includes('<header')) {
            const headerStartPos = content.indexOf('<header');
            if (headerStartPos !== -1) {
                // מציאת סוף תגית ה-header
                const headerEndPos = content.indexOf('</header>', headerStartPos) + 9;
                if (headerEndPos > headerStartPos) {
                    // בדיקה שלא מכילה את תפריט האייקונים
                    const headerContent = content.substring(headerStartPos, headerEndPos);
                    if (!headerContent.includes('icons-navbar')) {
                        content = content.slice(0, headerStartPos) + content.slice(headerEndPos);
                        wasUpdated = true;
                        console.log(`✅ הוסרה תגית header מהקובץ ${file}`);
                    }
                }
            }
        }
        
        // 4. הוספת תפריט האייקונים החדש (היחיד) מיד אחרי תגית <body>
        const bodyStartPos = content.indexOf('<body');
        if (bodyStartPos !== -1) {
            const bodyEndPos = content.indexOf('>', bodyStartPos);
            if (bodyEndPos !== -1) {
                content = content.slice(0, bodyEndPos + 1) + '\n' + updatedIconsNavbarCode + '\n' + content.slice(bodyEndPos + 1);
                wasUpdated = true;
                console.log(`✅ נוסף תפריט האייקונים החדש לקובץ ${file}`);
            }
        }
        
        // עדכון הקובץ אם היו שינויים
        if (wasUpdated) {
            fs.writeFileSync(file, content, 'utf8');
            updatedCount++;
            console.log(`✅ עודכן ${file} - כעת יש רק תפריט אייקונים אחד`);
        } else {
            console.log(`⏩ לא נדרשו שינויים בקובץ ${file}`);
        }
        
    } catch (err) {
        console.error(`❌ שגיאה בעדכון ${file}:`, err);
        errorCount++;
    }
});

// סיכום
console.log('\n=== סיכום העדכון המלא של התפריטים ===');
console.log(`✅ עודכנו ${updatedCount} מתוך ${htmlFiles.length} קבצים`);
if (errorCount > 0) {
    console.log(`❌ נכשל עדכון של ${errorCount} קבצים`);
}
console.log(`✅ כל הגיבויים נשמרו בתיקייה ${backupDir}`);
console.log('\n✅ העדכון הסתיים. הפעל את השרת כדי לבדוק את התוצאה:');
console.log('node server.js');
