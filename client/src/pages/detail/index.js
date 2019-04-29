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
    navigationBarTitleText: '快进来看看'
  }
  constructor () {
    super(...arguments)
    this.state = {
      detail: {},
      isLoading: true,
      id: null,
    }

    this.onModifyDiary = this.onModifyDiary.bind(this)
    this.onDelDiary = this.onDelDiary.bind(this)
    this.onPreview = this.onPreview.bind(this)
  }

  componentWillMount () { 
    const { id } = this.$router.params
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
      content: '真的要删除吗？'
    })
    .then(res => {
      const { confirm } = res
      if (confirm) {
        Taro.showLoading({
          title: 'loading'
        })
        DetailModel.delDetail(this.state.id)
          .then(() => {
            this.onDeleteFile()
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

  onModifyDiary (id) {
    Taro.reLaunch({
      url: `/pages/write/index?id=${id}`
    })
  }

  onPreview(current) {
    const urls = []
    const { files } = this.state.detail
    files.map((values => {
      const { url } = values 
      urls.push(url)
    }))
    Taro.previewImage({
      current,
      urls
    })
  }

  onDeleteFile () {
    return new Promise((resolve, reject) => {
      const { files } = this.state.detail
      const delFiles = []
      files.map((values => {
        const { url } = values 
        delFiles.push(url)
      }))
      Taro.cloud.deleteFile({
        fileList: delFiles
      })
      .then(res => resolve(res))
      .catch(err => reject(err))
    })
  }

  render () {
    const { isLoading, detail, id } = this.state
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
                  onClick={() => {this.onModifyDiary(id)}}
                />
                <AtIcon
                  value='trash' 
                  size='25' 
                  color='#F00'
                  onClick={this.onDelDiary}
                />
              </View>
            </AtCard>
            { detail.files.length !== 0
              ? <DetailSwiper 
                imgList={detail.files}
                onPreview={this.onPreview}
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
