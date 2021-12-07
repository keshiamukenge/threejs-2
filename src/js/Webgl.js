import 'regenerator-runtime/runtime';
import * as THREE from 'three';
import GSAP from 'gsap';

import LoadImages from './LoadImages.js';
import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';

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
        this.imageRatio = this.images[0].width / this.images[0].height;

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(this.images[0].width, this.images[0].height, 1000);
        this.viewSizeOptions = this.viewSize();

        this.object3d = this.createMesh();
        this.onMouseEnter();
        this.scene = new THREE.Scene();
        this.scene.add(this.object3d.mesh);
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
            vertexShader: 
                `uniform mat4 projectionMatrix;
                uniform mat4 modelViewMatrix;
                uniform vec2 uOffset;

                attribute vec3 position;
                attribute vec2 uv;

                float M_PI = 3.1415926535897932384626433832795;

                varying vec2 vUv;

                vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
                position.x = position.x + (sin(uv.y * M_PI) * offset.x);
                    position.y = position.y + (sin(uv.x * M_PI) * offset.y);
                    return position;
                }

                void main() {
                    vUv = uv;

                    vec3 newPosition = deformationCurve(position, uv, uOffset);

                    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
                }`,
            fragmentShader: 
                `precision mediump float;
                uniform sampler2D uTexture;

                varying vec2 vUv;

                void main() {
                    vec4 texture = texture2D(uTexture, vUv);
                    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
                    gl_FragColor = texture;
                }`,
            uniforms: {
                uOffset: { value: this.offset },
                uTexture: { value: this.texture }
            }
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.scale.set(this.imageRatio, 1, 1);
        this.mesh.position.set(this.offset.x, this.offset.y)
        
        return {
            mesh: this.mesh,
            texture: this.material.uniforms.uTexture.value
        }
    }

    onMouseMove() {
        window.addEventListener('mousemove', (e) => {
            GSAP.to(this.mouse, {
                x : (e.clientX / this.sizes.width) * 2 - 1,
                y : - (e.clientY / this.sizes.height) * 2 + 1
            });

            this.vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
	        this.vector.unproject( this.camera );
	        this.dir = this.vector.sub( this.camera.position ).normalize();
	        this.distance = - this.camera.position.z / this.dir.z;
	        this.pos = this.camera.position.clone().add( this.dir.multiplyScalar( this.distance ) );
	        this.object3d.mesh.position.copy(this.pos);
        });
    }

    onMouseEnter() {
        for(let i = 0; i < this.links.length; i++) {
            this.links[i].addEventListener('mouseenter', () => {
                this.object3d.mesh.visible =  true;
                this.object3d.mesh.material.uniforms.uTexture.value =  new THREE.TextureLoader().load(this.images[i].src);
                /* console.log(this.mouse, this.offset); */
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

        this.offset.x = this.mouse.x * 300;
        this.offset.y = - this.mouse.y * 200;
        
        this.object3d.mesh.material.uniforms.uTexture.needsUpdate = true;
        
        this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(() => {
            this.updateRender();
        });
    }
}