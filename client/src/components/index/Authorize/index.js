import Taro, { Component } from "@tarojs/taro"
import { AtAvatar } from 'taro-ui'
import { View, Button } from '@tarojs/components'

import './index.scss'

export default class Authorize extends Component {
  defaultProps = {
    userInfo: {}
  }
  render () {
    const { userInfo, onAuthorize } = this.props
    return (
      <View className='user-info-container'>
        <AtAvatar 
          className='avatar' 
          image={userInfo.avatarUrl} 
          circle
        />
        <View className='info'>
          {
            userInfo.nickName
            ? <View className='name'>{userInfo.nickName},</View>
            : <Button 
              className='authorize'
              openType='getUserInfo'
              onGetuserinfo={onAuthorize}
            >
              授权登录
            </Button>
          }
          <View class='statistics'>哇，金色传说！</View>
        </View>
      </View>
    )
  }
}