declare var fontSpy:Function;
declare class downScaleImage {
    constructor(image:HTMLImageElement, scale:number);
}

export class Customizer {

    private _canvas: JQuery;
    private _image: string;
    private _number: string;
    private _text: string;
    private _skin: any[];
    private _picture: HTMLImageElement;

    get canvas():JQuery {
        return this._canvas;
    }

    set canvas(value:JQuery) {
        this._canvas = value;
    }

    get image():string {
        return this._image;
    }

    set image(value:string) {
        this._image = value;
    }

    get number():string {
        return this._number;
    }

    set number(value:string) {
        this._number = value;
    }

    get text():string {
        return this._text;
    }

    set text(value:string) {
        this._text = value;
    }

    get skin():any[] {
        return this._skin;
    }

    set skin(value:any[]) {
        this._skin = value;
    }

    get picture():HTMLImageElement {
        return this._picture;
    }

    set picture(value:HTMLImageElement) {
        this._picture = value;
    }

    constructor(settings:SettingsInterface) {
        if (!settings.canvas.length) {
            console.log(settings.canvas);
            throw new Error(`The canvas '${settings.canvas}' was't found`);
        }

        this.canvas = settings.canvas;
        this.image = settings.image;
        this.number = settings.number.toString();
        this.text = settings.text;
        this.skin = settings.skin;

        this.draw({
            text: this.text,
            number: this.number
        });
    }

    private loadImage(picture:string, cb:Function):void {
        // If we already have the loaded picture, we return it
        if (this.picture) {
            cb();
        } else {
            const image = new Image();
            image.src = picture;
            image.onload = () => {
                this.picture = image;
                cb();
            };
        }
    }

    private draw(params:{ number?:string, text?:string }):void {

        const text = params.text || this.text;
        const number = params.number || this.number;

        // this.drawText("Loading", {
        //     fontSize: 200,
        //     x: 500,
        //     y: 400
        // });

        this.loadFonts(() => {
            this.loadImage(this.image, () => {
                this.clear();
                this.drawImage(this.picture);

                this.skin.forEach( (value) => {
                    switch (value.type) {
                        case "text":
                            this.drawText(text, value);
                            this.text = text;
                            break;
                        case "number":
                            this.drawText(number, value);
                            this.number = number;
                            break;
                        default:
                            throw new Error(`The type '${value.type}' isn't valid`);
                    }
                });
            });
        });
    }

    private drawImage(image:HTMLImageElement) {
        this.canvas.drawImage({
            source: image,
            // source: new downScaleImage(image, 0.15),
            x: 0, y: 0,
            width: this.canvasWidth,
            height: this.canvasHeight,
            fromCenter: false
        });
    }

    private drawText(text:string|number, params:{fontSize?, x?, y?}) {

        // ONLY FOR THIS WEIRD REQUIREMENT
        text = text.toString().replace(/I/g, 'l');

        let {
            fontSize,
            x,
            y
        } = params;

        fontSize = fontSize || 10;
        x = x || 10;
        y = y || 10;

        const _default = {
            fillStyle: '#000',
            letterSpacing: 0.1
        };
        const _fixed = {
            fontSize: fontSize,
            text: text,
            x: x, y: y
        };
        const skin = params || {};
        let final = (<any>Object).assign(_default, skin, _fixed);

        if(final.firefox && navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
            console.log(final);
            final = (<any>Object).assign(final, final.firefox);
            console.log(final);
        }

        if ('object' == typeof final.fontSize) {
            const lengthPercentage = (final.fontSize.limit - text.toString().length) * 100 / final.fontSize.limit;
            const diff = final.fontSize.max - final.fontSize.min;
            final.fontSize = (lengthPercentage * diff / 100) + final.fontSize.min;
        }

        if (final.outerStroke) {

            if (!Array.isArray(final.outerStroke)) {
                const tmp = final.outerStroke;
                final.outerStroke = [];
                final.outerStroke.push(tmp);
            }

            const variation = (<any>Object).assign({}, final);

            final.outerStroke.forEach((obj) => {
                variation.x = final.x;
                variation.y = final.y;
                variation.fillStyle = obj.color;
                this.outerStroke(variation, obj.width);
            });
        }

        this.canvas.drawText(final);
    }

    private clear():void {
        this.canvas.clearCanvas();
    }

    private outerStroke(params, width) {
        const x = params.x;
        const y = params.y;

        for (var i = 0; i <= width; i++) {
            params.y = y - i;
            for (var w = 0; w <= width; w++) {
                params.x = x - w;
                this.canvas.drawText(params);
            }
            for (var z = 0; z <= width; z++) {
                params.x = x + z;
                this.canvas.drawText(params);
            }
        }

        for (var i = 0; i <= width; i++) {
            params.y = y + i;
            for (var w = 0; w <= width; w++) {
                params.x = x - w;
                this.canvas.drawText(params);
            }
            for (var z = 0; z <= width; z++) {
                params.x = x + z;
                this.canvas.drawText(params);
            }
        }
    }

    private loadFonts(cb) {

        let fonts = [];

        this.skin.forEach( (s) => {
            if (s.fontFamily && fonts.indexOf(s.fontFamily) < 0) {
                fonts.push(s.fontFamily);
            }
        });

        this.fontRecursiveLoader(0, fonts, cb);
    }

    private fontRecursiveLoader(i:number, fonts:string[], cb:Function):void {
        if (i == fonts.length) {
            cb();
        } else {
            this.loadFont(fonts[i], () => {
                i++;
                this.fontRecursiveLoader(i, fonts, cb);
            })
        }
    }

    private loadFont(font:string, cb:Function):void {
        fontSpy(font, {
            success: function() {
                cb();
            },
            failure: function() {
                const message = `Font '${font}' not found!`;
                alert(message);
                throw new Error(message);
            }
        });
    }

    public get canvasWidth():number {
        return this.canvas.width();
    }

    public get canvasHeight():number {
        return this.canvas.height();
    }

    public updateText(text:string):void {
        this.draw({
            text: text
        });
    }

    public updateNumber(number:string):void {
        this.draw({
            number: number
        });
    }

    public convertToImage() {
        return Canvas2Image.convertToJPEG(this.canvas[0], this.canvasWidth, this.canvasHeight);
    }

    public done() {
        return this.convertToImage();
    }

    public download() {
        Canvas2Image.saveAsJPEG(this.canvas[0], this.canvasWidth, this.canvasHeight);
    }

}