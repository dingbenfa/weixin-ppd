import WxRequest from '../assets/plugins/wx-request/lib/index'

class HttpService extends WxRequest {
  constructor(options) {
    super(options)
    this.$$prefix = ''
    this.$$path = {
      home: '/mobile/home/mall',
      community: '/mobile/home/community',
      cart: '/mobile/home/cart',
      user: '/mobile/home/my'
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

}

export default HttpService