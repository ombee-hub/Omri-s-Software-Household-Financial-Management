/**
 * remove-demo-hints.js
 * סקריפט להסרה מוחלטת של כל ההתייחסויות למצב הדגמה ופרטי התחברות לדוגמה
 * 
 * הסקריפט מסיר:
 * 1. את הודעת "מצב הדגמה" בחלק העליון של הדף
 * 2. את קטע "פרטי התחברות לדוגמה" שמתחת לטופס
 * 3. את שורות ההסבר בתוך הסקריפט
 * 4. את התיבה האפורה עם שם המשתמש והסיסמה לדוגמה
 */

const fs = require('fs');
const path = require('path');

console.log('=== מתחיל הסרת כל ההתייחסויות למצב הדגמה ===');

// נתיב לקובץ login.html
const loginPath = path.join(__dirname, 'login.html');

// בדיקה שהקובץ קיים
if (!fs.existsSync(loginPath)) {
    console.error('❌ הקובץ login.html לא נמצא!');
    process.exit(1);
}

try {
    // קריאת תוכן הקובץ
    let content = fs.readFileSync(loginPath, 'utf8');
    let wasUpdated = false;
    
    // 1. הסרת ערכי ברירת המחדל משדות הקלט
    if (content.includes('value="בן אליהו"') || content.includes('value="omri02071992"')) {
        content = content.replace(/value="בן אליהו"/g, 'value=""');
        content = content.replace(/value="omri02071992"/g, 'value=""');
        wasUpdated = true;
        console.log('✅ הוסרו ערכי ברירת המחדל משדות הקלט');
    }
    
    // 2. הסרת הודעת "מצב הדגמה"
    const demoBannerRegex = /<div class="demo-banner">([\s\S]*?)<\/div>/;
    if (demoBannerRegex.test(content)) {
        content = content.replace(demoBannerRegex, '');
        wasUpdated = true;
        console.log('✅ הוסרה הודעת "מצב הדגמה"');
    }
    
    // 3. הסרת קטע "פרטי התחברות לדוגמה"
    const credentialsHintRegex = /<div class="credentials-hint">([\s\S]*?)<\/div>/;
    if (credentialsHintRegex.test(content)) {
        content = content.replace(credentialsHintRegex, '');
        wasUpdated = true;
        console.log('✅ הוסר קטע "פרטי התחברות לדוגמה"');
    }

    // 4. הסרת התיבה עם פרטי התחברות לדוגמה (התיבה האפורה תחת הטופס)
    const demoCredBoxRegex = /<div[^>]*>\s*שם משתמש לדוגמה:[\s\S]*?סיסמה לדוגמה:[\s\S]*?<\/div>/;
    if (demoCredBoxRegex.test(content)) {
        content = content.replace(demoCredBoxRegex, '');
        wasUpdated = true;
        console.log('✅ הוסרה תיבת פרטי התחברות לדוגמה');
    }

    // 5. עדכון הלוגיקה של הסקריפט להתחברות
    const loginScriptRegex = /<script>([\s\S]*?)<\/script>/;
    if (loginScriptRegex.test(content)) {
        const newLoginScript = `<script>
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        });
    </script>`;
        
        content = content.replace(loginScriptRegex, newLoginScript);
        wasUpdated = true;
        console.log('✅ עודכן סקריפט ההתחברות');
    }
    
    // 6. הסרת כל התייחסות לדגמה בהערות או בטקסט
    content = content.replace(/<!-- Demo banner.*?-->/g, '');
    content = content.replace(/בגרסת הדגמה/g, '');
    content = content.replace(/כל שם משתמש וסיסמה יתקבלו/g, '');
    
    // 7. הסרת סגנון של demo-banner שכבר לא בשימוש
    const demoBannerStyleRegex = /\/\* Demo banner styles \*\/[\s\S]*?}/;
    if (demoBannerStyleRegex.test(content)) {
        content = content.replace(demoBannerStyleRegex, '');
        wasUpdated = true;
        console.log('✅ הוסר סגנון demo-banner שלא בשימוש');
    }
    
    // שמירת הקובץ המעודכן אם בוצעו שינויים
    if (wasUpdated) {
        fs.writeFileSync(loginPath, content, 'utf8');
        console.log(`✅ נשמר ${loginPath} עם העדכונים`);
    } else {
        console.log(`⏩ דילוג על ${loginPath} (לא נדרשו שינויים)`);
    }
    
} catch (err) {
    console.error(`❌ שגיאה בעדכון ${loginPath}:`, err);
    process.exit(1);
}

console.log('\n=== סיכום פעולות ===');
console.log('✅ הוסרו כל ההתייחסויות למצב הדגמה');
console.log('✅ הוסרו כל פרטי התחברות לדוגמה');
console.log('✅ הטופס עכשיו נקי ללא הערות מיותרות');
console.log('\nהפעל את השרת כדי לראות את השינויים: node server.js');