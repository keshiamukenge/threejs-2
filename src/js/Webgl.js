import 'regenerator-runtime/runtime';
import * as THREE from 'three';
import GSAP from 'gsap';

import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';
import LoadImages from './LoadImages.js';

export default class Webgl {
    constructor() {
        this.time = new THREE.Clock();

        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        this.links = document.querySelectorAll('a');
        this.mouse = {
            x: 0,
            y: 0
        }
        this.offset = new THREE.Vector2(0.0, 0.0);

        this.images = new LoadImages().images;

        this.camera = new THREE.PerspectiveCamera(1000, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(312, -180, 1000);
        this.viewSizeOptions = this.viewSize();

        this.object3d = this.createMesh();
        this.onMouseEnter();
        this.scene = new THREE.Scene();
        this.scene.add(this.object3d.mesh)
        this.onMouseMove();
        this.onMouseLeave();

        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        document.body.appendChild(this.renderer.domElement);
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.canvas = this.renderer.domElement;

        this.resizeScene();

        this.updateRender();
    }

    lerp(start, end, t) {
        return start * (1 - t) + end * t;
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

    viewSize() {
        let distance = this.camera.position.z
        let vFov = (this.camera.fov * Math.PI) / 180
        let height = 2 * Math.tan(vFov / 2) * distance
        let width = height * this.camera.aspect

        return { width, height, vFov }
    }

    enableDampingControl() {
        this.controls.enableDamping = true;
    }

    createMesh() {
        this.geometry = new THREE.PlaneGeometry(250, 350, 20, 20);
        this.material = new THREE.RawShaderMaterial({
            transparent: true,
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms: {
                uOffset: { value: this.offset },
                uTexture: { value: this.texture }
            }
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.scale.set(4, 3)
        this.mesh.position.set(this.offset.x, this.offset.y)
        
        return {
            mesh: this.mesh,
            texture: this.material.uniforms.uTexture.value
        }
    }

    onMouseMove() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    onMouseEnter() {
        for(let i = 0; i < this.links.length; i++) {
            this.links[i].addEventListener('mouseenter', () => {
                this.object3d.mesh.visible =  true;
                this.object3d.mesh.material.uniforms.uTexture.value =  new THREE.TextureLoader().load(this.images[i].src);
            });
        }
    }

    onMouseLeave() {
        this.links.forEach(link => {
            link.addEventListener('mouseleave', () => {
                this.object3d.mesh.visible =  false;
            });
        });
    }

    rendererSize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    updateRender() {
        this.elapsedTime = this.time.getElapsedTime();
        this.offset.x = this.lerp(this.offset.x, this.mouse.x, 0.1);
        this.offset.y = this.lerp(this.offset.y, this.mouse.y, 0.1);
        
        GSAP.to(this.offset, {
            x: (this.mouse.x - this.offset.x) * 0.0005 * 2,
            y: - (this.mouse.y - this.offset.y) * 0.0005 * 2
        });
        
        let imageRatio = this.images[0].width / this.images[0].height;
        this.object3d.mesh.material.uniforms.uTexture.needsUpdate = true;
        this.object3d.mesh.position.set(this.mouse.x - (this.sizes.width / 2), - this.mouse.y + (this.sizes.height / 2));
        
        this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(() => {
            this.updateRender();
        });
    }
}