/**
 * fix-dashboard.js
 * סקריפט ייעודי לעדכון דף הדאשבורד לעיצוב החדש
 */

const fs = require('fs');

console.log('=== מתחיל עדכון דף הדאשבורד ===');

// שם הקובץ לעדכון
const fileName = 'dashboard.html';

// בדיקה שהקובץ קיים
if (!fs.existsSync(fileName)) {
    console.error(`❌ הקובץ ${fileName} לא נמצא!`);
    process.exit(1);
}

// קוד תפריט האייקונים המעודכן
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
        <a href="dashboard.html" class="icon-link active" id="dashboard-link">
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
`;

try {
    // יצירת גיבוי לקובץ המקורי
    const backupFileName = `${fileName}.backup`;
    fs.copyFileSync(fileName, backupFileName);
    console.log(`✅ נוצר גיבוי של הקובץ המקורי: ${backupFileName}`);
    
    // קריאת תוכן הקובץ
    let content = fs.readFileSync(fileName, 'utf8');
    
    // הסרת תפריטי ניווט קודמים
    
    // 1. הסרת תפריט הניווט העיקרי (navbar)
    let wasUpdated = false;
    if (content.includes('<nav class="navbar">') || content.includes('<nav class="nav-container">')) {
        const navStartPos = content.indexOf('<nav class="navbar">') !== -1 
            ? content.indexOf('<nav class="navbar">') 
            : content.indexOf('<nav class="nav-container">');
            
        if (navStartPos !== -1) {
            const navEndPos = content.indexOf('</nav>', navStartPos) + 6;
            if (navEndPos !== -1) {
                content = content.slice(0, navStartPos) + content.slice(navEndPos);
                wasUpdated = true;
                console.log('✅ הוסר תפריט הניווט הישן');
            }
        }
    }
    
    // 2. הסרת תפריט אייקונים קודם אם קיים
    if (content.includes('class="icons-navbar"') || content.includes('class="top-icons-navbar"')) {
        const iconsStart = content.indexOf('<div class="icons-navbar"') !== -1
            ? content.indexOf('<div class="icons-navbar"')
            : content.indexOf('<div class="top-icons-navbar"');
            
        if (iconsStart !== -1) {
            // מציאת תגית הסיום של הדיב השני (המכיל)
            const firstDivEnd = content.indexOf('</div>', iconsStart) + 6;
            const secondDivEnd = content.indexOf('</div>', firstDivEnd) + 6;
            
            if (secondDivEnd !== -1) {
                content = content.slice(0, iconsStart) + content.slice(secondDivEnd);
                wasUpdated = true;
                console.log('✅ הוסר תפריט אייקונים קודם');
            }
        }
    }
    
    // 3. הסרת סגנונות מתנגשים
    if (content.includes('.icons-navbar') || content.includes('.top-icons-navbar')) {
        const styleStart = content.indexOf('<style>');
        if (styleStart !== -1) {
            const styleEnd = content.indexOf('</style>', styleStart) + 8;
            // בדיקה אם בבלוק הסגנון יש אזכור לתפריט אייקונים
            const styleBlock = content.substring(styleStart, styleEnd);
            if (styleBlock.includes('icons-navbar') || styleBlock.includes('top-icons-navbar')) {
                content = content.slice(0, styleStart) + content.slice(styleEnd);
                wasUpdated = true;
                console.log('✅ הוסרו סגנונות קודמים של תפריט אייקונים');
            }
        }
    }
    
    // הוספת תפריט האייקונים החדש
    // 1. מציאת תגית <body>
    const bodyStartPos = content.indexOf('<body');
    if (bodyStartPos === -1) {
        console.error('❌ לא נמצאה תגית <body> בקובץ');
        process.exit(1);
    }
    
    // 2. מציאת סוף תגית <body>
    const bodyEndPos = content.indexOf('>', bodyStartPos);
    if (bodyEndPos === -1) {
        console.error('❌ לא נמצא סוף תגית <body> בקובץ');
        process.exit(1);
    }
    
    // 3. הוספת קוד תפריט האייקונים מיד אחרי פתיחת תגית body
    content = content.slice(0, bodyEndPos + 1) + '\n' + iconsNavbarCode + '\n' + content.slice(bodyEndPos + 1);
    wasUpdated = true;
    
    // שמירת הקובץ המעודכן
    fs.writeFileSync(fileName, content, 'utf8');
    console.log(`✅ הקובץ ${fileName} עודכן בהצלחה עם תפריט האייקונים החדש`);
    
    // ניקוי שורות ריקות עודפות (אופציונלי)
    content = content.replace(/(\n\s*){3,}/g, '\n\n');
    fs.writeFileSync(fileName, content, 'utf8');
    
    // סיום
    console.log('=== עדכון דף הדאשבורד הושלם ===');
    console.log('הפעל את השרת עם הפקודה: node server.js');
    console.log('וגש לכתובת: http://localhost:3002/dashboard.html');
    
} catch (err) {
    console.error('❌ שגיאה בעת עדכון הדף:', err);
}