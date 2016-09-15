import {Validator} from '../abstract/Validator';

export class NumberValidator extends Validator {

    constructor() {
        super();
        this.type = 'number';
        this.reg = new RegExp('^[0-9]+$');
    }

    validate(value:string):void {
        this.error = null;

        this.generalValidation(value);

        if (!this.regTest(value)) {
            this.error = "The value must be a number";
            return;
        }
    }
}