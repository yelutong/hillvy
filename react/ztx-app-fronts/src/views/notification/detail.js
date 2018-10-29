import React from 'react';


class NotificationDetail extends React.Component {
  state = {};

  componentWillMount() {
    //var storageabc = localStorage.getItem('abc');
    //alert(storageabc);
  }

  componentDidMount() {
    
  }

  storage() {
    //localStorage.setItem('abc','1122');
  }

  render() {
    return (
      <div className="notification">
        <div className="notiDetail">
          <div className="title">Pengumuman jadwal libur Idul Fitri 2018</div>
          <div className="time">29-May-2018 / 15：00</div>
          <div className="mainDetail">
            <div className="detail"><b>Pelanggan yang terhormat:</b></div>
            <div className="detail" style={{'margin-top':'0.6em'}}>&nbsp;&nbsp;&nbsp;&nbsp;Idul Fitri akan segera tiba, dengan ini pengaturan jadwal libur kerja di perusahaan kami adalah sebagai berikut:</div>
            <div className="detail" style={{'margin-top':'0.6em'}}>
              <span className="num">1·</span>
              <span className="text">11 Juni 2018 hingga 20 Juni 2018 adalah hari libur cuti bersama. Selama libur tersebut, proses persetujuan dan peminjaman serta hotline layanan pelanggan tidak beroperasi. Operasi normal akan dimulai pada tanggal 21 Juni 2018. Silakan mengatur jadwal pengajuan pinjaman dan komunikasi dengan sebaik mungkin.</span></div>
            <div className="detail" style={{'margin-top':'0.5em'}}>
              <span className="num">2·</span>
              <span className="text">Jika tanggal jatuh tempo pembayaran pinjaman Anda berada dalam periode ini, harap mengatur pembayaran terlebih dahulu agar tidak mempengaruhi risiko pinjaman Anda.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NotificationDetail.defaultProps = {
};

export default NotificationDetail;
