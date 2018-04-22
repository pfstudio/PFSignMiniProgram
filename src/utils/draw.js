import wepy from 'wepy'

// 画线个数
const lines = 60

export async function drawRing(ctx, rate) {
  // 获取设备屏幕宽度
  let systemInfo = await wepy.getSystemInfo()
  // 令圆心位于中心
  let x = systemInfo.windowWidth / 2
  let y = systemInfo.windowWidth / 2
  // 圆环的外径
  let r1 = systemInfo.windowWidth / 3
  // 圆环的内径
  let r2 = r1 - 15
  let frontLines = rate * 60

  // 初始位置定位最上方的-pi/2
  var now = -Math.PI / 2
  // 设定已完成进度的颜色
  ctx.setStrokeStyle('#66ccff')
  // 设定线条宽度
  ctx.setLineWidth(3)

  for (var count = 1; count <= lines; count++) {
    ctx.beginPath()
    // 设定圆心
    ctx.moveTo(x, y)
    if (count > frontLines)
      // 未完成进度的表示颜色
      ctx.setStrokeStyle('grey')
    // 圆环区填充色，请选择为背景色
    ctx.setFillStyle('white')
    ctx.arc(x, y, r1, now, now)
    // 线条位置移动至下一位置
    now = now + 2 * Math.PI / lines
    // 画线函数
    ctx.stroke()
  }
  //后面代码用于去掉圆的中心区域
  ctx.beginPath()
  ctx.moveTo(x, y)
  //内部圆心颜色，请修改为应用底色
  ctx.setFillStyle('#ffffff')
  ctx.arc(x, y, r2, 0, 2 * Math.PI)
  //内部填充
  ctx.fill()
  //最后绘画函数
  ctx.draw()
}