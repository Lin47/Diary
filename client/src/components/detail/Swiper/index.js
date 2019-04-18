import Taro, { Component } from '@tarojs/taro'
import { Swiper, SwiperItem, Image } from '@tarojs/components'

import './index.scss'

export default class DetailSwiper extends Component {
  defaultProps = {
    imgList: []
  }
  render () {
    const { imgList, onPreview } = this.props
    return (
      <Swiper
        className='detail-swiper'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay
      > 
        {
          (imgList || []).map((values) => {
            const { url } = values
            return (
              <SwiperItem key={url}>
                <Image
                  src={url}
                  mode='aspectFit'
                  className='swiper-img'
                  onClick={() => {onPreview(url)}}
                />
              </SwiperItem>
            )
          })
        }
      </Swiper>
    )
  }
}