// מודולים נדרשים
const express = require('express');
const path = require('path');

// יצירת אפליקציית Express
const app = express();
const PORT = process.env.PORT || 3000;

// הגדרת תיקיית קבצים סטטיים
app.use(express.static(path.join(__dirname, 'public')));

// הגדרת Express לניתוח נתוני טופס
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// דף הכניסה הראשי - יעביר לדאשבורד
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// דף ההתחברות
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// טיפול בפעולת ההתחברות
app.post('/login', (req, res) => {
  // בפרויקט אמיתי, כאן היינו מבצעים אימות מול מסד נתונים
  const { username, password } = req.body;
  
  // מתוך מטרות הדגמה, כל משתמש וסיסמה יתקבלו
  console.log(`ניסיון התחברות: ${username}`);
  
  // מעביר חזרה לדף הראשי (דאשבורד)
  res.redirect('/');
});

// מאפשר לקבצים סטטיים להיות מוגשים ישירות מהתיקייה הציבורית
// כך שהקישורים כמו editing-status.html יעבדו ישירות

// התחלת השרת
app.listen(PORT, () => {
  console.log(`השרת פועל בפורט ${PORT}`);
  console.log(`פתח את הדפדפן בכתובת: http://localhost:${PORT}`);
});