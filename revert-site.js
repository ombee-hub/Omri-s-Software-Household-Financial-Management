/**
 * revert-site.js
 * סקריפט להחזרת האתר למצב המקורי
 * 
 * מה הסקריפט הזה עושה:
 * 1. מסיר את תפריט האייקונים מכל הדפים
 * 2. מוחק קבצים שנוצרו (nav-icons.css, nav-icons.js)
 * 3. משחזר גיבויים של קבצים מקוריים אם קיימים
 * 
 * אופן השימוש:
 * 1. שמור את הקובץ בתיקיית הפרויקט
 * 2. הרץ בטרמינל: node revert-site.js
 */

const fs = require('fs');
const path = require('path');

console.log('=== מתחיל שחזור האתר למצב המקורי ===');

// רשימת הדפים לשחזור
const htmlFiles = [
    'dashboard.html',
    'status.html',
    'Edit Status.html',
    'index.html',
    'details.html',
    'gallery.html',
    'login.html'
];

// רשימת קבצים למחיקה
const filesToDelete = [
    'nav-icons.css',
    'nav-icons.js'
];

// שחזור קבצי HTML
let restoredCount = 0;

htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`⏩ דילוג על ${file} (הקובץ לא קיים)`);
        return;
    }

    try {
        let content = fs.readFileSync(file, 'utf8');
        let wasModified = false;
        
        // הסרת תפריט האייקונים והסגנונות המתאימים
        if (content.includes('top-icons-navbar')) {
            // הסרת בלוק סגנונות לתפריט האייקונים
            const styleStartPos = content.indexOf('<style>\n/* סגנון ישיר לתפריט האייקונים */');
            if (styleStartPos !== -1) {
                const styleEndPos = content.indexOf('</style>', styleStartPos);
                if (styleEndPos !== -1) {
                    content = content.slice(0, styleStartPos) + content.slice(styleEndPos + 8); // 8 = length of '</style>'
                    wasModified = true;
                }
            }
            
            // הסרת בלוק HTML של תפריט האייקונים
            const navStartPos = content.indexOf('<!-- תפריט האייקונים -->');
            if (navStartPos !== -1) {
                const navEndPos = content.indexOf('</div>', content.indexOf('</div>', navStartPos) + 6);
                if (navEndPos !== -1) {
                    content = content.slice(0, navStartPos) + content.slice(navEndPos + 6); // 6 = length of '</div>'
                    wasModified = true;
                }
            }
            
            // הסרת סקריפט הקשור לתפריט האייקונים
            const scriptStartPos = content.indexOf('<script>\n// סימון הקישור הפעיל');
            if (scriptStartPos !== -1) {
                const scriptEndPos = content.indexOf('</script>', scriptStartPos);
                if (scriptEndPos !== -1) {
                    content = content.slice(0, scriptStartPos) + content.slice(scriptEndPos + 9); // 9 = length of '</script>'
                    wasModified = true;
                }
            }
            
            // הסרת קישורים לקבצי nav-icons
            const headEndPos = content.indexOf('</head>');
            if (headEndPos !== -1) {
                // הסרת תגית link לקובץ CSS
                if (content.includes('<link rel="stylesheet" href="nav-icons.css">')) {
                    content = content.replace('<link rel="stylesheet" href="nav-icons.css">\n', '');
                    wasModified = true;
                }
                
                // הסרת תגית script לקובץ JavaScript
                if (content.includes('<script src="nav-icons.js" defer></script>')) {
                    content = content.replace('<script src="nav-icons.js" defer></script>\n', '');
                    wasModified = true;
                }
            }
            
            // הסרת מחלקת app-container מתגית body אם קיימת
            const bodyStartPos = content.indexOf('<body');
            if (bodyStartPos !== -1) {
                const bodyEndPos = content.indexOf('>', bodyStartPos);
                if (bodyEndPos !== -1) {
                    const bodyTag = content.substring(bodyStartPos, bodyEndPos + 1);
                    if (bodyTag.includes('class="app-container"')) {
                        const newBodyTag = bodyTag.replace('class="app-container"', '');
                        content = content.slice(0, bodyStartPos) + newBodyTag + content.slice(bodyEndPos + 1);
                        wasModified = true;
                    } else if (bodyTag.includes(' app-container')) {
                        const newBodyTag = bodyTag.replace(' app-container', '');
                        content = content.slice(0, bodyStartPos) + newBodyTag + content.slice(bodyEndPos + 1);
                        wasModified = true;
                    }
                }
            }
        }
        
        // שמירת הקובץ המעודכן אם בוצעו שינויים
        if (wasModified) {
            fs.writeFileSync(file, content, 'utf8');
            restoredCount++;
            console.log(`✅ שוחזר ${file} למצב המקורי`);
        } else {
            console.log(`⏩ דילוג על ${file} (לא זוהו שינויי תפריט אייקונים)`);
        }
        
    } catch (err) {
        console.error(`❌ שגיאה בשחזור ${file}:`, err);
    }
});

// מחיקת קבצים שנוצרו
let deletedCount = 0;

filesToDelete.forEach(file => {
    if (fs.existsSync(file)) {
        try {
            fs.unlinkSync(file);
            deletedCount++;
            console.log(`✅ נמחק ${file}`);
        } catch (err) {
            console.error(`❌ שגיאה במחיקת ${file}:`, err);
        }
    } else {
        console.log(`⏩ דילוג על ${file} (הקובץ לא קיים)`);
    }
});

// בדיקה אם קיים קובץ Edit_Status_backup.html
if (fs.existsSync('Edit_Status_backup.html')) {
    console.log('נמצא גיבוי של Edit Status.html');
    if (!fs.existsSync('Edit Status.html')) {
        try {
            fs.copyFileSync('Edit_Status_backup.html', 'Edit Status.html');
            console.log('✅ שוחזר Edit Status.html מגיבוי');
        } catch (err) {
            console.error('❌ שגיאה בשחזור Edit Status.html:', err);
        }
    }
}

// סיכום
console.log('\n=== סיכום שחזור האתר ===');
console.log(`✅ שוחזרו ${restoredCount} מתוך ${htmlFiles.length} קבצי HTML`);
console.log(`✅ נמחקו ${deletedCount} מתוך ${filesToDelete.length} קבצים נוספים`);
console.log('\n✅ הסקריפט סיים לרוץ. הפעל את השרת מחדש ובדוק שהאתר חזר למצבו המקורי.');
console.log('\nפקודה להפעלת השרת: node server.js');