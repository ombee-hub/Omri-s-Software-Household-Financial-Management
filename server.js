// התוכנה של עמרי - שרת מקומי פשוט להגשת קבצים סטטיים
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// הגשת כל הקבצים מהתיקייה הנוכחית
app.use(express.static(__dirname));

// דף ברירת מחדל - דאשבורד
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log('=========================================');
    console.log(`התוכנה של עמרי - שרת פועל בפורט ${PORT}`);
    console.log(`פתח את הדפדפן בכתובת: http://localhost:${PORT}`);
    console.log('=========================================');
    console.log('כדי לעצור את השרת: Ctrl+C');
});
