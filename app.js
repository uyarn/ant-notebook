//app.js
const threeDays = require('./utils/threeDays.js')
App({
  onLaunch: function () {
    
    // 初始化数据库
    wx.cloud.init()
    const APP_ID = 'wxc24cf8f6b0873508'
    const  APP_SECRET = '5687c425bc974ae74000653ecee30e85'
    // 设置三天 today、tomorro、yesterday
    wx.setStorageSync('threeDay', threeDays.getDays()) 
    // 本地日志。
    let logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getStorageSync('memo') == "" ? wx.setStorageSync('memo', {}) : ''
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: APP_ID,
            secret: APP_SECRET,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          success: function (res) {
            wx.setStorageSync('userId', res.data.openid)
          }
        })
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
    userInfo: null
  }
})
