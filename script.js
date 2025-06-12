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

const skills = [
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

document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        skillsSection.innerHTML = '';
        
        const skillsGrid = document.createElement('div');
        skillsGrid.className = 'skills-grid';
        
        skills.forEach((skill) => {
            const skillCard = new SkillCard(skill.icon, skill.title, skill.description).render();
            skillsGrid.appendChild(skillCard);
        });
        
        skillsSection.appendChild(skillsGrid);
    }

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

    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const slider = document.querySelector('.slider');
    const sections = document.querySelectorAll('.section');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionName = btn.dataset.section;
            const targetSection = document.querySelector(`.section.${sectionName}`);
            const currentSection = document.querySelector('.section.active');

            if (currentSection === targetSection) return;

            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            slider.className = 'slider';
            if (sectionName === 'leadership') {
                slider.classList.add('leadership');
            } else if (sectionName === 'projects') {
                slider.classList.add('projects');
            }

            if (currentSection) {
                currentSection.style.opacity = '0';
                currentSection.style.transform = 'translateY(20px)';
            }

            setTimeout(() => {
                sections.forEach(s => s.classList.remove('active'));
                targetSection.classList.add('active');
                
                void targetSection.offsetWidth;
                
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
            }, 300);
        });
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            e.target.style.transform = 'translateY(-2px)';
        });
        link.addEventListener('mouseleave', (e) => {
            e.target.style.transform = 'translateY(0)';
        });
    });

    const loader = document.querySelector('.loader-container');
    if (loader) {
        document.body.style.overflow = 'hidden';
        
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

document.addEventListener('DOMContentLoaded', function() {
    const emailIcon = document.getElementById('email-icon');
    const calendarIcon = document.getElementById('calendar-icon');
    const toastNotification = document.getElementById('toast-notification');
    
    const toastContent = toastNotification.innerHTML;
    toastNotification.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        ${toastContent}
    `;
    
    function showDynamicIslandToast(message) {
        if (message) {
            toastNotification.querySelector('span').textContent = message;
        }
        
        toastNotification.classList.add('show');
        
        setTimeout(() => {
            toastNotification.classList.remove('show');
        }, 3000);
    }
    
    emailIcon.addEventListener('click', function(e) {
        e.preventDefault();
        const email = "contact@jzheng.dev";
        navigator.clipboard.writeText(email).then(function() {
            showDynamicIslandToast("Email copied to clipboard!");
        }).catch(function(err) {
            console.error('Could not copy email: ', err);
            showDynamicIslandToast("Failed to copy email");
        });
    });
    
    calendarIcon.addEventListener('click', function(e) {
        e.preventDefault();
        Calendly.initPopupWidget({
            url: 'https://calendly.com/uberfoots/20?hide_gdpr_banner=1'
        });
        showDynamicIslandToast("Opening calendar...");
    });

});