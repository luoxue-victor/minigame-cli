"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var minigamebase_1 = require('./minigamebase.js');
var SnakeData_1 = require('./../store/SnakeData.js');
var speedUpRes = /** @class */ (function (_super) {
    __extends(speedUpRes, _super);
    function speedUpRes(_a) {
        var ctx = _a.ctx, rpx = _a.rpx, sheshen = _a.sheshen, header = _a.header, canvas = _a.canvas;
        var _this = _super.call(this) || this;
        _this["switch"] = true;
        _this.snake = [];
        _this.timer = null;
        _this.lockEat = false;
        _this.ctx = ctx;
        _this.rpx = rpx;
        _this.header = header;
        _this.sheshen = sheshen;
        _this.canvas = canvas;
        return _this;
    }
    ;
    speedUpRes.prototype.clearInit = function () {
        this.track = [];
        this.snake = [];
    };
    speedUpRes.prototype.init = function (_a) {
        var drawPingmu = _a.drawPingmu, drawSpeedUp = _a.drawSpeedUp, drawFood = _a.drawFood, controller = _a.controller, cFood = _a.cFood, dieCb = _a.dieCb;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                this.initParams = { drawPingmu: drawPingmu, drawSpeedUp: drawSpeedUp, drawFood: drawFood, controller: controller, cFood: cFood, dieCb: dieCb };
                this.clearInit();
                this.x = 200 * this.rpx;
                this.y = 300 * this.rpx;
                this.track = [{ x: this.x, y: this.y, deg: 20 }];
                this.pushTrack({ quality: 2, direction: { x: 1, y: 0 } });
                this.addSnake(0, 'header', 187);
                this.addQuality(2);
                this.timer = setInterval(function () {
                    drawPingmu();
                    drawSpeedUp();
                    drawFood();
                    var q = cFood.whetherProduceFood(_this.snake[0].x, _this.snake[0].y);
                    controller.drawController();
                    var deg = (Math.acos(-SnakeData_1["default"].getDirection.x) * 180 / Math.PI) + 187;
                    var shenshenDeg = (Math.acos(-SnakeData_1["default"].getDirection.x) * 180 / Math.PI) + 20;
                    if (SnakeData_1["default"].getDirection.y < 0) {
                        deg = 360 - deg;
                        shenshenDeg = 360 - deg;
                    }
                    _this.track[0].x += SnakeData_1["default"].getDirection.x * _this.rpx * 3;
                    _this.track[0].y -= SnakeData_1["default"].getDirection.y * _this.rpx * 3;
                    _this.track[0].deg = deg;
                    _this.track.unshift({ x: _this.track[0].x, y: _this.track[0].y, deg: deg });
                    _this.addSnake(0, 'header', deg);
                    _this.addSnake(1, 'sheshen', shenshenDeg);
                    _this.addSnake(2, 'sheshen', shenshenDeg);
                    if (q.success && !_this.lockEat) {
                        _this.addQuality(q.quality);
                        _this.lockEat = true;
                    }
                    if (q.success)
                        _this.lockEat = false;
                    _this.drawSnake();
                    _this.checkDie();
                }, 40);
                return [2 /*return*/];
            });
        });
    };
    ;
    speedUpRes.prototype.addQuality = function (quality, direction) {
        if (quality === void 0) { quality = 2; }
        if (direction === void 0) { direction = { x: 1, y: 0 }; }
        while (quality--) {
            var snakeLen = this.snake.length;
            this.pushTrack({ quality: 1, direction: direction });
            this.addSnake(snakeLen);
        }
    };
    speedUpRes.prototype.pushTrack = function (_a) {
        var _b = _a.quality, quality = _b === void 0 ? 1 : _b, _c = _a.direction, direction = _c === void 0 ? { x: 1, y: 0 } : _c;
        var i = quality * 5;
        while (i) {
            i--;
            var deg = (Math.acos(-SnakeData_1["default"].getDirection.x) * 180 / Math.PI) + 187;
            var shenshenDeg = (Math.acos(-SnakeData_1["default"].getDirection.x) * 180 / Math.PI) + 20;
            this.track.push({ x: direction.x * 3 + this.x, y: direction.y * 3 + this.y, deg: shenshenDeg });
            this.x += direction.x * 3;
            this.y += direction.y * 3;
        }
        ;
    };
    ;
    speedUpRes.prototype.drawSnake = function () {
        var j = 0;
        for (var i = 0; i < this.snake.length - 1; i++) {
            j = i * 5;
            this.position({ x: this.track[j].x, y: this.track[j].y, w: 30 * this.rpx, h: 30 * this.rpx, image: this[this.snake[i].type].image, deg: this.snake[i].deg });
        }
    };
    speedUpRes.prototype.addSnake = function (index, type, deg) {
        if (type === void 0) { type = 'sheshen'; }
        if (deg === void 0) { deg = 20; }
        var i = index * 5;
        this.position({ x: this.track[i].x, y: this.track[i].y, w: 30 * this.rpx, h: 30 * this.rpx, image: this[type].image, deg: deg });
        this.snake[index] = Object.assign({}, { type: type, deg: deg }, this.track[i]);
    };
    ;
    speedUpRes.prototype.position = function (_a) {
        var x = _a.x, y = _a.y, image = _a.image, w = _a.w, h = _a.h, deg = _a.deg;
        this.ctx.translate(x, y);
        this.ctx.rotate(deg * Math.PI / 180);
        this.ctx.drawImage(image, -0.5 * w, -0.5 * h, w, h);
        this.ctx.rotate(-deg * Math.PI / 180);
        this.ctx.translate(-1 * x, -1 * y);
    };
    speedUpRes.prototype.stop = function () {
        clearInterval(this.timer);
    };
    ;
    speedUpRes.prototype.start = function (initParams) {
        this.init(initParams || this.initParams);
    };
    ;
    speedUpRes.prototype.checkDie = function () {
        if (this.snake[0].x - 15 * this.rpx >= 375
            || this.snake[0].x - 15 * this.rpx <= 0
            || this.snake[0].y - 15 * this.rpx <= 0
            || this.snake[0].y - 15 * this.rpx > this.canvas.height / 375 * this.canvas.width) {
            clearInterval(this.timer);
            if (this.initParams.dieCb && typeof this.initParams.dieCb === 'function') {
                this.initParams.dieCb(this.snake.length - 3);
            }
        }
    };
    return speedUpRes;
}(minigamebase_1["default"]));
exports["default"] = speedUpRes;
