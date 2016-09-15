"use strict";
var Updater = (function () {
    function Updater(params) {
        this.interval = 0;
        this.input = params.input;
        this.customizer = params.customizer;
        this.validator = params.validator;
        this.processor = params.processor;
        var error = this.input.parents('[customizer-label-wrapper]').find(".error");
        if (!error.length) {
            throw new Error("'error' element not found");
        }
        this.errorWrapper = error;
        this.listening();
    }
    Object.defineProperty(Updater.prototype, "hasErrors", {
        get: function () {
            return this.errors;
        },
        set: function (value) {
            this.errors = value;
        },
        enumerable: true,
        configurable: true
    });
    Updater.prototype.listening = function () {
        var _this = this;
        this.input.on("keyup", function () {
            _this.update();
        });
    };
    Updater.prototype.update = function () {
        var _this = this;
        // Reset error message
        this.errorWrapper.html('');
        var value = this.processor.clean(this.input.val());
        this.validator.validate(value);
        if (this.validator.hasError) {
            this.hasErrors = true;
            this.errorWrapper.html(this.validator.error);
        }
        else {
            this.hasErrors = false;
            value = this.processor.process(value);
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                switch (_this.validator.type) {
                    case "text":
                        _this.customizer.updateText(value);
                        break;
                    case "number":
                        _this.customizer.updateNumber(value);
                        break;
                }
            }, this.interval);
        }
    };
    return Updater;
}());
exports.Updater = Updater;
//# sourceMappingURL=Updater.js.map