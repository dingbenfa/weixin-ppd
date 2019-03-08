//app.js
import WxValidate from './assets/plugins/wx-validate/WxValidate'
import WxService from './assets/plugins/wx-service/WxService'
import HttpResource from './helpers/HttpResource'
import HttpService from './helpers/HttpService'
import __config from './utils/config.js'

App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // console.log(res);
        let params = {
          code: res.code
        };
        this.HttpService.getLoginOpenId(params)
          .then(res => {
            console.log('获取openid');
            console.log(res);
            let openId = res.data.openid;
            this.globalData.openId = openId;
          });
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {              
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    openId: null,
    userInfo: null
  },
  handleToPayment: function (orderNo) { //发起支付
    const self = this;
    let params = {
      'openId': this.globalData.openId,
      'orderNumber': orderNo
    };
    this.HttpService.getToPayResult(params)
      .then(res => {
        console.log('支付接口返回');
        console.log(res);

        let resData = res.data;
        wx.requestPayment({
          'timeStamp': resData.timeStamp,
          'nonceStr': resData.nonceStr,
          'package': resData.pkg,
          'signType': 'MD5',
          'paySign': resData.paySign,
          'success': function(res) {
            self.handlePaymentCompleted(res);
          },
          'fail': function(res) {
            wx.showModal({
              title: '异常提示',
              content: '支付失败！',
              showCancel: false,
              success(res) {
                wx.navigateTo({
                  url: '/pages/order/order/index?orderStatus=0',
                })
              }
            });
            
          }
        })
      });
  },
  handlePaymentCompleted: function (res) { //支付完成
    console.log('支付完成');
    console.log(res);

    wx.showToast({
      title: "支付成功！",
      success: function(){
        wx.navigateTo({
          url: '/pages/order/order/index?orderStatus=1',
        })
      }
    });
  },
  getTestOrderNumber: function(){
    var orderNo = '11111111111111';
    for (var j = 0; j < 10; j++) {
      var randStr = "";
      for (var i = 0; i < 12; i++) {//此处的12为生成12位数字，可随即更改
        var randItem = Math.floor(Math.random() * 10);
        randStr += randItem;
      }
      orderNo = "766" + randStr;//此处的766是要求必须已766开头，如果不需要可以去掉并在for循环中填入你要的位数
    }
    return orderNo;
  },
  WxValidate: (rules, messages) => new WxValidate(rules, messages),
  HttpResource: (url, paramDefaults, actions, options) => new HttpResource(url, paramDefaults, actions, options).init(),
  HttpService: new HttpService({
    baseURL: __config.basePath,
  }),
  WxService: new WxService,
  __config
})