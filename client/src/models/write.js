import Taro from '@tarojs/taro'

const db = Taro.cloud.database()

export default class WriteModel {
  static addDiary (data) {
    return db.collection('diarys').add({
      data
    })
  }
}