// pages/calendar/calendar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addSrc: '../../images/addCalendar.png',
    dialogShow:false
  },
  // 下个月点击事件
  next: function(e){
    // 非本月默认为1日,本月为当天。
      this.monthAction(e)
  },
  // 上个月点击事件
  prev: function(e){
    this.monthAction(e)
  },
  // 日期Picker事件
  dateChange: function (e) {
    this.monthAction(e)
  },
  // 日期选择处理事件
  monthAction:function(e){
    let days_style = this.data.days_style
    let today = wx.getStorageSync('todoLists').today
    if (e.detail.currentMonth != today.month) {
      days_style[0].day = 1
      this.setData({ days_style: days_style })
    }
    else {
      days_style[0].day = e.detail.currentYear == today.year? today.day : 1 
      this.setData({ days_style: days_style })
    }
  },
  // 日期点击事件
  dayClick:function(e){
     let day = e.detail.day, year=e.detail.year,month=e.detail.month
     this.setData({
       days_style: [{month: 'current', day: day, color: '#fff', background: '#eb6e80'}],
       date:  year+'-'+month+'-'+day
     })
    // wx.request({
    // })
  },
  addTodo: function () {
    this.setData({
      dialogShow: true
    })
  },
  hiddenDialog: function (e) {
    this.setData({
      dialogShow: false
    })
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
      this.setData({
         days_style: days_style,
         date:today.date
         })
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