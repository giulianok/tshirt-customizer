"use strict";
var Customizer = (function () {
    function Customizer(settings) {
        if (!settings.canvas.length) {
            console.log(settings.canvas);
            throw new Error("The canvas '" + settings.canvas + "' was't found");
        }
        this.canvas = settings.canvas;
        this.image = settings.image;
        this.number = settings.number.toString();
        this.text = settings.text;
        this.skin = settings.skin;
        this.draw({
            text: this.text,
            number: this.number
        });
    }
    Object.defineProperty(Customizer.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        set: function (value) {
            this._canvas = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Customizer.prototype, "image", {
        get: function () {
            return this._image;
        },
        set: function (value) {
            this._image = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Customizer.prototype, "number", {
        get: function () {
            return this._number;
        },
        set: function (value) {
            this._number = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Customizer.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (value) {
            this._text = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Customizer.prototype, "skin", {
        get: function () {
            return this._skin;
        },
        set: function (value) {
            this._skin = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Customizer.prototype, "picture", {
        get: function () {
            return this._picture;
        },
        set: function (value) {
            this._picture = value;
        },
        enumerable: true,
        configurable: true
    });
    Customizer.prototype.loadImage = function (picture, cb) {
        var _this = this;
        // If we already have the loaded picture, we return it
        if (this.picture) {
            cb();
        }
        else {
            var image_1 = new Image();
            image_1.src = picture;
            image_1.onload = function () {
                _this.picture = image_1;
                cb();
            };
        }
    };
    Customizer.prototype.draw = function (params) {
        var _this = this;
        var text = params.text || this.text;
        var number = params.number || this.number;
        // this.drawText("Loading", {
        //     fontSize: 200,
        //     x: 500,
        //     y: 400
        // });
        this.loadFonts(function () {
            _this.loadImage(_this.image, function () {
                _this.clear();
                _this.drawImage(_this.picture);
                _this.skin.forEach(function (value) {
                    switch (value.type) {
                        case "text":
                            _this.drawText(text, value);
                            _this.text = text;
                            break;
                        case "number":
                            _this.drawText(number, value);
                            _this.number = number;
                            break;
                        default:
                            throw new Error("The type '" + value.type + "' isn't valid");
                    }
                });
            });
        });
    };
    Customizer.prototype.drawImage = function (image) {
        this.canvas.drawImage({
            source: image,
            // source: new downScaleImage(image, 0.15),
            x: 0, y: 0,
            width: this.canvasWidth,
            height: this.canvasHeight,
            fromCenter: false
        });
    };
    Customizer.prototype.drawText = function (text, params) {
        var _this = this;
        // ONLY FOR THIS WEIRD REQUIREMENT
        text = text.toString().replace(/I/g, 'l');
        var fontSize = params.fontSize, x = params.x, y = params.y;
        fontSize = fontSize || 10;
        x = x || 10;
        y = y || 10;
        var _default = {
            fillStyle: '#000',
            letterSpacing: 0.1
        };
        var _fixed = {
            fontSize: fontSize,
            text: text,
            x: x, y: y
        };
        var skin = params || {};
        var final = Object.assign(_default, skin, _fixed);
        if (final.firefox && navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            console.log(final);
            final = Object.assign(final, final.firefox);
            console.log(final);
        }
        if ('object' == typeof final.fontSize) {
            var lengthPercentage = (final.fontSize.limit - text.toString().length) * 100 / final.fontSize.limit;
            var diff = final.fontSize.max - final.fontSize.min;
            final.fontSize = (lengthPercentage * diff / 100) + final.fontSize.min;
        }
        if (final.outerStroke) {
            if (!Array.isArray(final.outerStroke)) {
                var tmp = final.outerStroke;
                final.outerStroke = [];
                final.outerStroke.push(tmp);
            }
            var variation_1 = Object.assign({}, final);
            final.outerStroke.forEach(function (obj) {
                variation_1.x = final.x;
                variation_1.y = final.y;
                variation_1.fillStyle = obj.color;
                _this.outerStroke(variation_1, obj.width);
            });
        }
        this.canvas.drawText(final);
    };
    Customizer.prototype.clear = function () {
        this.canvas.clearCanvas();
    };
    Customizer.prototype.outerStroke = function (params, width) {
        var x = params.x;
        var y = params.y;
        for (var i = 0; i <= width; i++) {
            params.y = y - i;
            for (var w = 0; w <= width; w++) {
                params.x = x - w;
                this.canvas.drawText(params);
            }
            for (var z = 0; z <= width; z++) {
                params.x = x + z;
                this.canvas.drawText(params);
            }
        }
        for (var i = 0; i <= width; i++) {
            params.y = y + i;
            for (var w = 0; w <= width; w++) {
                params.x = x - w;
                this.canvas.drawText(params);
            }
            for (var z = 0; z <= width; z++) {
                params.x = x + z;
                this.canvas.drawText(params);
            }
        }
    };
    Customizer.prototype.loadFonts = function (cb) {
        var fonts = [];
        this.skin.forEach(function (s) {
            if (s.fontFamily && fonts.indexOf(s.fontFamily) < 0) {
                fonts.push(s.fontFamily);
            }
        });
        this.fontRecursiveLoader(0, fonts, cb);
    };
    Customizer.prototype.fontRecursiveLoader = function (i, fonts, cb) {
        var _this = this;
        if (i == fonts.length) {
            cb();
        }
        else {
            this.loadFont(fonts[i], function () {
                i++;
                _this.fontRecursiveLoader(i, fonts, cb);
            });
        }
    };
    Customizer.prototype.loadFont = function (font, cb) {
        fontSpy(font, {
            success: function () {
                cb();
            },
            failure: function () {
                var message = "Font '" + font + "' not found!";
                alert(message);
                throw new Error(message);
            }
        });
    };
    Object.defineProperty(Customizer.prototype, "canvasWidth", {
        get: function () {
            return this.canvas.width();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Customizer.prototype, "canvasHeight", {
        get: function () {
            return this.canvas.height();
        },
        enumerable: true,
        configurable: true
    });
    Customizer.prototype.updateText = function (text) {
        this.draw({
            text: text
        });
    };
    Customizer.prototype.updateNumber = function (number) {
        this.draw({
            number: number
        });
    };
    Customizer.prototype.convertToImage = function () {
        return Canvas2Image.convertToJPEG(this.canvas[0], this.canvasWidth, this.canvasHeight);
    };
    Customizer.prototype.done = function () {
        return this.convertToImage();
    };
    return Customizer;
}());
exports.Customizer = Customizer;
//# sourceMappingURL=Customizer.js.map