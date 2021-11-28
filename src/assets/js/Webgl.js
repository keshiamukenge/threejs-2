import * as THREE from 'three';

import LoadImages from './LoadImages';

export default class Webgl {
    constructor() {
        this.sizes = { 
            width: window.innerWidth,
            height: window.innerHeight
        }

        this.camera = new THREE.PerspectiveCamera( 78, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera.position.z = 600;

        this.scene = new THREE.Scene();


		this.renderer = new THREE.WebGLRenderer();
        document.body.appendChild(this.renderer.domElement);
		this.renderer.setSize( this.sizes.width, this.sizes.height );
        this.canvas = this.renderer.domElement;

        this.images = new LoadImages().images;
        this.addImages();

        this.resizeScene();
        this.setPosition();

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

    addImages() {
        this.imagesList = this.images.map(img => {
            let pos = img.getBoundingClientRect();

            let geometry = new THREE.PlaneGeometry(pos.width, pos.height, 1, 1);
            let texture = new THREE.Texture(img);
            texture.needsUpdate = true;
            let material = new THREE.MeshBasicMaterial({map: texture});
            let mesh = new THREE.Mesh(geometry, material);

            this.scene.add(mesh);

            return {
                img: img,
                mesh: mesh,
                top: pos.top,
                left: pos.left,
                width: pos.width,
                height: pos.height 
            }
        });
    }

    setPosition() {
        this.imagesList.forEach(object => {
            object.mesh.position.y = -object.top + this.sizes.height / 2 - object.height / 2;
            object.mesh.position.x = object.left - this.sizes.width / 2 + object.width / 2;  
        });
    }

    rendererSize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    animateObject() {
        /* this.camera.lookAt(this.cube.position); */

        this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(() => {
            this.animateObject();
        });
    }
}