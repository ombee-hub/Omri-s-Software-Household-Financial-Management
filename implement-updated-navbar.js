/**
 * implement-updated-navbar.js
 * סקריפט ליישום תפריט האייקונים הצבעוני החדש מתחת ללוגו בכל הדפים
 */

const fs = require('fs');
const path = require('path');

console.log('=== מתחיל יישום תפריט האייקונים המעודכן עם אייקונים צבעוניים ===');

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
const backupDir = 'colored-icons-backups';
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
    console.log(`✅ נוצרה תיקייה ${backupDir} לגיבויים`);
}

// קוד תפריט האייקונים החדש עם אייקונים צבעוניים והתאמות למיקום אחרי הלוגו
const coloredIconsNavbarCode = `<!-- תפריט אייקונים צבעוני מעודכן -->
<style>
/* עיצוב תפריט האייקונים הצבעוני */
.colored-icons-navbar {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e0e0e0;
    padding: 10px 0 15px;
    margin-bottom: 20px;
}

.colored-icons-container {
    display: flex;
    justify-content: space-around;
    max-width: 800px;
    width: 100%;
}

.colored-icon-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #555;
    padding: 8px 10px;
    border-radius: 4px;
    position: relative;
    transition: all 0.2s ease;
}

.colored-icon-link.active {
    color: #673ab7; /* כחול-סגול */
}

.colored-icon-link.active::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    right: 0;
    height: 4px;
    background-color: #673ab7;
    border-radius: 2px;
}

.colored-icon-img {
    width: 30px;
    height: 30px;
    margin-bottom: 8px;
}

.colored-icon-label {
    font-size: 14px;
    text-align: center;
    font-family: 'Rubik', Arial, sans-serif;
    font-weight: 500;
}

/* עבור מסכים קטנים */
@media (max-width: 600px) {
    .colored-icons-container {
        width: 100%;
    }
    
    .colored-icon-img {
        width: 24px;
        height: 24px;
    }
    
    .colored-icon-label {
        font-size: 12px;
    }
}
</style>

<!-- תפריט האייקונים הצבעוני -->
<div class="colored-icons-navbar">
    <div class="colored-icons-container">
        <a href="gallery.html" class="colored-icon-link" id="gallery-link">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjMjA5NjVhIj48cGF0aCBkPSJNMCAxMDBhMjggMjggMCAwIDEgMjgtMjhoNDU2YTI4IDI4IDAgMCAxIDI4IDI4djMxMmEyOCAyOCAwIDAgMS0yOCAyOEgyOGEyOCAyOCAwIDAgMS0yOC0yOFYxMDB6bTk3LjU2NCAzNGMtMTkuMDkgMC0zNC41NjQgMTUuNDc0LTM0LjU2NCAzNC41NjRzMTUuNDc0IDM0LjU2NCAzNC41NjQgMzQuNTY0czM0LjU2NC0xNS40NzQgMzQuNTY0LTM0LjU2NFMxMTYuNjU0IDEzNCA5Ny41NjQgMTM0ek00OCA0MTRoNDE2VjE4Mi41NjRsLTExNi00Ni4yMjZMMjA4IDMxMiA5NiAyMDZ2MjA4eiI+PC9wYXRoPjwvc3ZnPg==" class="colored-icon-img" alt="גלריה">
            <span class="colored-icon-label">גלריה</span>
        </a>
        <a href="details.html" class="colored-icon-link" id="details-link">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjZTA3YTVmIj48cGF0aCBkPSJNNjQgMzJDMjguNyAzMiAwIDYwLjcgMCA5NnYzMjBjMCAzNS4zIDI4LjcgNjQgNjQgNjRINDQ4YzM1LjMgMCA2NC0yOC43IDY0LTY0VjE5MmMwLTM1LjMtMjguNy02NC02NC02NEgxNzZjLTguOCAwLTE2LTcuMi0xNi0xNnMtNy4yLTE2LTE2LTE2SDY0em04MCAxNjBINDQ4YzguOCAwIDE2IDcuMiAxNiAxNnYyMDhjMCA4LjgtNy4yIDE2LTE2IDE2SDgwYy04LjggMC0xNi03LjItMTYtMTZWMjA4YzAtOC44IDcuMi0xNiAxNi0xNnptMjA4IDY0SDExMnYzMmgxMTJMMjI0IDI4OEg4OGwxMDQgODhoMjQwdi0zMmgtMTEybC0yNCAyNGgyMTZ6Ij48L3BhdGg+PC9zdmc+" class="colored-icon-img" alt="פירוט קלטות">
            <span class="colored-icon-label">פירוט קלטות</span>
        </a>
        <a href="index.html" class="colored-icon-link" id="index-link">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjNDA5NmZmIj48cGF0aCBkPSJNMCA5NkMwIDYwLjcgMjguNyAzMiA2NCAzMmg2NEMxNjQgMzIgMTkyIDYwLjcgMTkyIDk2djMyaDI1NmMzNS4zIDAgNjQgMjguNyA2NCA2NHYyNTZjMCAzNS4zLTI4LjcgNjQtNjQgNjRINjRjLTM1LjMgMC02NC0yOC43LTY0LTY0Vjk2em02NCAwdjM1MmgzODRWMTkySDY0di02NHYtMzJ6TTQwMCAzMzZjMC0yNi41LTIxLjUtNDgtNDgtNDhzLTQ4IDIxLjUtNDggNDhzMjEuNSA0OCA0OCA0OHM0OC0yMS41IDQ4LTQ4ek0yNTYgOTZINDh2MzJoMjA4Vjk2eiI+PC9wYXRoPjwvc3ZnPg==" class="colored-icon-img" alt="יומן משימות">
            <span class="colored-icon-label">יומן משימות</span>
        </a>
        <a href="status.html" class="colored-icon-link" id="status-link">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjOWM5ZGExIj48cGF0aCBkPSJNNDk1LjkgMTY2LjZjMy4yIDguNyAuNSAxOC40LTYuNCAyNC42bC00My4zIDM5LjRjMS4xIDguMyAxLjcgMTYuOCAxLjcgMjUuNHMtLjYgMTcuMS0xLjcgMjUuNGw0My4zIDM5LjRjNi45IDYuMiA5LjYgMTUuOSA2LjQgMjQuNmMtNC40IDExLjktOS43IDIzLjMtMTUuOCAzNC4zbC00LjcgOC4xYy02LjYgMTEtMTQgMjEuNC0yMi4xIDMxLjJjLTUuOSA3LjItMTUuNyA5LjYtMjQuNSA2LjhsLTU1LjctMTcuN2MtMTMuNCAxMC4zLTI4LjIgMTguOS00NCAyNS40bC0xMi41IDU3LjFjLTIgOS4xLTkgMTYuMy0xOC4yIDE3LjhjLTEzLjggMi4zLTI4IDMuNS00Mi41IDMuNXMtMjguNy0xLjItNDIuNS0zLjVjLTkuMi0xLjUtMTYuMi04LjctMTguMi0xNy44bC0xMi41LTU3LjFjLTE1LjgtNi41LTMwLjYtMTUuMS00NC0yNS40TDgzLjEgMzQ1LjhjLTguOCAyLjgtMTguNiAuMy0yNC41LTYuOGMtOC4xLTkuOC0xNS41LTIwLjItMjIuMS0zMS4ybC00LjctOC4xYy02LjEtMTEtMTEuNC0yMi40LTE1LjgtMzQuM2MtMy4yLTguNy0uNS0xOC40IDYuNC0yNC42bDQzLjMtMzkuNEM2NC42IDIwMS4xIDY0IDE5Mi42IDY0IDE4NHMuNi0xNy4xIDEuNy0yNS40TDIyLjQgMTE5LjJjLTYuOS02LjItOS42LTE1LjktNi40LTI0LjZjNC40LTExLjkgOS43LTIzLjMgMTUuOC0zNC4zbDQuNy04LjFjNi42LTExIDE0LTIxLjQgMjIuMS0zMS4yYzUuOS03LjIgMTUuNy05LjYgMjQuNS02LjhsMTIyLjMgNTdjNDMuMS0zNS44IDk5LjUtNTcuNiAxNjAuNC01Ny42YzYwLjkgMCAxMTcuMiAyMS44IDE2MC40IDU3LjZjNDYuOC0yMS44IDU0LjctMjIuMSA1NS43LTIyLjFjOC44LTIuOCAxOC42LS4zIDI0LjUgNi44YzguMSA5LjggMTUuNSAyMC4yIDIyLjEgMzEuMmw0LjcgOC4xYzYuMSAxMSAxMS40IDIyLjQgMTUuOCAzNC4zek0yNTYgMzM2YTgwIDgwIDAgMSAwIDAtMTYwYTgwIDgwIDAgMSAwIDAgMTYweiI+PC9wYXRoPjwvc3ZnPg==" class="colored-icon-img" alt="סטטוס עריכה">
            <span class="colored-icon-label">סטטוס עריכה</span>
        </a>
        <a href="dashboard.html" class="colored-icon-link" id="dashboard-link">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjZWE1MTlkIj48cGF0aCBkPSJNMCA5NkMwIDYwLjcgMjguNyAzMiA2NCAzMkg0NDhjMzUuMyAwIDY0IDI4LjcgNjQgNjRWNDE2YzAgMzUuMy0yOC43IDY0LTY0IDY0SDY0Yy0zNS4zIDAtNjQtMjguNy02NC02NFY5NnpNNjQgMzJDMjguNyAzMiAwIDYwLjcgMCA5NnY4MEMwIDIxMS44IDE2LjIgMjI4IDM2IDIyOEgyMDhjMTkuOCAwIDM2LTE2LjIgMzYtMzZWOTZjMC0xOS44LTE2LjItMzYtMzYtMzZINjR6bTEyOCAxODJoMTQyLjVjMTcgMCAzMy41IDMuNSA0OC45IDEwLjFsMTAgNC4xYzQxLjUgMTcuOSA2Ni43IDU5IDY2LjcgMTAzLjVjMCAwLTExLjItLjYtMjkuOS03LjhjLTIwLjEtNy44LTQ0LjQtMjIuOC02OC44LTQ3LjJjLTQ4LjgtNDguOC04NS30vYXRoPlwvc3ZnPg==" class="colored-icon-img" alt="דאשבורד">
            <span class="colored-icon-label">דאשבורד</span>
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
        
        // 1. הסרת כל תפריטי הניווט הקיימים (תפריט אייקונים קודם, navbar, וכו')
        
        // הסרת תפריטי אייקונים (icons-navbar, colored-icons-navbar)
        ['class="icons-navbar"', 'class="top-icons-navbar"', 'class="colored-icons-navbar"'].forEach(navbarClass => {
            if (content.includes(navbarClass)) {
                // מציאת תחילת בלוק הסגנון לתפריט האייקונים (אם קיים)
                const styleStart = content.indexOf('<style>', content.indexOf(navbarClass) - 1000);
                if (styleStart !== -1 && styleStart < content.indexOf(navbarClass)) {
                    // מציאת סוף בלוק הסגנון
                    const styleEnd = content.indexOf('</style>', styleStart) + 8;
                    if (styleEnd > styleStart) {
                        // בדיקה אם בלוק הסגנון מכיל אזכור לתפריט האייקונים
                        const styleContent = content.substring(styleStart, styleEnd);
                        if (styleContent.includes('icons-navbar') || styleContent.includes('colored-icons')) {
                            content = content.slice(0, styleStart) + content.slice(styleEnd);
                            wasUpdated = true;
                            console.log(`✅ הוסר בלוק סגנון של תפריט האייקונים מהקובץ ${file}`);
                        }
                    }
                }
                
                // מציאת תחילת תפריט האייקונים
                const navStartPos = content.indexOf(`<div ${navbarClass}`);
                if (navStartPos !== -1) {
                    // מציאת סוף תפריט האייקונים (סגירת הדיב השני)
                    let closeTagCount = 0;
                    let searchPos = navStartPos;
                    let navEndPos = -1;
                    
                    // חיפוש של שתי תגיות סגירה </div> עוקבות
                    while (closeTagCount < 2 && searchPos < content.length) {
                        searchPos = content.indexOf('</div>', searchPos + 1);
                        if (searchPos === -1) break;
                        closeTagCount++;
                        if (closeTagCount === 2) {
                            navEndPos = searchPos + 6;
                        }
                    }
                    
                    if (navEndPos > navStartPos) {
                        content = content.slice(0, navStartPos) + content.slice(navEndPos);
                        wasUpdated = true;
                        console.log(`✅ הוסר תפריט האייקונים (${navbarClass}) מהקובץ ${file}`);
                    }
                }
                
                // הסרת הסקריפט של תפריט האייקונים
                const scriptMarker = 'document.addEventListener(\'DOMContentLoaded\', function()';
                if (content.includes(scriptMarker)) {
                    let scriptStartPos = content.indexOf('<script>', content.indexOf(scriptMarker) - 100);
                    if (scriptStartPos === -1) {
                        scriptStartPos = content.indexOf('<script', content.indexOf(scriptMarker) - 100);
                    }
                    
                    if (scriptStartPos !== -1) {
                        const scriptEndPos = content.indexOf('</script>', scriptStartPos) + 9;
                        if (scriptEndPos > scriptStartPos) {
                            const scriptContent = content.substring(scriptStartPos, scriptEndPos);
                            if (scriptContent.includes(scriptMarker) && (scriptContent.includes('linkId') || scriptContent.includes('icon-link'))) {
                                content = content.slice(0, scriptStartPos) + content.slice(scriptEndPos);
                                wasUpdated = true;
                                console.log(`✅ הוסר סקריפט של תפריט האייקונים מהקובץ ${file}`);
                            }
                        }
                    }
                }
            }
        });
        
        // הסרת תפריט ניווט (navbar, nav-container)
        ['<nav class="navbar"', '<nav class="nav-container"', '<div class="navbar"', '<div class="nav-container">'].forEach(navSelector => {
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
                        let pos = navStartPos + 5; // אחרי פתיחת ה-div או nav
                        while (openCount > 0 && pos < content.length) {
                            let nextOpenPos, nextClosePos;
                            
                            if (navSelector.startsWith('<nav')) {
                                nextOpenPos = content.indexOf('<nav', pos);
                                nextClosePos = content.indexOf('</nav>', pos);
                            } else {
                                nextOpenPos = content.indexOf('<div', pos);
                                nextClosePos = content.indexOf('</div>', pos);
                            }
                            
                            if (nextClosePos === -1) break;
                            
                            if (nextOpenPos !== -1 && nextOpenPos < nextClosePos) {
                                openCount++;
                                pos = nextOpenPos + 5;
                            } else {
                                openCount--;
                                pos = nextClosePos + 6;
                                if (openCount === 0) {
                                    navEndPos = nextClosePos + (navSelector.startsWith('<nav') ? 6 : 6);
                                }
                            }
                        }
                    }
                    
                    if (navEndPos && navEndPos > navStartPos) {
                        // בדיקה שזה לא חלק מתפריט האייקונים
                        const menuContent = content.substring(navStartPos, navEndPos);
                        if (!menuContent.includes('icons-navbar') && !menuContent.includes('colored-icons')) {
                            content = content.slice(0, navStartPos) + content.slice(navEndPos);
                            wasUpdated = true;
                            console.log(`✅ הוסר תפריט מסוג ${navSelector} מהקובץ ${file}`);
                        }
                    }
                }
            }
        });
        
        // 2. מציאת תגית <header> לצורך הוספת התפריט מתחתיה
        let headerEndPos = -1;
        let insertPosition = -1;
        
        if (content.includes('<header')) {
            // מציאת סוף תגית ה-header
            const headerStartPos = content.indexOf('<header');
            headerEndPos = content.indexOf('</header>', headerStartPos);
            if (headerEndPos !== -1) {
                headerEndPos += 9; // אורך '</header>'
                insertPosition = headerEndPos;
            }
        }
        
        // אם אין header, חפש את מיקום תגית body
        if (insertPosition === -1) {
            const bodyStartPos = content.indexOf('<body');
            if (bodyStartPos !== -1) {
                const bodyEndPos = content.indexOf('>', bodyStartPos);
                if (bodyEndPos !== -1) {
                    insertPosition = bodyEndPos + 1;
                }
            }
        }
        
        // 3. הוספת תפריט האייקונים הצבעוני החדש במיקום המתאים
        if (insertPosition !== -1) {
            content = content.slice(0, insertPosition) + '\n' + coloredIconsNavbarCode + '\n' + content.slice(insertPosition);
            wasUpdated = true;
            console.log(`✅ נוסף תפריט האייקונים הצבעוני החדש לקובץ ${file}`);
        } else {
            console.error(`❌ לא נמצא מקום מתאים להוספת תפריט האייקונים בקובץ ${file}`);
            errorCount++;
        }
        
        // עדכון הקובץ אם היו שינויים
        if (wasUpdated) {
            fs.writeFileSync(file, content, 'utf8');
            updatedCount++;
            console.log(`✅ עודכן ${file} - נוסף תפריט האייקונים הצבעוני החדש`);
        } else {
            console.log(`⏩ לא נדרשו שינויים בקובץ ${file}`);
        }
        
    } catch (err) {
        console.error(`❌ שגיאה בעדכון ${file}:`, err);
        errorCount++;
    }
});

// סיכום
console.log('\n=== סיכום יישום תפריט האייקונים הצבעוני ===');
console.log(`✅ עודכנו ${updatedCount} מתוך ${htmlFiles.length} קבצים`);
if (errorCount > 0) {
    console.log(`❌ נכשל עדכון של ${errorCount} קבצים`);
}
console.log(`✅ כל הגיבויים נשמרו בתיקייה ${backupDir}`);
console.log('\n✅ העדכון הסתיים. הפעל את השרת כדי לבדוק את התוצאה:');
console.log('node server.js');