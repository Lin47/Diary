import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtForm, AtSwitch, AtTextarea, AtImagePicker, AtButton  } from 'taro-ui'

import './index.scss'

export default class Write extends Component {
  
  config = {
    navigationBarTitleText: '写日记'
  }

  constructor () {
    super(...arguments)
    this.state = {
      files: [{
        url: 'https://jimczj.gitee.io/lazyrepay/aragaki1.jpeg',
      },
      {
        url: 'https://jimczj.gitee.io/lazyrepay/aragaki2.jpeg',
      },
      {
        url: 'https://jimczj.gitee.io/lazyrepay/aragaki3.png',
      }],
      value: ''
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChange (event) {
    this.setState({
      value: event.target.value
    })
  }

  onChange (files) {
    this.setState({
      files
    })
  }

  render () {
    return (
      <View className='write'>
        <AtForm className='write-from'>
          <AtInput
            name='value1'
            title='标题'
            type='text'
            placeholder='输入标题'
            value={this.state.value1}
            onChange={this.handleChange.bind(this)}
          />
          <AtSwitch title='是否加密' checked={this.state.value} onChange={this.handleChange} />
          <AtTextarea
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
            maxLength={1500}
            placeholder='你的问题是...'
            height={450}
            className='write-textarea'
          />
          <AtImagePicker
            files={this.state.files}
            onChange={this.onChange.bind(this)}
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
