var touchDot = 0//触摸时的原点 
var time = 0// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = ""// 记录/清理时间记录 
export function touch_Start(e) {
  console.log('a')
  touchDot = e.touches[0].pageX; // 获取触摸时的原点 
  // 使用js计时器记录时间  
  interval = setInterval(function () {
    time++
  }, 100)
}
// 触摸移动事件 
export function touch_Move(e) {
  var touchMove = e.touches[0].pageX
  console.log("touchMove:" + touchMove + " touchDot:" + touchDot + " diff:" + (touchMove - touchDot));
  // 向左滑动  
  if (touchMove - touchDot <= -40 && time < 10) {
    //左滑返回1
      return 1
    }
  // 向右滑动 
  if (touchMove - touchDot >= 40 && time < 10) {
    //右滑返回2
      return 2
  }
}
// 触摸结束事件 
export function touch_End(e) {
  clearInterval(interval); // 清除setInterval 
  time = 0;
}