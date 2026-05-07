/**
 * update-navigation-bar.js
 * סקריפט לעדכון פס הניווט בכל הדפים למבנה האחיד הנדרש
 */

const fs = require('fs');
const path = require('path');

console.log('=== מתחיל עדכון פס הניווט בכל הדפים ===');

// הסגנון CSS לפס הניווט החדש
const navbarCss = `
/* סגנון לפס הניווט החדש */
.top-navbar {
    display: flex;
    justify-content: space-between;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
}

.navbar-buttons {
    display: flex;
    gap: 15px;
}

.navbar-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #333;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 8px 15px;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.navbar-button.active {
    color: #1a73e8;
    border-bottom: 2px solid #1a73e8;
}

.navbar-button:hover {
    background-color: #f5f5f5;
}

.navbar-icon {
    font-size: 1.5rem;
    margin-bottom: 5px;
}

/* המרווח בין התפריט לכפתורים */
.navbar-spacer {
    height: 10px;
}
`;

// התוכן HTML של פס הניווט החדש
const navbarHtml = `
<div class="top-navbar">
    <div class="navbar-buttons">
        <a href="dashboard.html" class="navbar-button${currentPage === 'dashboard.html' ? ' active' : ''}">
            <span class="navbar-icon">📊</span>
            דשבורד
        </a>
        <a href="status.html" class="navbar-button${currentPage === 'status.html' ? ' active' : ''}">
            <span class="navbar-icon">🔄</span>
            סטטוס עריכה
        </a>
        <a href="index.html" class="navbar-button${currentPage === 'index.html' ? ' active' : ''}">
            <span class="navbar-icon">📝</span>
            יומן משימות
        </a>
        <a href="details.html" class="navbar-button${currentPage === 'details.html' ? ' active' : ''}">
            <span class="navbar-icon">📋</span>
            פירוט קלטות
        </a>
        <a href="gallery.html" class="navbar-button${currentPage === 'gallery.html' ? ' active' : ''}">
            <span class="navbar-icon">🖼️</span>
            גלריה
        </a>
    </div>
</div>
<div class="navbar-spacer"></div>
`;

// רשימת הדפים לעדכון
const htmlFiles = [
    'dashboard.html',
    'status.html',
    'index.html',
    'details.html',
    'gallery.html'
];

// פונקציה לעדכון קובץ HTML בודד
function updateHtmlFile(filePath) {
    try {
        console.log(`מעדכן קובץ: ${filePath}`);
        
        // קריאת תוכן הקובץ
        let content = fs.readFileSync(filePath, 'utf8');
        
        // שם הדף הנוכחי (לסימון דף פעיל)
        const currentPage = path.basename(filePath);
        
        // יצירת התוכן של פס הניווט המותאם לדף הנוכחי
        const customNavbarHtml = `
<div class="top-navbar">
    <div class="navbar-buttons">
        <a href="dashboard.html" class="navbar-button${currentPage === 'dashboard.html' ? ' active' : ''}">
            <span class="navbar-icon">📊</span>
            דשבורד
        </a>
        <a href="status.html" class="navbar-button${currentPage === 'status.html' ? ' active' : ''}">
            <span class="navbar-icon">⚙️</span>
            סטטוס עריכה
        </a>
        <a href="index.html" class="navbar-button${currentPage === 'index.html' ? ' active' : ''}">
            <span class="navbar-icon">📝</span>
            יומן משימות
        </a>
        <a href="details.html" class="navbar-button${currentPage === 'details.html' ? ' active' : ''}">
            <span class="navbar-icon">📋</span>
            פירוט קלטות
        </a>
        <a href="gallery.html" class="navbar-button${currentPage === 'gallery.html' ? ' active' : ''}">
            <span class="navbar-icon">🖼️</span>
            גלריה
        </a>
    </div>
</div>
<div class="navbar-spacer"></div>`;
        
        // בדיקה האם הקובץ כבר מכיל את פס הניווט החדש
        if (content.includes('class="top-navbar"')) {
            console.log(`  הקובץ ${filePath} כבר מכיל את פס הניווט החדש`);
            
            // עדכון מחלקת active בהתאם לדף הנוכחי
            content = content.replace(/class="navbar-button active"/g, 'class="navbar-button"');
            
            // הוספת מחלקת active לקישור הנוכחי
            const activePattern = new RegExp(`href="${currentPage}"[^>]*class="navbar-button"`, 'g');
            content = content.replace(activePattern, `href="${currentPage}" class="navbar-button active"`);
        } else {
            // הוספת סגנון CSS לראש המסמך
            const headEndPos = content.indexOf('</head>');
            if (headEndPos !== -1) {
                content = content.slice(0, headEndPos) + 
                    `\n<style>${navbarCss}</style>\n` + 
                    content.slice(headEndPos);
            }
            
            // הוספת פס הניווט אחרי תגית הפתיחה של body
            const bodyStartPos = content.indexOf('<body');
            if (bodyStartPos !== -1) {
                const bodyContentStart = content.indexOf('>', bodyStartPos) + 1;
                content = content.slice(0, bodyContentStart) + 
                    `\n${customNavbarHtml}\n` + 
                    content.slice(bodyContentStart);
            }
            
            console.log(`  נוסף פס ניווט חדש לקובץ ${filePath}`);
        }
        
        // הסרת תפריטי ניווט ישנים
        const navbarRegexes = [
            /<nav[^>]*>[\s\S]*?<\/nav>/g,
            /<div class="nav-links">[\s\S]*?<\/div>/g,
            /<div class="navbar[\s\S]*?<\/div>[\s\S]*?<\/div>/g
        ];
        
        navbarRegexes.forEach(regex => {
            if (regex.test(content)) {
                content = content.replace(regex, '');
                console.log(`  הוסר תפריט ניווט ישן מהקובץ ${filePath}`);
            }
        });
        
        // שמירת הקובץ המעודכן
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ הקובץ ${filePath} עודכן בהצלחה`);
        
        return true;
    } catch (err) {
        console.error(`❌ שגיאה בעדכון קובץ ${filePath}:`, err);
        return false;
    }
}

// עדכון כל הקבצים
let successCount = 0;
let failCount = 0;

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    if (fs.existsSync(filePath)) {
        if (updateHtmlFile(filePath)) {
            successCount++;
        } else {
            failCount++;
        }
    } else {
        console.log(`⚠️ הקובץ ${file} לא נמצא`);
        failCount++;
    }
});

// יצירת קובץ CSS נפרד עבור פס הניווט
try {
    fs.writeFileSync(path.join(__dirname, 'navbar.css'), navbarCss, 'utf8');
    console.log('✅ נוצר קובץ CSS נפרד עבור פס הניווט');
} catch (err) {
    console.error('❌ שגיאה ביצירת קובץ CSS נפרד:', err);
}

// סיכום
console.log('\n=== סיכום עדכון פס הניווט ===');
console.log(`✅ עודכנו ${successCount} קבצים בהצלחה`);
if (failCount > 0) {
    console.log(`❌ נכשל עדכון של ${failCount} קבצים`);
}
console.log('\nהפעל את השרת כדי לראות את השינויים: node server.js');