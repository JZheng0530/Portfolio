/**
 * Cursor Effect with Trail
 * Creates a smooth cursor movement with a faint trail effect
 */

document.addEventListener('DOMContentLoaded', () => {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Create trail elements
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
    
    // Variables for smooth movement
    let cursorX = 0;
    let cursorY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });
    
    // Animation loop for smooth cursor movement
    function animateCursor() {
        // Calculate smooth movement with easing
        const easing = 0.2;
        currentX += (cursorX - currentX) * easing;
        currentY += (cursorY - currentY) * easing;
        
        // Update main cursor position
        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;
        
        // Update trail positions with delay
        for (let i = 0; i < trails.length; i++) {
            const trail = trails[i];
            
            // Save current position
            const prevX = trail.x;
            const prevY = trail.y;
            
            // Calculate new position based on previous trail or cursor
            if (i === 0) {
                trail.x += (currentX - trail.x) * (easing - 0.05);
                trail.y += (currentY - trail.y) * (easing - 0.05);
            } else {
                trail.x += (trails[i-1].x - trail.x) * (easing - 0.05);
                trail.y += (trails[i-1].y - trail.y) * (easing - 0.05);
            }
            
            // Update trail element position
            trail.element.style.left = `${trail.x}px`;
            trail.element.style.top = `${trail.y}px`;
        }
        
        requestAnimationFrame(animateCursor);
    }
    
    // Start animation
    animateCursor();
    
    // Hide default cursor when over the document
    document.body.style.cursor = 'none';
    
    // Show default cursor when leaving the window
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
        trails.forEach(trail => {
            trail.element.style.display = 'none';
        });
        document.body.style.cursor = 'auto';
    });
    
    // Show custom cursor when entering the window
    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
        trails.forEach(trail => {
            trail.element.style.display = 'block';
        });
        document.body.style.cursor = 'none';
    });
});