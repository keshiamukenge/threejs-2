import Webgl from './src/assets/js/Webgl';

class App {
    constructor() {
        this.items = document.querySelectorAll('li');

        this.webgl = new Webgl();

        this.textures = this.webgl.scene.children;

        this.objects = [
            {
                item: this.items[0],
                texture: this.textures[0]
            },
            {
                item: this.items[1],
                texture: this.textures[1]
            },
            {
                item: this.items[2],
                texture: this.textures[2]
            }
        ]

        this.isVisible();
        this.isHidden();
    }

    isVisible() {
        this.objects.forEach(object => {
            object.texture.visible = false;
            object.item.addEventListener('mouseenter', () => {
                object.texture.visible = true;
            });
        });
    }

    isHidden() {
        this.objects.forEach(object => {
            object.item.addEventListener('mouseleave', () => {
                object.texture.visible = false;
            });
        });
    }
}

new App();