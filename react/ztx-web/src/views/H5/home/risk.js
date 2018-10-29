import React from 'react';
import MobildNav from '../../public/mobildNav';//nav
import MobileBottom from '../../public/mobileBottom';//bottom
import intro from '../../../images/intro.png';//banner图片
import ojbk from '../../../images/ojbk-1.png';//ojbk


class Introduction extends React.Component {
  state = {languaga:'Indonesian'};

  componentDidMount() {

  }

  render() {
    return (
      <div className="MobileIndex">
        <MobildNav/>{/*nav*/}
        <div className="intro">
          <img src={intro} />
          {/*<div className="title">Disclaimer Risiko</div>*/}
          <div className="main">
            <div>
              <p className="ojbk">
                <img style={{'width':'15em'}} src={ojbk} />
              </p>
              <p><b>PERHATIAN：</b></p>
              <p>1.Layanan Pinjam Meminjam Berbasis Teknologi Informasi merupakan kesepakatan perdata antara Pemberi Pinjaman dengan Penerima Pinjaman, sehingga segala risiko yang timbul dari kesepakatan tersebut ditanggung sepenuhnya oleh masing-masing pihak.</p>
              <p>2.Risiko kredit atau gagal bayar ditanggung sepenuhnya oleh Pemberi Pinjaman. Tidak ada lembaga atau otoritas negara yang bertanggung jawab atas risiko gagal bayar ini.</p>
              <p>3.Penyelenggara dengan persetujuan dari masing-masing Pengguna (Pemberi Pinjaman dan/atau Penerima Pinjaman) mengakses, memperoleh, menyimpan, mengelola dan/atau menggunakan data pribadi Pengguna ("Pemanfaatan Data") pada atau di dalam benda, perangkat elektronik (termasuk smartphone atau telepon seluler), perangkat keras (hardware) maupun lunak (software), dokumen elektronik, aplikasi atau sistem elektronik milik Pengguna atau yang dikuasai Pengguna, dengan memberitahukan tujuan, batasan dan mekanisme Pemanfaatan Data tersebut kepada Pengguna yang bersangkutan sebelum memperoleh persetujuan yang dimaksud.</p>
              <p>4.Pemberi Pinjaman yang belum memiliki pengetahuan dan pengalaman pinjam meminjam, disarankan untuk tidak menggunakan layanan ini.</p>
              <p>5.Penerima Pinjaman harus mempertimbangkan tingkat bunga pinjaman dan biaya lainnya sesuai dengan kemampuan dalam melunasi pinjaman.</p>
              <p>6.Setiap kecurangan tercatat secara digital di dunia maya dan dapat diketahui masyarakat luas di media sosial.</p>
              <p>7.Pengguna harus membaca dan memahami informasi ini sebelum membuat keputusan menjadi Pemberi Pinjaman atau Penerima Pinjaman.</p>
              <p>8.Pemerintah yaitu dalam hal ini Otoritas Jasa Keuangan, tidak bertanggung jawab atas setiap pelanggaran atau ketidakpatuhan oleh Pengguna, baik Pemberi Pinjaman maupun Penerima Pinjaman (baik karena kesengajaan atau kelalaian Pengguna) terhadap ketentuan peraturan perundang-undangan maupun kesepakatan atau perikatan antara Penyelenggara dengan Pemberi Pinjaman dan/atau Penerima Pinjaman.</p>
              <p>9.Setiap transaksi dan kegiatan pinjam meminjam atau pelaksanaan kesepakatan mengenai pinjam meminjam antara atau yang melibatkan Penyelenggara, Pemberi Pinjaman dan/atau Penerima Pinjaman wajib dilakukan melalui escrow account dan virtual account sebagaimana yang diwajibkan berdasarkan Peraturan Otoritas Jasa Keuangan Nomor 77/POJK.01/2016 tentang Layanan Pinjam Meminjam Uang Berbasis Teknologi Informasi dan pelanggaran atau ketidakpatuhan terhadap ketentuan tersebut merupakan bukti telah terjadinya pelanggaran hukum oleh Penyelenggara sehingga Penyelenggara wajib menanggung ganti rugi yang diderita oleh masing-masing Pengguna sebagai akibat langsung dari pelanggaran hukum tersebut di atas tanpa mengurangi hak Pengguna yang menderita kerugian menurut Kitab Undang-Undang Hukum Perdata.</p>
            </div>
          </div>
        </div>
        <MobileBottom/>{/*bottom*/}
      </div>
    );
  }
}

export default Introduction;
