import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import Authorize from '../../components/index/Authorize'
import DiaryList from '../../components/index/DiaryList'
import Fab from '../../components/index/Fab'
import IndexModel from '../../models/index'

import './index.scss'

export default class Index extends Component {
  
  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    userInfo: null,
  }

  componentWillMount () { 
    this.onGetUserInfo()
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onGetUserInfo() {
    IndexModel.getUserInfo().then(res => {
      const { userInfo } = res
      this.setState({
        userInfo
      })
    })
  }

  onAuthorize ({detail: { userInfo }}) {
    if (userInfo) {
      this.setState({
        userInfo
      })
    }
  }

  onGoSetting () {
    const { userInfo } = this.state
    if (!userInfo) {
      Taro.showToast({
        title: '请先授权',
        icon: 'none'
      })
      return
    }
    Taro.navigateTo({
      url: '/pages/setting/index'
    })
  }

  render () {
    const { userInfo } = this.state
    return (
      <View className='index'>
        {/* 用户信息 */}
        <Authorize 
          userInfo={userInfo}
          onAuthorize={this.onAuthorize.bind(this)}
        />

        {/* 日记信息 */}
        <DiaryList />
      
        {/* 悬浮按钮 */}
        <Fab onClick={this.onGoSetting.bind(this)} />
      </View>
    )
  }
}
