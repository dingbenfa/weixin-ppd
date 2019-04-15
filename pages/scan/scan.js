Page({
  onReady() {
    this.ctx = wx.createCanvasContext('myCanvas');
    // ctx.setFillStyle('red');

    //进行绘制一个直角梯形
    // ctx.moveTo(0, 10)
    // ctx.lineTo(280, 10)
    // ctx.lineTo(280, 130)
    // ctx.lineTo(0, 80)
    // ctx.lineTo(0, 10)

    // //在图形中添加所需的图片信息
    // const pattern = ctx.createPattern('../../assets/images/user.png', 'repeat-x');
    // ctx.fillStyle = pattern;  //将图片信息进行填充

    // ctx.fill();

    // ctx.stroke()
    // ctx.draw()
  },
  render(){
    function drawVideo() {
      this.ctx.clearRect(0, 0, 200, 100)
      this.ctx.drawImage(this.video, 0, 0, 200, 100)
      setTimeout(drawVideo.bind(this), 0)
    }
    setTimeout(drawVideo.bind(this), 0)
  },
  onLoad() {
    this.ctxCamera = wx.createCameraContext()
  },
  takePhoto() {
    this.ctxCamera.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  startRecord() {
    this.ctxCamera.startRecord({
      success: (res) => {
        console.log('startRecord')
      }
    })
  },
  stopRecord() {
    this.ctxCamera.stopRecord({
      success: (res) => {
        this.setData({
          src: res.tempThumbPath,
          videoSrc: res.tempVideoPath
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  }
})