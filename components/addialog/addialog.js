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
    },
    title:{
      type:String
    },
    radio:{
      type:Boolean,
      default:false
    },
    placehold:{
      type:String
      },
      user:{
        type:String
      },
      todoLists:{
        type:Object
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
      // 在todoList中
      let date = data.defaultDate ? data.defaultDate : data.today
      let todoList = data.todoLists
      if (todoList['today']['date'] == date)
          todoList['today']['lists'].push({ content: data.dialogDetail, status: false })
      else
          todoList['tomorrow']['lists'].push({ content: data.dialogDetail, status: false })
        this.triggerEvent('updateLists', todoList);
        this.setData({ defaultDate: null })
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
