import * as THREE from 'three';
import createObject from './utils/createObject.js';

export default class LoadImages {
    constructor() {
        this.images = [...document.querySelectorAll('img')];
        this.loadImages();
    }

    loadImages() {
        this.images.forEach(img => {
            this.promise = new Promise((resolve, reject) => {
                resolve(img);
            });

            this.promise
            .then((e) => {
                console.log('loaded', e);
            })
            .catch((e) => {
                console.error('not loaded' + e);
            })
        });
    }
}