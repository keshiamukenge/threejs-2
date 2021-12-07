import GSAP from 'gsap';

export default class Animations {
    constructor() {
        this.loader = document.querySelector('p');
        this.links = [...document.querySelectorAll('a')];
        this.upLink();
        this.onClick();
    }

    onLoaded() {
        return new Promise(resolve => {
            window.addEventListener('load', () => {
                GSAP.to(this.loader, {
                    duration: 0.8,
                    y: -5
                });

                GSAP.to(this.loader, {
                    delay: 2,
                    duration: 0.8,
                    y: -60,
                    onComplete: resolve
                });
            });
        });
    }

    downLink() {
        this.links.forEach(link => {
            GSAP.to(link, {
                duration: 0.2,
                y: 100
            });
        });

        this.links.forEach(link => {
            GSAP.to(link, {
                delay: 2,
                duration: 0.2,
                y: -4
            });
        });
    }

    async upLink() {
        await this.onLoaded();
            this.links.forEach(link => {
                GSAP.to(link, {
                    duration: 0.2,
                    y: 0
                }, '+=0.005');
            });
    }

    onClick() {
        this.links.forEach(link => {
            link.addEventListener('click', () => {
                this.downLink()
            });
        });
    }
}