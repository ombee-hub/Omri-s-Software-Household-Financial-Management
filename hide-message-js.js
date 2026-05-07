/**
 * hideWelcomeMessage.js
 * 
 * קובץ JavaScript להסתרת הודעת ברוכים הבאים במערכת ניהול הקלטות
 * 
 * אופן השימוש:
 * 1. הוסף את הקובץ הזה לפרויקט
 * 2. כלול אותו בדף HTML באמצעות תג script
 *    <script src="path/to/hideWelcomeMessage.js"></script>
 */

(function() {
    // פונקציה שרצה כאשר המסמך נטען
    function hideWelcomeMessage() {
        // הסתרת הודעת ברוכים הבאים בכמה דרכים שונות
        
        // אופציה 1: הסתרה באמצעות חיפוש טקסט
        const allElements = document.querySelectorAll('h1, h2, h3, p, div');
        allElements.forEach(element => {
            if (element.innerText && element.innerText.includes('ברוכים הבאים למערכת ניהול הקלטות')) {
                // מצא את האלמנט המכיל (container) שמהווה את כל תיבת ההודעה
                let container = element;
                // עלה עד 4 רמות כדי למצוא את המכיל העיקרי
                for (let i = 0; i < 4; i++) {
                    if (container.parentElement && container.tagName !== 'BODY') {
                        container = container.parentElement;
                        // אם מצאנו קופסה כחולה או אלמנט עם גבול
                        if (container.classList.contains('blue-box') || 
                            container.classList.contains('welcome-box') ||
                            window.getComputedStyle(container).borderColor.includes('rgb(0, 0, 255)')) {
                            break;
                        }
                    }
                }
                // הסתר את המכיל
                container.style.display = 'none';
            }
        });
        
        // אופציה 2: הסתרה באמצעות סלקטורים ספציפיים
        const specificSelectors = [
            '.welcome-message',
            '.blue-box',
            '.welcome-box',
            '.intro-message',
            '[class*="welcome"]',
            '[class*="intro-box"]',
            '.announcement'
        ];
        
        specificSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => el.style.display = 'none');
        });
        
        // אופציה 3: הסתרת אלמנטים שנמצאים מעל התפריט
        const mainMenu = document.querySelector('nav, .nav, [class*="nav-"], [class*="menu"]');
        if (mainMenu) {
            const menuPosition = mainMenu.getBoundingClientRect().top;
            const possibleWelcomeBoxes = document.querySelectorAll('div');
            
            possibleWelcomeBoxes.forEach(div => {
                if (div.getBoundingClientRect().bottom <= menuPosition && 
                    div.offsetHeight > 20 && // רק אלמנטים בגודל סביר
                    !div.classList.contains('header') && // לא להסתיר את הכותרת הראשית
                    !div.querySelector('button[class*="login"], button[class*="logout"]')) { // לא להסתיר אזור התחברות
                    div.style.display = 'none';
                }
            });
        }
        
        // אופציה 4: הוספת סגנון CSS ישירות למסמך
        const style = document.createElement('style');
        style.textContent = `
            /* הסתרת הודעת ברוכים הבאים */
            div:has(> h2:contains("ברוכים הבאים למערכת")),
            [class*="welcome-box"],
            [class*="intro-box"],
            [class*="blue-box"],
            div.blue-box, 
            div.welcome-box {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    // הפעל את הפונקציה כאשר המסמך נטען
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideWelcomeMessage);
    } else {
        // אם המסמך כבר נטען
        hideWelcomeMessage();
    }
    
    // הפעל שוב אחרי חצי שנייה למקרה שהמערכת טוענת את ההודעה באיחור
    setTimeout(hideWelcomeMessage, 500);
})();
