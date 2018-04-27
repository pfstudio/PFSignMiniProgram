import wepy from 'wepy'

export default class InfoMixin extends wepy.mixin {
  data = {
    studentId: '',
    name: ''
  }

  async getInfo() {
    // TODO: 若本地不存在信息，从服务器获取与微信绑定的信息
    // 从本地读取学号
    this.studentId = await wepy.getStorage({ key: 'studentId' })
      .then(res => res.data)
      .catch(() => '')
    // 从本地读取姓名
    this.name = await wepy.getStorage({ key: 'name' })
      .then(res => res.data)
      .catch(() => '')
    this.$apply()
  }
  
  async setInfo(info) {
    if (!(info.studentId && info.name)) {
      throw '学号、姓名不为空'
    }
    await wepy.setStorage({
      key: 'studentId',
      data: info.studentId
    })
    await wepy.setStorage({
      key: 'name',
      data: info.name
    })

    this.studentId = info.studentId
    this.name = info.name
    this.$apply()
  }
  
  async removeInfo() {
    await wepy.removeStorage({ key: 'studentId' })
    await wepy.removeStorage({ key: 'name' })

    this.studentId = ''
    this.name = ''
    this.$apply()
  }
}