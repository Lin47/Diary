import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtForm, AtButton } from 'taro-ui'

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
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return oldPassword
  }

  handleChangeNewPassword (newPassword) {
    this.setState({
      newPassword
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return newPassword
  }

  handleChangeRepeatPassword (repeartPassword) {
    this.setState({
      repeartPassword
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return repeartPassword
  }

  onSubmit (event) {
    console.log(event)
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
