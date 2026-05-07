/**
 * top-icons-only.js
 * סקריפט להשארת רק האיקונים העליונים בתפריט
 */

const fs = require('fs');
const path = require('path');

console.log('=== מתחיל עדכון התפריט לאיקונים עליונים בלבד ===');

// הסגנון CSS עבור התפריט החדש (רק איקונים עליונים)
const navbarCss = `
/* סגנון לתפריט האיקונים העליון */
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

.icon-img {
    width: 24px;
    height: 24px;
    margin-bottom: 5px;
}

.icon-label {
    font-size: 0.85rem;
    text-align: center;
}
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
        
        // שם הקובץ הנוכחי (לסימון דף פעיל)
        const currentPage = path.basename(filePath);
        
        // יצירת התוכן של תפריט האיקונים החדש
        const newNavbarHtml = `
<div class="top-icons-navbar">
    <div class="top-icons-container">
        <a href="gallery.html" class="icon-link${currentPage === 'gallery.html' ? ' active' : ''}">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iMyIgcng9IjIiIHJ5PSIyIi8+PGNpcmNsZSBjeD0iOC41IiBjeT0iOC41IiByPSIxLjUiLz48cG9seWxpbmUgcG9pbnRzPSIyMSAxNSAxNiAxMCA1IDIxIi8+PC9zdmc+" class="icon-img" alt="גלריה">
            <span class="icon-label">גלריה</span>
        </a>
        <a href="details.html" class="icon-link${currentPage === 'details.html' ? ' active' : ''}">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNsaXBib2FyZCI+PHJlY3Qgd2lkdGg9IjE0IiBoZWlnaHQ9IjE4IiB4PSI1IiB5PSIzIiByeD0iMiIvPjxwYXRoIGQ9IE0xMSA1aDB2NCBoMiBWNSBoMCIvPjwvc3ZnPg==" class="icon-img" alt="פירוט קלטות">
            <span class="icon-label">פירוט קלטות</span>
        </a>
        <a href="index.html" class="icon-link${currentPage === 'index.html' ? ' active' : ''}">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNhbGVuZGFyIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjQiIHJ4PSIyIiByeT0iMiIvPjxsaW5lIHgxPSIxNiIgeTE9IjIiIHgyPSIxNiIgeTI9IjYiLz48bGluZSB4MT0iOCIgeTE9IjIiIHgyPSI4IiB5Mj0iNiIvPjxsaW5lIHgxPSIzIiB5MT0iMTAiIHgyPSIyMSIgeTI9IjEwIi8+PC9zdmc+" class="icon-img" alt="יומן משימות">
            <span class="icon-label">יומן משימות</span>
        </a>
        <a href="status.html" class="icon-link${currentPage === 'status.html' ? ' active' : ''}">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNldHRpbmdzIj48cGF0aCBkPSJNMTIuMjIgMmgtLjQ0YTIgMiAwIDAgMC0yIDJ2LjE4YTIgMiAwIDAgMS0xIDEuNzNsLS40My4yNWEyIDIgMCAwIDEtMiAwbC0uMTUtLjA4YTIgMiAwIDAgMC0yLjczLjczbC0uMjIuMzhhMiAyIDAgMCAwIC43MyAyLjczbC4xNS4xYTIgMiAwIDAgMSAxIDEuNzJ2LjVhMiAyIDAgMCAxLTEgMS43NGwtLjE1LjA5YTIgMiAwIDAgMC0uNzMgMi43M2wuMjIuMzhhMiAyIDAgMCAwIDIuNzMuNzNsLjE1LS4wOGEyIDIgMCAwIDEgMiAwbC40My4yNWEyIDIgMCAwIDEgMSAxLjczVjIwYTIgMiAwIDAgMCAyIDJoLjQ0YTIgMiAwIDAgMCAyLTJ2LS4xOGEyIDIgMCAwIDEgMS0xLjczbC40My0uMjVhMiAyIDAgMCAxIDIgMGwuMTUuMDhhMiAyIDAgMCAwIDIuNzMtLjczbC4yMi0uMzlhMiAyIDAgMCAwLS43My0yLjczbC0uMTUtLjA4YTIgMiAwIDAgMS0xLTEuNzR2LS41YTIgMiAwIDAgMSAxLTEuNzRsLjE1LS4wOWEyIDIgMCAwIDAgLjczLTIuNzNsLS4yMi0uMzhhMiAyIDAgMCAwLTIuNzMtLjczbC0uMTUuMDhhMiAyIDAgMCAxLTIgMGwtLjQzLS4yNWEyIDIgMCAwIDEtMS0xLjczVjRhMiAyIDAgMCAwLTItMloiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIzIi8+PC9zdmc+" class="icon-img" alt="סטטוס עריכה">
            <span class="icon-label">סטטוס עריכה</span>
        </a>
        <a href="dashboard.html" class="icon-link${currentPage === 'dashboard.html' ? ' active' : ''}">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxheW91dC1kYXNoYm9hcmQiPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjkiIHg9IjMiIHk9IjMiIHJ4PSIxIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iNSIgeD0iMTQiIHk9IjMiIHJ4PSIxIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iOSIgeD0iMTQiIHk9IjEyIiByeD0iMSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjUiIHg9IjMiIHk9IjE2IiByeD0iMSIvPjwvc3ZnPg==" class="icon-img" alt="דשבורד">
            <span class="icon-label">דשבורד</span>
        </a>
    </div>
