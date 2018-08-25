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
var FoodData_1 = require('./../store/FoodData.js');
var util_1 = require('./../libs/util.js');
var speedUpRes = /** @class */ (function (_super) {
    __extends(speedUpRes, _super);
    function speedUpRes(_a) {
        var FooDX = _a.FooDX, FooDY = _a.FooDY, NUM = _a.NUM, FOOD_DATA = _a.FOOD_DATA, shiwu = _a.shiwu, canvas = _a.canvas, rpx = _a.rpx, ctx = _a.ctx;
        var _this = _super.call(this) || this;
        // this.FooDX = FooDX;
        // this.FooDY = FooDY;
        _this.NUM = NUM;
        _this.FOOD_DATA = FOOD_DATA;
        _this.shiwu = shiwu;
        _this.canvas = canvas;
        _this.rpx = rpx;
        _this.ctx = ctx;
        return _this;
    }
    speedUpRes.prototype.init = function (_a) {
        var FooDX = _a.FooDX, FooDY = _a.FooDY, NUM = _a.NUM, FOOD_DATA = _a.FOOD_DATA, shiwu = _a.shiwu;
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_b) {
            return [2 /*return*/];
        }); });
    };
    speedUpRes.prototype.Eat = function () {
        var _this = this;
        this.NUM = util_1["default"].getRandomInt(2, 4) * 8;
        this.FOOD_DATA.x = util_1["default"].getRandomInt(30, this.canvas.width - 150) * this.rpx;
        this.FOOD_DATA.y = util_1["default"].getRandomInt(30, this.canvas.height - 150) * this.rpx;
        this.FOOD_DATA.w = this.NUM * this.rpx;
        this.FOOD_DATA.h = this.NUM * this.rpx;
        if (this.FOOD_DATA.x >= 240 && this.FOOD_DATA.x <= 320)
            this.FOOD_DATA.x = 130;
        if (this.FOOD_DATA.h >= 490 && this.FOOD_DATA.h <= 570)
            this.FOOD_DATA.h = 130;
        var drawFood = function () {
            _this.ctx.drawImage(_this.shiwu.image, _this.FOOD_DATA.x, _this.FOOD_DATA.y, _this.FOOD_DATA.w, _this.FOOD_DATA.h);
        };
    };
    speedUpRes.prototype.whetherProduceFood = function (x, y) {
        FoodData_1["default"].RESULT = { quality: 0, success: false };
        if (x == this.FOOD_DATA.x || y == this.FOOD_DATA.y) {
            this.FooDX = util_1["default"].getRandomInt(10, 30);
            this.FooDY = util_1["default"].getRandomInt(10, 30);
        }
        var xdiff = x - this.FOOD_DATA.x;
        var ydiff = y - this.FOOD_DATA.y;
        var res = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
        if (res <= 20 && res >= 0) {
            this.Eat();
            FoodData_1["default"].RESULT = { quality: this.NUM / 8 - 1, success: true };
        }
        return FoodData_1["default"].RESULT;
    };
    return speedUpRes;
}(minigamebase_1["default"]));
exports["default"] = speedUpRes;
