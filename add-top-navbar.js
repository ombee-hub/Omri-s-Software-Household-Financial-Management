/**
 * add-icons-navbar.js
 * סקריפט להוספת תפריט אייקונים לכל הדפים
 * 
 * מה הסקריפט הזה עושה:
 * 1. יוצר קובץ CSS לתפריט האייקונים
 * 2. יוצר קובץ JavaScript שמוסיף את התפריט
 * 3. מעדכן את כל דפי ה-HTML כדי לכלול את הקבצים החדשים
 * 4. מוסיף div עם מחלקה app-container אם חסר
 * 
 * אופן השימוש:
 * 1. שמור את הקובץ בתיקיית הפרויקט
 * 2. הרץ בטרמינל: node add-icons-navbar.js
 */

const fs = require('fs');
const path = require('path');

console.log('=== מתחיל הוספת תפריט אייקונים לכל הדפים ===');

// תוכן קובץ CSS לתפריט האייקונים
const navIconsCss = `/* nav-icons.css - סגנון לתפריט אייקונים */

.top-icons-navbar {
    display: flex;
    justify-content: center;
    background-color: white;
    border-bottom: 1px solid #e0e0e0;
    padding: 10px 0;
    margin-bottom: 20px;
}

.top-icons-container {
    display: flex;
    justify-content: center;
    gap: 25px;
    max-width: 600px;
    margin: 0 auto;
}

.icon-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #333;
    padding: 5px 10px;
    border-radius: 5px;
}

.icon-link.active {
    color: #0d6efd;
}

.icon-link:hover:not(.active) {
    background-color: #f8f9fa;
}

.nav-icon {
    font-size: 1.5rem;
    margin-bottom: 5px;
}

.icon-img {
    width: 24px;
    height: 24px;
    margin-bottom: 5px;
}

.icon-label {
    font-size: 0.85rem;
    text-align: center;
}

/* מותאם למכשירים ניידים */
@media (max-width: 600px) {
    .top-icons-container {
        gap: 10px;
    }
    
    .icon-label {
        font-size: 0.7rem;
    }
}`;

// תוכן קובץ JavaScript לתפריט האייקונים
const navIconsJs = `// nav-icons.js - סקריפט לתפריט אייקונים

document.addEventListener('DOMContentLoaded', function() {
    // הגדרת הקישורים והאייקונים
    const navLinks = [
        { href: 'dashboard.html', icon: '📊', label: 'דאשבורד' },
        { href: 'status.html', icon: '🔄', label: 'סטטוס עריכה' },
        { href: 'index.html', icon: '📝', label: 'יומן משימות' },
        { href: 'details.html', icon: '📋', label: 'פירוט קלטות' },
        { href: 'gallery.html', icon: '🖼️', label: 'גלריה' }
    ];
    
    // יצירת תפריט האייקונים
    function createIconsNavbar() {
        // בדיקה אם התפריט כבר קיים
        if (document.querySelector('.top-icons-navbar')) {
            return;
        }
        
        // איתור אלמנט המכיל (יצירה אם לא קיים)
        let appContainer = document.querySelector('.app-container');
        if (!appContainer) {
            // חיפוש body ועטיפת התוכן ב-app-container
            const body = document.body;
            appContainer = document.createElement('div');
            appContainer.className = 'app-container';
            
            // העברת כל התוכן לתוך המכיל
            while (body.firstChild) {
                appContainer.appendChild(body.firstChild);
            }
            
            body.appendChild(appContainer);
        }
        
        // יצירת אלמנט התפריט
        const navbar = document.createElement('div');
        navbar.className = 'top-icons-navbar';
        
        const iconContainer = document.createElement('div');
        iconContainer.className = 'top-icons-container';
        
        // מציאת הדף הנוכחי
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'dashboard.html';
        
        // יצירת כל הקישורים
        navLinks.forEach(link => {
            const iconLink = document.createElement('a');
            iconLink.href = link.href;
            iconLink.className = 'icon-link';
            
            // הוספת סימון active אם זה הדף הנוכחי
            if (currentPage === link.href) {
                iconLink.classList.add('active');
            }
            
            // אייקון
            const iconSpan = document.createElement('span');
            iconSpan.className = 'nav-icon';
            iconSpan.textContent = link.icon;
            
            // תווית
            const labelSpan = document.createElement('span');
            labelSpan.className = 'icon-label';
            labelSpan.textContent = link.label;
            
            // הוספת האלמנטים לקישור
            iconLink.appendChild(iconSpan);
            iconLink.appendChild(labelSpan);
            
            // הוספת הקישור למכיל
            iconContainer.appendChild(iconLink);
        });
        
        // הוספת מכיל האייקונים לתפריט
        navbar.appendChild(iconContainer);
        
        // הוספת התפריט לדף (בתחילת המכיל הראשי)
        if (appContainer.firstChild) {
            appContainer.insertBefore(navbar, appContainer.firstChild);
        } else {
            appContainer.appendChild(navbar);
        }
    }
    
    // הפעלת היצירה של תפריט האייקונים
    createIconsNavbar();
});`;

