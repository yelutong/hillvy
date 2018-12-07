import React from 'react';
import MobildNav from '../../public/mobildNav';//nav
import MobileBottom from '../../public/mobileBottom';//bottom
import intro from '../../../images/intro.png';//banner图片


class Introduction extends React.Component {
  state = {language:sessionStorage.getItem('language') || 'Id'};

  componentDidMount() {
    $('.showItem').on('click',(e) => {
      $('.detailTitle').show();
      if($(e.target).parents('.showItem').siblings('.detail').is(':hidden')){
        $('.detail').hide();
        $(e.target).parents('.showItem').siblings('.detail').show();
        $('.showItem p.name').css({'white-space': 'nowrap','line-height':'2.8em','padding':'0em'});
        $(e.target).parents('.showItem').siblings('.detail').show();
        $(e.target).css({'white-space':'normal','line-height':'1.4em','padding':'0.7em 0em 0.5em 0em'});
        //$(e.target).parents('.showItem').find('.detailTitle').hide();
      }else{
        $('.detail').hide();
        $('.showItem p.name').css({'white-space': 'nowrap','line-height':'2.8em','padding':'0em'});
        $(e.target).parents('.showItem').siblings('.detail').hide();
        $(e.target).css({'white-space': 'nowrap','line-height':'2.8em','padding':'0em'});
        //$(e.target).parents('.showItem').find('.detailTitle').show();
      }
    })
  }

