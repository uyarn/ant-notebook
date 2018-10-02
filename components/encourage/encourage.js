// components/encourage/encourage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      motto:{
        type:String
      },
      save:{
        type:Boolean
      },
      encourage:{
        type:String
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    btnImg: {
      src: '../../images/save.png',
      model: 'aspectFit',
      encourages:''
    }
  },

  /**
   * 组件的方法列表
   */
  
  methods: {
    //事件处理函数,保存鼓励的话。
    saveEncourage: function () {
      let encourage = wx.setStorageSync('encourage', this.data.encourages);
      this.setData({
        save:true,
        encourage: this.data.encourages
      })
      wx.setStorageSync('save', true)
    },
    // 实时保存input的值
    bindInput: function (e) {
      this.setData({
        encourages: e.detail.value,
      })
    }
  }
})
