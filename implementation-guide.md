# הנחיות להטמעת קובץ navigation.js בכל הדפים

## שלב 1: שמירת הקובץ navigation.js

1. שמור את קובץ `navigation.js` בתיקיית `day` שלך.
2. ודא שהקובץ נמצא באותה תיקייה כמו שאר דפי ה-HTML.

## שלב 2: הוספת הקובץ לכל אחד מהדפים

יש להוסיף את השורה הבאה לכל אחד מהדפים: `login.html`, `dashboard.html`, `gallery.html`, `status.html`, `details.html`, ו-`index.html`. הוסף את השורה בסוף תגית ה-`<head>`:

```html
<script src="navigation.js" defer></script>
```

לדוגמה, בדף `dashboard.html` תראה משהו כזה:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>מערכת ניהול קלטות - דאשבורד</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎥</text></svg>">
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        /* סגנונות הדף */
    </style>
    <script src="navigation.js" defer></script>
</head>
```

## שלב 3: הסרת קוד כפול (אופציונלי)

כדי למנוע כפילויות, אפשר להסיר מכל אחד מהדפים את הקוד הבא (שכעת מתבצע בקובץ `navigation.js`):

- בדיקת התחברות (`if (!localStorage.getItem('isLoggedIn'))`)
- מערכת התנתקות אוטומטית (הפונקציות `resetInactivityTimer` ו-`autoLogout`)
- פונקציית התנתקות (`function logout()`)

אם תרצה להשאיר את הקוד הזה, זה בסדר גמור - הקוד ב-`navigation.js` לא יתנגש איתו.

## שלב 4: בדיקה

1. הפעל את השרת שלך עם `node server.js`
2. ודא שאתה יכול להתחבר למערכת דרך `login.html`
3. ודא שאתה יכול לגשת לכל הדפים דרך תפריט הניווט
4. בדוק שהדאשבורד והגלריה נגישים תמיד
5. ודא שכל הדפים מפנים אותך לדף ההתחברות אם אינך מחובר

## פתרון בעיות

אם מתעוררות בעיות:

1. **תפריט הניווט לא מתעדכן**: ודא שבכל דף יש אלמנט עם המחלקה `nav-links`.
2. **הפניה לדף ההתחברות בלופ אינסופי**: בדוק שדף ההתחברות לא מפנה את עצמו בטעות.
3. **שגיאות בקונסול**: פתח את כלי המפתח בדפדפן (F12) ובדוק אם יש שגיאות.
