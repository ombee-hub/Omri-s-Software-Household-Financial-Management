/**
 * install-icons-navbar.js
 * סקריפט להטמעת תפריט האייקונים בכל דפי האתר
 * 
 * השימוש:
 * 1. שמור את הקובץ בתיקיית הפרויקט
 * 2. הרץ בטרמינל: node install-icons-navbar.js
 */

const fs = require('fs');
const path = require('path');

console.log('=== התחלת התקנת תפריט האייקונים בכל הדפים ===');

// קוד תפריט האייקונים להטמעה בכל דף
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

// רשימת הדפים להטמעה
const htmlFiles = [
    'dashboard.html',
    'status.html',
    'Edit Status.html',
    'index.html',
    'details.html',
    'gallery.html',
    'login.html'
];

// הסרת תפריטים קודמים והטמעת התפריט החדש
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
        let wasUpdated = false;
        
        // הסרת תפריטים קודמים (אם קיימים)
        // הסרת סגנונות
        if (content.includes('.icons-navbar') || content.includes('.top-icons-navbar')) {
            const styleStart = content.indexOf('<style', content.indexOf('icons-navbar'));
            if (styleStart !== -1) {
                const styleEnd = content.indexOf('</style>', styleStart) + 8;
                content = content.slice(0, styleStart) + content.slice(styleEnd);
                wasUpdated = true;
            }
        }
        
        // הסרת אלמנט התפריט
        if (content.includes('class="icons-navbar"') || content.includes('class="top-icons-navbar"')) {
            const navStart = content.indexOf('<div class="icons-navbar"');
            if (navStart !== -1) {
                const navEnd = content.indexOf('</div>', content.indexOf('</div>', navStart) + 6) + 6;
                content = content.slice(0, navStart) + content.slice(navEnd);
                wasUpdated = true;
            }
            
            const nav2Start = content.indexOf('<div class="top-icons-navbar"');
            if (nav2Start !== -1) {
                const nav2End = content.indexOf('</div>', content.indexOf('</div>', nav2Start) + 6) + 6;
                content = content.slice(0, nav2Start) + content.slice(nav2End);
                wasUpdated = true;
            }
        }
        
        // הסרת סקריפט קודם
        if (content.includes('document.getElementById(linkId)')) {
            const scriptStart = content.indexOf('<script', content.indexOf('document.getElementById(linkId)'));
            if (scriptStart !== -1) {
                const scriptEnd = content.indexOf('</script>', scriptStart) + 9;
                content = content.slice(0, scriptStart) + content.slice(scriptEnd);
                wasUpdated = true;
            }
        }
        
        // מציאת תגית <body> להוספת התפריט החדש
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
        
        // שמירת הקובץ המעודכן
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
        console.log(`✅ הוטמע תפריט אייקונים בקובץ ${file}`);
        
    } catch (err) {
        console.error(`❌ שגיאה בהטמעת תפריט בקובץ ${file}:`, err);
        errorCount++;
    }
});

// סיכום
console.log('\n=== סיכום התקנת תפריט האייקונים ===');
console.log(`✅ הותקן תפריט אייקונים ב-${updatedCount} קבצים`);
if (errorCount > 0) {
    console.log(`❌ נכשלה התקנה ב-${errorCount} קבצים`);
}
console.log('\n✅ ההתקנה הסתיימה. הפעל את השרת כדי לבדוק את התוצאה:');
console.log('node server.js');