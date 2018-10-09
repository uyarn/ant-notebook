// pages/calendar/calendar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  // 下个月事件
  next:function(e){
    
  },
  // 日期点击事件
  dayClick:function(e){
     let day = e.detail.day
     this.setData({
       days_style: [{month: 'current', day: day, color: '#fff', background: '#eb6e80'}]
     })
    // wx.request({
    //   url: 'http://www.deliciousfishchen.cn',
    //   method: 'get',
    //   header: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 初始化日历calendar
      let today = wx.getStorageSync('todoLists').today;
      let days_count = new Date(this.data.year, this.data.month, 0).getDate();
      let days_style = 
          [{ month: 'current', day: today.day, color: '#fff', background: '#eb6e80'}]
      this.setData({ days_style: days_style})
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