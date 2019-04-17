import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import nav from '../../../images/nav.png'

import './index.scss'

export default class Tips extends Component {
  render () {
    return (
      <View className='tips-container'>
        <Image src={nav} /> 
        <View className='info'>
          <View className='warn'>HI,你还没有写过日记呢</View>
          <View className='tips'>点击右下角的“+”开始把！</View>
        </View>
      </View>
    )
  }
}
