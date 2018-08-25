import minigamebase from './minigamebase';
import Data from '../store/ControllerData';
import SnakeData from '../store/SnakeData';
export default class speedUpRes extends minigamebase {

  constructor({ctx,rpx,controlDisc,controlBtn}) {
    super();
    this.ctx = ctx;
    this.rpx = rpx;
    this.controlDisc = controlDisc;
    this.controlBtn = controlBtn
  };
  private controlDisc: any;
  private controlBtn: any;
  private ctx: any;
  private rpx: number;
  private CONTROLDISC : {
    x: number;
    y: number;
    r: number;
    w: number;
    h: number;
  };
  private CONTROLBTN : {
    x: number;
    y: number;
    r: number;
    w: number;
    h: number;
  };
  private distance: number;
  private center : {
    x: number,
    y: number
  }
  private dis: number;
  private diffX: number;
  private diffY: number;

  // 创建控制器圆盘
  public drawControlDisc () {
    this.ctx.drawImage(this.controlDisc.image, this.CONTROLDISC.x, this.CONTROLDISC.y, this.CONTROLDISC.w, this.CONTROLDISC.h);
  };
  // 创建控制器点
  public drawControlBtn(image: string = this.controlBtn.image, x: number = this.CONTROLBTN.x, y: number = this.CONTROLBTN.y) {
    this.ctx.drawImage(image, x, y, this.CONTROLBTN.w, this.CONTROLBTN.h);
  };

  public async init({drawPingmu,drawSpeedUp}) {
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
      h: 50 * this.rpx,
    }
    this.distance = this.CONTROLDISC.r;
    this.center = {
      x: this.CONTROLDISC.x + this.CONTROLDISC.r,
      y: this.CONTROLDISC.y + this.CONTROLDISC.r
    };
    this.drawControlDisc()
    this.drawControlBtn()
    this.System.wx.onTouchStart( (e) => {
      const x = Math.abs(this.center.x - e.touches[0]['clientX']) / this.rpx;
      const y = Math.abs(this.center.y - e.touches[0]['clientY']) / this.rpx;
      this.dis = Math.sqrt(x * x + y * y);
      this.calController(e,this.dis);
    });

    this.System.wx.onTouchMove( (e) => {
      const x = Math.abs(this.center.x - e.touches[0]['clientX']) / this.rpx;
      const y = Math.abs(this.center.y - e.touches[0]['clientY']) / this.rpx;
      this.dis = Math.sqrt(x * x + y * y);
      this.calController(e,this.dis);
    });

    this.System.wx.onTouchEnd( (e) => {
      // drawPingmu()
      // drawSpeedUp()
      // this.drawControlDisc()
      // this.drawControlBtn()
    })
  };

  public calController(e,r){
    if(r<this.distance+50*this.rpx){
      this.diffX = e.touches[0]['clientX'] - this.center.x;
      this.diffY = e.touches[0]['clientY'] - this.center.y;
      let l =  Math.sqrt(this.diffX * this.diffX + this.diffY * this.diffY)
      let cos = this.diffX/l
      let sin = this.diffY/l
      SnakeData.setDirection({x:cos,y:sin})
    }
  };

  public drawController(){
    this.drawControlDisc()
    if (!this.dis) {
      this.drawControlBtn();
    } else {
      if(this.dis>this.distance){
        this.drawControlBtn(this.controlBtn.image,this.CONTROLBTN.x+this.CONTROLDISC.r*SnakeData.directionState.x,this.CONTROLBTN.y-this.CONTROLDISC.r*SnakeData.directionState.y)
      }else{
        this.drawControlBtn(this.controlBtn.image,this.CONTROLBTN.x+this.diffX,this.CONTROLBTN.y+this.diffY)
      }
    }
    
  };
}