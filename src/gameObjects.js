class GameObject {
    constructor(id,x,y,w,h,){
        this.id = id
        this.x = x
        this.y = y
        this.height = h
        this.width = w
        this.element = document.getElementById(id)

        if (this.element){
            this.element.style.position = 'absolute'
            this.element.style.width = `${this.width}px`
            this.element.style.height = `${this.height}px`
            this.updatePosition()
        }
    }

    updatePosition() {
        if (this.element) {
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;
        }
    }
    
}

export class Wall extends GameObject {
    constructor(id, x, y, width, height) {
        super(id, x, y, width, height); // Call the parent GameObject constructor
        // Add any specific wall properties here, e.g., type: 'wall'
        if (this.element) {
            this.element.style.backgroundColor = 'gray'; // Visual for walls
        }
    }
}

// src/gameObjects.js (continued)

export class Project extends GameObject {
    constructor(id, x, y, width, height, projectDetails) {
        super(id, x, y, width, height);
        // Store project-specific data
        this.title = projectDetails.title;
        this.description = projectDetails.description;
        this.link = projectDetails.link;
        this.imageUrl = projectDetails.imageUrl;
        this.modalContent = projectDetails.modalContent; // e.g., full HTML for the modal
        
        if (this.element) {
            this.element.style.backgroundColor = 'yellow'; // Visual for projects
        }
    }
}