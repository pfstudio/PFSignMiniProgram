var touchDot = 0//触摸时的原点 
export function touch_Start(e) {
  touchDot = e.touches[0].pageX; // 获取触摸时的原点 
}
// 触摸移动事件 
export function touch_Move(e) {
  var touchMove = e.touches[0].pageX
  console.log("touchMove:" + touchMove + " touchDot:" + touchDot + " diff:" + (touchMove - touchDot));
  // 向左滑动  
  if (touchMove - touchDot <= -100) {
    //左滑返回1
      return 1
    }
  // 向右滑动 
  if (touchMove - touchDot >= 100) {
    //右滑返回2
      return 2
  }
}