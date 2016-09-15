"use strict";
var Customizer_1 = require("./classes/Customizer");
var TextProcessor_1 = require("./classes/TextProcessor");
var NumberProcessor_1 = require("./classes/NumberProcessor");
var TextValidator_1 = require("./classes/TextValidator");
var NumberValidator_1 = require("./classes/NumberValidator");
var Updater_1 = require("./classes/Updater");
var button = $('#Test');
var canvas = $('#CustomizerCanvas');
var number = $('#CustomizerNumber');
var text = $('#CustomizerName');
var textValidator = new TextValidator_1.TextValidator();
textValidator.maxlength = 12;
var numberValidator = new NumberValidator_1.NumberValidator();
numberValidator.maxlength = 2;
var defaultNumber = (number.val().length < 1) ? '00' : number.val();
var defaultName = (text.val().length < 1) ? 'Your  Name' : text.val();
var image = '/src/images/example.png';
var skin = [
    {
        type: 'text',
        fontFamily: 'Open Sans',
        fontSize: 75,
        x: 100,
        y: 100,
        fillStyle: '#000',
        radius: 400,
        letterSpacing: 0.029
    },
    {
        type: "number",
        fontFamily: 'Open Sans',
        fontSize: 120,
        align: 'right',
        respectAlign: true,
        x: 340,
        y: 330,
        fillStyle: '#F00',
        strokeStyle: '#444',
        strokeWidth: 1,
        outerStroke: {
            color: '#444',
            width: 2
        }
    },
    {
        type: "number",
        fontFamily: 'Open Sans',
        fontSize: 280,
        x: 750,
        y: 380,
        fillStyle: '#F00',
        strokeStyle: '#444',
        strokeWidth: 2,
        outerStroke: {
            color: '#444',
            width: 5
        }
    }
];
var custom = new Customizer_1.Customizer({
    canvas: canvas,
    image: image,
    number: defaultNumber,
    text: new TextProcessor_1.TextProcessor().process(defaultName),
    skin: skin
});
var numbersUpd = new Updater_1.Updater({
    input: number,
    customizer: custom,
    validator: numberValidator,
    processor: new NumberProcessor_1.NumberProcessor()
});
var textUpd = new Updater_1.Updater({
    input: text,
    customizer: custom,
    validator: textValidator,
    processor: new TextProcessor_1.TextProcessor()
});
button.on('click', function (e) {
    numbersUpd.update();
    textUpd.update();
    if (numbersUpd.hasErrors || textUpd.hasErrors) {
        alert("Please fix the form errors before add the product to cart");
        e.preventDefault();
    }
});
//# sourceMappingURL=app.js.map