import React from 'react';
import {Link } from 'react-router';
import axios from 'axios';
import config from '../../config/base';
import restStore from './store';
import format from '../../custom/format.js';
import './style/event.css';

import eventImg from './images/list.png';

const httpUrl = location.protocol+'//'+config.domainApply+'/'+config.pathApply+'/';
class Event extends React.Component {
  state = {
    activityList:[]
  };

  componentDidMount() {
    $('html,body,#app').css('height','100%');
    //获取营销活动列表
    this.getActivityList();
  }

  /*生命周期即将结束*/
  componentWillUnmount() {
    $('html,body,#app').css('height','auto');
    //localStorage.removeItem('activityList');
  }

  /*获取营销活动列表*/
  getActivityList = () => {
    var token = this.props.location.query.token || '';
    localStorage.setItem('token',token);
    if(App){
      App.showLoading(true);
    }
    axios.get(restStore.getPubActivityInfo,{params:{}}).then((res) => {
        if(App){
          App.showLoading(false);
        }
        if(res.data.code == '0000'){
          if(res.data.body.length>0){
            this.setState({
              activityList:res.data.body
            },() => {
              localStorage.setItem('activityList',JSON.stringify(res.data.body));
            })
          }else{
            $('.eventList').hide();
            $('.emptyTip').show();
          }
        }
    });
  }

  /*
  *@description 点击列表事件 添加埋点
  */
  clickEventList = (activityId) => {
    var token = this.props.location.query.token;
    var registId = this.props.location.query.registId;
    var deviceId = this.props.location.query.deviceId;
    axios.get(restStore.statistics,{params:{
      registId:registId || '',
      eventType:'CLICKACTIVITY',
      activityId:activityId,
      deviceId:deviceId
    }}).then((res) => {
      //成功 不处理
    },(res) => {
      //失败 不处理
    });
  }


  render() {
    return (
      <div className="event">
        <div className="eventList">
          {
            this.state.activityList.map((item,index) => {
              return (
                <Link className="eventLink" to={item.htmlUrl?(item.htmlUrl.split('#')[1]):'/activity'} onClick={this.clickEventList.bind(this,item.id)}>
                  <img className="img" src={httpUrl+item.listImage} />
                  <span className="timeDate startDate">
                    <label className="left">
                      <label>{format.timestampToTime(item.startDate,'day')}</label>
                    </label>
                    <label className="right">
                      <label>{format.timestampToTime(item.startDate,'month')}</label>
                      <label>{format.timestampToTime(item.startDate,'year')}</label>
                    </label>
                  </span>
                  <span className="timeDate endDate">
                    <label className="left">
                      <label>{format.timestampToTime(item.endDate,'day')}</label>
                    </label>
                    <label className="right">
                      <label>{format.timestampToTime(item.endDate,'month')}</label>
                      <label>{format.timestampToTime(item.endDate,'year')}</label>
                    </label>
                  </span>
                </Link>
              )
            })
          }
        </div>
        <div className="emptyTip" style={{'display':'none'}} onClick={this.getActivityList}>
          <span>Kita akan hadirkan event menarik dalam waktu dekat !</span></div>
      </div>
    );
  }
}

Event.defaultProps = {
};

export default Event;
