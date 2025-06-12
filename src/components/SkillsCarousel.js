let isDragging = false;
let startX;
let scrollLeft;
let animationFrameId;
let velocity = 0;
let lastX;
let lastTime;

const skillsGrid = document.querySelector('.skills-grid');

if (skillsGrid) {
    skillsGrid.addEventListener('mousedown', startDragging);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', stopDragging);

    skillsGrid.addEventListener('touchstart', startDragging);
    window.addEventListener('touchmove', drag);
    window.addEventListener('touchend', stopDragging);

    skillsGrid.addEventListener('contextmenu', (e) => e.preventDefault());
}

function startDragging(e) {
    isDragging = true;
    startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
    scrollLeft = skillsGrid.scrollLeft;
    lastX = startX;
    lastTime = Date.now();

    skillsGrid.classList.add('no-animation');
    skillsGrid.classList.add('dragging');
}

function drag(e) {
    if (!isDragging) return;

    e.preventDefault();
    const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
    const walk = (x - startX) * 2;

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

    const momentumScroll = () => {
        if (Math.abs(velocity) > 0.1) {
            skillsGrid.scrollLeft -= velocity * 16;
            velocity *= 0.95;
            animationFrameId = requestAnimationFrame(momentumScroll);
        } else {
            skillsGrid.classList.remove('no-animation');
            cancelAnimationFrame(animationFrameId);
        }
    };

    momentumScroll();
}