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
  static getDiaryList (currPage) {
    return Taro.cloud.callFunction({
      name: 'SearchDiary',
      data: { currPage }
    })
  }
  static getPasswordConfirm (password) {
    return Taro.cloud.callFunction({
      name: 'ContrastPassword',
      data: { password }
    })
  }
  static getPassword () {
    return Taro.cloud.callFunction({
      name: 'SearchPassword',
    })
  }
}