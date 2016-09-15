import {Processor} from '../abstract/Processor';

export class TextProcessor extends Processor {

    constructor() {
        super();
        this.type = 'text';
    }

    clean(text:string):string {
        // Removing multiple spaces
        text = text.replace(/  +/g, ' ');

        // removing first and last space
        text = text.trim();

        return text;
    }

    process(text:string):string {
        let newText = text.toUpperCase();
        return newText;
    }

}