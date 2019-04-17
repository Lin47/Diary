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
  
  onChangeImg (files, operationType, index) {
    console.log(files, operationType, index)
    // const name = Math.random() * 1000000;
    // const cloudPath = name + files[0].url.match(/\.[^.]+?$/)[0]
    // Taro.cloud.uploadFile({
    //   cloudPath,
    //   filePath: files[0].url, // 文件路径
    // })
    // .then((res) => {
    //   console.log(res)
    // })
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

  onUploadFile () {
    const { files } = this.state
    return Promise.all(files.map((values) => {
      return new Promise((resolve, reject) => {
        const { url } = values
        const name = Math.random() * 1000000;
        const cloudPath = name + url.match(/\.[^.]+?$/)[0]
        Taro.cloud.uploadFile({
          cloudPath,
          filePath: url
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
      })
    }))
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
    const { title, isLock, content, files } = this.state
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
            value={title}
            onChange={this.handleChangeText}
          />
          <AtSwitch
            title='是否加密'
            checked={isLock}
            onChange={this.handleChangeClock} 
          />
          <AtTextarea
            value={content}
            onChange={this.handleChangeTextArea}
            maxLength={1500}
            placeholder='日记正文...'
            height={450}
            className='write-textarea'
          />
          <AtImagePicker
            files={files}
            onChange={this.onChangeImg}
            multiple={false}
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
