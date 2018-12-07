import React from 'react';
import TopNav from '../../public/topNav';//顶部导航
import PCBottom from '../../public/bottom';//底部

import city from '../../../images/city.jpg';


class HelpCenter extends React.Component {
  state = {indexs:0,language:sessionStorage.getItem('language') || 'Id'};

  componentDidMount() {
    //设置底部样式
    $('.PCindex .indexBottom').css('background-color','#ffffff');
    $('.PCindex .mainBottom .titles').css('color','#5A6169');
    $('.PCindex .PCBottom .mainDesc ul').css({'color':'#868E96','opacity':'1'});
    $('.PCindex .copyRight').css('background-color','#F8F9FA');

    //点击问题，显示问题详情
    $('.HelpCenter li .mainInfo').on('click',(e) => {
      $('.HelpCenter li .mainInfo .detail').hide();
      if($(e.target).parents('.mainInfo').siblings('.detail').is(':visible')){
        $(e.target).parents('.mainInfo').siblings('.detail').slideUp();
        //$(e.target).parents('.mainInfo').find('.answer').show();
      }else{
        $(e.target).parents('.mainInfo').siblings('.detail').slideDown();
        //$(e.target).parents('.mainInfo').find('.answer').hide();
      }
    })
  }

  componentWillUnmount() {
    //还原底部样式
    $('.PCindex .indexBottom').css('background-color','#212529');
    $('.PCindex .copyRight').css('background-color','#ffffff');
    $('.PCindex .mainBottom .titles').css('color','#ffffff');
    $('.PCindex .PCBottom .mainDesc ul').css({'color':'#ffffff','opacity':'0.5'});
  }

