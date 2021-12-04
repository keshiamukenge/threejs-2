import Webgl from './js/Webgl.js';
import Gui from './js/Gui.js';

class App {
    constructor() {
        this.webgl = new Webgl();
        this.controller = new Gui();
        console.log(this.controller);
    }
}

new App();