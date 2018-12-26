import React from 'react';
import './style/activity.css';
import format from '../../custom/format.js';
import title1 from './images/title1.png';
import title2 from './images/title2.png';
import one from './images/one.png';
import two from './images/two.png';
import people1 from './images/people1.png';
import people2 from './images/people2.png';

class Rule extends React.Component {
  state = {
    modal:false
  };

  componentDidMount() {

  }

  render() {
    return (
      <div className="activityRule">
        <div className="Rule ruleBg1 bgTop">
          <div className="title">
            <img src={title1} />
          </div>
          <div className="main">
            <div className="titleSec one">
              <img src={one} />Hadiah untuk undang dan registrasi
            </div>
            <div className="ruleDetail">
              <div className="ruleText">
                <p className="detailTitle">Anda dapat kupon pembayaran Rp4.000 untuk setiap teman yang download dan berhasil registrasi.</p>
                <p className="detail">Selama periode kegiatan, setiap teman yang diundang dan berhasil daftar serta aktivasi akun, Anda akan dapat kupon potongan pembayaran Rp4.000. Setelah akun teman aktif, kupon potongan pembayaran akan dikirimkan ke Akun – Kupon dan kupon pembayaran akan otomatis dapat digunakan pada saat pembayaran.</p>
              </div>
              <div className="ruleImg">
                <img src={people1} />
              </div>
            </div>
          </div>
        </div>
        <div className="Rule ruleBg1 bgBottom">
          <div className="main">
            <div className="titleSec two">
              Teman berhasil pinjam <img src={two} />
            </div>
            <div className="ruleDetail">
              <div className="ruleImg">
                <img src={people2} />
              </div>
              <div className="ruleText" style={{'textAlign':'right'}}>
                <p className="detail">Selama periode kegiatan, setiap teman yang berhasil daftar dan berhasil menerima pinjaman dalam waktu 30 hari, maka Anda akan mendapatkan hadiah Rp50.000. Setelah teman Anda menerima dana pinjaman, hadiah akan dikirimkan ke Akun – Hadiah dan nominal hadiah dapat ditarik dana ke rekening pribadi. </p>
              </div>
            </div>
          </div>
        </div>
        <div className="Rule ruleBg2 bgTop">
          <div className="title">
            <img src={title1} />
          </div>
          <div className="main">
            <div className="detail">
              <div className="secTitle">Periode pelaksanaan</div>
              <div className="ruleText">
                <p>1/1/2019-28/2/2019</p>
                <p>(periode kegiatan 2 Bulan)</p>
              </div>
              <div className="secTitle">Ditujukan kepada</div>
              <div className="ruleText">
                <p>Khusus bagi pengguna lama yang sudah pernah melakukan pengajuan (klik kirim undangan bisa langsung tahu bisa berpartisipasi atau tidak)</p>
              </div>
            </div>
          </div>
        </div>
        <div className="Rule ruleBg2 bgBottom">
          <div className="main">
            <div className="detail">
              <div className="secTitle">Hadiah untuk undang daftar</div>
              <div className="ruleText">
                <p>Selama periode kegiatan, setiap teman yang menerima undangan berhasil daftar dan mengaktifkan akun, maka Anda akan mendapatkan kupon potongan pembayaran Rp4.000</p>
                <div className="thirdTitle">Batas kegiatan</div>
                <p className="moreDetail">Teman Anda harus menggunakan link yang Anda kirimkan kemudian download aplikasi dan daftar.</p>
                <p className="moreDetail">Pastikan nomor telepon belum pernah terdaftar dan dalam waktu 30 hari akun harus diaktifkan.</p>
                <div className="thirdTitle" style={{'paddingTop':'0px'}}>Ketentuan diatas harus dipenuhi. Jika tidak akan dianggap tidak memenuhi kriteria dan tidak bisa mendapatkan hadiah.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Rule.defaultProps = {
};

export default Rule;
