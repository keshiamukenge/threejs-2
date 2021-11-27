export default class createObject{
    constructor() {
        this.images = document.querySelectorAll('img');
        this.items = document.querySelectorAll('li');
        this.itemsContent = this.getItemContent();
        this.itemsObj = [
            {
                link: this.itemsContent[0],
                img: this.itemsContent[1]
            },
            {
                link: this.itemsContent[2],
                img: this.itemsContent[3]
            },
            {
                link: this.itemsContent[4],
                img: this.itemsContent[5]
            }
        ]

    }

    getItemContent() {
        this.arrList = [];
        this.items.forEach(item => {
            item.childNodes.forEach(content => {
                if(content.nodeName !== '#text') {
                    this.arrList.push(content);
                }
            });
        });
        return this.arrList;
    }
}