export class SkillCard {
    constructor(icon, title, description) {
        this.icon = icon;
        this.title = title;
        this.description = description;
    }

    render() {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.innerHTML = `
            <img src="${this.icon}" alt="${this.title} icon" class="skill-icon">
            <div class="skill-content">
                <h3>${this.title}</h3>
                <p>${this.description}</p>
            </div>
        `;
        return card;
    }
}