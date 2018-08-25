
import minigamebase from './minigamebase'

export default class reStart extends minigamebase {
  constructor({ctx,rpx,r,x,y}) {
    super();
    this.ctx = ctx;
    this.rpx = rpx;
    this.r = r;
    this.x = x;
    this.y = y;
  };
  private r: number = 0;
  private ctx: any;
  private rpx: number;
  private x: number = 0;
  private y: number = 0;
  private switch: boolean = true;
  public async init(callback) {
    this.System.wx.onTouchStart( (e) => {
      const x = Math.abs(this.x + this.r - e.touches[0]['clientX']) / this.rpx;
      const y = Math.abs(this.y + this.r - e.touches[0]['clientY']) / this.rpx;
      const r = Math.sqrt(x * x + y * y);
      if(r < this.r) {
        if(typeof callback == 'function' && this.switch) {
          callback();
        }
      }
    })
  };
  public stop() {
    this.switch = false;
  };
  public start() {
    this.switch = true;
  }
}
