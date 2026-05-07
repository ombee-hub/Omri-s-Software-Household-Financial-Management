/**
 * replace-with-top-navbar-only.js
 * סקריפט להחלפת כל תפריטי הניווט בפס העליון בלבד (כמו בתמונה)
 */

const fs = require('fs');
const path = require('path');

console.log('=== מתחיל החלפת כל תפריטי הניווט בפס עליון בלבד ===');

// הסגנון CSS עבור פס הניווט העליון בלבד
const navbarCss = `
/* סגנון לפס הניווט העליון */
.top-navbar-container {
    background-color: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
    padding: 10px 0;
    margin-bottom: 25px;
}

.top-navbar {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

.top-navbar-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0 15px;
    margin-bottom: 10px;
}

.top-navbar-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 5px;
    padding: 0 15px;
}

.top-navbar-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #333;
    padding: 10px 20px;
    flex: 1;
    min-width: 70px;
    max-width: 100px;
    text-align: center;
}

.top-navbar-icon.active {
    color: #0d6efd;
}

.icon-image {
    height: 24px;
    margin-bottom: 5px;
}

.top-navbar-button {
    flex: 1;
    text-align: center;
    padding: 10px;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    background-color: white;
    text-decoration: none;
    color: #0d6efd;
    font-size: 0.9rem;
    transition: background-color 0.2s;
    max-width: 200px;
}

.top-navbar-button.active {
    background-color: #0d6efd;
    color: white;
    border-color: #0d6efd;
}

.top-navbar-button:hover:not(.active) {
    background-color: #f1f8ff;
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

// פונקציה להמרת שם קובץ לטקסט בעברית
function getHebrewName(filename) {
    const names = {
        'dashboard.html': 'דשבורד',
        'status.html': 'סטטוס עריכה',
        'index.html': 'יומן משימות',
        'details.html': 'פירוט קלטות',
        'gallery.html': 'גלריה'
    };
    return names[filename] || filename;
}

// פונקציה לעדכון קובץ HTML בודד
function updateHtmlFile(filePath) {
    try {
        console.log(`מעדכן קובץ: ${filePath}`);
        
        // קריאת תוכן הקובץ
        let content = fs.readFileSync(filePath, 'utf8');
        
        // שם הקובץ הנוכחי (לסימון דף פעיל)
        const currentPage = path.basename(filePath);
        
        // יצירת התוכן של פס הניווט העליון בלבד
        const newNavbarHtml = `
