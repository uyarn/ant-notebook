// pages/calendar/calendar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  next:function(e){
    console.log(e.detail)
  },
  dayClick:function(e){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let today = wx.getStorageSync('todoLists').today;
      let days_count = new Date(this.data.year, this.data.month, 0).getDate();
      let days_style = new Array(30).fill(
      { month: 'current', day: '1', color: 'white', background: '#8497ee'})
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