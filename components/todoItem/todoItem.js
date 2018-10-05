// components/todoItem/todoItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      content:{
        type:String
      },
      index:{
        type:Number
      },
      status:{
        type:Boolean
      },
      types:{
        type:String
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    doneSrc:'../../images/tomorrow.png',
    deleteSrc:'../../images/delete.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
     doneTodo:function(){
        this.setData({ status: true})
        let todoLists = wx.getStorageSync('todoLists');
        todoLists[this.data.types].lists[this.data.index].status=true;
       wx.setStorageSync('todoLists', todoLists)
     },
     todoRemove:function(){
       let that = this;
       this.triggerEvent('todoRemove', { index: this.data.index, types: this.data.types })
     },
     todoDelete:function(){
       let that = this;
       this.triggerEvent('todoDelete',{index:this.data.index, types:this.data.types})
     }
  }
})
