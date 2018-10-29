import React from 'react';
import './style/activity.css';
import axios from 'axios';
import time from './images/time.png';
import format from '../../custom/format.js';
import ruleBg from './images/ruleBg.png';
import restStore from './store';

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
      startDate:format.timestampToTime(activityInfo.startDate),
      endDate:format.timestampToTime(activityInfo.endDate)
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
            var activityInfo = (res.data.body.filter((item) => item.htmlUrl == '/#/activity'))[0];
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
        <div className="timeErea">
          <div className="time">
            <img src={time} />
            <label>{this.state.activityInfo.startDate} sampai {this.state.activityInfo.endDate}</label>
          </div>
        </div>
        <div className="activityDetail">
          <div className="title">
            <img src={ruleBg} />
          </div>
          <div className="main">
            <div className="mainDetail">
              <p className="desc"><b>Sasaran</b>: Diberikan kepada pelanggan yang berhasil melakukan pinjaman minimal 1 kali sebelum tanggal 17 Oktober 2018.</p>
              <p className="descTitle"><b>Konten kegiatan:</b></p>
              <p>Selama masa promosi, Pelanggan yang mengajukan permohonan pinjaman dan berhasil mendapatkan pinjaman, berdasarkan jumlah pengajuan yang disetujui dan jumlah pinjaman, diberikan kupon potongan yang sesuai dengan detail sebagai berikut:</p>
            </div>
          </div>
          <div className="ruleGrid">
            <ul>
              <li className="gridTitle l">Keterangan</li>
              <li className="gridTitle m">Jumlah pinjaman (X)</li>
              <li className="gridTitle r"> Nilai kupon</li>
            </ul>
            <ul>
              <li className="lineHeight l">
                <span>Selama masa promosi, berhasil melakukan pinjaman pertama</span>
              </li>
              <li className="m">
                <p>{'X<= Rp1.100.000'}</p>
                <p className="letterSpace">{'Rp1.100.000 <X<= Rp1.900.000'}</p>
                <p>{'X> Rp1.900.000'}</p>
              </li>
              <li className="r">
                <p>Rp10.000</p>
                <p>Rp20.000</p>
                <p>Rp30.000</p>
              </li>
            </ul>
            <ul>
              <li className="lineHeight l">
                <span>Selama masa promosi, berhasil melakukan pinjaman kedua dan seterusnya</span>
              </li>
              <li className="m">
                <p>{'X<= Rp1.100.000'}</p>
                <p className="letterSpace">{'Rp1.100.000 <X<= Rp1.900.000'}</p>
                <p>{'X> Rp1.900.000'}</p>
              </li>
              <li className="r">
                <p>Rp25.000</p>
                <p>Rp35.000</p>
                <p>Rp45.000</p>
              </li>
            </ul>
          </div>
          <div className="otherInfomation">
            <div className="handleInfo" onClick={this.showOtherDetail.bind(this)}>Keterangan lainnya ></div>
            <div className="otherDetail" id="otherDetail" style={{'display':'none'}}>
              <div className="otherTitle">Keterangan lainnya</div>
              <div className="otherList">
                <div className="otherItem">Pelanggan yang memenuhi kriteria perlu mengajukan permohonan pinjaman pada masa promosi berlaku;</div>
                <div className="otherItem">Setelah dana berhasil ditransfer, kupon potongan pembayaran akan dikirimkan ke laman【<b>Kupon saya</b>】;</div>
                <div className="otherItem">Kupon potongan pembayaran dapat digunakan untuk mengurangi jumlah pembayaran pada saat akan melakukan pembayaran;</div>
                <div className="otherItem">Kupon potongan pembayaran berlaku sampai masa jatuh tempo pinjaman. Kupon otomatis tidak berlaku jika lewat dari tanggal jatuh tempo;</div>
                <div className="otherItem">Jika Pengguna terlambat membayar, kupon otomatis tidak berlaku;</div>
                <div className="otherItem">Kupon potongan pembayaran tidak dapat ditukar dengan uang tunai;</div>
                <div className="otherItem">Satu kupon potongan pembayaran hanya dapat digunakan untuk satu kontrak;</div>
                <div className="otherItem">Dalam lingkup perizinan, penjelasan kegiatan ini dapat dimintakan kepada PT Kredit Plus Teknologi, dengan menghubungi Layanan Pelanggan（021）3003 3358 (Hari kerja : Senin - Jumat , Pagi jam 09:00 - 12:00, Siang jam 13:00 - 17:00)</div>
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
