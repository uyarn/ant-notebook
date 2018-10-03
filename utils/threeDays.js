/* 用于计算昨天, 今天， 明天三天的日期*/
const getDays =  ()=>{
     let now  = new Date();
     let time = now.getTime();
     let yesterday = new Date(time - 24 * 60 * 60 * 1000)
     let tomorrow = new Date(time + 24 * 60 * 60 * 1000)
    
     return  { 
       yesterday:{ 
         year:yesterday.getFullYear(),
         month: yesterday.getMonth()+1, 
         day:yesterday.getDate()
       }, 
       today: {
         year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()
         },
       tomorrow:{
         year: tomorrow.getFullYear(), month: tomorrow.getMonth() + 1, day: tomorrow.getDate()
       }
      }
}

module.exports={
   getDays: getDays
}