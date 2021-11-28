import Webgl from './src/assets/js/Webgl';

class App {
    constructor() {
        this.items = document.querySelectorAll('li');
        this.images = document.querySelectorAll('img');

        this.isVisible();
        this.isHidden();

        this.webgl = new Webgl();
        console.log(this.webgl)
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