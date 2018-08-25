import System from '../libs/System';

export default {
  directionState: {x: -1, y: 0},
  setDirection ({x = 0, y = 0}) {
    // 修正坐标系
    this.directionState = {x, y: -y};
  },
  get getDirection () {
    return this.directionState;
  },
  selfTest() {
    setInterval(()=>{
      let x = Number(Math.random().toFixed(3));
      let y = Math.sqrt(1 - x * x);
      this.setDirection({x, y});
    },1000);
  }
}