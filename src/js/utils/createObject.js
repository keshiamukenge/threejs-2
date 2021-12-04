export default function createObject(elementsArr) {
    const items = [...elementsArr];

    return items.forEach((item) => ({
        parentItem: item,
        img: item.querySelector('img') || null,
        link: item.querySelector('a') || null
    }));

}