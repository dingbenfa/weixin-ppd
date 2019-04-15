Page({
  data: {
    x: 0,
    y: 0,
    w: 250,
    h: 450,
    speed: 10,
    imgSrc: '/assets/ren.png',
    dirIndex: 1,
    speed: 1000000,
  },
  onReady() {
    this.render()
  },
  onLoad() {

  },
  render() {
    var i = 2;
    var that = this;
    var ctx = wx.createCanvasContext('myCanvas');

    ctx.clearRect(0, 0, 70, 120); //ctx就是传递过来的上下文
    ctx.drawImage(
      that.data.imgSrc,
      that.data.x,
      that.data.y,
      that.data.w,
      that.data.h
    );
    ctx.draw()

    setTimeout(function() {
      ctx.clearRect(0, 0, 70, 120); //ctx就是传递过来的上下文
      ctx.drawImage(
        that.data.imgSrc,
        that.data.x - 62,
        that.data.y * that.data.dirIndex,
        that.data.w,
        that.data.h
      );
      i++;
      ctx.draw()
    }, 1000);

    setTimeout(function () {
      ctx.clearRect(0, 0, 70, 120); //ctx就是传递过来的上下文
      ctx.drawImage(
        that.data.imgSrc,
        that.data.x - 125,
        that.data.y * that.data.dirIndex,
        that.data.w,
        that.data.h
      );
      i++;
      ctx.draw()
    }, 2000);

    setTimeout(function () {
      ctx.clearRect(0, 0, 70, 120); //ctx就是传递过来的上下文
      ctx.drawImage(
        that.data.imgSrc,
        that.data.x - 188,
        that.data.y * that.data.dirIndex,
        that.data.w,
        that.data.h
      );
      i++;
      ctx.draw()
    }, 3000);
  }
})