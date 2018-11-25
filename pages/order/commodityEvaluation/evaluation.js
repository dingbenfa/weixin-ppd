// pages/order/commodityEvaluation/evaluation.js
Page({
  data: {
    isHid: true,
    evaluationLength: 0,
    // uploadFileList: ['../../../assets/images/items.jpg'],
    uploadFileList: [],
    score: 5
  },
  onLoad: function(options) {
    console.log(options);
  },
  //匿名发布
  handleIsHidSubmit() {
    this.setData({
      isHid: !this.data.isHid
    });
  },
  //商品评分
  handleGetScore(ev) {
    let index = Number(ev.currentTarget.dataset.index);
    this.setData({
      score: index
    });
  },
  //更新评价内容长度
  handleEvaluationLimits(ev) {
    let len = ev.detail.value.length;
    this.setData({
      evaluationLength: len
    });
  },
  //上传视频、图片
  handleUploadFile(ev) {
    const self = this;
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(res) {
            const data = res.data;
            //do something
            let imgUrl = res.data.imgUrl;
            self.uploadFileCallback(imgUrl);
          }
        })
      }
    });
  },
  uploadFileCallback(imgUrl){
    let uploadFileNum = this.data.uploadFileNum;
    let uploadFileList = this.data.uploadFileList;
    uploadFileList.push(imgUrl);
    this.setData({
      uploadFileNum: uploadFileNum++,
      uploadFileList: uploadFileList
    });
  },
  //评价提交
  bindFormSubmit(ev){
    console.log(ev);

    wx.navigateBack({
      delta: 1
    })
  }
})