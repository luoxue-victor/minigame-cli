"use strict";
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
var System_1 = require('./libs/System.js');
var Snake_1 = require('./behavior/Snake.js');
var speedup_1 = require('./behavior/speedup.js');
var StartBtn_1 = require('./behavior/StartBtn.js');
var reStart_1 = require('./behavior/reStart.js');
var reward_1 = require('./behavior/reward.js');
var Controller_1 = require('./behavior/Controller.js');
var util_1 = require('./libs/util.js');
var config_1 = require('./libs/config.js');
var food_1 = require('./behavior/food.js');
exports["default"] = new /** @class */ (function () {
    function Game() {
        this.init();
    }
    ;
    Game.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var canvas, ctx, rpx, SPEED_Up_PRAMAS, NUM, FooDX, FooDY, FOOD_DATA;
            return __generator(this, function (_a) {
                canvas = System_1["default"].wx.createCanvas();
                ctx = canvas.getContext('2d');
                rpx = 1 * canvas.width / 375;
                SPEED_Up_PRAMAS = {
                    src: config_1["default"].SpeedUpImg,
                    ctx: ctx,
                    x: 240 * rpx,
                    y: 490 * rpx,
                    r: 40 * rpx,
                    w: 80 * rpx,
                    h: 80 * rpx
                };
                NUM = util_1["default"].getRandomInt(1, 3) * 5;
                FooDX = util_1["default"].getRandomInt(30, canvas.width - 150);
                FooDY = util_1["default"].getRandomInt(30, canvas.height - 150);
                if (FooDX >= 240 && FooDX <= 320)
                    FooDX = 130;
                if (FooDY >= 490 && FooDY <= 570)
                    FooDY = 130;
                FOOD_DATA = {
                    src: config_1["default"].shiwu,
                    ctx: ctx,
                    x: FooDX * rpx,
                    y: util_1["default"].getRandomInt(0, canvas.height) * rpx,
                    r: 30 * rpx,
                    w: NUM * rpx,
                    h: NUM * rpx
                };
                // 加载图片，逻辑在图片加载后写
                Promise.all([
                    util_1["default"].createdImage(SPEED_Up_PRAMAS),
                    util_1["default"].createdImage({ ctx: ctx, src: config_1["default"].pingmu }),
                    util_1["default"].createdImage({ ctx: ctx, src: config_1["default"].kaishiyouxi }),
                    util_1["default"].createdImage({ ctx: ctx, src: config_1["default"].fanhui }),
                    util_1["default"].createdImage({ ctx: ctx, src: config_1["default"].chonglai }),
                    util_1["default"].createdImage({ ctx: ctx, src: config_1["default"].shiwu }),
                    util_1["default"].createdImage({ ctx: ctx, src: config_1["default"].header }),
                    util_1["default"].createdImage({ ctx: ctx, src: config_1["default"].sheshen }),
                    util_1["default"].createdImage({ ctx: ctx, src: config_1["default"].gameStart }),
                    util_1["default"].createdImage({ ctx: ctx, src: config_1["default"].gameover }),
                    util_1["default"].createdImage({ ctx: ctx, src: config_1["default"].controlDisc }),
                    util_1["default"].createdImage({ ctx: ctx, src: config_1["default"].controlBtn }),
                ]).then(function (_a) {
                    var speedUpRes = _a[0], pingmu = _a[1], kaishiyouxi = _a[2], fanhui = _a[3], chonglai = _a[4], shiwu = _a[5], header = _a[6], sheshen = _a[7], gamestart = _a[8], gameover = _a[9], controlDisc = _a[10], controlBtn = _a[11];
                    // 创建蛇
                    var cSnake = new Snake_1["default"]({ ctx: ctx, rpx: rpx, sheshen: sheshen, header: header, canvas: canvas });
                    //初始化控制器
                    var controller = new Controller_1["default"]({ rpx: rpx, ctx: ctx, controlDisc: controlDisc, controlBtn: controlBtn });
                    // 创建屏幕屏幕
                    var drawPingmu = function () {
                        ctx.drawImage(pingmu.image, 0, 0, canvas.width, canvas.height);
                    };
                    // 创建闪电
                    var drawSpeedUp = function () {
                        ctx.drawImage(speedUpRes.image, SPEED_Up_PRAMAS.x, SPEED_Up_PRAMAS.y, SPEED_Up_PRAMAS.w, SPEED_Up_PRAMAS.h);
                    };
                    //开屏
                    var drawGameStart = function () {
                        ctx.drawImage(gamestart.image, 0, 0, canvas.width, canvas.height);
                    };
                    //开始游戏
                    var drawStartBtn = function () {
                        ctx.drawImage(kaishiyouxi.image, 87 * rpx, 500 * rpx, 196 * rpx, 71 * rpx);
                    };
                    //游戏结束
                    var drawGameOver = function (score) {
                        ctx.drawImage(gameover.image, 62 * rpx, 200 * rpx, 252 * rpx, 180 * rpx);
                        ctx.font = "40px Arial";
                        ctx.fillText(score, 180 * rpx, 300 * rpx);
                    };
                    //重来
                    var drawReStart = function () {
                        ctx.drawImage(fanhui.image, 117 * rpx, 400 * rpx, 49 * rpx, 67 * rpx);
                    };
                    //返回
                    var drawRewardback = function () {
                        ctx.drawImage(chonglai.image, 207 * rpx, 400 * rpx, 49 * rpx, 67 * rpx);
                    };
                    //创建食物
                    var drawFood = function () {
                        ctx.drawImage(shiwu.image, FOOD_DATA.x, FOOD_DATA.y, FOOD_DATA.w, FOOD_DATA.h);
                    };
                    var cFood = new food_1["default"]({ FooDX: FooDX, FooDY: FooDY, NUM: NUM, FOOD_DATA: FOOD_DATA, shiwu: shiwu, canvas: canvas, rpx: rpx, ctx: ctx });
                    var dieCb = function (score) {
                        drawPingmu();
                        drawGameOver(score);
                        drawReStart();
                        drawRewardback();
                        var cReStart = new reStart_1["default"]({ rpx: rpx, ctx: ctx, r: 55 * rpx, x: 117 * rpx, y: 400 * rpx });
                        cReStart.init(function () {
                            setTimeout(function () {
                                drawGameStart();
                                drawStartBtn();
                            }, 200);
                            cReStart.stop();
                            cReward.stop();
                            cStartBtn.start();
                        });
                        var cReward = new reward_1["default"]({ rpx: rpx, ctx: ctx, r: 55 * rpx, x: 207 * rpx, y: 400 * rpx });
                        cReward.init(function () {
                            cSnake.start({ drawPingmu: drawPingmu, drawSpeedUp: drawSpeedUp, drawFood: drawFood, controller: controller, cFood: cFood, dieCb: dieCb });
                            cReStart.stop();
                            cReward.stop();
                        });
                    };
                    // 绘制开始
                    drawGameStart();
                    drawStartBtn();
                    // 开始游戏按钮添加事件
                    var cStartBtn = new StartBtn_1["default"]({ rpx: rpx, ctx: ctx, w: 196 * rpx, h: 71 * rpx, x: 87 * rpx, y: 500 * rpx });
                    cStartBtn.init(function () {
                        drawPingmu();
                        drawSpeedUp();
                        drawFood();
                        // 初始化蛇
                        cSnake.init({ drawPingmu: drawPingmu, drawSpeedUp: drawSpeedUp, drawFood: drawFood, controller: controller, cFood: cFood, dieCb: dieCb });
                        //加速按钮添加事件
                        var cSpeedUp = new speedup_1["default"]({ rpx: rpx, ctx: ctx, r: SPEED_Up_PRAMAS.r, x: SPEED_Up_PRAMAS.x, y: SPEED_Up_PRAMAS.y });
                        cSpeedUp.init(function () {
                            console.log('你点击了闪电');
                        });
                        controller.init({ drawPingmu: drawPingmu, drawSpeedUp: drawSpeedUp });
                        cStartBtn.stop();
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    ;
    return Game;
}());
