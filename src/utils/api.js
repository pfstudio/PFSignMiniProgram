import wepy from 'wepy'
import { service } from '../config'

async function signIn(studentId, name) {
  let res
  try {
    res = await wepy.request({
      url: service.signInUrl,
      method: 'POST',
      dataType: 'json',
      data: {
        studentId: studentId,
        name: name
      }
    })
  } catch (error) {
    throw '网络错误'
  }

  if (!res.data.result) {
    throw res.data.message
  }
}

async function signOut(studentId) {
  let res
  try {
    res = await wepy.request({
      url: service.signOutUrl,
      method: 'POST',
      dataType: 'json',
      data: {
        studentId: studentId
      }
    })
  } catch (error) {
    throw '网络错误'
  }
  
  if (!res.data.result) {
    throw res.data.message
  }
}

async function query(obj) {
  let res
  try {
    res = await wepy.request({
      url: service.queryUrl,
      method: 'GET',
      dataType: 'json',
      data: obj
    })
  } catch (error) {
    throw '网络错误'
  }

  if (res.statusCode == 200) {
    return res.data
  } else {
    throw '服务器异常'
  }
}

export default {
  signIn, signOut, query
}