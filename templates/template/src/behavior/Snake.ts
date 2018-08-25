
import minigamebase from './minigamebase';
import Data from '../store/SnakeData';
export default class speedUpRes extends minigamebase {
  constructor({ctx,rpx,sheshen,header,canvas}) {
    super();
    this.ctx = ctx;
    this.rpx = rpx;
    this.header = header;
    this.sheshen = sheshen;
    this.canvas = canvas;
  };
  private ctx: any;
  private rpx: number;
  private switch: boolean = true;
  private header;
  private sheshen;
  private canvas;
  private track: {x: number;y: number;deg: number}[];
  private x: number;
  private y: number;
  private snake = [];
  private timer: number = null;
  private initParams;
  private lockEat: boolean = false;
  public clearInit() {
    this.track = [];
    this.snake = [];
  }
  public async init({drawPingmu,drawSpeedUp,drawFood,controller,cFood,dieCb}) {
    this.initParams = {drawPingmu,drawSpeedUp,drawFood,controller,cFood,dieCb};
    this.clearInit();

    this.x = 200 * this.rpx;
    this.y = 300 * this.rpx;
    this.track = [{x: this.x,y: this.y,deg: 20}];
    this.pushTrack({quality: 2,direction: {x: 1, y: 0}});

    this.addSnake(0,'header',187);
    this.addQuality(2);

    this.timer = setInterval(()=>{
      drawPingmu();
      drawSpeedUp();
      drawFood();
      let q = cFood.whetherProduceFood(this.snake[0].x,this.snake[0].y);
      
      controller.drawController();
      let deg = (Math.acos(-Data.getDirection.x) * 180 / Math.PI) + 187;
      let shenshenDeg = (Math.acos(-Data.getDirection.x) * 180 / Math.PI) + 20;
      if(Data.getDirection.y < 0) {
        deg = 360 - deg; 
        shenshenDeg = 360 - deg;
      }

      this.track[0].x += Data.getDirection.x * this.rpx * 3;
      this.track[0].y -= Data.getDirection.y * this.rpx * 3;
      this.track[0].deg = deg;

      this.track.unshift({x: this.track[0].x,y: this.track[0].y,deg});
      this.addSnake(0,'header',deg);
      this.addSnake(1,'sheshen',shenshenDeg);
      this.addSnake(2,'sheshen',shenshenDeg);

      if(q.success && !this.lockEat) {
        this.addQuality(q.quality);
        this.lockEat = true;
      }
      if(q.success) this.lockEat = false;
      this.drawSnake();
      this.checkDie();

    },40);

  };

  private addQuality(quality: number = 2,direction = {x: 1,y: 0}) {
    while(quality--) {
      let snakeLen = this.snake.length;
      this.pushTrack({quality: 1,direction});
      this.addSnake(snakeLen);
    }
  }

  private pushTrack({quality = 1,direction = {x: 1,y: 0}}: {quality: number;direction: {x: number;y: number}}) {
    let i = quality * 5;
    while(i) {
      i--;
      let deg = (Math.acos(-Data.getDirection.x) * 180 / Math.PI) + 187;
      let shenshenDeg = (Math.acos(-Data.getDirection.x) * 180 / Math.PI) + 20;
      this.track.push({x: direction.x * 3 + this.x, y: direction.y * 3 + this.y,deg: shenshenDeg});
      this.x += direction.x * 3;
      this.y += direction.y * 3;
    };
  };

  private drawSnake() {
    let j = 0;
    for(let i = 0;i < this.snake.length - 1; i++) {
      j = i * 5;
      this.position({x: this.track[j].x, y: this.track[j].y, w: 30 * this.rpx,h: 30 * this.rpx,image: this[this.snake[i].type].image,deg: this.snake[i].deg});
    }
  }

  private addSnake(index: number, type: string = 'sheshen',deg: number = 20) {
    let i = index * 5;
    this.position({x: this.track[i].x, y: this.track[i].y, w: 30 * this.rpx,h: 30 * this.rpx,image: this[type].image,deg});
    this.snake[index] = Object.assign({},{type,deg},this.track[i]);
  };

  private position ({x,y,image,w,h,deg}) {
    this.ctx.translate(x,y);
    this.ctx.rotate(deg * Math.PI / 180);
    this.ctx.drawImage(image, -0.5 * w, -0.5 * h, w, h);
    this.ctx.rotate(-deg * Math.PI / 180);
    this.ctx.translate(-1 * x, -1 * y);
  }

  public stop() {
    clearInterval(this.timer);
  };

  public start(initParams) {
    this.init(initParams || this.initParams);
  };

  private checkDie() {
    if (
      this.snake[0].x - 15 * this.rpx >= 375 
      || this.snake[0].x - 15 * this.rpx <= 0 
      || this.snake[0].y - 15 * this.rpx <= 0 
      || this.snake[0].y - 15 * this.rpx > this.canvas.height / 375 * this.canvas.width
    ) {
      clearInterval(this.timer);
      if(this.initParams.dieCb && typeof this.initParams.dieCb === 'function') {
        this.initParams.dieCb(this.snake.length - 3);
      }
    }
  }
}