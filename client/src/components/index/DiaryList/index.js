import Taro, { Component } from "@tarojs/taro"
import { View } from '@tarojs/components'
import { AtTag, AtIcon } from 'taro-ui'
import moment from 'moment'

import './index.scss'

export default class DiaryList extends Component {
  defaultProps = {
    diaryList: {
      title: '',
      createDate: '',
      isClock: true
    }
  }
  onGotoDetail (id, isLock) {
    if (isLock) {
      return 
    }
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}`
    })
  }

  render () {
    const { diaryList } = this.props
    return (
      <View className='project-container'>
        <View className='count'>
          你有
          <View className='num'>{diaryList.length}</View>
          条日记:
        </View>    
        {
          diaryList.map((values) => {
            // console.log(values)
            const { _id, title, createDate, isLock } = values
            return (
              <View 
                className='project' 
                key={_id}
                onClick={() => { this.onGotoDetail(_id, isLock) }}
              >
                <View className='title'>{title}</View>
                <View className='tag-icon'>
                  <AtTag
                    size='small'
                    type='primary'
                  >
                    {moment(createDate).format('YYYY-MM-DD')}
                  </AtTag>
                  { 
                    isLock
                    ? <AtIcon 
                      value='lock' 
                      size='20' 
                      color='#F00'
                      className='list-icon'
                    />
                    : ''
                  }
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }
}