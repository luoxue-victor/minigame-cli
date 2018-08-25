
import System from '../libs/System';

export default class ScreenClass {
  public async init({canvas,ctx,rpx}) {
    // 创建屏幕
    ctx.fillStyle = 'white'; //'#12d1fd';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } 
}