
import {Customizer} from "./classes/Customizer";
import {TextProcessor} from "./classes/TextProcessor";
import {NumberProcessor} from "./classes/NumberProcessor";
import {TextValidator} from "./classes/TextValidator";
import {NumberValidator} from "./classes/NumberValidator";
import {Updater} from "./classes/Updater";

interface Window {
    product?:any
}

declare var window:Window;
declare var alert;
declare var parseInt;


const button = $('#Download');
const canvas = $('#CustomizerCanvas');
const number = $('#CustomizerNumber');
const text = $('#CustomizerName');

const textValidator = new TextValidator();
textValidator.maxlength = 12;

const numberValidator = new NumberValidator();
numberValidator.maxlength = 2;

const defaultNumber = (number.val().length < 1) ? '00' : number.val();
const defaultName = (text.val().length < 1) ? 'Your  Name' : text.val();

const image = '/src/images/example.png';

const skin = [
    {
        type: 'text',
        fontFamily: 'Open Sans',
        fontSize: {
            min: 20,
            max: 40,
            limit: 12
        },
        x: 220,
        y: 100,
        fillStyle: '#000'
    },
    {
        type: "number",
        fontFamily: 'Open Sans',
        fontSize: 60,
        align: 'right',
        respectAlign: true,
        x: 290,
        y: 150,
        fillStyle: '#FFF',
        strokeStyle: '#444',
        strokeWidth: 2
    }
];

const custom = new Customizer({
    canvas: canvas,
    image: image,
    number: defaultNumber,
    text: new TextProcessor().process(defaultName),
    skin: skin
});

const numbersUpd = new Updater({
    input: number,
    customizer: custom,
    validator: numberValidator,
    processor: new NumberProcessor()
});

const textUpd = new Updater({
    input: text,
    customizer: custom,
    validator: textValidator,
    processor: new TextProcessor()
});

button.on('click', (e) => {
    numbersUpd.update();
    textUpd.update();
    if (numbersUpd.hasErrors || textUpd.hasErrors) {
        alert("Please fix the form errors before add the product to cart");
        e.preventDefault();
    }
    custom.download();
});


