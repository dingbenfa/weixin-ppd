// pages/categoryList/categoryList.js
var App = getApp();
import indexData from '../../data/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.categoryId
    });

    this.handleNavigationBarTitle();
  },
  //动态设置标题
  handleNavigationBarTitle(){
    var id = this.data.id;
    var arr = indexData.categoryList;
    for(var i=0;i<arr.length;i++){
      if(arr[i].id==id){
          this.setData({
            title: arr[i].name
          });
          break;
      }
    }

    wx.setNavigationBarTitle({
      title: this.data.title
    });
  }
})