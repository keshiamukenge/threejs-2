import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Webgl {
    constructor() {
        this.sizes = { 
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.resizeScene();

        this.scene = new THREE.Scene();
		
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

		this.renderer = new THREE.WebGLRenderer();
        document.body.appendChild(this.renderer.domElement);
		this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.canvas = this.renderer.domElement;

        this.controls = new OrbitControls(this.camera, this.canvas);
        this.enableDampingControl();

		this.geometry = new THREE.PlaneGeometry();
		this.material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, color: 0x00ff00 } );
		this.cube = new THREE.Mesh( this.geometry, this.material );
		this.scene.add( this.cube );

		this.camera.position.z = 5;

		this.animateObject();
    }

    resizeScene() {
        window.addEventListener('resize', () => {
            this.sizes.width = window.innerWidth;
            this.sizes.height = window.innerHeight;

            this.camera.aspect = this.sizes.width / this.sizes.height;
            this.camera.updateProjectionMatrix();

            this.rendererSize();
        });
    }

    enableDampingControl() {
        this.controls.enableDamping = true;
    }

    rendererSize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    animateObject() {
        this.camera.lookAt(this.cube.position);

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.controls.update();

        this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(() => {
            this.animateObject();
        });
    }
}