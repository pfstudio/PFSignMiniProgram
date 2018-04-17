// 触发滑动的阈值
const threshold = 75;
//触摸时的原点
var touchDot = 0

function touchStartFactory() {
  return e => {
    touchDot = e.touches[0].pageX
  }
}

function touchMoveFactory(pageUrl) {
  return e => {
    console.log(e)
    let touchMove = e.changedTouches[0].pageX
    let distance = touchMove - touchDot
    if(distance >= threshold && pageUrl.left) {
      wx.switchTab({url: pageUrl.left})
    }
    if(distance <= -threshold && pageUrl.right) {
      wx.switchTab({url: pageUrl.right})
    }
  }
}

module.exports = {
  touchStartFactory: touchStartFactory,
  touchMoveFactory: touchMoveFactory
}