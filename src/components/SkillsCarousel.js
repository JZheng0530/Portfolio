let isDragging = false;
let startX;
let scrollLeft;
let animationFrameId;
let velocity = 0;
let lastX;
let lastTime;

const skillsGrid = document.querySelector('.skills-grid');

if (skillsGrid) {
    // Mouse events
    skillsGrid.addEventListener('mousedown', startDragging);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', stopDragging);

    // Touch events
    skillsGrid.addEventListener('touchstart', startDragging);
    window.addEventListener('touchmove', drag);
    window.addEventListener('touchend', stopDragging);

    // Prevent context menu on right click
    skillsGrid.addEventListener('contextmenu', (e) => e.preventDefault());
}

function startDragging(e) {
    isDragging = true;
    startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
    scrollLeft = skillsGrid.scrollLeft;
    lastX = startX;
    lastTime = Date.now();

    // Stop the default animation
    skillsGrid.classList.add('no-animation');
    skillsGrid.classList.add('dragging');
}

function drag(e) {
    if (!isDragging) return;

    e.preventDefault();
    const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
    const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling

    // Calculate velocity
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastTime;
    velocity = (x - lastX) / timeElapsed;

    lastX = x;
    lastTime = currentTime;

    skillsGrid.scrollLeft = scrollLeft - walk;
}

function stopDragging() {
    if (!isDragging) return;
    isDragging = false;

    skillsGrid.classList.remove('dragging');

    // Apply momentum scrolling
    const momentumScroll = () => {
        if (Math.abs(velocity) > 0.1) {
            skillsGrid.scrollLeft -= velocity * 16; // 16ms is roughly one frame at 60fps
            velocity *= 0.95; // Decay factor
            animationFrameId = requestAnimationFrame(momentumScroll);
        } else {
            skillsGrid.classList.remove('no-animation');
            cancelAnimationFrame(animationFrameId);
        }
    };

    momentumScroll();
}