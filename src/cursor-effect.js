document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const trailCount = 5;
    const trails = [];
    
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = 1 - (i / trailCount);
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0
        });
    }
    
    let cursorX = 0;
    let cursorY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });
    
    function animateCursor() {
        const easing = 0.2;
        currentX += (cursorX - currentX) * easing;
        currentY += (cursorY - currentY) * easing;
        
        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;
        
        for (let i = 0; i < trails.length; i++) {
            const trail = trails[i];
            
            const prevX = trail.x;
            const prevY = trail.y;
            
            if (i === 0) {
                trail.x += (currentX - trail.x) * (easing - 0.05);
                trail.y += (currentY - trail.y) * (easing - 0.05);
            } else {
                trail.x += (trails[i-1].x - trail.x) * (easing - 0.05);
                trail.y += (trails[i-1].y - trail.y) * (easing - 0.05);
            }
            
            trail.element.style.left = `${trail.x}px`;
            trail.element.style.top = `${trail.y}px`;
        }
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    document.body.style.cursor = 'none';
    
    const clickableElements = document.querySelectorAll('a, button, .toggle-btn, .nav-links a');
    
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.opacity = '0';
            cursor.style.visibility = 'hidden';
            trails.forEach(trail => {
                trail.element.style.opacity = '0';
                trail.element.style.visibility = 'hidden';
            });
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.opacity = '1';
            cursor.style.visibility = 'visible';
            trails.forEach((trail, index) => {
                trail.element.style.opacity = 1 - (index / trailCount);
                trail.element.style.visibility = 'visible';
            });
        });
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
        trails.forEach(trail => {
            trail.element.style.display = 'none';
        });
        document.body.style.cursor = 'auto';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
        trails.forEach(trail => {
            trail.element.style.display = 'block';
        });
        document.body.style.cursor = 'none';
    });
    
    const observer = new MutationObserver(() => {
        const newClickableElements = document.querySelectorAll('a, button, .toggle-btn, .nav-links a');
        
        newClickableElements.forEach(element => {
            if (!element.hasMouseEnterListener) {
                element.hasMouseEnterListener = true;
                
                element.addEventListener('mouseenter', () => {
                    cursor.style.opacity = '0';
                    cursor.style.visibility = 'hidden';
                    trails.forEach(trail => {
                        trail.element.style.opacity = '0';
                        trail.element.style.visibility = 'hidden';
                    });
                });
                
                element.addEventListener('mouseleave', () => {
                    cursor.style.opacity = '1';
                    cursor.style.visibility = 'visible';
                    trails.forEach((trail, index) => {
                        trail.element.style.opacity = 1 - (index / trailCount);
                        trail.element.style.visibility = 'visible';
                    });
                });
            }
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
});