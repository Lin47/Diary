import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCard , AtIcon, AtActivityIndicator } from 'taro-ui'
import moment from 'moment'

import DetailModel from '../../models/detail'
import DetailSwiper from '../../components/detail/Swiper'
import { onShowToast } from '../../utils/common'

import './index.scss'

export default class Detail extends Component {
  
  config = {
    navigationBarTitleText: '我的日记'
  }

  state = {
    detail: {},
    isLoading: true,
    id: null,
  }

  componentWillMount () { 
    const id = this.$router.params.id
    DetailModel.getDetail(id)
      .then(res => {
        this.setState({
          detail: res.data[0],
          isLoading: false,
          id
        })
      })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onDelDiary() {
    Taro.showModal({
      title: '警告',
      content: '真的要删除这篇日记吗？'
    })
    .then(res => {
      const { confirm } = res
      if (confirm) {
        Taro.showLoading({
          title: 'loading'
        })
        DetailModel.delDetail(this.state.id)
          .then(() => {
            Taro.hideLoading()
            Taro.reLaunch({
              url: '/pages/index/index'
            })
            .then(() => {
              onShowToast('删除成功', true)
            })
          })
      } 
    })
  }

  render () {
    const { isLoading, detail } = this.state
    return (
      <View className='detail'>
      {
        isLoading
        ? <AtActivityIndicator mode='center' />
        : <View>
            <AtCard
              extra={moment(detail.createDate).format('YYYY-MM-DD')}
              title={detail.title}
            >
              <View className='detail-toolbar'>
                <AtIcon 
                  value='edit' 
                  size='25' 
                  color='#333' 
                />
                <AtIcon
                  value='trash' 
                  size='25' 
                  color='#F00'
                  onClick={this.onDelDiary.bind(this)}
                />
              </View>
            </AtCard>
            { detail.files.length !== 0
              ? <DetailSwiper 
                imgList={detail.files} 
              />
              : ''
            }
            <View className='at-article__p'>
              {detail.content}
            </View>
          </View>
      }
      </View>
    )
  }
}
