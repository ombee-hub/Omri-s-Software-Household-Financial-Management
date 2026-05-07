/**
 * fix-dashboard-complete.js
 * סקריפט לתיקון מקיף של דף הדשבורד
 * 
 * הסקריפט מבצע:
 * 1. הסרת הודעת מצב הדגמה
 * 2. תיקון קישורים שגויים (Edit Status.html -> status.html)
 * 3. תיקון שגיאות תחביר אם קיימות
 * 4. וידוא שהניווט תקין ועקבי
 */

const fs = require('fs');
const path = require('path');

console.log('=== מתחיל תיקון מקיף של דף הדשבורד ===');

// נתיב לקובץ dashboard.html
const dashboardPath = path.join(__dirname, 'dashboard.html');

// בדיקה שהקובץ קיים
if (!fs.existsSync(dashboardPath)) {
    console.error('❌ הקובץ dashboard.html לא נמצא!');
    process.exit(1);
}

try {
    // קריאת תוכן הקובץ
    let content = fs.readFileSync(dashboardPath, 'utf8');
    let wasUpdated = false;
    
    // 1. הסרת הודעת "מצב הדגמה"
    const demoBannerRegex = /<div class="demo-banner">[\s\S]*?<\/div>/;
    if (demoBannerRegex.test(content)) {
        content = content.replace(demoBannerRegex, '');
        wasUpdated = true;
        console.log('✅ הוסרה הודעת "מצב הדגמה" מדף הדשבורד');
    }
    
    // 2. הסרת סגנון ה-CSS של demo-banner
    const demoBannerStyleRegex = /\/\* Demo banner styles \*\/[\s\S]*?}\s*}/;
    if (demoBannerStyleRegex.test(content)) {
        content = content.replace(demoBannerStyleRegex, '');
        wasUpdated = true;
        console.log('✅ הוסר סגנון CSS של הדגמה מדף הדשבורד');
    }
    
    // 3. תיקון קישורים שגויים (Edit Status.html -> status.html)
    if (content.includes('href="Edit Status.html"')) {
        content = content.replace(/href="Edit Status.html"/g, 'href="status.html"');
        wasUpdated = true;
        console.log('✅ תוקנו קישורים שגויים ל-Edit Status.html');
    }
    
    // תיקון אזכורי Edit Status.html בתוך ה-JavaScript
    if (content.includes('"Edit Status.html"')) {
        content = content.replace(/"Edit Status.html"/g, '"status.html"');
        wasUpdated = true;
        console.log('✅ תוקנו אזכורי Edit Status.html בתוך ה-JavaScript');
    }
    
    // 4. תיקון ניווט עקבי בתפריט
    const navMenuRegex = /<ul class="nav-menu"[^>]*>([\s\S]*?)<\/ul>/;
    if (navMenuRegex.test(content)) {
        const navMenuMatch = content.match(navMenuRegex);
        const navMenu = navMenuMatch[1];
        
        // בדיקה אם חסרים קישורים בתפריט
        const hasAllLinks = 
            navMenu.includes('href="dashboard.html"') && 
            navMenu.includes('href="status.html"') && 
            navMenu.includes('href="index.html"') && 
            navMenu.includes('href="details.html"') && 
            navMenu.includes('href="gallery.html"');
        
        if (!hasAllLinks) {
            // עדכון התפריט עם כל הקישורים הנדרשים
            const newNavMenu = `<ul class="nav-menu" id="navMenu">
                    <li class="nav-item">
                        <a href="dashboard.html" class="nav-link active">
                            <span class="nav-icon">📊</span>
                            דשבורד
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="status.html" class="nav-link">
                            <span class="nav-icon">🔄</span>
                            סטטוס עריכה
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="index.html" class="nav-link">
                            <span class="nav-icon">📝</span>
                            יומן משימות
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="details.html" class="nav-link">
                            <span class="nav-icon">📋</span>
                            פירוט קלטות
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="gallery.html" class="nav-link">
                            <span class="nav-icon">🖼️</span>
                            גלריה
                        </a>
                    </li>
                </ul>`;
            
            content = content.replace(navMenuRegex, newNavMenu);
            wasUpdated = true;
            console.log('✅ תוקן תפריט הניווט להכיל את כל הקישורים הנדרשים');
        }
    }
    
    // 5. תיקון תפריט ניווט נוסף (nav-links) אם קיים
    const navLinksRegex = /<div class="nav-links">([\s\S]*?)<\/div>/;
    if (navLinksRegex.test(content)) {
        const navLinksMatch = content.match(navLinksRegex);
        const navLinks = navLinksMatch[0];
        
        // בדיקה אם יש בעיות בתפריט הניווט
        if (navLinks.includes('Edit Status.html') || !navLinks.includes('status.html')) {
            const newNavLinks = `<div class="nav-links">
    <a href="dashboard.html" class="active">דאשבורד</a>
    <a href="status.html">סטטוס עריכה</a>
    <a href="index.html">יומן משימות</a>
    <a href="details.html">פירוט קלטות</a>
    <a href="gallery.html">גלריה</a>
</div>`;
            
            content = content.replace(navLinksRegex, newNavLinks);
            wasUpdated = true;
            console.log('✅ תוקן תפריט nav-links עם כל הקישורים הנדרשים');
        }
    }
    
    // 6. וידוא קישור לקובץ navigation.js
    if (!content.includes('navigation.js')) {
        const headEndPos = content.indexOf('</head>');
        if (headEndPos !== -1) {
            // הוספת תגית script
            content = content.slice(0, headEndPos) + 
                '\n    <script src="navigation.js" defer></script>\n' + 
                content.slice(headEndPos);
            wasUpdated = true;
            console.log('✅ נוסף קישור לקובץ navigation.js');
        }
    }
    
    // 7. תיקון תגית HTML חסרה אם יש
    const htmlOpenTags = (content.match(/<html/g) || []).length;
    const htmlCloseTags = (content.match(/<\/html>/g) || []).length;
    
    if (htmlOpenTags > htmlCloseTags) {
        content += '\n</html>';
        wasUpdated = true;
        console.log('✅ נוספה תגית סגירה </html> חסרה');
    }
    
    // 8. וידוא קיום טעינת פונטים של Rubik
    if (!content.includes('fonts.googleapis.com/css2?family=Rubik')) {
        const headEndPos = content.indexOf('</head>');
        if (headEndPos !== -1) {
            // הוספת קישור לפונט
            content = content.slice(0, headEndPos) + 
                '\n    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap" rel="stylesheet">\n' + 
                content.slice(headEndPos);
            wasUpdated = true;
            console.log('✅ נוסף קישור לפונט Rubik');
        }
    }
    
    // שמירת הקובץ המעודכן אם בוצעו שינויים
    if (wasUpdated) {
        fs.writeFileSync(dashboardPath, content, 'utf8');
        console.log(`✅ נשמר ${dashboardPath} עם התיקונים`);
    } else {
        console.log(`⏩ דילוג על ${dashboardPath} (לא נדרשו שינויים)`);
    }

    // בדיקה של קובץ Edit Status.html וקובץ status.html
    const editStatusPath = path.join(__dirname, 'Edit Status.html');
    const statusPath = path.join(__dirname, 'status.html');
    
    // אם קיים Edit Status.html אבל לא קיים status.html, נעתיק את הקובץ
    if (fs.existsSync(editStatusPath) && !fs.existsSync(statusPath)) {
        try {
            fs.copyFileSync(editStatusPath, statusPath);
            console.log('✅ הועתק Edit Status.html לקובץ status.html');
            
            // עדכון קובץ status.html
            let statusContent = fs.readFileSync(statusPath, 'utf8');
            
            // תיקון כותרת הדף
            statusContent = statusContent.replace(/<title>.*?<\/title>/, '<title>סטטוס עריכה</title>');
            
            // תיקון התפריט
            const statusNavRegex = /<div class="nav-links">([\s\S]*?)<\/div>/;
            if (statusNavRegex.test(statusContent)) {
                const newStatusNav = `<div class="nav-links">
    <a href="dashboard.html">דאשבורד</a>
    <a href="status.html" class="active">סטטוס עריכה</a>
    <a href="index.html">יומן משימות</a>
    <a href="details.html">פירוט קלטות</a>
    <a href="gallery.html">גלריה</a>
</div>`;
                
                statusContent = statusContent.replace(statusNavRegex, newStatusNav);
            }
            
            // הוספת קישור ל-navigation.js אם צריך
            if (!statusContent.includes('navigation.js')) {
                const headEndPos = statusContent.indexOf('</head>');
                if (headEndPos !== -1) {
                    // הוספת תגית script
                    statusContent = statusContent.slice(0, headEndPos) + 
                        '\n    <script src="navigation.js" defer></script>\n' + 
                        statusContent.slice(headEndPos);
                }
            }
            
            fs.writeFileSync(statusPath, statusContent, 'utf8');
            console.log('✅ עודכן status.html עם התיקונים הנדרשים');
        } catch (err) {
            console.error('❌ שגיאה בהעתקת Edit Status.html לקובץ status.html:', err);
        }
    }
    
} catch (err) {
    console.error(`❌ שגיאה בעדכון ${dashboardPath}:`, err);
    process.exit(1);
}

console.log('\n=== סיכום פעולות ===');
console.log('✅ בוצע תיקון מקיף של דף הדשבורד');
console.log('✅ תוקנו קישורים, תפריטי ניווט ותגיות HTML חסרות');
console.log('✅ הוסרו התייחסויות למצב הדגמה');
console.log('\nהפעל את השרת כדי לראות את השינויים: node server.js');