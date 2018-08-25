"use strict";
exports.__esModule = true;
exports["default"] = {
    directionState: { x: -1, y: 0 },
    setDirection: function (_a) {
        var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c;
        // 修正坐标系
        this.directionState = { x: x, y: -y };
    },
    get getDirection() {
        return this.directionState;
    },
    selfTest: function () {
        var _this = this;
        setInterval(function () {
            var x = Number(Math.random().toFixed(3));
            var y = Math.sqrt(1 - x * x);
            _this.setDirection({ x: x, y: y });
        }, 1000);
    }
};
