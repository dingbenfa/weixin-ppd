// pages/index/index-detail/index-detail.js
import indexData from '../../../data/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    goodsId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goodsId: options.goodsId
    });

    this.handleNavigationBarTitle();
  },
  //动态设置标题
  handleNavigationBarTitle() {
    var id = this.data.goodsId;
    var arr1 = indexData.indexData[0].list;
    var arr2 = indexData.indexData[1].list;
    var arr = arr1.concat(arr2);
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id == id) {
        this.setData({
          title: arr[i].name
        });
        break;
      }
    }

    wx.setNavigationBarTitle({
      title: this.data.title
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})