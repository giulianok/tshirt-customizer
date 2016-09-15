export abstract class Validator {

    private $type:string = 'generic';
    private $reg:RegExp;
    private $error:string;
    private _maxlength:number;

    get type():string {
        return this.$type;
    }

    set type(value:string) {
        this.$type = value;
    }

    get reg():RegExp {
        return this.$reg;
    }

    set reg(value:RegExp) {
        this.$reg = value;
    }

    set error(value:string) {
        this.$error = value;
    }

    get error():string {
        return this.$error;
    }

    get maxlength():number {
        return this._maxlength;
    }

    set maxlength(value:number) {
        this._maxlength = value;
    }

    get hasError():boolean {
        if (this.error == null || this.error == undefined) {
            return false;
        }
        return this.error.length > 0;
    }

    regTest(value:string) {
        return this.reg.test(value);
    }

    validate(value:string):void {
    }

    generalValidation(value:string):void {
        if (this.maxlength && this.maxlength > 0 && value.toString().length > this.maxlength) {
            this.error = "The value exceeds the maximum characters allowed";
            return;
        }
    }

}