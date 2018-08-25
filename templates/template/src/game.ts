import System from './libs/System'
import ScreenClass from './behavior/screen';
import Snake from './behavior/Snake';
import SpeedUp from './behavior/speedup';
import StartBtn from './behavior/StartBtn';
import reStart from './behavior/reStart';
import reward from './behavior/reward';
import Controller from './behavior/Controller';
import Util from './libs/util';
import Config from './libs/config';
import Food from './behavior/food';

export default new class Game {
  constructor() { this.init(); };

  private async init () {
    // 全局声明 canvas ctx rpx
    const canvas = System.wx.createCanvas();
    const ctx = canvas.getContext('2d');
    const rpx = 1 * canvas.width / 375;

    const SPEED_Up_PRAMAS = {
      src: Config.SpeedUpImg,
      ctx: ctx,
      x: 240 * rpx,
      y: 490 * rpx,
      r: 40 * rpx,
      w: 80 * rpx,
      h: 80 * rpx,
    };

    let NUM = Util.getRandomInt(1,3) * 5;
    let FooDX = Util.getRandomInt(30, canvas.width-150);
    let FooDY = Util.getRandomInt(30, canvas.height-150);
    if(FooDX >= 240 && FooDX <= 320) FooDX = 130;
    if(FooDY >= 490 && FooDY <= 570) FooDY = 130;

    let FOOD_DATA = {
      src: Config.shiwu,
      ctx: ctx,
      x: FooDX * rpx,
      y: Util.getRandomInt(0, canvas.height) * rpx,
      r: 30 * rpx,
      w: NUM * rpx,
      h: NUM * rpx,
    }

    // 加载图片，逻辑在图片加载后写
    Promise.all([
      Util.createdImage(SPEED_Up_PRAMAS),
      Util.createdImage({ctx, src: Config.pingmu}),
      Util.createdImage({ctx, src: Config.kaishiyouxi}),
      Util.createdImage({ctx, src: Config.fanhui}),
      Util.createdImage({ctx, src: Config.chonglai}),
      Util.createdImage({ctx, src: Config.shiwu}),
      Util.createdImage({ctx, src: Config.header}),
      Util.createdImage({ctx, src: Config.sheshen}),
      Util.createdImage({ctx, src: Config.gameStart}),
      Util.createdImage({ctx, src: Config.gameover}),
      Util.createdImage({ctx, src: Config.controlDisc}),
      Util.createdImage({ctx, src: Config.controlBtn}),
    ]).then(([speedUpRes,pingmu,kaishiyouxi,fanhui,chonglai,shiwu,header,sheshen,gamestart,gameover,controlDisc,controlBtn])=>{
      // 创建蛇
      const cSnake = new Snake({ctx,rpx,sheshen,header,canvas});
      //初始化控制器
      const controller = new Controller({rpx, ctx, controlDisc, controlBtn });
      // 创建屏幕屏幕
      const drawPingmu = () => {
        ctx.drawImage(pingmu.image, 0, 0, canvas.width, canvas.height);
      };
      // 创建闪电
      const drawSpeedUp = () =>{
        ctx.drawImage(speedUpRes.image, SPEED_Up_PRAMAS.x, SPEED_Up_PRAMAS.y, SPEED_Up_PRAMAS.w, SPEED_Up_PRAMAS.h);
      };
      //开屏
      const drawGameStart = () =>{
        ctx.drawImage(gamestart.image,0, 0, canvas.width, canvas.height);
      };
      //开始游戏
      const drawStartBtn = () =>{
        ctx.drawImage(kaishiyouxi.image,87*rpx, 500*rpx, 196*rpx, 71*rpx)
      };
      //游戏结束
      const drawGameOver = (score) =>{
        ctx.drawImage(gameover.image,62*rpx, 200*rpx, 252*rpx, 180*rpx);
        ctx.font="40px Arial";
        ctx.fillText(score,180 * rpx, 300 * rpx);
      };
      //重来
      const drawReStart = () =>{
        ctx.drawImage(fanhui.image,117*rpx, 400*rpx, 49*rpx, 67*rpx)
      };
      //返回
      const drawRewardback = () =>{
        ctx.drawImage(chonglai.image,207*rpx, 400*rpx, 49*rpx, 67*rpx)
      };
      //创建食物
      const drawFood  = () =>{
        ctx.drawImage(shiwu.image, FOOD_DATA.x, FOOD_DATA.y, FOOD_DATA.w, FOOD_DATA.h);
      };
      const cFood = new Food({FooDX,FooDY,NUM,FOOD_DATA,shiwu,canvas,rpx,ctx});

      const dieCb = (score) => {
        drawPingmu();
        drawGameOver(score);
        drawReStart();
        drawRewardback();
        const cReStart = new reStart({rpx, ctx,r: 55*rpx, x: 117*rpx, y: 400*rpx});
        cReStart.init(()=>{
          setTimeout(()=>{
            drawGameStart();
            drawStartBtn();
          },200)
          cReStart.stop();
          cReward.stop();
          cStartBtn.start();
        });
        
        const cReward = new reward({rpx, ctx, r: 55*rpx, x: 207*rpx, y: 400*rpx});
        cReward.init(()=>{
          cSnake.start({drawPingmu,drawSpeedUp,drawFood,controller,cFood,dieCb});
          cReStart.stop();
          cReward.stop();
        });
      }

      // 绘制开始
      drawGameStart();
      drawStartBtn();
      // 开始游戏按钮添加事件
      const cStartBtn = new StartBtn({rpx, ctx, w: 196*rpx, h: 71*rpx,x: 87*rpx, y: 500*rpx});
      cStartBtn.init(()=>{
        drawPingmu();
        drawSpeedUp();
        drawFood();
        // 初始化蛇
        cSnake.init({drawPingmu,drawSpeedUp,drawFood,controller,cFood,dieCb});
        //加速按钮添加事件
        const cSpeedUp = new SpeedUp({rpx, ctx, r: SPEED_Up_PRAMAS.r, x: SPEED_Up_PRAMAS.x, y: SPEED_Up_PRAMAS.y});
        cSpeedUp.init(()=>{
          console.log('你点击了闪电')
          
        });
        controller.init({drawPingmu,drawSpeedUp});
        cStartBtn.stop();
      });
    });
  };
};