  render() {
    return (
      <div className="MobileIndex">
        <MobildNav/>{/*nav*/}
        <div className="intro helpCenter">
          <img src={intro} />
          <div className="yellowTitle">{this.state.language == 'Id'?'Pusat Bantuan':'Help Center'}</div>
          <div className="main" style={{'width':'92%'}}>
            <ul className="announce">
              <li>
                <div className="showItem">
                  <p className="name">Q：Apa syarat pengajuan pinjaman melalui Pinjam Gampang?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <div className="detail" style={{'padding-bottom':'2em','display':'none'}}>
					         <p>a. Warga Negara Indonesia</p>
                   <p>b. Berusia 21 tahun atau lebih.</p>
                   <p>c. Memiliki Kartu Tanda Penduduk</p>
                   <p>d. Telah bekerja, memiliki penghasilan stabil, dan memiliki kartu identitas perusahaan</p>
                   <p>e. Memiliki rekening bank atas nama sendiri</p>
                   <p>f. Berdomisili di Jabodetabek, Bandung, Surabaya, Manado, Semarang, Sidoarjo, Batam, Padang, Denpasar, Yogyakarta, Gresik, Malang, Bontang, Makassar, Palembang, Kediri</p>
                </div>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Berapa jumlah pinjaman dan tenor yang dapat saya ajukan?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <p className="detail" style={{'padding-bottom':'2em','display':'none'}}>JJumlah pinjaman yang tersedia di Pinjam Gampang mulai dari Rp600.000 sampai dengan Rp5.000.000 dengan pilihan tenor 7 hari atau 14 hari.
                </p>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Kota mana saja yang termasuk dalam area jangkauan Pinjam Gampang?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <div className="detail" style={{'padding-bottom':'2em','display':'none'}}>
                  <p>Hingga saat ini, Pinjam Gampang telah tersedia di 20 (dua puluh) wilayah berikut – Jabodetabek, Bandung, Surabaya, Manado, Semarang, Sidoarjo, Batam, Padang, Denpasar, Yogyakarta, Gresik, Malang, Bontang, Makassar, Palembang, Kediri.</p>
                  <p>Cek website <a href="https://www.kreditplusteknologi.id">www.kreditplusteknologi.id</a> dan akun sosial media (Facebook, Instagram, LinkedIn) untuk perkembangan lebih lanjut !</p>
                </div>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Bank mana saja yang dapat digunakan untuk pengiriman dana pinjaman?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <p className="detail" style={{'padding-bottom':'2em','display':'none'}}>Pinjam Gampang telah bekerjasama dengan beberapa bank berikut untuk proses pengiriman dana pinjaman – Bank Mandiri, BCA, BNI, BRI, BTN, CIMB, Bank Permata, Bank Panin, Bank Danamon Indonesia.</p>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Bagaimana cara menghubungi Pinjam Gampang?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <div className="detail" style={{'padding-bottom':'2em','display':'none'}}>
                  <p>Anda dapat menghubungi customer service kami pada nomor (021) 3003 3358.</p>
                  <p>Jam operasional : Senin – Jumat antara jam 09.00 – 12.00 dan jam 13.00 – 17.00.</p>
                  <p>Atau melalui email ke kpt@kreditplusteknologi.id</p>
                </div>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Bagaimana cara mengajukan pinjaman di Pinjam Gampang?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <div className="detail" style={{'padding-bottom':'2em','display':'none'}}>
                  <p>1. Register/Login aplikasi Pinjam Gampang</p>
                  <p>2. Pilih jumlah dan jangka waktu pinjaman yang diinginkan</p>
                  <p>3. Melakukan verifikasi wajah dan mengisi identitas dasar seperti identitas diri dan informasi pekerjaan</p>
                  <p>4. Jika Anda lolos verifikasi, Anda akan diberikan detail informasi jumlah pinjaman yang disetujui berserta rincian bunga dan biaya. Apabila Anda setuju, pinjaman Anda akan diproses dalam waktu 24 jam untuk dikirimkan ke rekening bank Anda</p>
                </div>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Berapa hari diperlukan untuk proses verifikasi?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <p className="detail" style={{'padding-bottom':'2em','display':'none'}}>Proses verifikasi diperkirakan 1 (satu) hingga 5 (hari) kerja. Selama menunggu, dipastikan bahwa nomor telepon Anda adalah aktif agar dapat dihubungi untuk konfirmasi dari pihak kami.</p>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Berapa hari diperlukan untuk pencairan pinjaman?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <p className="detail" style={{'padding-bottom':'2em','display':'none'}}>Setelah lolos proses verifikasi, dibutuhkan waktu 1 (satu) hingga 3 (tiga) hari kerja untuk proses pencairan dana. Jika Anda masih belum menerima pencairan pinjaman Anda, silahkan hubungi layanan customer service kami di (021) 3003 3358.</p>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Apakah terdapat risiko kebocoran data yang disampaikan kepada Pinjam Gampang?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <p className="detail" style={{'padding-bottom':'2em','display':'none'}}>Pinjam Gampang selalu berusaha melindungi informasi Anda, termasuk keamanan informasi berbentuk fisik, elektronik, termasuk namun tidak terbatas pada SSL, penyimpanan enskripsi informasi, pengendalian akses pusat data. Kami sedang dalam tahap penilaian dan penerapan standar internasional organisasi (ISO) 27001 tentang keamanan data.</p>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Bagaiman cara mengganti nomor HP dan informasi identitas lainnya?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <div className="detail" style={{'padding-bottom':'2em','display':'none'}}>
                  <p>Silahkan hubungi layanan customer service kami untuk melakukan perubahan nomor telepon dan informasi identitas lainnya.</p>
                  <p>Kedepannya, Pinjam Gampang akan menambahkan fungsi penggantian nomor telepon untuk memudahkan Anda.</p>
                </div>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Bagaimana cara melakukan pelunasan pinjaman?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <div className="detail" style={{'padding-bottom':'2em','display':'none'}}>
                  <p>Sebelum tanggal jatuh tempo, Pinjam Gampang akan mengirimkan SMS untuk mengingatkan Anda tentang tanggal jatuh tempo dan jumlah pinjaman Anda.</p>
                  <p>Anda dapat melakukan pelunasan melalui metode transfer dari mesin ATM, mobile banking, internet banking, atau melalui mini-market seperti Alfamart/AlfaMidi/Alfa Express/Lawson/DAN+DAN.</p>
                  <p>Jika Anda sudah melakukan pelunasan, Pinjam Gampang akan secara otomatis menerima pelunasan dan mengubah status pinjaman Anda menjadi lunas.</p>
                </div>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Apa akibatnya jika saya melakukan pembayaran setelah tanggal jatuh tempo?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <p className="detail" style={{'padding-bottom':'2em','display':'none'}}>Setiap keterlambatan pelunasan akan dikenakan biaya keterlambatan dimana perincian biaya keterlambatan tertera di dalam aplikasi dan informasi lebih lanjut silahkan baca di "Perjanjian Pinjaman"</p>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Sudah melakukan pembayaran pinjaman, mengapa masih menerima SMS penagihan?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <p className="detail" style={{'padding-bottom':'2em','display':'none'}}>Sistem akan melakukan pembaruan halaman setelah Anda berhasil melakukan pembayaran pinjaman, sebelum pembaruan halaman dan sistem terjadi, SMS masih dapat terkirim. Mohon abaikan SMS penagihan jika Anda telah berhasil melakukan pembayaran pinjaman.</p>
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
