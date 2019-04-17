import Taro from '@tarojs/taro'

const db = Taro.cloud.database()

export default class PasswordModel {
  static addPassword (data) {
    return db.collection('password').add({
      data
    })
  }
  static modifyPassword (data) {
    return Taro.cloud.callFunction({
      name: 'ModifyPassword',
      data
    })
  }
}