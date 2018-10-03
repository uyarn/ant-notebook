// components/addDialog/addDialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dialogShow:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancleDialog:function(e){
      let that = this;
      this.triggerEvent('hiddenDialog', true);
    }
  }
})
