const useCamera = (_this) =>{
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success:function (res) {
      // tempFilePath可以作为img标签的src属性显示图片
      let tempFilePaths = res.tempFilePaths
      _this.setData({ image: tempFilePaths[0]})
      // wx.request({
      //   url: tempFilePaths[0],
      //   method: 'GET',
      //   responseType: 'arraybuffer',
      //   success: function (res) {
      //   console.log(res.data)
      //   let base64 = wx.arrayBufferToBase64(res.data);
      //   _this.setData({
      //     image: 'data:image/jpg;base64,' + base64
      //     })
      //   }
      // })   
    }
  })
}

module.exports = {
   useCamera : useCamera
}