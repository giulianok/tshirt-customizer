export abstract class Processor {

    private $type:string = 'generic';

    get type():string {
        return this.$type;
    }

    set type(value:string) {
        this.$type = value;
    }

    clean(text:string):string {
        return text;
    }

    process(text:string):string {
        return text;
    }
}