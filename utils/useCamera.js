const useCamera = (_this) =>{
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      // tempFilePath可以作为img标签的src属性显示图片
      _this.setData({
        image: res.tempFilePaths
      })
    }
  })
}

module.exports = {
   useCamera : useCamera
}