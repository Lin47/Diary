import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"

import './index.scss'

export default class Setting extends Component {
  
  config = {
    navigationBarTitleText: '设置'
  }

  state = {
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onGoWrite () {
    Taro.navigateTo({
      url: '/pages/write/index'
    })
  }

  onGoPassword () {
    Taro.navigateTo({
      url: '/pages/password/index'
    })
  }

  render () {
    return (
      <View className='setting'>
        <AtList>
          <AtListItem 
            title='日记' 
            extraText='编写日记' 
            arrow='right' 
            iconInfo={{ size: 25, color: '#78A4FA', value: 'edit', }}
            onClick={this.onGoWrite}
          />
          <AtListItem 
            title='密码' 
            extraText='设置密码' 
            arrow='right' 
            iconInfo={{ size: 25, color: '#78A4FA', value: 'lock', }}
            onClick={this.onGoPassword}
          />
          <AtListItem 
            title='意见反馈' 
            extraText='详细信息' 
            arrow='right' 
            iconInfo={{ size: 25, color: '#78A4FA', value: 'help', }}
          />
        </AtList>
      </View>
    )
  }
}
