const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// הגדרת תיקיית הקבצים הסטטיים
app.use(express.static(path.join(__dirname, 'public')));

// הגדרת ניתוב בסיסי
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// התחלת השרת
app.listen(PORT, () => {
  console.log(`השרת פועל בפורט ${PORT}`);
  console.log(`גש לדפדפן בכתובת: http://localhost:${PORT}`);
});