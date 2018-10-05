// components/addDialog/addDialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dialogShow:{
      type:Boolean
    },
    today:{
      type:String
    },
    tomorrow:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    defaultDate:null,
    dialogDetail:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancelDialog:function(e){
      let that = this;
      this.triggerEvent('hiddenDialog', true);
    },
    // 保存todo事项
    determineDialog:function(){
      let data  =this.data
      let date = data.defaultDate?data.defaultDate:data.today
      let todoList = wx.getStorageSync('todoLists');
      if (todoList['today']['date'] == date)
        todoList['today']['lists'].push(data.dialogDetail)
      else
        todoList['tomorrow']['lists'].push(data.dialogDetail)
      wx.setStorageSync('todoLists', todoList)
      this.triggerEvent('updateLists', todoList);
      this.cancelDialog()
    },
    // 输入内容
    diaDetailChange:function(e){
      this.setData({
        dialogDetail:e.detail.value
      })
    },
    radioChange:function(e){
     this.setData({ defaultDate: e.detail.value})
    }
  }
})
