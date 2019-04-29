import WxRequest from '../assets/plugins/wx-request/lib/index'

class HttpService extends WxRequest {
  constructor(options) {
    super(options)
    this.$$prefix = ''
    this.$$path = {
      pay: '/pays/jspay',
      session: '/pays/code2session',
      home: '/mobile/home/mall',
      community: '/mobile/home/community',
      cart: '/mobile/home/cart',
      user: '/mobile/home/my',
      category: '/mobile/home/categories',
      account: '/mobile/home/currentUserInfo',
      orderList: '/mobile/home/my/orderList',
      carbasic: '/engine/carbasic',
      carcard: '/engine/carcard',
      searchmodels: '/engine/part/searchmodels',
      cpSearch: '/engine/part/search',
      storeList: '/mobile/contract/storeList'
    }
    this.interceptors.use({
      request(request) {
        request.header = request.header || {}
        request.header['content-type'] = 'application/json'
        if (request.url.indexOf('/api') !== -1 && wx.getStorageSync('token')) {
          request.header.Authorization = 'Bearer ' + wx.getStorageSync('token')
        }
        wx.showLoading({
          title: '加载中',
        })
        return request
      },
      requestError(requestError) {
        wx.hideLoading()
        return Promise.reject(requestError)
      },
      response(response) {
        wx.hideLoading()
        if (response.statusCode === 401) {
          wx.removeStorageSync('token')
          wx.redirectTo({
            url: '/pages/login/index'
          })
        }
        return response
      },
      responseError(responseError) {
        wx.hideLoading()
        return Promise.reject(responseError)
      },
    })
  }

  getToPayResult(params) {
    return this.getRequest(this.$$path.pay,{
      data: params
    })
  }

  getLoginOpenId(params) {
    return this.getRequest(this.$$path.session, {
      data: params
    })
  }

  getHomeInfo() {
    return this.getRequest(this.$$path.home)
  }

  getCommunityInfo() {
    return this.getRequest(this.$$path.community)
  }

  getCartInfo() {
    return this.getRequest(this.$$path.cart)
  }

  getUserInfo() {
    return this.getRequest(this.$$path.user)
  }

  getCategoryInfo() {
    return this.getRequest(this.$$path.category)
  }

  getAccountInfo() {
    return this.getRequest(this.$$path.account)
  }

  getOrderList() {
    return this.getRequest(this.$$path.orderList)
  }

  searchCarbasic(params) {
    return this.getRequest(this.$$path.carbasic, {
      data: params
    })
  }

  getEleTronicResult(params){
    return this.getRequest(this.$$path.carcard, {
      data: params
    })
  }

  getSearchmodels(params) {
    return this.getRequest(this.$$path.searchmodels, {
      data: params
    })
  }

  getCpSearchInfo(params) {
    return this.getRequest(this.$$path.cpSearch, {
      data: params
    })
  }

  getStoreList(params){
    return this.getRequest(this.$$path.storeList, {
      data: params
    })
  }

}

export default HttpService