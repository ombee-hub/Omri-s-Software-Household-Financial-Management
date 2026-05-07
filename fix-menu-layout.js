/**
 * fix-menu-layout.js
 * סקריפט להסרת התפריט התחתון והורדת תפריט האייקונים למקומו
 */

const fs = require('fs');
const path = require('path');

console.log('=== מתחיל לעדכן את מבנה התפריטים באתר ===');

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
const backupDir = 'menu-backups';
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
    console.log(`✅ נוצרה תיקייה ${backupDir} לגיבויים`);
}

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
        
        // 1. עדכון סגנון תפריט האייקונים - הורדת margin-bottom לאפס
        if (content.includes('.icons-navbar')) {
            content = content.replace(
                /\.icons-navbar\s*{[^}]*margin-bottom:\s*15px;([^}]*)}/, 
                '.icons-navbar {$1margin-bottom: 0;}'
            );
            console.log(`✅ עודכן margin-bottom של תפריט האייקונים ב-${file}`);
        }
        
        // 2. מציאת והסרת התפריט התחתון (שורת הכפתורים הכחולה)
        
        // גישה א': חיפוש תגיות nav או div עם class שמכיל "nav" או "menu"
        [
            '<nav class="navbar"', 
            '<nav class="nav-container"', 
            '<div class="nav-menu"',
            '<ul class="nav-menu"',
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
                    } else if (navSelector.startsWith('<ul')) {
                        navEndPos = content.indexOf('</ul>', navStartPos) + 5;
                    } else { // div
                        navEndPos = content.indexOf('</div>', navStartPos);
                        // במקרה של div, ייתכן שיש div מקונן - צריך למצוא את תגית הסגירה הנכונה
                        let openCount = 1;
                        let pos = navStartPos + 1;
                        while (openCount > 0 && pos < content.length) {
                            const nextOpenPos = content.indexOf('<div', pos);
                            const nextClosePos = content.indexOf('</div>', pos);
                            
                            if (nextClosePos === -1) break;
                            
                            if (nextOpenPos !== -1 && nextOpenPos < nextClosePos) {
                                openCount++;
                                pos = nextOpenPos + 1;
                            } else {
                                openCount--;
                                pos = nextClosePos + 1;
                                if (openCount === 0) {
                                    navEndPos = nextClosePos + 6;
                                }
                            }
                        }
                    }
                    
                    if (navEndPos && navEndPos > navStartPos) {
                        const menuContent = content.substring(navStartPos, navEndPos);
                        // בדיקה נוספת - האם זה באמת התפריט התחתון (כדי לא להסיר את תפריט האייקונים בטעות)
                        if (menuContent.includes('nav-link') && !menuContent.includes('icons-navbar')) {
                            content = content.slice(0, navStartPos) + content.slice(navEndPos);
                            console.log(`✅ הוסר תפריט תחתון מסוג ${navSelector} מהקובץ ${file}`);
                        }
                    }
                }
            }
        });
        
        // 3. הסרת תגית <header> אם קיימת (כדי לשמור רק על התפריט העליון)
        if (content.includes('<header')) {
            const headerStartPos = content.indexOf('<header');
            if (headerStartPos !== -1) {
                const headerEndPos = content.indexOf('</header>', headerStartPos) + 9;
                if (headerEndPos > headerStartPos) {
                    content = content.slice(0, headerStartPos) + content.slice(headerEndPos);
                    console.log(`✅ הוסרה תגית header מהקובץ ${file}`);
                }
            }
        }
        
        // 4. שמירת הקובץ המעודכן
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
        console.log(`✅ עודכן ${file} - התפריט התחתון הוסר ותפריט האייקונים עודכן`);
        
    } catch (err) {
        console.error(`❌ שגיאה בעדכון ${file}:`, err);
        errorCount++;
    }
});

// סיכום
console.log('\n=== סיכום עדכון מבנה התפריטים ===');
console.log(`✅ עודכנו ${updatedCount} מתוך ${htmlFiles.length} קבצים`);
if (errorCount > 0) {
    console.log(`❌ נכשל עדכון של ${errorCount} קבצים`);
}
console.log(`✅ כל הגיבויים נשמרו בתיקייה ${backupDir}`);
console.log('\n✅ העדכון הסתיים. הפעל את השרת כדי לבדוק את התוצאה:');
console.log('node server.js');