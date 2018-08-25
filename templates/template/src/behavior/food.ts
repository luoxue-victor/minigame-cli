
import minigamebase from './minigamebase';
import Data from '../store/FoodData';
import Util from '../libs/util';
import System from '../libs/System';

export default class speedUpRes extends minigamebase {

    constructor({FooDX,FooDY,NUM,FOOD_DATA,shiwu,canvas,rpx,ctx}){
      super();
      // this.FooDX = FooDX;
      // this.FooDY = FooDY;
      this.NUM = NUM;
      this.FOOD_DATA = FOOD_DATA;
      this.shiwu = shiwu;
      this.canvas = canvas;
      this.rpx = rpx;
      this.ctx = ctx;
    }
    private FooDX:number;
    private FooDY:number;
    private NUM:number;
    private FOOD_DATA:any;
    private shiwu:any;
    private canvas:any;
    private rpx:any;
    private ctx:any;


  public async init({FooDX,FooDY,NUM,FOOD_DATA,shiwu}){}

  public  Eat(){
      this.NUM = Util.getRandomInt(2,4) * 8;
      this.FOOD_DATA.x = Util.getRandomInt(30, this.canvas.width-150)* this.rpx;
      this.FOOD_DATA.y = Util.getRandomInt(30, this.canvas.height-150)* this.rpx;
      this.FOOD_DATA.w = this.NUM * this.rpx;
      this.FOOD_DATA.h = this.NUM * this.rpx;
      if(this.FOOD_DATA.x >= 240 && this.FOOD_DATA.x <= 320) this.FOOD_DATA.x = 130;
      if(this.FOOD_DATA.h >= 490 && this.FOOD_DATA.h <= 570) this.FOOD_DATA.h = 130;
      const drawFood  = () =>{
        this.ctx.drawImage(this.shiwu.image, this.FOOD_DATA.x, this.FOOD_DATA.y, this.FOOD_DATA.w, this.FOOD_DATA.h);
      };
  }

  public whetherProduceFood(x,y){
    Data.RESULT = {quality:0,success:false}
    if(x == this.FOOD_DATA.x || y == this.FOOD_DATA.y){
      this.FooDX = Util.getRandomInt(10,30);
      this.FooDY =  Util.getRandomInt(10,30);
    }
    let xdiff = x - this.FOOD_DATA.x;  
    let ydiff = y - this.FOOD_DATA.y;  
    let res = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5); 
    if(res <= 20 && res >= 0){
      this.Eat();
      Data.RESULT = {quality:this.NUM / 8 - 1,success:true}
    }
    return Data.RESULT;
  }
   
}