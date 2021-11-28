import { GUI } from 'lil-gui';

export default class Gui{
    constructor(camera) {
        this.gui = new GUI({ closed: true });
        this.options = {
            color: 0xff0000
        }

        this.addControlProperty(camera);
    }

    addControlProperty(camera) {
        this.gui.add(camera, 'x')
            .min(-3)
            .max(3)
            .step(0.01)
            .name('camera x')
        this.gui.add(camera, 'y')
            .min(-3)
            .max(3)
            .step(0.01)
            .name('camera y')
        this.gui.add(camera, 'z')
            .min(-3)
            .max(3)
            .step(0.01)
            .name('camera z')
    }
}