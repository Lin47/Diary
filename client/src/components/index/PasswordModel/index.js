import Taro, { Component } from '@tarojs/taro'
import { Button } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInput, AtForm } from 'taro-ui'


export default class Tips extends Component {
  defaultProps = {
    showModel: false,
    password: ''
  }
  render () {
    const { showModel, password, onChangePassword, onCloseModel, onConfirmModel } = this.props
    return (
      <AtModal isOpened={showModel}>
          <AtModalHeader>请输入密码</AtModalHeader>
          <AtModalContent>
            <AtForm>
              <AtInput
                name='password'
                type='password'
                placeholder='密码不能超过6位'
                value={password}
                onChange={onChangePassword}
                length={6}
              />
            </AtForm>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={onCloseModel}>取消</Button>
            <Button onClick={onConfirmModel}>确定</Button>
          </AtModalAction>
        </AtModal>
    )
  }
}
