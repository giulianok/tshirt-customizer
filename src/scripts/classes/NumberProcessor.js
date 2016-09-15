"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Processor_1 = require('../abstract/Processor');
var NumberProcessor = (function (_super) {
    __extends(NumberProcessor, _super);
    function NumberProcessor() {
        _super.call(this);
        this.type = 'number';
    }
    NumberProcessor.prototype.process = function (text) {
        if (text !== "00") {
            text = parseInt(text).toString();
        }
        return text;
    };
    return NumberProcessor;
}(Processor_1.Processor));
exports.NumberProcessor = NumberProcessor;
//# sourceMappingURL=NumberProcessor.js.map