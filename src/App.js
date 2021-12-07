import Webgl from './js/Webgl.js';
import Animations from "./js/Animations";
import Gui from './js/Gui.js';

class App {
    constructor() {
        this.animations = new Animations();
        this.webgl = new Webgl();
        this.controller = new Gui();
    }
}

new App();