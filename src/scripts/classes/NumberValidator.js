"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Validator_1 = require('../abstract/Validator');
var NumberValidator = (function (_super) {
    __extends(NumberValidator, _super);
    function NumberValidator() {
        _super.call(this);
        this.type = 'number';
        this.reg = new RegExp('^[0-9]+$');
    }
    NumberValidator.prototype.validate = function (value) {
        this.error = null;
        this.generalValidation(value);
        if (!this.regTest(value)) {
            this.error = "The value must be a number";
            return;
        }
    };
    return NumberValidator;
}(Validator_1.Validator));
exports.NumberValidator = NumberValidator;
//# sourceMappingURL=NumberValidator.js.map