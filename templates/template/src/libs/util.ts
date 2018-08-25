import System from './System';

class Util {
  public createdImage({src, ctx, x = 0, y = 0, w = 0, h = 0}: createdImageParams): any {
    const area = {
      t: y,
      b: y + h,
      l: x,
      r: x + w,
      c: {x: x + 0.5 * w, y: y + 0.5 * h}
    };
    return new Promise(function(resolve,reject){
      const image = System.wx.createImage();
      image.onload = function () {
        ctx.drawImage(image, x, y, w, h);
        resolve({image,area});
      }
      image.src = src;
    })
  };

  public downloadResource(url) {
    return new Promise(function(resolve, reject){
      try {
        System.wx.downloadFile({
          url: url,
          success(res){
            resolve(res.tempFilePath)
          },
          fail: reject
        })
      }catch(e){
        reject(e)
      }
    })
  }

  public getRandomInt(min: number, max: number): number {  
    let Range = max - min;  
    let Rand = Math.random();  
    return(min + Math.round(Rand * Range));  
  }
}

export default new Util();