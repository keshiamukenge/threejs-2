import * as THREE from 'three';

export default class LoadImages{
    constructor() {
        this.images = document.querySelectorAll('img');

        this.loadingManager = new THREE.LoadingManager();

        this.loadingManager.onStart = () => { console.log('start')};
        this.loadingManager.onProgress = () => { console.log('in progress')};
        this.loadingManager.onLoad = () => { console.log('finish')};

        this.textureLoader = new THREE.TextureLoader(this.loadingManager);
        this.getTexture();
    }

    getTexture() {
        for(let i = 0; i < this.images.length; i++) {
            this.texture = this.textureLoader.load(this.images[i]);
        }
    }
}