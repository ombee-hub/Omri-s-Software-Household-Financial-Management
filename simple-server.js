const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// נתיב מוחלט לתיקיית public
const publicPath = 'D:/day/public';

// הדפסת מידע על הקבצים שהשרת מחפש
console.log('בודק אם התיקייה קיימת:', publicPath);
if (fs.existsSync(publicPath)) {
  console.log('התיקייה קיימת!');
  
  // בדוק אם קובץ login.html קיים
  const loginPath = path.join(publicPath, 'login.html');
  if (fs.existsSync(loginPath)) {
    console.log('קובץ login.html קיים!');
  } else {
    console.log('קובץ login.html לא קיים! מחפש בנתיב:', loginPath);
    
    // רשימת הקבצים בתיקייה
    console.log('קבצים בתיקייה:');
    const files = fs.readdirSync(publicPath);
    files.forEach(file => {
      console.log('- ' + file);
    });
  }
} else {
  console.log('התיקייה לא קיימת!');
}

// הגדרת תיקיית הקבצים הסטטיים
app.use(express.static(publicPath));

// התחלת השרת
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`השרת פועל בפורט ${PORT}`);
  console.log(`גש לדפדפן בכתובת: http://localhost:${PORT}`);
});