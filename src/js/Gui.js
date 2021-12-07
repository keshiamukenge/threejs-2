import { GUI } from 'lil-gui';

import Webgl from './Webgl.js';

export default class Gui extends Webgl {
    constructor() {
        super();
        this.gui = new GUI({ closed: true });
        this.addControlProperty();
    }

    addControlProperty() {
        this.gui.add(this.object3d.mesh.material.uniforms.uOffset.value, 'x')
            .min(-100.0)
            .max(100.0)
            .step(0.001)
            .name('uOffset x')
        this.gui.add(this.object3d.mesh.material.uniforms.uOffset.value, 'y')
            .min(-100.0)
            .max(100.0)
            .step(0.001)
            .name('uOffset y')       
    }
}