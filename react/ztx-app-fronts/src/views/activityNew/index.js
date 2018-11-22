import React from 'react';
import './style/activity.css';
import axios from 'axios';
import format from '../../custom/format.js';
import restStore from './store';

import top1 from './images/top1.png';
import top2 from './images/top2.png';

class Activity extends React.Component {
  state = {
    activityInfo:{}
  };

  componentDidMount() {
    this.getActivityList();
  }

  /*
  *@description 转化时间戳
  */
  changeDate = (activityInfo) => {
    //转化时间戳格式:日-月-年
    Object.assign(activityInfo,{
      startYear:format.timestampToTime(activityInfo.startDate,'year'),
      startMonth:format.timestampToTime(activityInfo.startDate,'month'),
      startDay:format.timestampToTime(activityInfo.startDate,'day'),
      endYear:format.timestampToTime(activityInfo.endDate,'year'),
      endMonth:format.timestampToTime(activityInfo.endDate,'month'),
      endDay:format.timestampToTime(activityInfo.endDate,'day')
    })
    this.setState({
      activityInfo:activityInfo
    },() => {
      console.log(this.state.activityInfo);
    })
  }

  /*获取营销活动列表*/
  getActivityList = () => {
    if(App){
      App.showLoading(true);
    }
    axios.get(restStore.getPubActivityInfo,{params:{}}).then((res) => {
        if(App){
          App.showLoading(false);
        }
        if(res.data.code == '0000'){
          if(res.data.body.length>0){
            //localStorage.setItem('activityList',JSON.stringify(res.data.body));
            var activityInfo = (res.data.body.filter((item) => item.htmlUrl == '/#/activityNew'))[0];
            this.changeDate(activityInfo);
          }
        }
    });
  }

  /*
  *@description 查看更多信息
  */
  showOtherDetail = (e) => {
    $(e.currentTarget).hide();
    $(e.currentTarget).siblings('.otherDetail').fadeIn(500);
    document.getElementById("otherDetail").scrollIntoView(true);
  }

  render() {
    return (
      <div className="activity">
        <div className="banner">
          <div className="timeErea">
            <img src={top1} />
            <span className="benginTime timing">
              <label className="left">
                <label>{this.state.activityInfo.startDay}</label>
              </label>
              <label className="right">
                <label>{this.state.activityInfo.startMonth}</label>
                <label>{this.state.activityInfo.startYear}</label>
              </label>
            </span>
            <span className="endTime timing">
              <label className="left">
                <label>{this.state.activityInfo.endDay}</label>
              </label>
              <label className="right">
                <label>{this.state.activityInfo.endMonth}</label>
                <label>{this.state.activityInfo.endYear}</label>
              </label>
            </span>
          </div>
          <img src={top2} />
        </div>
        <div className="activityDesc">
          <div className="detailTop detail">
            <ul>
              <li className="left">
                <span>Jumlah pengajuan</span>
              </li>
              <li className="right">Nilai kupon</li>
            </ul>
            <ul>
              <li className="left">
                <span>Selama periode kegiatan,1X berhasil mengajukan pinjaman</span>
              </li>
              <li className="right">Rp15.000</li>
            </ul>
            <ul>
              <li className="left">
                <span>Selama periode kegiatan,2X berhasil mengajukan pinjaman</span>
              </li>
              <li className="right">Rp30.000</li>
            </ul>
          </div>
          <div className="detailBottom detail">
            <ul>
              <li className="left">
                <span style={{'width':'72%'}}>Selama periode kegiatan,≥ 3X berhasil mengajukan pinjaman</span>
              </li>
              <li className="right">Rp60.000</li>
            </ul>
            <div className="detailText">
              <p>Upgrade level :</p>
              <p>Pengguna baru hanya perlu menaikan level menjadi pengguna lama selama periode kegiatan. Setelah berhasil melakukan pinjaman pertama, anda juga dapat mengikuti program promosi. Pada pinjaman kedua akan mendapatkan potongan Rp15.000, pinjaman ketiga potongan Rp30.000, pinjaman keempat potongan Rp60.000.</p>
            </div>

            <div className="otherInfomation">
              <div className="handleInfo" onClick={this.showOtherDetail.bind(this)}>Keterangan lainnya ></div>
              <div className="otherDetail" id="otherDetail" style={{'display':'none'}}>
                <div className="otherTitle">Keterangan lainnya</div>
                <div className="otherList">
                  <div className="otherItem">1. Pelanggan yang memenuhi kriteria perlu mengajukan permohonan pinjaman pada masa promosi berlaku；</div>
                  <div className="otherItem">2. Setelah dana berhasil ditransfer, kupon potongan pembayaran akan dikirimkan ke lama【Kupon saya】</div>
                  <div className="otherItem">3. Kupon potongan pembayaran dapat digunakan untuk mengurangi jumlah pembayaran pada saat akan melakukan pembayaran；</div>
                  <div className="otherItem">4. Kupon potongan pembayaran berlaku sampai masa jatuh tempo pinjaman. Kupon otomatis tidak berlaku jika lewat dari tanggal jatuh tempo；</div>
                  <div className="otherItem">5. Jika Pengguna terlambat membayar, kupon otomatis tidak berlaku；</div>
                  <div className="otherItem">6. Kupon potongan pembayaran tidak dapat ditukar dengan uang tunai；</div>
                  <div className="otherItem">7. Satu kupon potongan pembayaran hanya dapat digunakan untuk satu kontrak;</div>
                  <div className="otherItem">8. Dalam lingkup perizinan, penjelasan kegiatan ini dapat dimintakan kepada PT Kredit Plus Teknologi, dengan menghubungi Layanan Pelanggan（021）3003 3358 (Hari kerja : Senin - Jumat , Pagi jam 09:00 - 12:00, Siang jam 13:00 - 17:00)</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

Activity.defaultProps = {
};

export default Activity;
