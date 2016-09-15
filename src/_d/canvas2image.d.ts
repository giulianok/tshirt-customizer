interface Canvas2Image {
    convertToJPEG(canvas:HTMLElement, width:number, height:number);
    saveAsJPEG(canvas:any, width:number, height:number);
}

declare module "Canvas2Image" {
    export = Canvas2Image;
}

declare var Canvas2Image: Canvas2Image;
