
import conf from './libs/config';
import System from './libs/System'
import ScreenClass from './behavior/screen';

class Game {
  constructor() {
    this.init();
  }

  private init () {
    // 全局声明canvas
    const canvas = System.wx.createCanvas();
    // 实例化屏幕 并传给屏幕全局canvas
    const s = new ScreenClass();
    s.init(canvas);
  }
}

export default new Game();

