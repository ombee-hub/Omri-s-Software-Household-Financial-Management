/**
 * simple-revert.js
 * סקריפט פשוט לשחזור דף ספציפי
 * 
 * מה הסקריפט הזה עושה:
 * 1. מאפשר להעתיק תוכן HTML מקורי ולשחזר דף ספציפי
 * 2. מציג מידע מפורט על פעולת השחזור
 * 
 * אופן השימוש:
 * 1. שמור את הקובץ בתיקיית הפרויקט
 * 2. הרץ בטרמינל: node simple-revert.js
 */

const fs = require('fs');

// הקלד את שם הקובץ שברצונך לשחזר
const fileToRestore = 'dashboard.html';

// הקלד את התוכן המקורי של הקובץ (ללא שינויים)
const originalContent = `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>דשבורד מערכת קלטות</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎥</text></svg>">
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        /* כאן יש את כל ה-CSS המקורי */
        /* העתק את כל התוכן המקורי של הדף */
    </style>
</head>
<body>
    <!-- כאן יש את כל ה-HTML המקורי -->
    <!-- העתק את כל התוכן המקורי של הדף -->
</body>
</html>`;

console.log(`=== מתחיל שחזור דף ${fileToRestore} ===`);

try {
    // בדיקה אם הקובץ קיים
    if (fs.existsSync(fileToRestore)) {
        // יצירת גיבוי לקובץ הנוכחי
        const backupFile = `${fileToRestore}.backup`;
        fs.copyFileSync(fileToRestore, backupFile);
        console.log(`✅ נוצר גיבוי של הקובץ הנוכחי: ${backupFile}`);
        
        // שחזור התוכן המקורי
        fs.writeFileSync(fileToRestore, originalContent, 'utf8');
        console.log(`✅ הקובץ ${fileToRestore} שוחזר בהצלחה למצב המקורי`);
    } else {
        console.error(`❌ הקובץ ${fileToRestore} לא נמצא`);
    }
} catch (err) {
    console.error(`❌ שגיאה בשחזור הקובץ ${fileToRestore}:`, err);
}

console.log('\n=== סיום שחזור ===');
console.log('1. וודא שהתוכן שהוזן אכן היה התוכן המקורי של הקובץ');
console.log('2. בדוק שהדף שוחזר כראוי על ידי הפעלת השרת: node server.js');
console.log('3. אם נדרש, שחזר דפים נוספים על ידי עריכת הקוד ושינוי שם הקובץ והתוכן המקורי');