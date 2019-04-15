import Taro from '@tarojs/taro'

const db = Taro.cloud.database()

export default class IndexModel {
  static getUserInfo () {
    return new Promise((resolve, reject) => {
      Taro.getSetting()
        .then(res => {
          if (res.authSetting['scope.userInfo']) {
            Taro.getUserInfo()
              .then(info => { resolve(info) })
          }
        })
        .catch(err => { reject(err) } )
    })
  }
  static getDiaryList () {
    return db.collection('diarys').get()
  }
}