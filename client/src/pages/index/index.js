import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActivityIndicator, AtDrawer, AtListItem } from 'taro-ui'

import Authorize from '../../components/index/Authorize'
import DiaryList from '../../components/index/DiaryList'
import Fab from '../../components/index/Fab'
import IndexModel from '../../models/index'

import './index.scss'

export default class Index extends Component {
  
  config = {
    navigationBarTitleText: '首页'
  }
  constructor () {
    super(...arguments)
    this.state = {
      userInfo: null,
      isLoading: true,
      diaryList: null, 
      showDrawer: false
    }

    this.onAuthorize = this.onAuthorize.bind(this)
    this.onOpenDrawer = this.onOpenDrawer.bind(this)
    this.onCloseDrawer = this.onCloseDrawer.bind(this)
  }

  componentWillMount () { 
    this.onGetUserInfo()
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  
  onReachBottom () {
    console.log('to the bottom')
  }

  onGetUserInfo() {
    IndexModel.getUserInfo().then(res => {
      const { userInfo } = res
      this.setState({
        userInfo
      })
    })
    IndexModel.getDiaryList()
      .then(res => {
        this.setState({
          diaryList: res.data,
          isLoading: false
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

  onOpenDrawer () {
    const { userInfo } = this.state
    if (!userInfo) {
      Taro.showToast({
        title: '请先授权',
        icon: 'none'
      })
      return
    }
    this.setState({
      showDrawer: true
    })
  }

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

  onCloseDrawer () {
    this.setState({
      showDrawer: false
    })
  }

  render () {
    const { userInfo, isLoading, diaryList, showDrawer } = this.state
    return (
      <View className='index'>
        {/* 用户信息 */}
        <Authorize 
          userInfo={userInfo}
          onAuthorize={this.onAuthorize}
        />
        {/* 日记信息 */}
        {
          isLoading
          ? <AtActivityIndicator mode='center' />
          : <DiaryList diaryList={diaryList} />
        }
        {/* 悬浮按钮 */}
        <Fab onClick={this.onOpenDrawer} />

        <AtDrawer
          show={showDrawer}
          mask
          right
          onClose={this.onCloseDrawer} 
        >
          <AtListItem 
            title='日记' 
            arrow='right' 
            iconInfo={{ size: 25, color: '#78A4FA', value: 'edit', }}
            onClick={this.onGoWrite}
          />
          <AtListItem 
            title='密码' 
            arrow='right' 
            iconInfo={{ size: 25, color: '#78A4FA', value: 'lock', }}
            onClick={this.onGoPassword}
          />
          <AtListItem 
            title='反馈' 
            arrow='right'
            iconInfo={{ size: 25, color: '#78A4FA', value: 'help', }}
          />
        </AtDrawer>
      </View>
    )
  }
}
