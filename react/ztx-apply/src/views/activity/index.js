import React from 'react';
import './style/activity.css';
import axios from 'axios';
import { Modal} from 'antd-mobile';
import format from '../../custom/format.js';
import restStore from './store';
import activityTop from './images/activityTop.png';
import activityHead from './images/activityHead.png';
import activityBody from './images/activityBody.png';
import activityBottom from './images/activityBottom.png';
import rule from './images/rule.png';
import people from './images/people.png';
import btn from './images/btn.png';

class Activity extends React.Component {
  state = {
    modal:false
  };

  componentDidMount() {

  }

  /*
  *@description 前往活动细则
  */
  gotoRule = () => {
    this.props.router.push('/ActivityRule')
  }

  /*
  *@description 点击按钮
  */
  shareToFriend = () => {
    this.showModal('modal');//弹窗提示
  }

  /*
  *@description 显示弹窗
  */
  showModal =  (key) => {
    //e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  /*
  *@description 关闭弹窗
  */
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  render() {
    return (
      <div className="activity">
        <Modal
          visible={this.state.modal}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal')}
          title=""
          footer={[{ text: 'Batal', onPress: this.onClose('modal')},{ text: 'Ajukan Sekarang', onPress: this.onClose('modal') }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div className="modalAlert">
            Ajukan pinjaman sekarang untuk dapatkan kesempatan berpartisipasi!
          </div>
        </Modal>
        <div className="activityTop">
          <img className="topBg" src={activityTop} />
          <img className="rule" src={rule} onClick={this.gotoRule.bind(this)}/>
          <img className="people" src={people} />
          <img className="btn" src={btn}/>
          <div className="btnDiv" onClick={this.shareToFriend.bind(this)}></div>
        </div>
        <div className="activityBody">
          <img className="bg" src={activityHead} />
          <img className="bg" src={activityBody} />
          <img className="bg" src={activityBottom} />
          <img className="btn" src={btn} onClick={this.shareToFriend.bind(this)}/>
        </div>
      </div>
    );
  }
}

Activity.defaultProps = {
};

export default Activity;
