const threeDay = require('./threeDays.js');

const updateLists = () =>{
  let threeDays = threeDay.getDays();
  let todoLists = wx.getStorageSync('todoLists');
  let today = threeDays['today'].day || ''
  let oriToday = todoLists['today']  || undefined
  let oriTomorrow = todoLists['tomorrow'] || undefined
  if (!oriToday || oriToday.day != today) {
     // 如果为第二天更新 
      todoLists = {
        'yesterday': {
          'lists': [],
          'day': threeDays['yesterday'].day,
          'month': threeDays['yesterday'].month,
          'year': threeDays['yesterday'].year
        },
        'today': {
          'lists': [],
          'day': threeDays['today'].day,
          'month': threeDays['today'].month,
          'year': threeDays['today'].year
        },
        'tomorrow': {
          'lists': [],
          'day': threeDays['tomorrow'].day,
          'month': threeDays['tomorrow'].month,
          'year': threeDays['tomorrow'].year
          
        }
      }
    if (oriTomorrow && oriTomorrow.day == today) {
         todoLists.yesterday.lists = oriToday.lists
         todoLists.today.lists = oriTomorrow.lists
    }
    wx.setStorageSync('todoLists',todoLists);
  }
}

module.exports={
  updateLists:updateLists
}