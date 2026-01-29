class buttonDetail {
    label: string;
    title: string;
    img: string | null;
    imgButton: boolean;

    constructor(label: string, title: string, img: string | null, imgButton: boolean){
        this.label = label;
        this.title = title;
        this.img = img;
        this.imgButton = imgButton;
    }
}

export default buttonDetail;