// Simple SkillCard class implementation
class SkillCard {
    constructor(icon, title, description) {
        this.icon = icon;
        this.title = title;
        this.description = description;
    }

    render() {
        const div = document.createElement('div');
        div.className = 'skill-card';
        div.innerHTML = `
            <img src="${this.icon}" alt="${this.title}" class="skill-icon">
            <div class="skill-content">
                <h3>${this.title}</h3>
                <p>${this.description}</p>
            </div>
        `;
        return div;
    }
}

// Skills data
const skills = [
    // Programming Languages
    {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
        title: 'C++',
        description: 'Programming Language'
    },
    {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        title: 'JavaScript',
        description: 'Programming Language'
    },
    {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        title: 'TypeScript',
        description: 'JavaScript but better'
    },
    {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        title: 'Python',
        description: 'Programming Language'
    },
    // Web Technologies
    {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        title: 'HTML',
        description: 'Markup Language'
    },
    {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        title: 'CSS',
        description: 'Styling Language'
    },
    {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        title: 'React',
        description: 'JavaScript Library'
    },
    {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
        title: 'NextJS',
        description: 'React Framework'
    },
    // Development Tools
    {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
        title: 'Git',
        description: 'Version Control'
    },
    {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
        title: 'Tailwind',
        description: 'CSS Framework'
    },
    {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
        title: 'Figma',
        description: 'Design Tool'
    },
    {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
        title: 'Vite',
        description: 'Build Tool'
    }
];

// Render skills (simplified without animations)
document.addEventListener('DOMContentLoaded', () => {
    // Render skills
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        skills.forEach(skill => {
            const skillCard = new SkillCard(skill.icon, skill.title, skill.description);
            skillsGrid.appendChild(skillCard.render());
        });
    }

    // Initialize animations
    function initializeAnimations() {
        const elements = [
            '.above-paragraph',
            '.centered-container > p',
            '.toggle-container',
            '.card',
            '.skill-card',
            '.resume-subtitle'
        ];

        elements.forEach((selector, index) => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('fade-in');
                setTimeout(() => {
                    el.classList.add('visible');
                }, 100 * index);
            });
        });
    }

    // Toggle functionality
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const slider = document.querySelector('.slider');
    const sections = document.querySelectorAll('.section');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionName = btn.dataset.section;
            const targetSection = document.querySelector(`.section.${sectionName}`);
            const currentSection = document.querySelector('.section.active');

            // Don't do anything if clicking the active section
            if (currentSection === targetSection) return;

            // Update buttons
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Fade out current section
            if (currentSection) {
                currentSection.style.opacity = '0';
                currentSection.style.transform = 'translateY(20px)';
            }

            // After fade out, switch sections
            setTimeout(() => {
                sections.forEach(s => s.classList.remove('active'));
                targetSection.classList.add('active');
                
                // Force a reflow to ensure the animation triggers
                void targetSection.offsetWidth;
                
                // Fade in new section
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
            }, 300);

            // Move slider with easing
            slider.classList.toggle('personal', sectionName === 'personal');
        });
    });

    // Add hover effect for nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            e.target.style.transform = 'translateY(-2px)';
        });
        link.addEventListener('mouseleave', (e) => {
            e.target.style.transform = 'translateY(0)';
        });
    });

    // Use the existing loader in HTML instead of creating a new one
    const loader = document.querySelector('.loader-container');
    if (loader) {
        document.body.style.overflow = 'hidden';
        
        // Remove loader after delay
        setTimeout(() => {
            loader.style.opacity = '0';
            document.body.style.overflow = '';
            setTimeout(() => {
                loader.remove();
                initializeAnimations();
            }, 500);
        }, 2000);
    }
});