// components/calendarComponents/calendatDetails/calendarDetails.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     index:{
       type: Number
     },
     today:{
       type:String
     },
     detail:{
       type: Object
     }
  },

  /**
   * 组件的初始数据
   */
  data: {
    input:true,
    modifySrc:'../../../images/modify.png',
    modify:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
      hideDetail:function(){
        this.triggerEvent('hiddenDialog', true);
      },
    deleteDetail:function(){
      this.triggerEvent('deleteCalItem', this.data.index);
      this.hideDetail();
    },
    // 修改内容
    modifySave:function(){
      this.setData({
        input: !this.data.input,
        modify:!this.data.modify
      })
      if(this.data.input){ 
        this.triggerEvent('saveModify', 
        { detail: this.data.detail,
          index: this.data.index
        });
      }
    },
    // 时间修改
    change:function(e){  
      let detail = this.data.detail
      switch(e.target.id){
        case "pick": detail.time = e.detail.value;break;
        case "content": detail.content = e.detail.value;break;
        case "input": detail.titles = e.detail.value;break;
        default: break;
      }
      this.setData({
        //给当前data进行赋值
        detail: detail
      })
    },
    //放大图片
    toggleScale: function (e) {
      let current = e.target.dataset.src;
      wx.previewImage({
        current: current,
        urls: [current]
      })
    }
  }
})
