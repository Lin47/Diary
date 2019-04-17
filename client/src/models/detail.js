import Taro from '@tarojs/taro'

const db = Taro.cloud.database()

export default class DetailModel {
  static getDetail (id) {
    return db.collection('diarys').where({
      _id: id
    })
    .get()
  }
  static delDetail (id) {
    return Taro.cloud.callFunction({
      name: 'DeleteDiary',
      data: { id }
    })
  }
}