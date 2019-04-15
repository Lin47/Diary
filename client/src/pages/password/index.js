import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtForm, AtButton } from 'taro-ui'

import { onShowToast } from '../../utils/common'

import './index.scss'

export default class Password extends Component {
  
  config = {
    navigationBarTitleText: '密码'
  }

  constructor () {
    super(...arguments)
    this.state = {
      oldPassword: '',
      newPassword: '',
      repeartPassword: ''
    }
    this.handleChangeOldPassword = this.handleChangeOldPassword.bind(this)
    this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this) 
    this.handleChangeRepeatPassword = this.handleChangeRepeatPassword.bind(this) 
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChangeOldPassword (oldPassword) {
    this.setState({
      oldPassword
    })
    return oldPassword
  }

  handleChangeNewPassword (newPassword) {
    this.setState({
      newPassword
    })
    return newPassword
  }

  handleChangeRepeatPassword (repeartPassword) {
    this.setState({
      repeartPassword
    })
    return repeartPassword
  }

  onSubmit () {
    const { oldPassword, newPassword, repeartPassword } = this.state
    if (!this.onValidate(oldPassword, newPassword, repeartPassword)) return 
    
  }

  onValidate(oldPassword, newPassword, repeartPassword) {
    if (oldPassword === '') {
      onShowToast('旧密码不可为空', false)
      return false
    } 
    if (newPassword === '') {
      onShowToast('新密码不可为空', false)
      return false
    } 
    if (repeartPassword === '') {
      onShowToast('重复密码不可为空', false)
      return false
    } 
    if (newPassword !== repeartPassword) {
      onShowToast('新密码与重复密码不一致', false)
      return false
    }
    if (newPassword !== oldPassword) {
      onShowToast('新密码不可以与老密码相同', false)
      return false
    }
    return true
  }

  render () {
    const { oldPassword, newPassword, repeartPassword } = this.state
    return (
      <View className='password'>
        <AtForm onSubmit={this.onSubmit}>
          <AtInput
            name='oldPassword'
            title='旧密码'
            type='password'
            placeholder='密码不能超过6位数'
            value={oldPassword}
            onChange={this.handleChangeOldPassword}
            maxLength='6'
          />
          <AtInput
            name='newPassword'
            title='新密码'
            type='password'
            placeholder='密码不能超过6位数'
            value={newPassword}
            onChange={this.handleChangeNewPassword}
            maxLength='6'
          />
          <AtInput
            name='repeartPassword'
            title='确认密码'
            type='password'
            placeholder='重复新密码'
            value={repeartPassword}
            onChange={this.handleChangeRepeatPassword}
            maxLength='6'
            border={false}
          />
          <AtButton 
            formType='submit' 
            type='primary'
            className='password-btn'
          >
            提交
          </AtButton>
        </AtForm>
      </View>
    )
  }
}
