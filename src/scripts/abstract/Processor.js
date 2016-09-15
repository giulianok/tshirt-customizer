"use strict";
var Processor = (function () {
    function Processor() {
        this.$type = 'generic';
    }
    Object.defineProperty(Processor.prototype, "type", {
        get: function () {
            return this.$type;
        },
        set: function (value) {
            this.$type = value;
        },
        enumerable: true,
        configurable: true
    });
    Processor.prototype.clean = function (text) {
        return text;
    };
    Processor.prototype.process = function (text) {
        return text;
    };
    return Processor;
}());
exports.Processor = Processor;
//# sourceMappingURL=Processor.js.map