<div class="top-navbar-container">
    <div class="top-navbar">
        <div class="top-navbar-icons">
            <a href="gallery.html" class="top-navbar-icon${currentPage === 'gallery.html' ? ' active' : ''}">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1pbWFnZSI+PHJlY3QgeD0iMyIgeT0iMyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiByeD0iMiIvPjxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iMS41Ii8+PHBvbHlsaW5lIHBvaW50cz0iMjEgMTUgMTYgMTAgNSAyMSIvPjwvc3ZnPg==" class="icon-image" alt="גלריה">
                גלריה
            </a>
            <a href="details.html" class="top-navbar-icon${currentPage === 'details.html' ? ' active' : ''}">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jbGlwYm9hcmQtbGlzdCI+PHJlY3QgeD0iOCIgeT0iMiIgd2lkdGg9IjgiIGhlaWdodD0iNCIgcng9IjEiIHJ5PSIxIi8+PHBhdGggZD0iTTgiIGQ9Ik0xNiA0aC44YTIgMiAwIDAgMSAyIDJ2MTRhMiAyIDAgMCAxLTIgMkg3LjJhMiAyIDAgMCAxLTItMlY2YTIgMiAwIDAgMSAyLTJIOCIvPjxwYXRoIGQ9Ik05IDEyaDYiLz48cGF0aCBkPSJNOSAxNmg2Ii8+PHBhdGggZD0iTTkgOGg2Ii8+PC9zdmc+" class="icon-image" alt="פירוט קלטות">
                פירוט קלטות
            </a>
            <a href="index.html" class="top-navbar-icon${currentPage === 'index.html' ? ' active' : ''}">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jYWxlbmRhci1kYXlzIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjQiIHJ4PSIyIiByeT0iMiIvPjxsaW5lIHgxPSIxNiIgeTE9IjIiIHgyPSIxNiIgeTI9IjYiLz48bGluZSB4MT0iOCIgeTE9IjIiIHgyPSI4IiB5Mj0iNiIvPjxsaW5lIHgxPSIzIiB5MT0iMTAiIHgyPSIyMSIgeTI9IjEwIi8+PHBhdGggZD0iTTgiIGQ9Ik04IDE0aDIiLz48cGF0aCBkPSJNMTQiIGQ9Ik0xNCAxNGgyIi8+PHBhdGggZD0iTTgiIGQ9Ik04IDE4aDIiLz48cGF0aCBkPSJNMTQiIGQ9Ik0xNCAxOGgyIi8+PC9zdmc+" class="icon-image" alt="יומן משימות">
                יומן משימות
            </a>
            <a href="status.html" class="top-navbar-icon${currentPage === 'status.html' ? ' active' : ''}">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zZXR0aW5ncyI+PHBhdGggZD0iTTEyLjIyIDJoLS40NGEyIDIgMCAwIDAtMiAydi4xOGEyIDIgMCAwIDEtMSAxLjczbC0uNDMuMjVhMiAyIDAgMCAxLTIgMGwtLjE1LS4wOGEyIDIgMCAwIDAtMi43My43M2wtLjIyLjM4YTIgMiAwIDAgMCAuNzMgMi43M2wuMTUuMWEyIDIgMCAwIDEgMSAxLjcydi41YTIgMiAwIDAgMS0xIDEuNzRsLS4xNS4wOWEyIDIgMCAwIDAtLjczIDIuNzNsLjIyLjM4YTIgMiAwIDAgMCAyLjczLjczbC4xNS0uMDhhMiAyIDAgMCAxIDIgMGwuNDMuMjVhMiAyIDAgMCAxIDEgMS43M1YyMGEyIDIgMCAwIDAgMiAyaC40NGEyIDIgMCAwIDAgMi0ydi0uMThhMiAyIDAgMCAxIDEtMS43M2wuNDMtLjI1YTIgMiAwIDAgMSAyIDBsLjE1LjA4YTIgMiAwIDAgMCAyLjczLS43M2wuMjItLjM5YTIgMiAwIDAgMC0uNzMtMi43M2wtLjE1LS4wOGEyIDIgMCAwIDEtMS0xLjc0di0uNWEyIDIgMCAwIDEgMS0xLjc0bC4xNS0uMDlhMiAyIDAgMCAwIC43My0yLjczbC0uMjItLjM4YTIgMiAwIDAgMC0yLjczLS43M2wtLjE1LjA4YTIgMiAwIDAgMS0yIDBsLS40My0uMjVhMiAyIDAgMCAxLTEtMS43M1Y0YTIgMiAwIDAgMC0yLTJaIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMyIvPjwvc3ZnPg==" class="icon-image" alt="סטטוס עריכה">
                סטטוס עריכה
            </a>
            <a href="dashboard.html" class="top-navbar-icon${currentPage === 'dashboard.html' ? ' active' : ''}">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1iYXItY2hhcnQtMyI+PHBhdGggZD0iTTMiIGQ9Ik0zIDNsMTggMCIvPjxwYXRoIGQ9Ik0xOCAiIGQ9Ik0xOCAxOEwyMSAxOCIvPjxwYXRoIGQ9Ik0zIiBkPSJNMyA4TDggOCIvPjxwYXRoIGQ9Ik0zIiBkPSJNMyAxM0wxMyAxMyIvPjxwYXRoIGQ9Ik0iIGQ9Ik0xOCB8fCAzViAyMUgzIi8+PC9zdmc+" class="icon-image" alt="דשבורד">
                דשבורד
            </a>
        </div>
        <div class="top-navbar-buttons">
            <a href="gallery.html" class="top-navbar-button${currentPage === 'gallery.html' ? ' active' : ''}">
                גלריה
            </a>
            <a href="details.html" class="top-navbar-button${currentPage === 'details.html' ? ' active' : ''}">
                פירוט קלטות
            </a>
            <a href="index.html" class="top-navbar-button${currentPage === 'index.html' ? ' active' : ''}">
                יומן משימות
            </a>
            <a href="status.html" class="top-navbar-button${currentPage === 'status.html' ? ' active' : ''}">
                סטטוס עריכה
            </a>
            <a href="dashboard.html" class="top-navbar-button${currentPage === 'dashboard.html' ? ' active' : ''}">
                דשבורד
            </a>
        </div>
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
            console.log(`  נוסף סגנון CSS חדש לפס הניווט בקובץ ${filePath}`);
        }
        
        // הסרת כל תפריטי הניווט הקודמים
        const navbarPatterns = [
            /<div class="top-navbar[\s\S]*?<\/div>\s*<div class="navbar-spacer"><\/div>/g,
            /<nav[\s\S]*?<\/nav>/g,
            /<div class="nav-links">[\s\S]*?<\/div>/g,
            /<div class="navbar[\s\S]*?<\/div>[\s\S]*?<\/div>/g,
            /<ul class="nav-menu[\s\S]*?<\/ul>/g
        ];
        
        let removedOldNavbar = false;
        navbarPatterns.forEach(pattern => {
            if (pattern.test(content)) {
                content = content.replace(pattern, '');
                removedOldNavbar = true;
                console.log(`  הוסר תפריט ניווט ישן מהקובץ ${filePath}`);
            }
        });
        
        // מיקום להוספת פס הניווט החדש
        // אפשרות 1: אחרי תגית header אם קיימת
        let insertPos = content.indexOf('</header>');
        if (insertPos !== -1) {
            content = content.slice(0, insertPos + 9) + 
                `\n${newNavbarHtml}\n` + 
                content.slice(insertPos + 9);
            console.log(`  נוסף פס ניווט חדש אחרי תגית header בקובץ ${filePath}`);
        }
        // אפשרות 2: בתחילת תגית body
        else {
            const bodyStartPos = content.indexOf('<body');
            if (bodyStartPos !== -1) {
                const bodyContentStart = content.indexOf('>', bodyStartPos) + 1;
                content = content.slice(0, bodyContentStart) + 
                    `\n${newNavbarHtml}\n` + 
                    content.slice(bodyContentStart);
                console.log(`  נוסף פס ניווט חדש בתחילת תגית body בקובץ ${filePath}`);
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
console.log('\n=== סיכום החלפת תפריטי הניווט ===');
console.log(`✅ עודכנו ${successCount} קבצים בהצלחה`);
if (failCount > 0) {
    console.log(`❌ נכשל עדכון של ${failCount} קבצים`);
}
console.log('\nהפעל את השרת כדי לראות את השינויים: node server.js');