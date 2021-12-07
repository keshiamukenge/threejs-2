import { GUI } from 'lil-gui';

import Webgl from './Webgl.js';

export default class Gui extends Webgl {
    constructor() {
        super();
        this.gui = new GUI({ closed: true });
        this.addControlProperty();
    }

    addControlProperty() {
        this.gui.add(this.camera.position, 'x')
            .min(-1000)
            .max(1000)
            .step(1)
            .name('camera x')
        this.gui.add(this.camera.position, 'y')
            .min(-1000)
            .max(1000)
            .step(1)
            .name('camera y')
        this.gui.add(this.camera.position, 'z')
            .min(-1000)
            .max(10000)
            .step(1)
            .name('camera z')
        this.gui.add(this.object3d.mesh.position, 'x')
            .min(-1000)
            .max(1000)
            .step(1)
            .name('mesh x')
        this.gui.add(this.object3d.mesh.position, 'y')
            .min(-1000)
            .max(1000)
            .step(1)
            .name('mesh y')
        this.gui.add(this.object3d.mesh.position, 'z')
            .min(-1000)
            .max(1000)
            .step(0.5)
            .name('mesh z')
        this.gui.add(this.object3d.mesh.scale, 'x')
            .min(-1000)
            .max(1000)
            .step(1)
            .name('mesh width')
        this.gui.add(this.object3d.mesh.scale, 'y')
            .min(-1000)
            .max(1000)
            .step(1)
            .name('mesh height')
        this.gui.add(this.object3d.mesh.scale, 'z')
            .min(-1000)
            .max(1000)
            .step(0.5)
            .name('mesh scale z')
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