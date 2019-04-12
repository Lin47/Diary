import Taro, { Component } from "@tarojs/taro"
import { AtFab, AtIcon } from 'taro-ui'
import { View } from '@tarojs/components'

import './index.scss'

export default class Fab extends Component {
  render () {
    const { onClick } = this.props
    return (
      <View className='fab'>
        <AtFab onClick={onClick}>
          <AtIcon value='settings' size='24' color='#FFF'></AtIcon>
        </AtFab>
      </View>
    )
  }
}