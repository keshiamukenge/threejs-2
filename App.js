import Webgl from './src/assets/js/Webgl';
import LoadImages from './src/assets/js/LoadImages';

class App {
    constructor() {
        this.items = document.querySelectorAll('li');
        this.images = document.querySelectorAll('img');

        this.isVisible();
        this.isHidden();

        this.webgl = new Webgl();
        this.loadedImg = new LoadImages();
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