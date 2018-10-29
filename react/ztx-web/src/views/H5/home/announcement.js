import React from 'react';
import MobildNav from '../../public/mobildNav';//nav
import MobileBottom from '../../public/mobileBottom';//bottom
import intro from '../../../images/intro.png';//banner图片


class Introduction extends React.Component {
  state = {languaga:'Indonesian'};

  componentDidMount() {
    $('.showItem').on('click',(e) => {
      if($(e.target).parents('.showItem').siblings('.detail').is(':hidden')){
        $('.detail').slideUp();
        $(e.target).parents('.showItem').siblings('.detail').slideDown();
      }else{
        $('.detail').slideUp();
        $(e.target).parents('.showItem').siblings('.detail').slideUp();
      }
    })
  }

  render() {
    return (
      <div className="MobileIndex">
        <MobildNav/>{/*nav*/}
        <div className="intro">
          <img src={intro} />
          <div className="yellowTitle">Pengumuman situs</div>
          <div className="main" style={{'width':'92%'}}>
            <ul className="announce">
              <li>
                <div className="showItem">
                  <p className="name">Pengumuman pengaturan kerja periode HUT RI ke 73 tahun 2018</p><p className="time">13-Aug-2018</p>
                </div>
                <div className="detail" style={{'padding-bottom':'2em','display':'none'}}>{/*公告详情*/}
                  <p><b>Pelanggan yang terhormat:</b></p>
                  <p>Dengan ini kami sampaikan informasi tentang Libur Hari Raya Kemerdekaan Republik Indonesia yang ke 73 sebagai berikut :</p>
                  <p style={{'color':'#787878'}}>
                    <span style={{'display':'inline-block','width':'2%','vertical-align':'top'}}>•</span>
                    <span style={{'display':'inline-block','width':'98%','vertical-align':'top'}}>17 Agustus 2018 adalah libur nasional Hari Raya Kemerdekaan. Selama hari tersebut, proses persetujuan dan peminjaman serta hotline Layanan Pelanggan tidak beroperasi. </span>
                  </p>
                  <p>
                    <span style={{'display':'inline-block','width':'2%','vertical-align':'top'}}>•</span>
                    <span style={{'display':'inline-block','width':'98%','vertical-align':'top'}}>Jika tanggal jatuh tempo pembayaran anda berada dalam periode ini, mohon siapkan dana lebih awal agar tidak menpengaruhi risiko pinjaman anda.</span>
                  </p>
                </div>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Pengumuman jadwal libur Idul Fitri 2018</p><p className="time">08-Jun-2018</p>
                </div>
                <div className="detail" style={{'padding-bottom':'2em','display':'none'}}>{/*公告详情*/}
                  <p><b>Pelanggan yang terhormat:</b></p>
                  <p>Idul Fitri akan segera tiba, dengan ini pengaturan jadwal libur kerja di perusahaan kami adalah sebagai berikut:</p>
                  <p style={{'color':'#787878'}}>
                    <span style={{'display':'inline-block','width':'2%','vertical-align':'top'}}>•</span>
                    <span style={{'display':'inline-block','width':'98%','vertical-align':'top'}}>11 Juni 2018 hingga 20 Juni 2018 adalah hari libur cuti bersama. Selama libur tersebut, proses persetujuan dan peminjaman serta hotline layanan pelanggan tidak beroperasi. Operasi normal akan dimulai pada tanggal 21 Juni 2018. Silakan mengatur jadwal pengajuan pinjaman dan komunikasi dengan sebaik mungkin.</span>
                  </p>
                  <p>
                    <span style={{'display':'inline-block','width':'2%','vertical-align':'top'}}>•</span>
                    <span style={{'display':'inline-block','width':'98%','vertical-align':'top'}}>Jika tanggal jatuh tempo pembayaran pinjaman Anda berada dalam periode ini, harap mengatur pembayaran terlebih dahulu agar tidak mempengaruhi risiko pinjaman Anda</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <MobileBottom/>{/*bottom*/}
      </div>
    );
  }
}

export default Introduction;
