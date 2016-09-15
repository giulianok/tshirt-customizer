"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Validator_1 = require('../abstract/Validator');
var TextValidator = (function (_super) {
    __extends(TextValidator, _super);
    function TextValidator() {
        _super.call(this);
        this._restrictedWords = [];
        this.type = 'text';
        this.reg = new RegExp('^[.\'üéáíóúÁÉÍÓÚÜñÑA-Za-z\- ]+$');
        this.repeatedChars = /^(.)\1{4}/;
    }
    Object.defineProperty(TextValidator.prototype, "restrictedWords", {
        get: function () {
            return this._restrictedWords;
        },
        set: function (value) {
            this._restrictedWords = value;
        },
        enumerable: true,
        configurable: true
    });
    TextValidator.prototype.validate = function (value) {
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
    };
    return TextValidator;
}(Validator_1.Validator));
exports.TextValidator = TextValidator;
//# sourceMappingURL=TextValidator.js.map