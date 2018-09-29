const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
  // .join('/) + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  // let unit = idx==0?"年":(idx==1?"月":"日");
  return n = n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
