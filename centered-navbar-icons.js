// nav-icons.js - סקריפט לתפריט אייקונים

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
});