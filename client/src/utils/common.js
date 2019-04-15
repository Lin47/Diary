import Taro from '@tarojs/taro'

const onShowToast = (msg, isSuccess) =>{
  isSuccess = isSuccess ? 'success' : 'none'
  Taro.showToast({
    title: msg,
    icon: isSuccess,
    duration: 2000
  })
}

const showModal = (msg) =>{
  Taro.showToast({
    title: msg,
    icon: 'none'
  })
}

export { onShowToast, showModal }
