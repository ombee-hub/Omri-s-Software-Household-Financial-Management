/**
 * quick-fix-navbar.js
 * סקריפט מהיר להוספת תפריט אייקונים ישירות לקוד HTML של כל הדפים
 * הגישה הזו מבטיחה שהתפריט יופיע גם אם יש בעיות עם קבצים חיצוניים
 */

const fs = require('fs');
const path = require('path');

console.log('=== מוסיף תפריט אייקונים ישירות לקוד HTML של הדפים ===');

// הקוד HTML שיתווסף ישירות לכל דף - מכיל סגנונות וסקריפט
const iconsNavbarHTML = `
<style>
/* סגנון ישיר לתפריט האייקונים */
.top-icons-navbar {
    display: flex;
    justify-content: center;
    background-color: white;
    border-bottom: 1px solid #e0e0e0;
    padding: 10px 0;
    margin-bottom: 20px;
}

.top-icons-container {
    display: flex;
    justify-content: center;
    gap: 25px;
    max-width: 600px;
    margin: 0 auto;
}

.icon-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #333;
    padding: 5px 10px;
    border-radius: 5px;
}

.icon-link.active {
    color: #0d6efd;
}

.icon-link:hover:not(.active) {
    background-color: #f8f9fa;
}

.nav-icon {
    font-size: 1.5rem;
    margin-bottom: 5px;
}

.icon-label {
    font-size: 0.85rem;
    text-align: center;
}

@media (max-width: 600px) {
    .top-icons-container {
        gap: 10px;
    }
    
    .icon-label {
        font-size: 0.7rem;
    }
}
</style>

<!-- תפריט האייקונים -->
<div class="top-icons-navbar">
    <div class="top-icons-container">
        <a href="dashboard.html" class="icon-link" id="dashboard-link">
            <span class="nav-icon">📊</span>
            <span class="icon-label">דאשבורד</span>
        </a>
        <a href="status.html" class="icon-link" id="status-link">
            <span class="nav-icon">🔄</span>
            <span class="icon-label">סטטוס עריכה</span>
        </a>
        <a href="index.html" class="icon-link" id="index-link">
            <span class="nav-icon">📝</span>
            <span class="icon-label">יומן משימות</span>
        </a>
        <a href="details.html" class="icon-link" id="details-link">
            <span class="nav-icon">📋</span>
            <span class="icon-label">פירוט קלטות</span>
        </a>
        <a href="gallery.html" class="icon-link" id="gallery-link">
            <span class="nav-icon">🖼️</span>
            <span class="icon-label">גלריה</span>
        </a>
    </div>
</div>

<script>
// סימון הקישור הפעיל
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'dashboard.html';
    
    // הסרת .html מהשם אם צריך
    const pageId = pageName.replace('.html', '');
    
    // טיפול במקרים מיוחדים
    let linkId = pageId + '-link';
    if (pageName === 'Edit Status.html') {
        linkId = 'status-link';
    }
    
    const activeLink = document.getElementById(linkId);
    if (activeLink) {
        activeLink.classList.add('active');
    }
});
</script>
`;

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

// עדכון כל הקבצים
let updatedCount = 0;

htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`⏩ דילוג על ${file} (הקובץ לא קיים)`);
        return;
    }

    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // בדיקה אם התפריט כבר קיים
        if (content.includes('top-icons-navbar')) {
            console.log(`⏩ דילוג על ${file} (תפריט אייקונים כבר קיים)`);
            return;
        }
        
        // מציאת תגית <body> לשם הוספת התפריט
        const bodyPos = content.indexOf('<body');
        if (bodyPos === -1) {
            console.error(`❌ לא נמצאה תגית <body> בקובץ ${file}`);
            return;
        }
        
        // מציאת סוף תגית body
        const bodyEndPos = content.indexOf('>', bodyPos);
        if (bodyEndPos === -1) {
            console.error(`❌ לא ניתן לאתר את סוף תגית body בקובץ ${file}`);
            return;
        }
        
        // הוספת קוד תפריט האייקונים מיד לאחר פתיחת תגית body
        const newContent = content.slice(0, bodyEndPos + 1) + iconsNavbarHTML + content.slice(bodyEndPos + 1);
        
        // שמירת הקובץ המעודכן
        fs.writeFileSync(file, newContent, 'utf8');
        updatedCount++;
        console.log(`✅ נוסף תפריט אייקונים לקובץ ${file}`);
        
    } catch (err) {
        console.error(`❌ שגיאה בעדכון ${file}:`, err);
    }
});

// סיכום
console.log('\n=== סיכום הוספת תפריט אייקונים ===');
console.log(`✅ הוסף תפריט אייקונים ל-${updatedCount} מתוך ${htmlFiles.length} דפים`);
console.log('\n✅ הסקריפט סיים לרוץ. הפעל את השרת מחדש ובדוק שתפריט האייקונים מופיע בכל הדפים.');
console.log('\nפקודה להפעלת השרת: node server.js');