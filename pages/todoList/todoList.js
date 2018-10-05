// pages/todoList/todoList.js
const formDate = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     date:'',
     addSrc:'../../images/add.png',
     dialogShow:false,
     todoLists:wx.getStorageSync('todoLists')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  addTodo:function(){
    this.setData({
      dialogShow:true
    })
  },
  hiddenDialog:function(e){
    this.setData({
      dialogShow:false
    })
  },
  //更新当前todolists
  updateLists:function(e){
    this.setData({todoLists: e.detail, display:true})
    
  },
  onLoad: function (options) {
    // 获取todoLists列表
    let todoLists = wx.getStorageSync('todoLists')
    this.setData({
      date: formDate.formatTime(new Date()),
      display: todoLists['yesterday'].lists.length>0 || 
                 todoLists['today'].lists.length>0 || 
                 todoLists['tomorrow'].lists.length>0,
      today:{
        date: todoLists['today']['date'],
        lists: todoLists['today']['lists']
        },
      yesterday: {
        date: todoLists['yesterday']['date'],
        lists: todoLists['yesterday']['lists']
        },
      tomorrow: {
        date: todoLists['tomorrow']['date'],
        lists: todoLists['tomorrow']['lists']
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