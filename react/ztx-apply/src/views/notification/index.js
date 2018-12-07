import React from 'react';
import {Link } from 'react-router';

import iconA from './images/iconA.png';
import iconB from './images/iconB.png';
import iconC from './images/iconC.png';

class Notification extends React.Component {
  state = {};

  componentWillMount() {

  }

  componentDidMount() {
    $('.notification>.nav>li').on('click',function(e){
      console.log(e.target.tagName);
      if(e.target.tagName == 'SPAN'){
        $('.notification>.nav>li').removeClass('active');
        $(e.target).parents('li').addClass('active');
        if($(e.target).html() == 'Pengumuman'){
          $('.Peringatan').hide();
          $('.Pengumuman').show();
          //document.title = 'Pengumuman';
        }else{
          $('.Peringatan').show();
          $('.Pengumuman').hide();
          //document.title = 'Peringatan';
        }
      }
    })

    //var storageabc = localStorage.getItem('abc');
    //alert(storageabc);
    //屏幕滑动
    $('.notification').css('height',($(document).height()-$('.nav').height()-4));
    var startX,endX,startY,endY,distanceX,distanceY;
    $('.notification').bind('touchstart',function(e){
      console.log(e);
        startX = e.originalEvent.changedTouches[0].pageX,
        startY = e.originalEvent.changedTouches[0].pageY;
    });
    $('.notification').bind('touchmove',function(e){
        //获取滑动屏幕时的X,Y
        endX = e.originalEvent.changedTouches[0].pageX,
        endY = e.originalEvent.changedTouches[0].pageY;
        //获取滑动距离
        distanceX = endX-startX;
        distanceY = endY-startY;
        //判断滑动方向
        if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX>0){
          if(!$('.nav1').hasClass('active')){
            if(!($('.list').is(':animated'))){ //当物体不在运动的时候，才执行
              $('.notification>.nav>li').removeClass('active');
              $('.nav1').addClass('active');
              $('.Peringatan').hide();
              $('.Pengumuman').show();
            }
          }
        }else if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX<0){
          if(!$('.nav2').hasClass('active')){
            if(!($('.list').is(':animated'))){ //当物体不在运动的时候，才执行
              $('.notification>.nav>li').removeClass('active');
              $('.nav2').addClass('active');
              $('.Peringatan').show();
              $('.Pengumuman').hide();
            }
          }else{

          }
        }
    });
  }

  storage() {
    //localStorage.setItem('abc','1122');
  }

  render() {
    return (
      <div className="notification">
        <ul className="nav">
          <li className="active nav1">
            <span>Pengumuman</span>
          </li>
          <li className="nav2">
            <span>Peringatan</span>
          </li>
        </ul>
        {/*消息通知*/}
        <div className="list Pengumuman">
          <Link to={'/NotificationDetail'}>
            <ul className="product">
              <li className="left">
                <img src={iconA} />
              </li>
              <li className="right">
                <p className="time">29-May-2018 / 15：00</p>
                <p className="title">Pengumuman jadwal libur Idul Fitri 2018:</p>
              </li>
            </ul>
          </Link>
        </div>
        {/*提醒*/}
        <div className="list Peringatan" style={{'display':'none'}}>
          <ul className="product" style={{'display':'none'}}>
            <li className="left">
              <img src={iconB} />
            </li>
            <li className="right">
              <p className="time">29-May-2018 / 15：00</p>
              <p className="title">Pengumuman jadwal libur Idul Fitri 2018:</p>
            </li>
          </ul>
          {/*暂无任何消息*/}
          <div className="none">
            <img src={iconC} />
            Tidak ada pesan sampai saat ini
          </div>
        </div>
        {/*底部tips*/}
        <div className="tips">Tampilkan pesan dalam 6 bulan terakhir </div>
      </div>
    );
  }
}

Notification.defaultProps = {
};

export default Notification;
