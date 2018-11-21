// pages/calendars/calendars.js
const db = wx.cloud.database()
const query = require('../../utils/database/queryData.js')
const updateMemo = require('../../utils/database/calendars/updateMemo.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addSrc: '../../images/addCalendar.png',
    addCalendar: false,
    detailShows: false,
    detailShowIndex: -1
  },
  // 下个月点击事件
  next: function (e) {
    // 非本月默认为1日,本月为当天。
    this.monthAction(e)
  },
  // 上个月点击事件
  prev: function (e) {
    this.monthAction(e)
  },
  // 日期Picker事件
  dateChange: function (e) {
    this.monthAction(e)
  },
  // 日期点击事件
  dayClick: function (e) {
    let day = e.detail.day, year = e.detail.year, month = e.detail.month
    let date = year + '-' + month + '-' + day
    this.setData({
      days_style: [{ month: 'current', day: day, color: '#000', background: '#ffecb3' }],
      date: date,
      memoLists: this.data.memo[date] ? this.data.memo[date].lists : []
    })
  },
  // 日期选择处理事件
  monthAction: function (e) {
    let days_style = this.data.days_style
    let today = wx.getStorageSync('threeDay').today
    if (e.detail.currentMonth != today.month) {
      days_style[0].day = 1
      this.setData({ days_style: days_style })
    }
    else {
      days_style[0].day = e.detail.currentYear == today.year ? today.day : 1
      this.setData({
        days_style: days_style,
        date: today.date,
        memoLists: this.data.memo[today.date] ? this.data.memo[today.date].lists : []
      })
    }
  },
  // 更新todoLists
  updateLists: function (e) {
    let that = this
    let memoList = e.detail
    let memo = this.data.memo
    let lists = memo[this.data.date]
    // let k = Object.keys(memo)
    if (!memo[this.data.date])
      memo[this.data.date] = {}
    memo[this.data.date].lists = memoList
    if (this.data.id) {
      // 存在id 即存在memo更新列表
      updateMemo.updateMemo(db, this.data.id, memo, memoList, this)
    }
    // 不存在id 新增
    else {
      db.collection('memo').add({
        data: {
          memoList: this.data.memo
        },
        success: function (res) {
          that.setData({ 
            id: res._id,
            memoLists: memoList,
            memo: memo})
        }
      })
    }
  },
  // 删除日历的某个项目
  deleteCalItem: function (e) {
    let data = this.data
    let memoList = data.memoLists, memo = data.memo
    let idx = e.detail
    let imgId = memoList[idx].image
    memoList.splice(idx, 1)
    memo[data.date].lists = memoList
    updateMemo.updateMemo(db, this.data.id, memo, memoList, this, true,imgId)
  },
  // 保存修改memo操作
  saveModify: function (e) {
    let data = this.data
    let item = e.detail
    let memoList = data.memoLists, memo = data.memo
    memoList[item.index] = item.detail
    memo[data.date].lists = memoList
    updateMemo.updateMemo(db, this.data.id, memo, memoList, this)
  },
  //展示添加组件
  addTodo: function () {
    this.setData({
      addCalendar: true
    })
  },
  //打开展示详情组件
  detailShow: function (e) {
    this.setData({
      detailShows: true,
      detailShowIndex: e.detail,
      detailContent: this.data.memo[this.data.date].lists[e.detail]
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
    let days_count = new Date(this.data.year, this.data.month, 0).getDate();
    let days_style = [
      { month: 'current', day: today.day, color: '#000', background: '#ffecb3' }]
    this.setData({
      date: today.date
    })
    // 获取Memo列表数据
    let match= new RegExp(`${today.year}-${today.month}`)
    query.queryData(db,'memo', data =>{
      // 使用箭头函数保持上下文this指向
      let list = data.memoList 
      let date = Object.keys(list)
      date.map(d => {
        if(match.test(d))
          days_style.push({ month: 'current', 
          day: parseInt(d.slice(d.lastIndexOf('-') + 1)), 
          color: '#000', 
            background: '#FF668C' 
          })
      })
      if (data != null) {
        this.setData({
          id: data._id,
          memo: data.memoList,
          memoLists: data.memoList[today.date] ? data.memoList[today.date].lists : [],
          days_style: days_style,
        })
      }
      else {
        this.setData({ memo: {}, memoLists: [], days_style: days_style, })
      }
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
    if (!app.globalData.userInfo) {
      wx.switchTab({
        url: '../index/index'
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 删除数据库内此条数据
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