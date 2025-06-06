/**
 * Timeline Implementation
 * This file demonstrates how to integrate the Timeline component
 * into the existing portfolio website.
 */

import Timeline from './components/Timeline.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the timeline component
    const timeline = new Timeline();
    
    // Wait for the loader to finish
    const loader = document.querySelector('.loader-container');
    if (loader) {
        document.body.style.overflow = 'hidden';
        
        // Remove loader after delay
        setTimeout(() => {
            loader.style.opacity = '0';
            document.body.style.overflow = '';
            setTimeout(() => {
                loader.remove();
                
                // Initialize timelines directly
                initializeTimelines(timeline);
                
                // Initialize other animations
                initializeAnimations();
            }, 500);
        }, 2000);
    } else {
        // If no loader, initialize immediately
        initializeTimelines(timeline);
        initializeAnimations();
    }
    
    // Set up section toggle functionality
    setupSectionToggles();
});

/**
 * Initialize timelines for all sections by directly creating them from data
 * @param {Timeline} timeline - Timeline instance
 */
function initializeTimelines(timeline) {
    // Create timelines directly from experience data
    createTimelineForSection(timeline, '.section.professional .resume-section', professionalExperiences);
    createTimelineForSection(timeline, '.section.leadership .resume-section', leadershipExperiences);
    createTimelineForSection(timeline, '.section.projects .resume-section', projectExperiences);
}

/**
 * Create a timeline for a section using provided data
 * @param {Timeline} timeline - Timeline instance
 * @param {string} selectorPath - Selector for the section
 * @param {Array} experiences - Array of experience data
 */
function createTimelineForSection(timeline, selectorPath, experiences) {
    const section = document.querySelector(selectorPath);
    if (section) {
        const container = section.querySelector('.resume-cards');
        if (container) {
            // Create the timeline directly
            timeline.createTimeline(experiences, container);
            
            // Make the timeline visible
            container.style.opacity = '1';
            container.style.transition = 'opacity 0.5s ease-in-out';
        }
    }
}

/**
 * Initialize fade-in animations for elements
 */
function initializeAnimations() {
    const elements = [
        '.above-paragraph',
        '.centered-container > p',
        '.toggle-container',
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

/**
 * Set up section toggle functionality
 */
function setupSectionToggles() {
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

            // Update slider position
            slider.className = 'slider';
            if (sectionName === 'leadership') {
                slider.classList.add('leadership');
            } else if (sectionName === 'projects') {
                slider.classList.add('projects');
            }

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
                
                // Re-initialize timeline animations for the newly visible section
                const timelineItems = targetSection.querySelectorAll('.timeline-item');
                timelineItems.forEach(item => {
                    // Reset animation state
                    item.classList.remove('visible');
                    
                    // Force reflow
                    void item.offsetWidth;
                    
                    // Trigger animation after a small delay
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 300);
                });
            }, 300);
        });
    });
}

// Experience data for direct timeline creation
const professionalExperiences = [
    {
        title: "Automation Engineer Intern",
        organization: "Kapitus",
        date: "Jun '25 — Present",
        description: "- Payment Systems & Process Documentation.",
        tags: []
    },
    {
        title: "Research & Product Support Intern",
        organization: "Kapitus",
        date: "Mar '25 — May '25",
        description: "- Updated 40+ Tableau dashboards for Financial Data & Treasury Operation teams for improved visibility.<br>- Enhanced a database by integrating previously missing contract transactions through Python web scraping, successfully flagging over 40+ contracts for review.",
        tags: []
    },
    {
        title: "Senior Outreach Specialist",
        organization: "Legion Outreach Consulting (Formerly Meridian Strategies)",
        date: "Sep '22 — Present",
        description: "- Spearheaded door-to-door & virtual outreach efforts for 15+ campaigns, achieving over a 72% win rate for positions for councilmembers, assemblymembers, presidential candidates, to nonprofit organizations.",
        tags: []
    }
];

