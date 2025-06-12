class Timeline {
    constructor() {
        this.timelineItems = [];
        this.observer = null;
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        this.timelineItems = document.querySelectorAll('.timeline-item');
        this.timelineItems.forEach(item => {
            this.observer.observe(item);
        });
    }

    createTimeline(experiences, container) {
        container.innerHTML = '';

        const timelineContainer = document.createElement('div');
        timelineContainer.className = 'timeline-container';

        const timelineLine = document.createElement('div');
        timelineLine.className = 'timeline-line';
        timelineContainer.appendChild(timelineLine);

        let currentYear = null;

        experiences.forEach((exp, index) => {
            const dateMatch = exp.date.match(/'(\d{2})/);
            const year = dateMatch ? `20${dateMatch[1]}` : null;

            if (year && year !== currentYear) {
                const yearMarker = document.createElement('div');
                yearMarker.className = 'timeline-year-marker';
                yearMarker.innerHTML = `<span>${year}</span>`;
                timelineContainer.appendChild(yearMarker);
                currentYear = year;
            }

            const timelineItem = document.createElement('div');
            timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;

            const timelineDot = document.createElement('div');
            timelineDot.className = 'timeline-dot';
            timelineItem.appendChild(timelineDot);

            const timelineContent = document.createElement('div');
            timelineContent.className = 'timeline-content';

            const timelineHeader = document.createElement('div');
            timelineHeader.className = 'timeline-header';

            const titleElement = document.createElement('h3');
            if (exp.link) {
                titleElement.innerHTML = `<a href="${exp.link}" target="_blank">${exp.title}</a>`;
            } else {
                titleElement.textContent = exp.title;
            }
            timelineHeader.appendChild(titleElement);

            const dateElement = document.createElement('p');
            dateElement.textContent = exp.organization ? `${exp.organization} | ${exp.date}` : exp.date;
            timelineHeader.appendChild(dateElement);

            timelineContent.appendChild(timelineHeader);

            // Create body
            const timelineBody = document.createElement('div');
            timelineBody.className = 'timeline-body';
            timelineBody.innerHTML = exp.description;
            timelineContent.appendChild(timelineBody);

            // Add tags if they exist
            if (exp.tags && exp.tags.length > 0) {
                const tagsContainer = document.createElement('div');
                tagsContainer.className = 'card-tags';

                exp.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.textContent = tag;
                    tagsContainer.appendChild(tagSpan);
                });

                timelineContent.appendChild(tagsContainer);
            }

            timelineItem.appendChild(timelineContent);
            timelineContainer.appendChild(timelineItem);
        });

        // Append the timeline to the container
        container.appendChild(timelineContainer);

        // Initialize animations
        this.init();
    }

    /**
     * Extract experience data from existing cards
     * @param {NodeList} cards - NodeList of card elements
     * @returns {Array} Array of experience objects
     */
    extractExperiencesFromCards(cards) {
        const experiences = [];

        cards.forEach(card => {
            const header = card.querySelector('.card-header');
            const body = card.querySelector('.card-body');
            const tags = card.querySelectorAll('.card-tags span');

            // Extract title, possibly with link
            const titleElement = header.querySelector('h3');
            let title = '';
            let link = null;

            const linkElement = titleElement.querySelector('a');
            if (linkElement) {
                title = linkElement.textContent;
                link = linkElement.getAttribute('href');
            } else {
                title = titleElement.textContent;
            }

            // Extract organization and date
            const dateText = header.querySelector('p').textContent;
            const dateParts = dateText.split('|');
            const organization = dateParts.length > 1 ? dateParts[0].trim() : null;
            const date = dateParts.length > 1 ? dateParts[1].trim() : dateText.trim();

            // Extract description
            const description = body.innerHTML;

            // Extract tags if they exist
            const tagList = [];
            tags.forEach(tag => {
                tagList.push(tag.textContent);
            });

            experiences.push({
                title,
                link,
                organization,
                date,
                description,
                tags: tagList
            });
        });

        return experiences;
    }

    /**
     * Convert existing cards to timeline
     * @param {string} sectionSelector - Selector for the section containing cards
     */
    convertCardsToTimeline(sectionSelector) {
        const section = document.querySelector(sectionSelector);
        if (!section) return;

        const cardsContainer = section.querySelector('.resume-cards');
        if (!cardsContainer) return;

        const cards = cardsContainer.querySelectorAll('.card');
        const experiences = this.extractExperiencesFromCards(cards);

        this.createTimeline(experiences, cardsContainer);
    }
}

export default Timeline;