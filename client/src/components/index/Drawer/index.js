import Taro, { Component } from "@tarojs/taro"
import { AtDrawer, AtListItem } from 'taro-ui'

export default class Drawer extends Component {
  defaultProps = {
    showDrawer: false
  }
  render () {
    const { showDrawer, onCloseDrawer, onGoWrite, onGoPassword } = this.props
    return (
      <AtDrawer
        show={showDrawer}
        mask
        right
        onClose={onCloseDrawer}
      >
          <AtListItem 
            title='日记' 
            arrow='right' 
            iconInfo={{ size: 25, color: '#78A4FA', value: 'edit', }}
            onClick={onGoWrite}
          />
          <AtListItem 
            title='密码' 
            arrow='right' 
            iconInfo={{ size: 25, color: '#78A4FA', value: 'lock', }}
            onClick={onGoPassword}
          />
          <AtListItem 
            title='反馈' 
            arrow='right'
            iconInfo={{ size: 25, color: '#78A4FA', value: 'help', }}
          />
        </AtDrawer>
    )
  }
}