import CreateObject from './src/assets/js/CreateObject.js'

class App {
    constructor() {
        this.items = new CreateObject().items;

        this.isVisible();
        this.isHidden();
    }

    isVisible() {
        this.items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.childNodes[3].style.display = 'block';
            });
        });
    }

    isHidden() {
        this.items.forEach(item => {
            item.addEventListener('mouseleave', () => {
                item.childNodes[3].style.display = 'none';
            });
        });
    }
}

new App();