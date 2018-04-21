import wepy from 'wepy'
import { themeColor, pfStudio } from '../config'

export async function checkLocation() {
  let loc = await wepy.getLocation()
  const delta = 0.0005
  if (Math.abs(loc.latitude - pfStudio.latitude) > delta ||
    Math.abs(loc.longitude - pfStudio.longitude) > delta) {
    let result = await wepy.showModal({
      title: 'Warning!',
      content: '检测到你未在攀峰工作室签到，或者你手机飘了',
      confirmText: '仍要签到',
      confirmColor: '#000000',
      cancelText: '取消签到',
      cancelColor: themeColor
    })
    return result.confirm
  } else {
    return true
  }
}