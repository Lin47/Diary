import Taro, { Component } from "@tarojs/taro"
import { AtAvatar  } from 'taro-ui'
import { View, Button } from '@tarojs/components'

import './index.scss'

export default class Authorize extends Component {
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
              // onClick={onAuthorize}
            >
                授权登录
              </Button>
          }
          <View class='statistics'>你的日记总数为</View>
        </View>
      </View>
    )
  }
}