// יצירת הקבצים
try {
    fs.writeFileSync('nav-icons.css', navIconsCss);
    console.log('✅ נוצר קובץ nav-icons.css');
    
    fs.writeFileSync('nav-icons.js', navIconsJs);
    console.log('✅ נוצר קובץ nav-icons.js');
} catch (err) {
    console.error('❌ שגיאה ביצירת קבצי תפריט האייקונים:', err);
    process.exit(1);
}

// רשימת הדפים לעדכון
const htmlFiles = [
    'dashboard.html',
    'status.html',
    'index.html',
    'details.html',
    'gallery.html',
    'login.html'
];

// בדיקה אם קיים Edit Status.html (למקרה שלא עודכן)
if (fs.existsSync('Edit Status.html')) {
    htmlFiles.push('Edit Status.html');
}

// עדכון כל הקבצים
let updatedCount = 0;

htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`⏩ דילוג על ${file} (הקובץ לא קיים)`);
        return;
    }

    try {
        let content = fs.readFileSync(file, 'utf8');
        let wasUpdated = false;
        
        // הוספת קישור לקובץ CSS
        if (!content.includes('nav-icons.css')) {
            const headEndPos = content.indexOf('</head>');
            if (headEndPos === -1) {
                console.error(`❌ לא נמצאה תגית </head> בקובץ ${file}`);
            } else {
                // הוספת תגית link
                content = content.slice(0, headEndPos) + 
                    '\n    <link rel="stylesheet" href="nav-icons.css">\n' + 
                    content.slice(headEndPos);
                wasUpdated = true;
                console.log(`✅ הוספת קישור ל-nav-icons.css בקובץ ${file}`);
            }
        }
        
        // הוספת קישור לקובץ JavaScript
        if (!content.includes('nav-icons.js')) {
            const headEndPos = content.indexOf('</head>');
            if (headEndPos === -1) {
                console.error(`❌ לא נמצאה תגית </head> בקובץ ${file}`);
            } else {
                // הוספת תגית script
                content = content.slice(0, headEndPos) + 
                    '\n    <script src="nav-icons.js" defer></script>\n' + 
                    content.slice(headEndPos);
                wasUpdated = true;
                console.log(`✅ הוספת קישור ל-nav-icons.js בקובץ ${file}`);
            }
        }
        
        // בדיקה אם יש את מחלקת app-container
        if (!content.includes('class="app-container"')) {
            // נמצא את תגית body ומוסיף מחלקה
            const bodyStartPos = content.indexOf('<body');
            const bodyEndPos = content.indexOf('>', bodyStartPos);
            
            if (bodyStartPos !== -1 && bodyEndPos !== -1) {
                // מחפש אם יש מחלקה קיימת
                const bodyTag = content.substring(bodyStartPos, bodyEndPos + 1);
                
                if (bodyTag.includes('class="')) {
                    // יש מחלקה קיימת, מוסיף app-container
                    const classPos = bodyTag.indexOf('class="');
                    const classEndPos = bodyTag.indexOf('"', classPos + 7);
                    
                    if (classPos !== -1 && classEndPos !== -1) {
                        const newBodyTag = bodyTag.slice(0, classEndPos) + ' app-container' + bodyTag.slice(classEndPos);
                        content = content.slice(0, bodyStartPos) + newBodyTag + content.slice(bodyEndPos + 1);
                        wasUpdated = true;
                        console.log(`✅ הוספת מחלקת app-container לתגית body בקובץ ${file}`);
                    }
                } else {
                    // אין מחלקה, מוסיף חדשה
                    const newBodyTag = bodyTag.slice(0, bodyEndPos) + ' class="app-container"' + bodyTag.slice(bodyEndPos);
                    content = content.slice(0, bodyStartPos) + newBodyTag + content.slice(bodyEndPos + 1);
                    wasUpdated = true;
                    console.log(`✅ הוספת מחלקת app-container לתגית body בקובץ ${file}`);
                }
            } else {
                console.error(`❌ לא נמצאה תגית body בקובץ ${file}`);
            }
        }
        
        // שמירת הקובץ המעודכן אם בוצעו שינויים
        if (wasUpdated) {
            fs.writeFileSync(file, content, 'utf8');
            updatedCount++;
            console.log(`✅ עודכן ${file}`);
        } else {
            console.log(`⏩ דילוג על ${file} (לא נדרשו שינויים)`);
        }
        
    } catch (err) {
        console.error(`❌ שגיאה בעדכון ${file}:`, err);
    }
});

// סיכום
console.log('\n=== סיכום הוספת תפריט אייקונים ===');
console.log(`✅ נוצרו הקבצים nav-icons.css ו-nav-icons.js`);
console.log(`✅ עודכנו ${updatedCount} מתוך ${htmlFiles.length} קבצים`);
console.log('\n✅ הסקריפט סיים לרוץ. הפעל את השרת מחדש ובדוק שתפריט האייקונים מופיע בכל הדפים.');
console.log('\nפקודה להפעלת השרת: node server.js');