// components/calendarComponents/addCalendar/addCalendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    addCalendar: {
      type: Boolean
    },
    today: {
      type: String
    },
    tomorrow: {
      type: String
    },
    title: {
      type: String
    },
    radio: {
      type: Boolean,
      default: false
    },
    placehold: {
      type: String
    },
    user: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    defaultDate: null,
    dialogDetail: '',
    area:false,
    time:"00:00"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancelDialog: function (e) {
      let that = this;
      this.triggerEvent('hiddenDialog', true);
    },
    // 保存todo事项
    determineDialog: function () {
      let data = this.data
      //在日历备忘中
      let memo = wx.getStorageSync('memo') || ''
      if (!memo[data.today])
        memo[data.today] = { lists: [] }
        memo[data.today].lists.push({ content: data.dialogDetail })
        wx.setStorageSync('memo', memo)
        this.triggerEvent('updateMemo', memo[data.today].lists);
      this.cancelDialog()
    },
    // 输入内容
    diaDetailChange: function (e) {
      this.setData({
        dialogDetail: e.detail.value
      })
    },
   bindTimeChange:function(e){
     this.setData({
       //给当前time进行赋值
       time: e.detail.value
     })
   }
  }
})
