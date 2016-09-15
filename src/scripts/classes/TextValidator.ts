import {Validator} from '../abstract/Validator';

export class TextValidator extends Validator {

    private _restrictedWords:string[] = [];
    private repeatedChars:any;

    constructor() {
        super();
        this.type = 'text';
        this.reg = new RegExp('^[.\'üéáíóúÁÉÍÓÚÜñÑA-Za-z\- ]+$');
        this.repeatedChars = /^(.)\1{4}/;
    }

    get restrictedWords():string[] {
        return this._restrictedWords;
    }

    set restrictedWords(value:string[]) {
        this._restrictedWords = value;
    }

    validate(value:string):void {
        this.error = null;

        this.generalValidation(value);

        if (!value) {
            this.error = "Please enter a Name";
            return;
        }

        if (!this.regTest(value)) {
            this.error = "The value must be a letter";
            return;
        }

        if (this.repeatedChars && this.repeatedChars.test(value)) {
            this.error = "The value is incorrect";
            return;
        }

        if (this.restrictedWords.indexOf(value.toLowerCase()) > -1 || this.restrictedWords.indexOf(value.toLowerCase().replace(/ +/g, '')) > -1) {
            this.error = "We are unable to customize this item with the text you have entered. Please try a different entry again.";
            return;
        }
    }
}