// navigation.js - קובץ לניהול תפריט הניווט בכל הדפים
// גרסה סופית - מציג רק את התפריט המבוקש

// פונקציה ליצירת תפריט ניווט קבוע
function createFixedNavigation() {
    // איתור אלמנט תפריט הניווט
    const navLinksContainer = document.querySelector('.nav-links');
    if (!navLinksContainer) {
        console.error('תפריט הניווט לא נמצא בדף');
        return;
    }

    // מחיקת כל הקישורים הקיימים
    navLinksContainer.innerHTML = '';
    
    // יצירת התפריט הקבוע המבוקש
    const links = [
        { href: 'gallery.html', text: 'גלריה', active: window.location.pathname.includes('gallery.html') },
        { href: 'details.html', text: 'פירוט קלטות', active: window.location.pathname.includes('details.html') },
        { href: 'index.html', text: 'יומן משימות', active: window.location.pathname.includes('index.html') },
        { href: 'status.html', text: 'סטטוס עריכה', active: window.location.pathname.includes('status.html') },
        { href: 'dashboard.html', text: 'דאשבורד', active: window.location.pathname.includes('dashboard.html') }
    ];
    
    // הוספת הקישורים לתפריט בסדר הרצוי
    links.forEach(link => {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.text;
        
        // הוספת סימון active אם זה הדף הנוכחי
        if (link.active) {
            newLink.classList.add('active');
        }
        
        navLinksContainer.appendChild(newLink);
    });

<a href="status.html" class="nav-link active">סטטוס עריכה</a>
}

// הפעלת הפונקציה כשהדף נטען
document.addEventListener('DOMContentLoaded', function() {
    createFixedNavigation();
});