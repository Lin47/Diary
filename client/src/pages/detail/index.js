import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import { AtCard , AtIcon } from 'taro-ui'

import './index.scss'

export default class Detail extends Component {
  
  config = {
    navigationBarTitleText: '密码'
  }

  state = {
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='detail'>
        <AtCard
          extra='1992-8-5'
          title='标题'
        >
          <View className='detail-toolbar'>
            <AtIcon value='edit' size='25' color='#333'></AtIcon>
            <AtIcon value='trash' size='25' color='#F00'></AtIcon>
          </View>
        </AtCard>
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <View className='demo-text-1'>1</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-2'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-3'>3</View>
          </SwiperItem>
        </Swiper>
      </View>
    )
  }
}