</div>`;
        
        // הוספת סגנון CSS לראש המסמך
        const headEndPos = content.indexOf('</head>');
        if (headEndPos !== -1) {
            // הסרת סגנונות קודמים של תפריט ניווט
            const oldNavStyleRegex = /\/\* סגנון לפס הניווט[\s\S]*?\*\//g;
            content = content.replace(oldNavStyleRegex, '');
            
            // הוספת הסגנון החדש
            content = content.slice(0, headEndPos) + 
                `\n<style>${navbarCss}</style>\n` + 
                content.slice(headEndPos);
            console.log(`  נוסף סגנון CSS חדש לתפריט האיקונים בקובץ ${filePath}`);
        }
        
        // הסרת כל תפריטי הניווט הקודמים
        const allNavPatterns = [
            /<div class="top-navbar[\s\S]*?<\/div>/g,
            /<div class="top-navbar-container[\s\S]*?<\/div>\s*<\/div>/g,
            /<div class="navbar-spacer"><\/div>/g,
            /<nav[\s\S]*?<\/nav>/g,
            /<div class="nav-links">[\s\S]*?<\/div>/g,
            /<div class="navbar[\s\S]*?<\/div>[\s\S]*?<\/div>/g,
            /<ul class="nav-menu[\s\S]*?<\/ul>/g,
            /<div class="nav-container[\s\S]*?<\/div>[\s\S]*?<\/div>/g,
            /<div class="top-icons-navbar">[\s\S]*?<\/div>/g
        ];
        
        allNavPatterns.forEach(pattern => {
            content = content.replace(pattern, '');
        });
        
        console.log(`  הוסרו כל תפריטי הניווט הקודמים מהקובץ ${filePath}`);
        
        // מיקום להוספת תפריט האיקונים החדש
        // אפשרות 1: אחרי תגית header אם קיימת
        let insertPos = content.indexOf('</header>');
        if (insertPos !== -1) {
            content = content.slice(0, insertPos + 9) + 
                `\n${newNavbarHtml}\n` + 
                content.slice(insertPos + 9);
            console.log(`  נוסף תפריט איקונים חדש אחרי תגית header בקובץ ${filePath}`);
        }
        // אפשרות 2: בתחילת תגית body
        else {
            const bodyStartPos = content.indexOf('<body');
            if (bodyStartPos !== -1) {
                const bodyContentStart = content.indexOf('>', bodyStartPos) + 1;
                content = content.slice(0, bodyContentStart) + 
                    `\n${newNavbarHtml}\n` + 
                    content.slice(bodyContentStart);
                console.log(`  נוסף תפריט איקונים חדש בתחילת תגית body בקובץ ${filePath}`);
            } else {
                console.error(`  לא נמצאה תגית body בקובץ ${filePath}`);
                return false;
            }
        }
        
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

// סיכום
console.log('\n=== סיכום עדכון התפריט לאיקונים בלבד ===');
console.log(`✅ עודכנו ${successCount} קבצים בהצלחה`);
if (failCount > 0) {
    console.log(`❌ נכשל עדכון של ${failCount} קבצים`);
}
console.log('\nהפעל את השרת כדי לראות את השינויים: node server.js');