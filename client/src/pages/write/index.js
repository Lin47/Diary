import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtForm, AtSwitch, AtTextarea, AtImagePicker, AtButton  } from 'taro-ui'

import { onShowToast } from '../../utils/common'
import WriteModel from '../../models/write'

import './index.scss'

export default class Write extends Component {
  
  config = {
    navigationBarTitleText: '写日记'
  }

  constructor () {
    super(...arguments)
    this.state = {
      title: '',
      isLock: false,
      content: '',
      files: [],
    }

    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleChangeClock = this.handleChangeClock.bind(this)
    this.handleChangeTextArea = this.handleChangeTextArea.bind(this)
    this.onChangeImg = this.onChangeImg.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChangeText (title) {
    this.setState({
      title
    })
    return title
  }

  handleChangeClock (isLock) {
    this.setState({
      isLock
    })
  }

  handleChangeTextArea ({target: { value }}) {
    this.setState({
      content: value
    })
    return value
  }
  
  onChangeImg (files) {
    console.log(files)
    Taro.cloud.uploadFile({
      cloudPath: 'example.png',
      filePath: '', // 文件路径
    }).then(res => {
      console.log(res)
    }).catch(error => {
      console.error(error)
    })
    this.setState({
      files
    })
  }

  onSubmit () {
    const { title, isLock, content, files } = this.state
    if (!this.onValidate(title, content)) return
    Taro.showLoading({
      title: 'loading'
    })
    const data = {
      title,
      isLock,
      content,
      files,
      createDate: new Date()
    }
    WriteModel.addDiary(data)
      .then(() => {
        Taro.hideLoading()
        Taro.reLaunch({
          url: '/pages/index/index'
        })
        .then(() => {
          onShowToast('写好啦！', true)
        })
      })
  }

  onValidate (title, content) {
    if (title === '') {
      onShowToast('标题不可为空', false)
      return false 
    } 
    if (content === '') {
      onShowToast('日记正文不可为空', false)
      return false 
    }
    return true
  }

  render () {
    return (
      <View className='write'>
        <AtForm
          className='write-from'
          onSubmit={this.onSubmit}
        >
          <AtInput
            name='title'
            title='标题'
            type='text'
            placeholder='日记标题...'
            value={this.state.title}
            onChange={this.handleChangeText}
          />
          <AtSwitch
            title='是否加密'
            checked={this.state.isLock}
            onChange={this.handleChangeClock} 
          />
          <AtTextarea
            value={this.state.content}
            onChange={this.handleChangeTextArea}
            maxLength={1500}
            placeholder='日记正文...'
            height={450}
            className='write-textarea'
          />
          <AtImagePicker
            files={this.state.files}
            onChange={this.onChangeImg}
          />
          <AtButton
            formType='submit' 
            type='primary'
            className='write-btn'
          >
            提交
          </AtButton>
        </AtForm>
      </View>
    )
  }
}
