// pages/todoList/todoList.js
const formDate = require('../../utils/util.js');
const updateLists = require('../../utils/updateLists.js')
const query = require('../../utils/database/queryData.js')
const db = wx.cloud.database()
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
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
  //更新当前todolists
  updateLists:function(e){
    let that = this
    if (this.data.id) {
      db.collection('todo').doc(this.data.id).update({
        data: { todoLists: e.detail },
        success: function (res) {
          
          that.setData({ todoLists: e.detail, display: true })
        }
      })
    }
    else
      db.collection('todo').add({
        data: { todoLists: e.detail }
      }).then(res =>{
        
        that.setData({ todoLists: e.detail, display: true , id: res._id})
      })
  },
  //删除todoLists
  todoDelete:function(e){
   let lists = this.data.todoLists
   let that = this
   lists[e.detail.types].lists.splice(e.detail.index,1)
   let display = false
   for(var  i  in lists){
     if(lists[i].lists.length>0)
       {
         display = true
         break
       }
   }
   display?'':this.setData({display:false})     
    // 更新数据库
    db.collection('todo').doc(this.data.id).update({
      data: { todoLists: lists },
      success: function (res) {
        that.setData({ todoLists: lists })
      }
    })
  },
  //移动todoLists
  todoRemove: function (e) {
    let lists = this.data.todoLists
    let that = this  
    let things = lists[e.detail.types].lists.splice(e.detail.index, 1)
    if(e.detail.types=='today')
       lists['tomorrow'].lists.push({content:things[0].content, status:false})
    else
      lists['today'].lists.push({ content: things[0].content, status: false })
   // 更新数据库
    db.collection('todo').doc(this.data.id).update({
      data: { todoLists: lists },
      success: function (res) {
        that.setData({ todoLists: lists })
      }
    })
  },
  todoDone:function(e){
    let lists = this.data.todoLists
    let that = this  
    lists[e.detail.types].lists[e.detail.index].status = e.detail.status
    db.collection('todo').doc(this.data.id).update({
      data: { todoLists: lists },
      success: function (res) {
        that.setData({ todoLists: lists })
      }
    })
  },
  // 页面加载时
  onLoad: function (options) {
    let that = this
    let todoLists={ };
    query.queryData(db, 'todo', data => {
        if(data!= null){
          todoLists = data.todoLists
          this.setData({ id : data._id})
        }
      // 更新todoLists
      todoLists = updateLists.updateLists(todoLists)
      this.setData({
        todoLists: todoLists,
        date: formDate.formatTime(new Date()),
        display: todoLists['yesterday'].lists.length > 0 ||
          todoLists['today'].lists.length > 0 ||
          todoLists['tomorrow'].lists.length > 0
      })
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
  onHide: function () { },
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