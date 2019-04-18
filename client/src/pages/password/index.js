import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtForm, AtButton } from 'taro-ui'

import { onShowToast } from '../../utils/common'
import PasswordModel from '../../models/password'

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
      repeartPassword: '',
      havaPassword: ''
    }
    this.handleChangeOldPassword = this.handleChangeOldPassword.bind(this)
    this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this) 
    this.handleChangeRepeatPassword = this.handleChangeRepeatPassword.bind(this) 
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () { 
    const { havaPassword } = this.$router.params
    this.setState({
      havaPassword
    })
  }

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
    const { oldPassword, newPassword, repeartPassword, havaPassword } = this.state
    if (!this.onValidate(oldPassword, newPassword, repeartPassword, havaPassword)) return 
    Taro.showLoading({
      title: 'loading'
    })
    if (havaPassword === 'true') {
      const data = {
        oldPassword,
        newPassword
      }
      PasswordModel.modifyPassword(data)
        .then((res) => {
          if (res.result.stats.updated === 1) {
            Taro.hideLoading()
            Taro.reLaunch({
              url: '/pages/index/index'
            })
            .then(() => {
              onShowToast('密码修改成功！', true)
            })
          } else if (res.result.stats.updated === 0) {
            Taro.hideLoading()
            onShowToast('旧密码不正确！', false)
          }
        })
        .catch(err => {
          Taro.hideLoading()
          onShowToast('密码修改失败！', true)
          console.log(err)
        })
    } else {
      const data = {
        password: newPassword
      }
      PasswordModel.addPassword(data)
        .then(() => {
          Taro.hideLoading()
          Taro.reLaunch({
            url: '/pages/index/index'
          })
          .then(() => {
            onShowToast('密码设置成功！', true)
          })
        })
        .catch(err => {
          Taro.hideLoading()
          onShowToast('密码设置失败！', true)
          console.log(err)
        })
    }
  }

  onValidate(oldPassword, newPassword, repeartPassword, havaPassword) {
    if (havaPassword === 'true') {
      if (newPassword === oldPassword) {
        onShowToast('新密码不可以与老密码相同', false)
        return false
      }
      if (oldPassword === '') {
        onShowToast('旧密码不可为空', false)
        return false
      }
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
    return true
  }

  render () {
    const { 
      oldPassword, 
      newPassword, 
      repeartPassword, 
      havaPassword
    } = this.state
    return (
      <View className='password'>
        <AtForm onSubmit={this.onSubmit}>
          {
            havaPassword === 'false'
            ? ''
            : <AtInput
              name='oldPassword'
              title='旧密码'
              type='password'
              placeholder='密码不能超过6位'
              value={oldPassword}
              onChange={this.handleChangeOldPassword}
              maxLength='6'
            />
          }
          <AtInput
            name='newPassword'
            title='新密码'
            type='password'
            placeholder='密码不能超过6位'
            value={newPassword}
            onChange={this.handleChangeNewPassword}
            maxLength='6'
          />
          <AtInput
            name='repeartPassword'
            title='确认新密码'
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