const leadershipExperiences = [
    {
        title: "Spark Program",
        organization: "Discover",
        date: "May '25 — May '25",
        description: "Explored career paths and honed case study skills as one of 60 students selected from 44+ universities.",
        tags: []
    },
    {
        title: "Accelerate Program",
        organization: "Nomura",
        date: "Mar '25 — Apr '25",
        description: "Learned more about Information Technology, Entrepreneurship, & Financial Management.",
        tags: []
    },
    {
        title: "Early Insights Program",
        organization: "HSBC",
        date: "Mar '25 — Apr '25",
        description: "Learned more about Information Technology, Entrepreneurship, & Financial Management.",
        tags: []
    },
    {
        title: "Fellow",
        organization: "L'Oréal",
        date: "Dec '24 — Present",
        description: "1 out of 50 fellows invited for leadership development classes & personalized 1:1 mentorship nationwide.",
        tags: []
    },
    {
        title: "Lead Organizer",
        organization: "HackCUNY",
        date: "Sep '24 — Present",
        description: "Leading logistics & engineering team of 20+ organizers to plan and execute a seasonal hackathon.",
        tags: []
    },
    {
        title: "Student Advisory Board",
        organization: "CUNY Startups",
        date: "Jul '24 — May '25",
        description: "Volunteer",
        tags: []
    },
    {
        title: "Youth Action Board",
        organization: "AAARI",
        date: "Aug '24 — Present",
        description: "Identified key areas for improvement in representation and inclusivity for NYCDOE.",
        tags: []
    },
    {
        title: "PJT Partners Freshman Bridge Program",
        organization: "PJT Partners",
        date: "Feb '23 — May '23",
        description: "Prestigious 4 month course in understanding key financial concepts within corporate banking.",
        tags: []
    },
    {
        title: "Volunteer",
        organization: "Coastal Preservation Network",
        date: "Jun '21 — Present",
        description: "- Participating in coastal cleanup events, removing litter and debris to local beaches and shorelines.",
        tags: []
    },
    {
        title: "Student Volunteer",
        organization: "Queens Botanical Garden",
        date: "Jan '20 — Apr '20",
        description: "",
        tags: []
    }
];

const projectExperiences = [
    {
        title: "Scoop.me",
        link: "https://www.linkedin.com/posts/john-zheng-nyc_hackknight-codingforgood-hackathon-activity-7262335913500770304-BLrQ?utm_source=share&utm_medium=member_desktop",
        organization: "HackKnight Winner, Queens College",
        date: "Nov '24",
        description: "- Won 2nd place overall for developing Scoop, a progressive web app that enables students to rideshare with fellow Queens College students at a lower cost compared to other competitors.",
        tags: ["TypeScript", "React", "Vite", "Python"]
    },
    {
        title: "Stylete.app",
        link: "https://stylete.app/",
        organization: "HackHarvard, Harvard University",
        date: "Oct '24",
        description: "- Platform for businesses to sell excess fabric waste to creatives.<br>",
        tags: ["HTML", "CSS", "PHP"]
    },
    {
        title: "NeuroTalent.co",
        link: "https://www.neurotalent.co/",
        organization: "Divhacks MLH Track Winner, Columbia University",
        date: "Oct '24",
        description: "- Awarded the MLH Best Use of Auth0 prize for best integrating Auth0 authentication on our platform.<br>- Created a platform where neurodivergent students are exposed to opportunities to connect with employers.",
        tags: ["Next.js", "React", "Tailwind", "MongoDB"]
    },
    {
        title: "Fitsync",
        link: "https://github.com/mike-star01/Fitness-App",
        organization: "",
        date: "Aug '24 — Present",
        description: "- Developing a full-stack web application that measures personal health and fitness goals using CalorieNinja & google vision's API.",
        tags: ["Next.js", "Python"]
    },
    {
        title: "Personal Portfolio",
        link: "https://uberfoots.github.io/Portfolio/",
        organization: "",
        date: "",
        description: "- Developed a quick Personal Portfolio that represents me!<br>- Working on implementing Next.JS and React for those cool UI looks.",
        tags: ["Javascript", "HTML", "CSS"]
    }
];