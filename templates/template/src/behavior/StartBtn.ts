
import minigamebase from './minigamebase'

export default class startBtn extends minigamebase {
  constructor({ctx,rpx,w,h,x,y}) {
    super();
    this.ctx = ctx;
    this.rpx = rpx;
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
  };
  private w: number = 0;
  private h: number = 0;
  private ctx: any;
  private rpx: number;
  private x: number = 0;
  private y: number = 0;
  private switch: boolean = true;
  public async init(callback) {
    this.System.wx.onTouchStart( (e) => {
      const xLeft = this.x;
      const yLeft = this.y;
      const xRight = this.x + this.w;
      const yRight = this.y + this.h;
      if(e.touches[0]['clientX'] >= xLeft && e.touches[0]['clientX'] <= xRight && e.touches[0]['clientY'] >= yLeft && e.touches[0]['clientY'] <=yRight){
        if(typeof callback == 'function' && this.switch){
          callback()
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
