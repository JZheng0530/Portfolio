import { animate } from 'motion';

export class ThemeToggle {
    constructor() {
        this.isDark = true;
        this.init();
    }

    init() {
        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.innerHTML = `
            <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        `;

        document.body.appendChild(toggle);
        this.addEventListeners(toggle);
    }

    addEventListeners(toggle) {
        toggle.addEventListener('click', () => {
            this.isDark = !this.isDark;
            this.toggleTheme(toggle);
        });
    }

    toggleTheme(toggle) {
        const duration = 0.3;
        
        animate(
            toggle,
            { rotate: this.isDark ? 0 : 360 },
            { duration }
        );

        document.body.classList.toggle('light-mode');
        
        if (this.isDark) {
            toggle.classList.remove('light');
        } else {
            toggle.classList.add('light');
        }
    }
}