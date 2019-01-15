// pages/order/order/index.js
import userOrderInfo from '../../../data/myOrdersInfo';

//获取应用实例
var App = getApp();

Page({
  data: {
    orderStatus: 666, //默认全部
    userOrderList: userOrderInfo
  },
  onLoad: function (options) {
    // console.log(options);
    this.getOrderList();
    
    this.setData({
      orderStatus: Number(options.orderStatus)
    })
  },
  getOrderList(){
    App.HttpService.getOrderList()
      .then(res => {
        const data = res.data.responseData;
        console.log(data)

        // this.setData({
          
        // });
      });
  },
  //过滤订单状态
  handleOrderStatus(ev){
    let orderStatus = Number(ev.currentTarget.dataset.status);
    this.setData({
      orderStatus: orderStatus
    });
  },
  //取消订单
  headerOrderCancel(ev){
    let orderNo = ev.currentTarget.dataset.orderno;
    wx.showToast({
      title: "取消订单成功"
    });
  },
  //去付款
  handleToPay(ev){
    // let orderNo = ev.currentTarget.dataset.orderno;
    // wx.showToast({
    //   title: "跳转去付款"
    // });
    App.handleToPayment(); //去付款
  },
  // 查看物流
  handleLookUpLogistics(ev){
    let orderNo = ev.currentTarget.dataset.orderno;
    wx.showToast({
      title: "跳转查看物流信息"
    });
  },
  //确认收货
  handleGoodsConfirm(ev){
    let orderNo = ev.currentTarget.dataset.orderno;
    wx.showToast({
      title: "确认收货成功"
    });
  },
  //去评价
  handleGoodsEvaluate(ev){
    let orderNo = ev.currentTarget.dataset.orderno;
    wx.navigateTo({
      url: '../commodityEvaluation/evaluation?orderNo=' + orderNo,
    })
  },
  //看相似
  handleLookUpSimilar(ev){
    let orderNo = ev.currentTarget.dataset.orderno;
    wx.showToast({
      title: "跳转查找相似"
    });
  },
  //再次购买
  handleRepurchase(ev){
    let orderNo = ev.currentTarget.dataset.orderno;
    wx.showToast({
      title: "跳转再次购买"
    });
  },
  //跳转详情
  handleNavigateToOrderDetails(ev){
    let orderNo = ev.currentTarget.dataset.orderno;
    wx.navigateTo({
      url: '../orderDetails/index?orderNo=' + orderNo,
    })
  }
})