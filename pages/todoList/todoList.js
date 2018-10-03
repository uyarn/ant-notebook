// pages/todoList/todoList.js
const formDate = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     textArea:false,
     date:'',
     addSrc:'../../images/add.png',
     dialogShow:false
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
  onLoad: function (options) {
    let todoLists = wx.getStorageSync('todoLists')
    console.log(todoLists)
    this.setData({
      date: formDate.formatTime(new Date()),
      today:{
        display: todoLists['today']['lists'].length>=1?true:false,
        lists: todoLists['today']['lists']
        },
      yesterday: {
        display: todoLists['yesterday']['lists'].length >= 1 ? true : false,
        lists: todoLists['yesterday']['lists']
        },
      tomorrow: {
        display:todoLists['tomorrow']['lists'].length >= 1 ? true : false,
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