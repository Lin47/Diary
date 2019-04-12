import Taro from '@tarojs/taro'

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
}