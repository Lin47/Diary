import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'

import { onShowToast } from '../../utils/common'
import Authorize from '../../components/index/Authorize'
import DiaryList from '../../components/index/DiaryList'
import Fab from '../../components/index/Fab'
import Tips from '../../components/index/Tips'
import Drawer from '../../components/index/Drawer'
import PasswordModel from '../../components/index/PasswordModel'
import IndexModel from '../../models/index'

import './index.scss'

export default class Index extends Component {
  
  config = {
    navigationBarTitleText: '快来写日记吧！'
  }
  constructor () {
    super(...arguments)
    this.state = {
      userInfo: null,
      isLoading: true,
      diaryList: null, 
      showDrawer: false,
      loadMore: 'more',
      currPage: 1,
      noDiary: false,
      password: '',
      showModel: false,
      isPasswordLock: true,
      havaPassword: false,
      openDetailId: ''
    }

    this.onAuthorize = this.onAuthorize.bind(this)
    this.onOpenDrawer = this.onOpenDrawer.bind(this)
    this.onCloseDrawer = this.onCloseDrawer.bind(this)
    this.onLoadMore = this.onLoadMore.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onCloseModel = this.onCloseModel.bind(this)
    this.onConfirmModel = this.onConfirmModel.bind(this)
    this.onOpenPasswordModel = this.onOpenPasswordModel.bind(this) 
  }

  componentWillMount () { 
    this.onGetUserInfo()
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  
  onLoadMore () {
    this.setState((prevState) => ({ 
      currPage: prevState.currPage + 1,
      loadMore: 'loading'
    }), () => {
      const { currPage } = this.state
      IndexModel.getDiaryList(currPage)
      .then(res => {
        const { result: { data } } = res
        if (data.length === 0) {
          this.setState({
            loadMore: 'noMore'
          })
          return
        }
        const { diaryList } = this.state
        const newList = Object.assign([], diaryList)
        data.map((values) => {
          newList.push(values)
        })
        this.setState({
          diaryList: newList,
          loadMore: 'more',
        })
      })
    })
  }

  onGetUserInfo() {
    const { currPage } = this.state
    IndexModel.getUserInfo()
      .then(res => {
        const { userInfo } = res
        this.setState({
          userInfo
        })
      })
    IndexModel.getPassword()
      .then(res => {
        const { result: { total } } = res
        let havaPassword = true
        if (total === 0) {
          havaPassword = false
        }
        this.setState({
          havaPassword
        })
      })
    IndexModel.getDiaryList(currPage)
      .then(res => {
        const { result:{ data } } = res
        if (data.length === 0) {
          this.setState({
            noDiary: true,
            isLoading: false
          })
          return
        }
        this.setState({
          diaryList: data,
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
    const { havaPassword } = this.state
    Taro.navigateTo({
      url: `/pages/password/index?havaPassword=${havaPassword}`
    })
  }

  onCloseDrawer () {
    this.setState({
      showDrawer: false
    })
  }

  onChangePassword (password) {
    this.setState({
      password
    })
    return password
  }

  onOpenPasswordModel (id) {
    const { isPasswordLock } = this.state
    if (!isPasswordLock) return
    this.setState({
      showModel: true,
      openDetailId: id
    })
  }

  onCloseModel () {
    this.setState({
      showModel: false
    }) 
  }

  onConfirmModel () { 
    const { password, openDetailId } = this.state
    if (password.length === 0) return
    Taro.showLoading()
    IndexModel.getPasswordConfirm(password)
      .then(res => {
        const { result: { total } } = res
        Taro.hideLoading()
        if (total === 0) {
          onShowToast('密码错误!', false)
        } else {
          this.setState({
            isPasswordLock: false,
            showModel: false
          }, () => {
            onShowToast('密码正确！', true)
            Taro.navigateTo({
              url: `/pages/detail/index?id=${openDetailId}`
            })
          })
        }
      })
      .catch(err => console.error(err))
  }

  render () {
    const { 
      userInfo, 
      isLoading, 
      diaryList, 
      showDrawer, 
      loadMore, 
      noDiary, 
      password, 
      showModel, 
      isPasswordLock
     } = this.state
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
          : noDiary 
            ? <Tips />
            : <DiaryList
              diaryList={diaryList}
              loadMore={loadMore}
              isPasswordLock={isPasswordLock}
              onOpenPasswordModel={this.onOpenPasswordModel}
              onLoadMore={this.onLoadMore}
            />
        }
        {/* 悬浮按钮 */}
        <Fab onClick={this.onOpenDrawer} />
        {/* 抽屉 */}

        <Drawer 
          showDrawer={showDrawer}
          onCloseDrawer={this.onCloseDrawer} 
          onGoWrite={this.onGoWrite}
          onGoPassword={this.onGoPassword}
        />
        
        {/* 密码框 */}
        <PasswordModel 
          showModel={showModel}
          password={password}
          onChangePassword={this.onChangePassword}
          onCloseModel={this.onCloseModel}
          onConfirmModel={this.onConfirmModel}
        />
      </View>
    )
  }
}