  render() {
    return (
      <div className="PCindex" style={{'overflow':'auto'}}>
        <TopNav />{/*顶部导航栏*/}
        <div className="Introduction HelpCenter">
          <div className="topBg">
            <img src={city} />
          </div>
          <div className="main announce">
            <div className="title">{this.state.language == 'Id'?'Pusat Bantuan':'Help Center'}</div>
            <ul className="announceInfo">
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Apa syarat pengajuan pinjaman melalui Pinjam Gampang?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">
                      <div>a. Warga Negara Indonesia</div>
                      <div>b. Berusia 21 tahun atau lebih.</div>
                      <div>c. Memiliki Kartu Tanda Penduduk</div>
                      <div>d. Telah bekerja, memiliki penghasilan stabil, dan memiliki kartu identitas perusahaan</div>
                      <div>e. Memiliki rekening bank atas nama sendiri</div>
                      <div>f. Berdomisili di Jabodetabek, Bandung, Surabaya, Manado, Semarang, Sidoarjo, Batam, Padang, Denpasar, Yogyakarta, Gresik, Malang, Bontang, Makassar, Palembang, Kediri</div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Berapa jumlah pinjaman dan tenor yang dapat saya ajukan?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">Jumlah pinjaman yang tersedia di Pinjam Gampang mulai dari Rp600.000 sampai dengan Rp5.000.000 dengan pilihan tenor 7 hari atau 14 hari.</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Kota mana saja yang termasuk dalam area jangkauan Pinjam Gampang?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">
                      <div>Hingga saat ini, Pinjam Gampang telah tersedia di 20 (dua puluh) wilayah berikut – Jabodetabek, Bandung, Surabaya, Manado, Semarang, Sidoarjo, Batam, Padang, Denpasar, Yogyakarta, Gresik, Malang, Bontang, Makassar, Palembang, Kediri.</div>
                      <div>Cek website <a href="https://www.kreditplusteknologi.id">www.kreditplusteknologi.id</a> dan akun sosial media (Facebook, Instagram, LinkedIn) untuk perkembangan lebih lanjut !</div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Bank mana saja yang dapat digunakan untuk pengiriman dana pinjaman?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">Pinjam Gampang telah bekerjasama dengan beberapa bank berikut untuk proses pengiriman dana pinjaman – Bank Mandiri, BCA, BNI, BRI, BTN, CIMB, Bank Permata, Bank Panin, Bank Danamon Indonesia.</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Bagaimana cara menghubungi Pinjam Gampang?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">
                      <div>Anda dapat menghubungi customer service kami pada nomor (021) 3003 3358.</div>
                      <div>Jam operasional : Senin – Jumat antara jam 09.00 – 12.00 dan jam 13.00 – 17.00.</div>
                      <div>Atau melalui email ke kpt@kreditplusteknologi.id</div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Bagaimana cara mengajukan pinjaman di Pinjam Gampang?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">
                      <div>1. Register/Login aplikasi Pinjam Gampang</div>
                      <div>2. Pilih jumlah dan jangka waktu pinjaman yang diinginkan</div>
                      <div>3. Melakukan verifikasi wajah dan mengisi identitas dasar seperti identitas diri dan informasi pekerjaan</div>
                      <div>4. Jika Anda lolos verifikasi, Anda akan diberikan detail informasi jumlah pinjaman yang disetujui berserta rincian bunga dan biaya. Apabila Anda setuju, pinjaman Anda akan diproses dalam waktu 24 jam untuk dikirimkan ke rekening bank Anda</div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Berapa hari diperlukan untuk proses verifikasi?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">Proses verifikasi diperkirakan 1 (satu) hingga 5 (hari) kerja. Selama menunggu, dipastikan bahwa nomor telepon Anda adalah aktif agar dapat dihubungi untuk konfirmasi dari pihak kami.</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Berapa hari diperlukan untuk pencairan pinjaman?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">Setelah lolos proses verifikasi, dibutuhkan waktu 1 (satu) hingga 3 (tiga) hari kerja untuk proses pencairan dana. Jika Anda masih belum menerima pencairan pinjaman Anda, silahkan hubungi layanan customer service kami di (021) 3003 3358.</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Apakah terdapat risiko kebocoran data yang disampaikan kepada Pinjam Gampang?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">Pinjam Gampang selalu berusaha melindungi informasi Anda, termasuk keamanan informasi berbentuk fisik, elektronik, termasuk namun tidak terbatas pada SSL, penyimpanan enskripsi informasi, pengendalian akses pusat data. Kami sedang dalam tahap penilaian dan penerapan standar internasional organisasi (ISO) 27001 tentang keamanan data.</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Bagaiman cara mengganti nomor HP dan informasi identitas lainnya?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">
                      <div>Silahkan hubungi layanan customer service kami untuk melakukan perubahan nomor telepon dan informasi identitas lainnya.</div>
                      <div>Kedepannya, Pinjam Gampang akan menambahkan fungsi penggantian nomor telepon untuk memudahkan Anda.</div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Bagaimana cara melakukan pelunasan pinjaman?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">
                      <div>Sebelum tanggal jatuh tempo, Pinjam Gampang akan mengirimkan SMS untuk mengingatkan Anda tentang tanggal jatuh tempo dan jumlah pinjaman Anda.</div>
                      <div>Anda dapat melakukan pelunasan melalui metode transfer dari mesin ATM, mobile banking, internet banking, atau melalui mini-market seperti Alfamart/AlfaMidi/Alfa Express/Lawson/DAN+DAN.</div>
                      <div>Jika Anda sudah melakukan pelunasan, Pinjam Gampang akan secara otomatis menerima pelunasan dan mengubah status pinjaman Anda menjadi lunas.</div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Apa akibatnya jika saya melakukan pembayaran setelah tanggal jatuh tempo?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">Setiap keterlambatan pelunasan akan dikenakan biaya keterlambatan dimana perincian biaya keterlambatan tertera di dalam aplikasi dan informasi lebih lanjut silahkan baca di "Perjanjian Pinjaman"</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Sudah melakukan pembayaran pinjaman, mengapa masih menerima SMS penagihan?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">Sistem akan melakukan pembaruan halaman setelah Anda berhasil melakukan pembayaran pinjaman, sebelum pembaruan halaman dan sistem terjadi, SMS masih dapat terkirim. Mohon abaikan SMS penagihan jika Anda telah berhasil melakukan pembayaran pinjaman.</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="swiper-slide orange-slide indexBottom erea" style={{'padding':'2em'}}>{/*bottom*/}
          <PCBottom/>
        </div>
      </div>
    );
  }
}

export default HelpCenter;
