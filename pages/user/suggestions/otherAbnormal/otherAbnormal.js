// pages/user/suggestions/otherAbnormal/otherAbnormal.js
Page({
  data: {
    agreeCheck: true,
    abnormalLength: 0,
    uploadFileList: []
  },
  onLoad: function(options) {

  },
  checkboxChange(ev) {
    this.setData({
      agreeCheck: !this.data.agreeCheck
    });
  },
  handleAbnormalLimits(ev) {
    let len = ev.detail.value.length;
    this.setData({
      abnormalLength: len
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
  uploadFileCallback(imgUrl) {
    let uploadFileList = this.data.uploadFileList;
    uploadFileList.push(imgUrl);
    this.setData({
      uploadFileList: uploadFileList
    });
  }
})