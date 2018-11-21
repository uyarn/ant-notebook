//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '每天起床第一句, 先给自己打个气 (๑•̀ㅂ•́)و✧',
    remind:'谨慎保存噢 一天只能修改一次 ﾍ|･∀･|ﾉ*~●',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    iconType:'success'
  },
  onLoad: function () {
    let now = new Date();
    now = now.getDate()
    let date = wx.getStorageSync('date') || ''
    if(now!=date){
      wx.setStorageSync('date', now)
      wx.setStorageSync('save', false)
    }
    this.setData({ save: wx.getStorageSync('save')})
    this.setData({ encourage: wx.getStorageSync('encourage') })
       
    if (app.globalData.userInfo) {
      let userInfo = app.globalData.userInfo
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } 
    else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function(){
    let now = new Date();
    now = now.getDate()
    let date = wx.getStorageSync('date') || ''
    if (now != date) {
      wx.setStorageSync('date', now)
      wx.setStorageSync('save', false)
    }
    this.setData({ save: wx.getStorageSync('save') })
    this.setData({ encourage: wx.getStorageSync('encourage') })
  },
  getUserInfo: function(e) {
    console.log(app.globalData.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
