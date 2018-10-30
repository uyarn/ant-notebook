const updateMemo = (db, id, memo, memoList, _this, isDelete,imgId) =>{
  db.collection('memo').doc(id).update({
    data: {
      memoList: memo
    },
    success: function (res) {
      if(isDelete&&imgId!=null){
      wx.cloud.deleteFile({
        fileList: [imgId],
        success: res => {
          // handle success
          _this.setData({
            memoLists: memoList,
            memo: memo
          })
        },
        fail: console.error
      })
      }
      else
      {
        _this.setData({
          memoLists: memoList,
          memo: memo
        })
      }
      console.log('upload memo success!')
    }
  })
}

module.exports = {
  updateMemo : updateMemo
}