import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtForm, AtSwitch, AtTextarea, AtImagePicker, AtButton  } from 'taro-ui'

import { onShowToast } from '../../utils/common'
import WriteModel from '../../models/write'
import DetailModel from '../../models/detail'

import './index.scss'

export default class Write extends Component {
  
  config = {
    navigationBarTitleText: '日记'
  }

  constructor () {
    super(...arguments)
    this.state = {
      title: '',
      isLock: false,
      content: '',
      files: [],
      diaryID: null,
    }

    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleChangeClock = this.handleChangeClock.bind(this)
    this.handleChangeTextArea = this.handleChangeTextArea.bind(this)
    this.onChangeImg = this.onChangeImg.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () {
    const id = this.$router.params.id
    if (id) {
      Taro.showLoading()
      DetailModel.getDetail(id)
      .then(res => {
        const { data } = res
        const { title, isLock, content, files } = data[0]
        this.setState({
          title,
          isLock,
          content,
          files,
          diaryID: id
        }, () => {
          Taro.hideLoading()
        })
      })
    }
  }

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
  
  onChangeImg (newfiles, operationType, index) {
    const { files } = this.state
    Taro.showLoading({
      title: 'loading'
    })
    if (operationType === 'add') {
      const imageUrl = newfiles[newfiles.length - 1].url
      this.onUploadFile(imageUrl)
        .then(res => {
          const { statusCode, fileID } = res
          if(statusCode === 200) {
            const newFiles = files.concat({
              url:fileID
            })
            this.setState({
              files: newFiles
            })
            Taro.hideLoading()
            onShowToast('图片上传成功', true)
          } else {
            Taro.hideLoading()
            onShowToast('图片上传失败', false)
          }
        })
        .catch(err => {
          console.log(err)
          Taro.hideLoading()
          onShowToast('图片上传失败', false)
        })
    } else if (operationType === 'remove') {
      const imageUrl = files[index].url
      this.onDeleteFile(imageUrl)
        .then(res => {
          console.log(res)
          const { fileList } = res
          const { status } = fileList[0]
          if (status === 0) {
            const newFiles = files.concat()
            newFiles.splice(index, 1)
            this.setState({
              files: newFiles
            })
            Taro.hideLoading()
            onShowToast('图片删除成功', true)
          }
        })
        .catch(err => {
          console.log(err)
          Taro.hideLoading()
          onShowToast('图片删除失败', false)
        })
    }
  }

  onSubmit () {
    const { title, isLock, content, files, diaryID } = this.state
    if (!this.onValidate(title, content)) return
    Taro.showLoading({
      title: 'loading'
    })
    if (diaryID) {
      const data = {
        title,
        isLock,
        content,
        files,
        id: diaryID
      }
      WriteModel.modifyDiary(data)
        .then((res) => {
          console.log(res)
          if (res.result.stats.updated === 1) {
            Taro.hideLoading()
            Taro.reLaunch({
              url: '/pages/index/index'
            })
            .then(() => {
              onShowToast('修改成功！', true)
            })
          } else if (res.result.stats.updated === 0) {
            Taro.hideLoading()
            onShowToast('修改失败！', false)
          }
        })
        .catch(err => {
          console.log(err)
          Taro.hideLoading()
          onShowToast('修改失败！', false)
        })
    } else {
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
        .catch(err => {
          console.log(err)
          Taro.hideLoading()
          onShowToast('修改失败！', false)
        })
    }
  }

  onUploadFile (url) {
    return new Promise((resolve, reject) => {
      const name = Math.random() * 1000000
      const cloudPath = name + url.match(/\.[^.]+?$/)[0]
      Taro.cloud.uploadFile({
        cloudPath,
        filePath: url
      })
      .then(res => resolve(res))
      .catch(err => reject(err))
    })
  }

  onDeleteFile (url) {
    return new Promise((resolve, reject) => {
      const fileIDs = Object.assign([], [url])
      console.log(fileIDs)
      Taro.cloud.deleteFile({
        fileList: fileIDs
      })
      .then(res => resolve(res))
      .catch(err => reject(err))
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

  onImageClick (index, file) {
    const urls = []
    this.state.files.map((values => {
      const { url } = values 
      urls.push(url)
    })) 
    Taro.previewImage({
      current: file.url,
      urls
    })
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
            onImageClick={this.onImageClick.bind(this)}
            count={1}
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
