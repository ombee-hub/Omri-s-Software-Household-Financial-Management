/**
 * update-all-pages.js
 * סקריפט לעדכון כל דפי האתר לעיצוב אחיד
 * 
 * פעולות:
 * 1. הסרת תפריטי ניווט מכל סוג והחלפתם בתפריט האייקונים החדש
 * 2. וידוא שאין התנגשויות בין סגנונות
 * 3. יצירת גיבויים לקבצים המקוריים
 */

const fs = require('fs');
const path = require('path');

console.log('=== מתחיל עדכון כל הדפים לעיצוב אחיד ===');

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

// קוד תפריט האייקונים להטמעה
const iconsNavbarCode = `<!-- קוד תפריט האייקונים -->
<style>
.icons-navbar {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e0e0e0;
    padding: 10px 0;
    margin-bottom: 15px;
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
    padding: 5px 10px;
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

<!-- תפריט האייקונים -->
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

// יצירת תיקיית גיבויים אם אינה קיימת
const backupDir = 'backups';
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
    console.log(`✅ נוצרה תיקייה ${backupDir} לגיבויים`);
}

// עדכון כל הקבצים
let updatedCount = 0;
let errorCount = 0;

htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`⚠️ הקובץ ${file} לא נמצא, דילוג...`);
        return;
    }

    try {
        // קריאת תוכן הקובץ
        let content = fs.readFileSync(file, 'utf8');
        
        // יצירת גיבוי
        const backupPath = path.join(backupDir, `${file}.backup`);
        fs.writeFileSync(backupPath, content, 'utf8');
        console.log(`✅ נוצר גיבוי לקובץ ${file} בנתיב ${backupPath}`);
        
        let wasUpdated = false;
        
        // 1. הסרת תפריטי ניווט קודמים
        
        // 1.1 הסרת תפריט nav-container
        if (content.includes('class="nav-container"')) {
            const navStartPos = content.indexOf('<nav class="nav-container"');
            if (navStartPos !== -1) {
                const navEndPos = content.indexOf('</nav>', navStartPos) + 6;
                if (navEndPos !== -1) {
                    content = content.slice(0, navStartPos) + content.slice(navEndPos);
                    wasUpdated = true;
                    console.log(`✅ הוסר תפריט nav-container מהקובץ ${file}`);
                }
            }
        }
        
        // 1.2 הסרת תפריט navbar
        if (content.includes('class="navbar"')) {
            const navbarStartPos = content.indexOf('<nav class="navbar"');
            if (navbarStartPos !== -1) {
                const navbarEndPos = content.indexOf('</nav>', navbarStartPos) + 6;
                if (navbarEndPos !== -1) {
                    content = content.slice(0, navbarStartPos) + content.slice(navbarEndPos);
                    wasUpdated = true;
                    console.log(`✅ הוסר תפריט navbar מהקובץ ${file}`);
                }
            }
        }
        
        // 1.3 הסרת תפריט אייקונים קודם
        if (content.includes('class="icons-navbar"') || content.includes('class="top-icons-navbar"')) {
            const startPos = content.indexOf('<div class="icons-navbar"') || content.indexOf('<div class="top-icons-navbar"');
            if (startPos !== -1) {
                const endPos = content.indexOf('</div>', content.indexOf('</div>', startPos) + 6) + 6;
                if (endPos !== -1) {
                    content = content.slice(0, startPos) + content.slice(endPos);
                    wasUpdated = true;
                    console.log(`✅ הוסר תפריט אייקונים קודם מהקובץ ${file}`);
                }
            }
        }
        
        // 1.4 הסרת סגנונות קודמים של תפריט אייקונים
        if (content.includes('icons-navbar') || content.includes('top-icons-navbar')) {
            const styleStartPos = content.indexOf('<style>', content.indexOf('icons-navbar'));
            if (styleStartPos !== -1) {
                const styleEndPos = content.indexOf('</style>', styleStartPos) + 8;
                if (styleEndPos !== -1) {
                    content = content.slice(0, styleStartPos) + content.slice(styleEndPos);
                    wasUpdated = true;
                    console.log(`✅ הוסרו סגנונות קודמים של תפריט אייקונים מהקובץ ${file}`);
                }
            }
        }
        
        // 1.5 הסרת סקריפט קודם של תפריט אייקונים
        if (content.includes('document.getElementById(linkId)')) {
            const scriptStartPos = content.indexOf('<script', content.indexOf('document.getElementById(linkId)'));
            if (scriptStartPos !== -1) {
                const scriptEndPos = content.indexOf('</script>', scriptStartPos) + 9;
                if (scriptEndPos !== -1) {
                    content = content.slice(0, scriptStartPos) + content.slice(scriptEndPos);
                    wasUpdated = true;
                    console.log(`✅ הוסר סקריפט קודם של תפריט אייקונים מהקובץ ${file}`);
                }
            }
        }
        
        // 2. מציאת תגית <body> והוספת התפריט החדש
        const bodyPos = content.indexOf('<body');
        if (bodyPos === -1) {
            console.error(`❌ לא נמצאה תגית <body> בקובץ ${file}`);
            errorCount++;
            return;
        }
        
        // מציאת סוף תגית <body>
        const bodyEndPos = content.indexOf('>', bodyPos);
        if (bodyEndPos === -1) {
            console.error(`❌ לא נמצא סוף תגית <body> בקובץ ${file}`);
            errorCount++;
            return;
        }
        
        // הוספת התפריט החדש
        content = content.slice(0, bodyEndPos + 1) + '\n' + iconsNavbarCode + '\n' + content.slice(bodyEndPos + 1);
        wasUpdated = true;
        
        // שמירת הקובץ המעודכן
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
        console.log(`✅ עודכן ${file} עם תפריט האייקונים החדש`);
        
    } catch (err) {
        console.error(`❌ שגיאה בעדכון ${file}:`, err);
        errorCount++;
    }
});

// סיכום
console.log('\n=== סיכום עדכון כל הדפים ===');
console.log(`✅ עודכנו ${updatedCount} מתוך ${htmlFiles.length} קבצים`);
if (errorCount > 0) {
    console.log(`❌ נכשל עדכון של ${errorCount} קבצים`);
}
console.log(`✅ כל הגיבויים נשמרו בתיקייה ${backupDir}`);
console.log('\n✅ העדכון הסתיים. הפעל את השרת כדי לבדוק את התוצאה:');
console.log('node server.js');