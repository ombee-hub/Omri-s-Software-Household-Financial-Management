# הוראות לתיקון בעיית הקישורים הנעלמים

## הבעיה:
הדאשבורד והגלריה נעלמים מתפריט הניווט כאשר עוברים בין דפים שונים באתר.

## הפתרון:
נוסיף קובץ JavaScript משותף שיוודא שכל הקישורים הדרושים תמיד מופיעים בתפריט, בכל דף.

## שלבי הביצוע:

### 1. יצירת קובץ navigation.js

צור קובץ חדש בשם `navigation.js` בתיקיית הפרויקט (day) והעתק לתוכו את הקוד שסיפקתי. קובץ זה ייבדוק וייתקן את תפריט הניווט בכל דף.

### 2. הוספת הסקריפט לכל הדפים

יש להוסיף הפניה לקובץ navigation.js בכל אחד מדפי ה-HTML:

1. **פתח כל אחד מהקבצים הבאים**:
   - dashboard.html
   - status.html
   - index.html
   - details.html
   - gallery.html
   - login.html (אופציונלי, מכיוון שאין בו תפריט ניווט)

2. **הוסף את השורה הבאה** לפני תגית הסגירה `</head>` בכל אחד מהקבצים:
   ```html
   <script src="navigation.js" defer></script>
   ```

### לדוגמה, בדף dashboard.html:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>מערכת ניהול קלטות - דאשבורד</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎥</text></svg>">
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        /* סגנונות CSS */
    </style>
    <!-- הוסף את השורה הבאה: -->
    <script src="navigation.js" defer></script>
</head>
```

### 3. ודא שמבנה תפריט הניווט זהה בכל הדפים

חשוב שבכל הדפים, תפריט הניווט יהיה עם אותה מחלקה:
```html
<div class="nav-links">
    <!-- כאן יופיעו הקישורים -->
</div>
```

## בדיקת התיקון:

1. שמור את כל השינויים
2. רענן את השרת אם צריך
3. גש לדף כלשהו באתר
4. נווט בין הדפים השונים ובדוק שהקישורים לדאשבורד ולגלריה נשארים בתפריט

## פתרון בעיות נפוצות:

1. **הקוד לא עובד?** - פתח את קונסולת הדפדפן (F12) ובדוק אם יש הודעות שגיאה

2. **קישורים עדיין נעלמים?** - ודא שהוספת את קובץ navigation.js לכל הדפים, ושהוא נטען כראוי

3. **תפריט כפול או משובש?** - ודא שמבנה ה-HTML של תפריט הניווט זהה בכל הדפים
