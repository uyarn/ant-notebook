// pages/calendar/calendar.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addSrc: '../../images/addCalendar.png',
    addCalendar:false,
    detailShows:false,
    detailShowIndex: -1
  },
  // 下个月点击事件
  next: function(e){
    // 非本月默认为1日,本月为当天。
      this.monthAction(e)
  },
  updateLists:function(e){
      let memoList = e.detail
      let memo = this.data.memo
      let lists = memo[this.data.date]
      // let k = Object.keys(memo)
      if(!memo[this.data.date])
        memo[this.data.date] = { }
      memo[this.data.date].lists = memoList
      this.setData({
         memoLists: memoList,
         memo: memo
      })
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
    let today = wx.getStorageSync('threeDay').today
    if (e.detail.currentMonth != today.month) {
      days_style[0].day = 1
      this.setData({ days_style: days_style })
    }
    else {
      days_style[0].day = e.detail.currentYear == today.year? today.day : 1 
      this.setData({ 
        days_style: days_style, 
        date:today.date,
        memoLists: this.data.memo[today.date] ? this.data.memo[today.date].lists : []
      })
    }
  },
  // 日期点击事件
  dayClick:function(e){
     let day = e.detail.day, year=e.detail.year, month=e.detail.month
     let date = year+'-' + month + '-' + day
     this.setData({
       days_style: [{month: 'current', day: day, color: '#000', background: '#ffecb3'}],
       date: date,
       memoLists: this.data.memo[date]?this.data.memo[date].lists:[]
     })
  },
  // 删除日历的某个项目
  deleteCalItem:function(e){
    let that = this
    let data = this.data
    let memoList = data.memoLists, memo = data.memo
    let idx = e.detail.index
    memoList.splice(idx,1)
    memo[data.date].lists = memoList
    this.setData({
      memoLists: memoList,
      memo: memo
    })
  },
  // 保存修改memo操作
  saveModify:function(e){
     let that = this
     let data = this.data
     let item = e.detail
     let memoList = data.memoLists , memo = data.memo
    memoList[item.index] = item.detail
    memo[data.date].lists = memoList
    this.setData({
      memoLists: memoList,
      memo: memo
    })
  },
  //展示添加组件
  addTodo: function () {
    this.setData({
      addCalendar: true
    })
  },
  //打开展示详情组件
  detailShow:function(e){
    this.setData({
      detailShows: true,
      detailShowIndex: e.detail,
      detailContent:this.data.memo[this.data.date].lists[e.detail]
    })
  },
  hiddenDialog: function (e) {
    this.setData({
      addCalendar: false,
      detailShows: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 初始化日历calendar
      let today = wx.getStorageSync('threeDay').today;
      let memo = null 
      let that = this
      // let memo = wx.getStorageSync('memo')[today.date]
      // 获取Memo列表数据
     db.collection('memo').where({
      _openid: wx.getStorageSync('userId')
       }).get().then(res => {
         console.log(res)
         let data = res.data;
         if(data.length > 0 ){
           that.setData({
             id: data[0]._id,
             memo:data[0].memoList,
             memoLists:data[0].memoList[today.date]?data[0].memoList[today.date].lists:[]
           })
         }
         else{
           that.setData({
              memo:{},
              memoLists:[]
           })
         }
      })
      let days_count = new Date(this.data.year, this.data.month, 0).getDate();
      let days_style = [
        { month: 'current', day: today.day, color: '#000', background: '#ffecb3'}]
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
    // 删除数据库内此条数据
    let that = this
    if(this.data.id){
    db.collection('memo').doc(this.data.id).update({
      data: {
        memoList: this.data.memo
      },
      sucess: function (res) {
         console.log('upload memo success!')
      }
    })
    }
    else
    {
      db.collection('memo').add({
        data:{
          memoList: this.data.memo
        },
        success:function(res){
           console.log(res)
           that.setData({ id : res._id})
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
       console.log('testing unload')
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