const useCamera = (openid,_this) =>{
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success:function (res) {
      // tempFilePath可以作为img标签的src属性显示图片
      let tempFilePaths = res.tempFilePaths[0]
      let subPath =tempFilePaths.slice(tempFilePaths.lastIndexOf('/')+1)
      wx.cloud.uploadFile({
        cloudPath: subPath, // 上传至云端的路径
        filePath: tempFilePaths, // 小程序临时文件路径
        success: res => {
          // 返回文件 ID
          _this.setData({ uploadImg: res.fileID })
        },
        fail: err =>{
          console.error
        }
      })
      _this.setData({ image: tempFilePaths}) 
    }
  })
}

module.exports = {
   useCamera : useCamera
}