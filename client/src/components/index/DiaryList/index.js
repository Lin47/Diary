import Taro, { Component } from "@tarojs/taro"
import { View } from '@tarojs/components'
import { AtTag, AtIcon, AtLoadMore } from 'taro-ui'
import moment from 'moment'

import './index.scss'

export default class DiaryList extends Component {
  defaultProps = {
    diaryList: [],
    loadMore: 'More',
    isPasswordLock: true,
    isLock: true
  }

  onGotoDetail (id, isLock) {
    const { isPasswordLock, onOpenPasswordModel } = this.props
    if (isLock && isPasswordLock) {
      onOpenPasswordModel(id)
      return 
    }
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}`
    })
  }

  render () {
    const { diaryList, loadMore, onLoadMore } = this.props
    return (
      <View>
        <View className='project-container'>
          <View className='count'>
            {/* 你有
            <View className='num'>{diaryList.length}</View>
            条日记: */}
            天知道我们会发现什么样的大秘密？
          </View>
          {
            (diaryList || []).map((values) => {
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
        <AtLoadMore
          onClick={onLoadMore}
          status={loadMore}
          moreBtnStyle={{ border: 'none', color: '#333', fontWeight: '200' }}
        />
      </View>
    )
  }
}