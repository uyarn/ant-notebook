const queryData = (db,collection,callback) =>{
  db.collection(collection).where({
    _openid: wx.getStorageSync('userId')
  }).get().then(res => {
    if (res.data.length > 0) 
      callback(res.data[0])
    else 
       callback(null)
  })
}

module.exports = {
  queryData: queryData
}