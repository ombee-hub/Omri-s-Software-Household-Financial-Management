/**
 * exact-navbar-fix.js
 * סקריפט ליצירת תפריט אייקונים זהה לתמונה מתחת ללוגו והכותרת
 */

const fs = require('fs');
const path = require('path');

console.log('=== מתחיל יישום תפריט אייקונים זהה לתמונה ===');

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
const backupDir = 'final-navbar-backups';
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
    console.log(`✅ נוצרה תיקייה ${backupDir} לגיבויים`);
}

// קוד תפריט האייקונים החדש בדיוק כמו בתמונה
const exactNavbarCode = `<!-- תפריט האייקונים הזהה לתמונה -->
<style>
/* סגנון תפריט האייקונים */
.top-menu-container {
    border-bottom: 1px solid #e0e0e0;
    background-color: #f8f9fa;
    padding-bottom: 5px;
}

.site-header {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.site-title {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin: 0;
}

.site-logo {
    margin-left: 10px;
    font-size: 28px;
}

.icons-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0 10px;
    max-width: 1200px;
    margin: 0 auto;
}

.icons-container {
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 700px;
}

.icon-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #333;
    padding: 5px 15px;
    position: relative;
}

.icon-link.active {
    color: #673ab7; /* צבע סגול להדגשה */
}

.icon-link.active::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    height: 4px;
    background-color: #673ab7;
    border-radius: 2px;
}

.icon-img {
    width: 24px;
    height: 24px;
    margin-bottom: 5px;
}

.icon-label {
    font-size: 14px;
    font-weight: 500;
    font-family: 'Rubik', Arial, sans-serif;
    text-align: center;
}

/* עבור מסכים קטנים */
@media (max-width: 600px) {
    .icons-container {
        width: 100%;
    }
    
    .icon-img {
        width: 20px;
        height: 20px;
    }
    
    .icon-label {
        font-size: 12px;
    }
}
</style>

<div class="top-menu-container">
    <header class="site-header">
        <h1 class="site-title">מערכת ניהול קלטות</h1>
        <span class="site-logo">🎥</span>
    </header>

    <nav class="icons-menu">
        <div class="icons-container">
            <a href="gallery.html" class="icon-link" id="gallery-link">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjMjA5NjVhIj48cGF0aCBkPSJNMCAxMDBhMjggMjggMCAwIDEgMjgtMjhoNDU2YTI4IDI4IDAgMCAxIDI4IDI4djMxMmEyOCAyOCAwIDAgMS0yOCAyOEgyOGEyOCAyOCAwIDAgMS0yOC0yOFYxMDB6bTk3LjU2NCAzNGMtMTkuMDkgMC0zNC41NjQgMTUuNDc0LTM0LjU2NCAzNC41NjRzMTUuNDc0IDM0LjU2NCAzNC41NjQgMzQuNTY0czM0LjU2NC0xNS40NzQgMzQuNTY0LTM0LjU2NFMxMTYuNjU0IDEzNCA5Ny41NjQgMTM0ek00OCA0MTRoNDE2VjE4Mi41NjRsLTExNi00Ni4yMjZMMjA4IDMxMiA5NiAyMDZ2MjA4eiI+PC9wYXRoPjwvc3ZnPg==" class="icon-img" alt="גלריה">
                <span class="icon-label">גלריה</span>
            </a>
            <a href="details.html" class="icon-link" id="details-link">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjZTA3YTVmIj48cGF0aCBkPSJNNjQgMzJDMjguNyAzMiAwIDYwLjcgMCA5NnYzMjBjMCAzNS4zIDI4LjcgNjQgNjQgNjRINDQ4YzM1LjMgMCA2NC0yOC43IDY0LTY0VjE5MmMwLTM1LjMtMjguNy02NC02NC02NEgxNzZjLTguOCAwLTE2LTcuMi0xNi0xNnMtNy4yLTE2LTE2LTE2SDY0em04MCAxNjBINDQ4YzguOCAwIDE2IDcuMiAxNiAxNnYyMDhjMCA4LjgtNy4yIDE2LTE2IDE2SDgwYy04LjggMC0xNi03LjItMTYtMTZWMjA4YzAtOC44IDcuMi0xNiAxNi0xNnptMjA4IDY0SDExMnYzMmgxMTJMMjI0IDI4OEg4OGwxMDQgODhoMjQwdi0zMmgtMTEybC0yNCAyNGgyMTZ6Ij48L3BhdGg+PC9zdmc+" class="icon-img" alt="פירוט קלטות">
                <span class="icon-label">פירוט קלטות</span>
            </a>
            <a href="index.html" class="icon-link" id="index-link">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjNDA5NmZmIj48cGF0aCBkPSJNMCA5NkMwIDYwLjcgMjguNyAzMiA2NCAzMmg2NEMxNjQgMzIgMTkyIDYwLjcgMTkyIDk2djMyaDI1NmMzNS4zIDAgNjQgMjguNyA2NCA2NHYyNTZjMCAzNS4zLTI4LjcgNjQtNjQgNjRINjRjLTM1LjMgMC02NC0yOC43LTY0LTY0Vjk2em02NCAwdjM1MmgzODRWMTkySDY0di02NHYtMzJ6TTQwMCAzMzZjMC0yNi41LTIxLjUtNDgtNDgtNDhzLTQ4IDIxLjUtNDggNDhzMjEuNSA0OCA0OCA0OHM0OC0yMS41IDQ4LTQ4ek0yNTYgOTZINDh2MzJoMjA4Vjk2eiI+PC9wYXRoPjwvc3ZnPg==" class="icon-img" alt="יומן משימות">
                <span class="icon-label">יומן משימות</span>
            </a>
            <a href="status.html" class="icon-link" id="status-link">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjOWM5ZGExIj48cGF0aCBkPSJNNDk1LjkgMTY2LjZjMy4yIDguNyAuNSAxOC40LTYuNCAyNC42bC00My4zIDM5LjRjMS4xIDguMyAxLjcgMTYuOCAxLjcgMjUuNHMtLjYgMTcuMS0xLjcgMjUuNGw0My4zIDM5LjRjNi45IDYuMiA5LjYgMTUuOSA2LjQgMjQuNmMtNC40IDExLjktOS43IDIzLjMtMTUuOCAzNC4zbC00LjcgOC4xYy02LjYgMTEtMTQgMjEuNC0yMi4xIDMxLjJjLTUuOSA3LjItMTUuNyA5LjYtMjQuNSA2LjhsLTU1LjctMTcuN2MtMTMuNCAxMC4zLTI4LjIgMTguOS00NCAyNS40bC0xMi41IDU3LjFjLTIgOS4xLTkgMTYuMy0xOC4yIDE3LjhjLTEzLjggMi4zLTI4IDMuNS00Mi41IDMuNXMtMjguNy0xLjItNDIuNS0zLjVjLTkuMi0xLjUtMTYuMi04LjctMTguMi0xNy44bC0xMi41LTU3LjFjLTE1LjgtNi41LTMwLjYtMTUuMS00NC0yNS40TDgzLjEgMzQ1LjhjLTguOCAyLjgtMTguNiAuMy0yNC41LTYuOGMtOC4xLTkuOC0xNS41LTIwLjItMjIuMS0zMS4ybC00LjctOC4xYy02LjEtMTEtMTEuNC0yMi40LTE1LjgtMzQuM2MtMy4yLTguNy0uNS0xOC40IDYuNC0yNC42bDQzLjMtMzkuNEM2NC42IDIwMS4xIDY0IDE5Mi42IDY0IDE4NHMuNi0xNy4xIDEuNy0yNS40TDIyLjQgMTE5LjJjLTYuOS02LjItOS42LTE1LjktNi40LTI0LjZjNC40LTExLjkgOS43LTIzLjMgMTUuOC0zNC4zbDQuNy04LjFjNi42LTExIDE0LTIxLjQgMjIuMS0zMS4yYzUuOS03LjIgMTUuNy05LjYgMjQuNS02LjhsMTIyLjMgNTdjNDMuMS0zNS44IDk5LjUtNTcuNiAxNjAuNC01Ny42YzYwLjkgMCAxMTcuMiAyMS44IDE2MC40IDU3LjZjNDYuOC0yMS44IDU0LjctMjIuMSA1NS43LTIyLjFjOC44LTIuOCAxOC42LS4zIDI0LjUgNi44YzguMSA5LjggMTUuNSAyMC4yIDIyLjEgMzEuMmw0LjcgOC4xYzYuMSAxMSAxMS40IDIyLjQgMTUuOCAzNC4zek0yNTYgMzM2YTgwIDgwIDAgMSAwIDAtMTYwYTgwIDgwIDAgMSAwIDAgMTYweiI+PC9wYXRoPjwvc3ZnPg==" class="icon-img" alt="סטטוס עריכה">
                <span class="icon-label">סטטוס עריכה</span>
            </a>
            <a href="dashboard.html" class="icon-link" id="dashboard-link">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjZWE1MTlkIj48cGF0aCBkPSJNMCA5NkMwIDYwLjcgMjguNyAzMiA2NCAzMkg0NDhjMzUuMyAwIDY0IDI4LjcgNjQgNjRWNDE2YzAgMzUuMy0yOC43IDY0LTY0IDY0SDY0Yy0zNS4zIDAtNjQtMjguNy02NC02NFY5NnpNNjQgMzJDMjguNyAzMiAwIDYwLjcgMCA5NnY4MEMwIDIxMS44IDE2LjIgMjI4IDM2IDIyOEgyMDhjMTkuOCAwIDM2LTE2LjIgMzYtMzZWOTZjMC0xOS44LTE2LjItMzYtMzYtMzZINjR6bTEyOCAxODJoMTQyLjVjMTcgMCAzMy41IDMuNSA0OC45IDEwLjFsMTAgNC4xYzQxLjUgMTcuOSA2Ni43IDU5IDY2LjcgMTAzLjVjMCAwLTExLjItLjYtMjkuOS03LjhjLTIwLjEtNy44LTQ0LjQtMjIuOC02OC44LTQ3LjJjLTQ4LjgtNDguOC04NS30vYXRoPlwvc3ZnPg==" class="icon-img" alt="דאשבורד">
                <span class="icon-label">דאשבורד</span>
            </a>
        </div>
    </nav>
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
        
        // הסרת כל תפריטי הניווט והכותרות הקיימים
        
        // 1. הסרת תפריטים קיימים מכל סוג
        [
            { start: '<div class="icons-navbar"', end: '</div>' },
            { start: '<div class="colored-icons-navbar"', end: '</div>' },
            { start: '<div class="top-icons-navbar"', end: '</div>' },
            { start: '<nav class="navbar"', end: '</nav>' },
            { start: '<nav class="nav-container"', end: '</nav>' },
            { start: '<div class="navbar-container"', end: '</div>' },
            { start: '<div class="nav-content"', end: '</div>' },
            { start: '<div class="top-menu-container"', end: '</div>' }
        ].forEach(selector => {
            let startIndex = content.indexOf(selector.start);
            while (startIndex !== -1) {
                // מציאת תגית הסיום
                let depth = 1;
                let endIndex = startIndex + selector.start.length;
                
                while (depth > 0 && endIndex < content.length) {
                    const openTag = content.indexOf('<div', endIndex);
                    const closeTag = content.indexOf('</div>', endIndex);
                    const openNavTag = content.indexOf('<nav', endIndex);
                    const closeNavTag = content.indexOf('</nav>', endIndex);
                    
                    let nextOpenTag = -1;
                    if (openTag !== -1 && openNavTag !== -1) {
                        nextOpenTag = Math.min(openTag, openNavTag);
                    } else if (openTag !== -1) {
                        nextOpenTag = openTag;
                    } else if (openNavTag !== -1) {
                        nextOpenTag = openNavTag;
                    }
                    
                    let nextCloseTag = -1;
                    if (closeTag !== -1 && closeNavTag !== -1) {
                        nextCloseTag = Math.min(closeTag, closeNavTag);
                    } else if (closeTag !== -1) {
                        nextCloseTag = closeTag;
                    } else if (closeNavTag !== -1) {
                        nextCloseTag = closeNavTag;
                    }
                    
                    if (nextCloseTag === -1) break;
                    
                    if (nextOpenTag !== -1 && nextOpenTag < nextCloseTag) {
                        depth++;
                        endIndex = nextOpenTag + 4;
                    } else {
                        depth--;
                        endIndex = nextCloseTag + 6;
                    }
                }
                
                if (depth === 0) {
                    // זיהוי האלמנט לפני הסרה
                    const elementToRemove = content.substring(startIndex, endIndex);
                    
                    // אם זה תפריט ניווט, הסר אותו
                    if (elementToRemove.includes('nav-links') || 
                        elementToRemove.includes('nav-menu') || 
                        elementToRemove.includes('icons-container') ||
                        elementToRemove.includes('navbar')) {
                        
                        content = content.slice(0, startIndex) + content.slice(endIndex);
                        wasUpdated = true;
                        console.log(`✅ הוסר תפריט ניווט מהקובץ ${file}`);
                    } else {
                        // אחרת, המשך לחיפוש הבא
                        startIndex = content.indexOf(selector.start, startIndex + 1);
                        continue;
                    }
                }
                
                startIndex = content.indexOf(selector.start, Math.max(0, startIndex - endIndex + 1));
            }
        });
        
        // 2. הסרת תגית header עם הלוגו והכותרת
        if (content.includes('<header')) {
            const headerStartPos = content.indexOf('<header');
            if (headerStartPos !== -1) {
                const headerEndPos = content.indexOf('</header>', headerStartPos) + 9;
                if (headerEndPos > headerStartPos) {
                    // בדיקה שזה לא חלק מהתפריט החדש
                    const headerContent = content.substring(headerStartPos, headerEndPos);
                    if (!headerContent.includes('site-header')) {
                        content = content.slice(0, headerStartPos) + content.slice(headerEndPos);
                        wasUpdated = true;
                        console.log(`✅ הוסרה תגית header מהקובץ ${file}`);
                    }
                }
            }
        }
        
        // 3. הסרת סגנונות CSS של תפריטים
        const styleIndicators = [
            '.icons-navbar', '.colored-icons-navbar', '.top-icons-navbar', 
            '.nav-links', '.navbar', '.nav-container', '.icons-container'
        ];
        
        styleIndicators.forEach(styleIndicator => {
            if (content.includes(styleIndicator)) {
                const styleStartPos = content.indexOf('<style>', content.indexOf(styleIndicator) - 5000);
                if (styleStartPos !== -1 && styleStartPos < content.indexOf(styleIndicator)) {
                    const styleEndPos = content.indexOf('</style>', styleStartPos) + 8;
                    if (styleEndPos > styleStartPos) {
                        const styleContent = content.substring(styleStartPos, styleEndPos);
                        if (styleContent.includes(styleIndicator) && !styleContent.includes('top-menu-container')) {
                            content = content.slice(0, styleStartPos) + content.slice(styleEndPos);
                            wasUpdated = true;
                            console.log(`✅ הוסרו סגנונות של תפריט ניווט מהקובץ ${file}`);
                        }
                    }
                }
            }
        });
        
        // 4. הסרת סקריפטים של תפריטים
        if (content.includes('document.addEventListener') && 
            (content.includes('linkId') || content.includes('icon-link'))) {
            
            const scriptStartPos = content.indexOf('<script>', content.indexOf('document.addEventListener'));
            if (scriptStartPos !== -1) {
                const scriptEndPos = content.indexOf('</script>', scriptStartPos) + 9;
                if (scriptEndPos > scriptStartPos) {
                    const scriptContent = content.substring(scriptStartPos, scriptEndPos);
                    if ((scriptContent.includes('linkId') || scriptContent.includes('icon-link')) && 
                        !scriptContent.includes('top-menu-container')) {
                        
                        content = content.slice(0, scriptStartPos) + content.slice(scriptEndPos);
                        wasUpdated = true;
                        console.log(`✅ הוסר סקריפט של תפריט ניווט מהקובץ ${file}`);
                    }
                }
            }
        }
        
        // 5. הוספת התפריט החדש מיד אחרי פתיחת תגית <body>
        const bodyStartPos = content.indexOf('<body');
        if (bodyStartPos !== -1) {
            const bodyEndPos = content.indexOf('>', bodyStartPos);
            if (bodyEndPos !== -1) {
                content = content.slice(0, bodyEndPos + 1) + '\n' + exactNavbarCode + '\n' + content.slice(bodyEndPos + 1);
                wasUpdated = true;
                console.log(`✅ נוסף תפריט חדש זהה לתמונה לקובץ ${file}`);
            }
        } else {
            console.error(`❌ לא נמצאה תגית <body> בקובץ ${file}`);
            errorCount++;
        }
        
        // שמירת הקובץ המעודכן
        if (wasUpdated) {
            fs.writeFileSync(file, content, 'utf8');
            updatedCount++;
            console.log(`✅ עודכן ${file} בהצלחה`);
        } else {
            console.log(`⏩ לא בוצעו שינויים בקובץ ${file}`);
        }
        
    } catch (err) {
        console.error(`❌ שגיאה בעדכון ${file}:`, err);
        errorCount++;
    }
});

// סיכום
console.log('\n=== סיכום יישום תפריט זהה לתמונה ===');
console.log(`✅ עודכנו ${updatedCount} מתוך ${htmlFiles.length} קבצים`);
if (errorCount > 0) {
    console.log(`❌ נכשל עדכון של ${errorCount} קבצים`);
}
console.log(`✅ כל הגיבויים נשמרו בתיקייה ${backupDir}`);
console.log('\n✅ העדכון הסתיים. הפעל את השרת כדי לבדוק את התוצאה:');
console.log('node server.js');