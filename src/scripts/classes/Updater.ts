import {Customizer} from "./Customizer";
import {Validator} from "../abstract/Validator";
import {Processor} from "../abstract/Processor";

export class Updater {

    private errors:boolean;
    private errorWrapper:JQuery;
    private input:JQuery;
    private customizer:Customizer;
    private validator:Validator;
    private processor:Processor;
    private timer:any;
    private interval:number = 0;

    constructor(params: { input:JQuery, customizer:Customizer, validator:Validator, processor:Processor }) {

        this.input = params.input;
        this.customizer = params.customizer;
        this.validator = params.validator;
        this.processor = params.processor;

        const error = this.input.parents('[customizer-label-wrapper]').find(".error");
        if (!error.length) {
            throw new Error("'error' element not found");
        }
        this.errorWrapper = error;

        this.listening();
    }

    set hasErrors(value:boolean) {
        this.errors = value;
    }

    get hasErrors():boolean {
        return this.errors;
    }

    private listening():void {
        this.input.on("keyup", () => {
            this.update();
        });
    }

    public update():void {
        // Reset error message
        this.errorWrapper.html('');

        let value = this.processor.clean(this.input.val());

        this.validator.validate( value );

        if (this.validator.hasError) {

            this.hasErrors = true;
            this.errorWrapper.html(this.validator.error);

        } else {

            this.hasErrors = false;

            value = this.processor.process(value);

            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                switch (this.validator.type) {
                    case "text":
                        this.customizer.updateText(value);
                        break;
                    case "number":
                        this.customizer.updateNumber(value);
                        break;
                }
            }, this.interval);
        }
    }

}