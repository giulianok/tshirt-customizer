"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Processor_1 = require('../abstract/Processor');
var TextProcessor = (function (_super) {
    __extends(TextProcessor, _super);
    function TextProcessor() {
        _super.call(this);
        this.type = 'text';
    }
    TextProcessor.prototype.clean = function (text) {
        // Removing multiple spaces
        text = text.replace(/  +/g, ' ');
        // removing first and last space
        text = text.trim();
        return text;
    };
    TextProcessor.prototype.process = function (text) {
        var newText = text.toUpperCase();
        return newText;
    };
    return TextProcessor;
}(Processor_1.Processor));
exports.TextProcessor = TextProcessor;
//# sourceMappingURL=TextProcessor.js.map