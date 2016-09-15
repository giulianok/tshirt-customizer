import {Processor} from '../abstract/Processor';

export class NumberProcessor extends Processor {

    constructor() {
        super();
        this.type = 'number';
    }

    process(text:string):string {
        if (text !== "00") {
            text = parseInt(text).toString();
        }
        return text;
    }

}