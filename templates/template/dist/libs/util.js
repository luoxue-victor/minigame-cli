"use strict";
exports.__esModule = true;
var System_1 = require('./System.js');
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.prototype.createdImage = function (_a) {
        var src = _a.src, ctx = _a.ctx, _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, _d = _a.w, w = _d === void 0 ? 0 : _d, _e = _a.h, h = _e === void 0 ? 0 : _e;
        var area = {
            t: y,
            b: y + h,
            l: x,
            r: x + w,
            c: { x: x + 0.5 * w, y: y + 0.5 * h }
        };
        return new Promise(function (resolve, reject) {
            var image = System_1["default"].wx.createImage();
            image.onload = function () {
                ctx.drawImage(image, x, y, w, h);
                resolve({ image: image, area: area });
            };
            image.src = src;
        });
    };
    ;
    Util.prototype.downloadResource = function (url) {
        return new Promise(function (resolve, reject) {
            try {
                System_1["default"].wx.downloadFile({
                    url: url,
                    success: function (res) {
                        resolve(res.tempFilePath);
                    },
                    fail: reject
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    Util.prototype.getRandomInt = function (min, max) {
        var Range = max - min;
        var Rand = Math.random();
        return (min + Math.round(Rand * Range));
    };
    return Util;
}());
exports["default"] = new Util();
