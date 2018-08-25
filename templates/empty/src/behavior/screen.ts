
import System from '../libs/System';

export default class ScreenClass {
  public init(canvas) {
    // 创建屏幕
    const context = canvas.getContext('2d');
    context.fillStyle = '#12d1fd';
    context.fillRect(0, 0, canvas.width, canvas.height);

  } 
}