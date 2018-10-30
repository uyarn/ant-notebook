// components/calendarItem/calendarItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     index:{
       type:Number
     },
     title:{
       type:String
     },
     time:{
       type:String
     }
  },

  /**
   * 组件的初始数据
   */
  data: {
      lookSrc:'../../../images/look.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    viewDetail:function(e){
      let that  = this
      this.triggerEvent('detailShow',that.data.index);
    }
  }
})
