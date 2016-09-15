"use strict";
var Validator = (function () {
    function Validator() {
        this.$type = 'generic';
    }
    Object.defineProperty(Validator.prototype, "type", {
        get: function () {
            return this.$type;
        },
        set: function (value) {
            this.$type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validator.prototype, "reg", {
        get: function () {
            return this.$reg;
        },
        set: function (value) {
            this.$reg = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validator.prototype, "error", {
        get: function () {
            return this.$error;
        },
        set: function (value) {
            this.$error = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validator.prototype, "maxlength", {
        get: function () {
            return this._maxlength;
        },
        set: function (value) {
            this._maxlength = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validator.prototype, "hasError", {
        get: function () {
            if (this.error == null || this.error == undefined) {
                return false;
            }
            return this.error.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Validator.prototype.regTest = function (value) {
        return this.reg.test(value);
    };
    Validator.prototype.validate = function (value) {
    };
    Validator.prototype.generalValidation = function (value) {
        if (this.maxlength && this.maxlength > 0 && value.toString().length > this.maxlength) {
            this.error = "The value exceeds the maximum characters allowed";
            return;
        }
    };
    return Validator;
}());
exports.Validator = Validator;
//# sourceMappingURL=Validator.js.map