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
        var ctx = _a.ctx, rpx = _a.rpx, controlDisc = _a.controlDisc, controlBtn = _a.controlBtn;
        var _this = _super.call(this) || this;
        _this.ctx = ctx;
        _this.rpx = rpx;
        _this.controlDisc = controlDisc;
        _this.controlBtn = controlBtn;
        return _this;
    }
    ;
    // 创建控制器圆盘
    speedUpRes.prototype.drawControlDisc = function () {
        this.ctx.drawImage(this.controlDisc.image, this.CONTROLDISC.x, this.CONTROLDISC.y, this.CONTROLDISC.w, this.CONTROLDISC.h);
    };
    ;
    // 创建控制器点
    speedUpRes.prototype.drawControlBtn = function (image, x, y) {
        if (image === void 0) { image = this.controlBtn.image; }
        if (x === void 0) { x = this.CONTROLBTN.x; }
        if (y === void 0) { y = this.CONTROLBTN.y; }
        this.ctx.drawImage(image, x, y, this.CONTROLBTN.w, this.CONTROLBTN.h);
    };
    ;
    speedUpRes.prototype.init = function (_a) {
        var drawPingmu = _a.drawPingmu, drawSpeedUp = _a.drawSpeedUp;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                this.CONTROLDISC = {
                    x: 60 * this.rpx,
                    y: 520 * this.rpx,
                    r: 50 * this.rpx,
                    w: 100 * this.rpx,
                    h: 100 * this.rpx
                };
                this.CONTROLBTN = {
                    x: 85 * this.rpx,
                    y: 545 * this.rpx,
                    r: 25 * this.rpx,
                    w: 50 * this.rpx,
                    h: 50 * this.rpx
                };
                this.distance = this.CONTROLDISC.r;
                this.center = {
                    x: this.CONTROLDISC.x + this.CONTROLDISC.r,
                    y: this.CONTROLDISC.y + this.CONTROLDISC.r
                };
                this.drawControlDisc();
                this.drawControlBtn();
                this.System.wx.onTouchStart(function (e) {
                    var x = Math.abs(_this.center.x - e.touches[0]['clientX']) / _this.rpx;
                    var y = Math.abs(_this.center.y - e.touches[0]['clientY']) / _this.rpx;
                    _this.dis = Math.sqrt(x * x + y * y);
                    _this.calController(e, _this.dis);
                });
                this.System.wx.onTouchMove(function (e) {
                    var x = Math.abs(_this.center.x - e.touches[0]['clientX']) / _this.rpx;
                    var y = Math.abs(_this.center.y - e.touches[0]['clientY']) / _this.rpx;
                    _this.dis = Math.sqrt(x * x + y * y);
                    _this.calController(e, _this.dis);
                });
                this.System.wx.onTouchEnd(function (e) {
                    // drawPingmu()
                    // drawSpeedUp()
                    // this.drawControlDisc()
                    // this.drawControlBtn()
                });
                return [2 /*return*/];
            });
        });
    };
    ;
    speedUpRes.prototype.calController = function (e, r) {
        if (r < this.distance + 50 * this.rpx) {
            this.diffX = e.touches[0]['clientX'] - this.center.x;
            this.diffY = e.touches[0]['clientY'] - this.center.y;
            var l = Math.sqrt(this.diffX * this.diffX + this.diffY * this.diffY);
            var cos = this.diffX / l;
            var sin = this.diffY / l;
            SnakeData_1["default"].setDirection({ x: cos, y: sin });
        }
    };
    ;
    speedUpRes.prototype.drawController = function () {
        this.drawControlDisc();
        if (!this.dis) {
            this.drawControlBtn();
        }
        else {
            if (this.dis > this.distance) {
                this.drawControlBtn(this.controlBtn.image, this.CONTROLBTN.x + this.CONTROLDISC.r * SnakeData_1["default"].directionState.x, this.CONTROLBTN.y - this.CONTROLDISC.r * SnakeData_1["default"].directionState.y);
            }
            else {
                this.drawControlBtn(this.controlBtn.image, this.CONTROLBTN.x + this.diffX, this.CONTROLBTN.y + this.diffY);
            }
        }
    };
    ;
    return speedUpRes;
}(minigamebase_1["default"]));
exports["default"] = speedUpRes;
