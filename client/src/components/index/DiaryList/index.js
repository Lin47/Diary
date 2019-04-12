import Taro, { Component } from "@tarojs/taro"
import { View } from '@tarojs/components'

import './index.scss'

export default class DiaryList extends Component {
  render () {
    return (
      <View className='project-container'>
        <View className='count'>
          你有
          <View className='num'>20</View>
          个日记:
        </View>
        <View className='project'>
          <View className='title'>123</View>
          <View className='tags'></View>
        </View>
      </View>
    )
  }
}