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
                  <p className="mianTitle">Q：Layanan pinjaman apa yang disediakan oleh Pinjam Gampang?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">Jawaban：Jumlah pinjaman：Rp600.000~Rp5.000.000 Jangka waktu pinjaman：7/14 hari</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Bagaimana cara mengajukan permohonan pinjaman melalui Pinjam Gampang?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">Jawaban : Pada Google Play lakukan pencarian dengan mengetik “Pinjam Gampang”, kemudian unduh/download aplikasi tersebut. Buka aplikasi, tidak perlu menyerahkan dokumen berbentuk kertas, ikuti petunjuk pada halaman aplikasi untuk menyelesaikan. ( mohon untuk menyiapkan KTP dan kartu bank sebelum mengajukan permohonan )</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Pertanyaan seputar peminjaman kredit?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">
					  <div>Warga Negara Indonesia.</div>
					  <div>Usia di atas 21 tahun.</div>
					  <div>mempunyai penghasilan stabil.</div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Saat ini, kota mana saja yang dapat menggunakan layanan Pinjam Gampang?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">Jawaban : Untuk saat ini layanan ini terbuka untuk 7 wilayah sebagai berikut : Jakarta, Bandung, Surabaya, Bekasi, Tangerang, Bogor, Tangerang Selatan.</div>
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
                    <div className="right">Jawaban : Saat ini bank yang telah bekerjasama untuk pengiriman dana pinjaman adalah Bank Mandiri, BCA, BNI, BRI, BTN, CIMB, Bank Permata, Bank Panin, Bank Danamon Indonesia. </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Bagaimana proses permohonan pinjaman di Pinjam Gampang?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">Jawaban : Anda hanya perlu memilih jumlah pinjaman dan waktu jatuh tempo, mengikuti petunjuk pada aplikasi untuk proses verifikasi( data pribadi, informasi pekerjaan, informasi kontak dan lainnya), Mohon untuk diisi dengan jujur dan tepat. Sistem akan melakukan analisa pada data besar/big data  berdasarkan informasi yang anda berikan, kemudian memberikan informasi jumlah pinjaman dan jatuh tempo yang disetujui.</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Berapa lama yang dibutuhkan untuk memverifikasi permohonan pinjaman saya?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">Jawaban: Kami akan melakukan verifikasi secepat mungkin pada permohonan pinjaman Anda, waktu paling cepat yang dibutuhkan untuk menyelesaikan permohonan pinjaman adalah 3 menit, umunya verifikasi dapat diselesaikan pada hari yang sama. Terimakasih atas pengertian dan dukungan Anda.</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Setelah lolos tahap verifikasi, berapa lama waktu untuk transfer dana?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">Jawaban：Transfer dana membutuhkan waktu 1-3 hari kalender, mohon untuk sabar menunggu atau hubungi kami di (021) 3003 3358/0812 9088 5538 untuk bertanya secara langsung, kami akan secepatnya membantu anda.</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Bagaimana cara melakukan pembayaran pinjaman?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">Jawaban : Sebelum jatuh tempo, kami akan mengirimakan SMS untuk mengingatkan anda tanggal jatuh tempo. Anda dapat melakukan pembayaran pinjaman melalui metode transfer dari mesin ATM, selain itu anda juga bisa melakukan pembayaran di Alfamart/AlfaMidi/Alfa Express/Lawson/DAN+DAN. Setelah melakukan pembayaran, Aplikasi Pinjam Gampang akan otomatis mendapat informasi pembayaran anda dan status pinjaman anda menjadi telah dilunasi.</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Apa akibatnya jika saya terlambat melakukan pembayaran?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">Jawaban : Anda harus membayar biaya keterlambatan pembayaran. Biaya keterlambatan tertera pada layar aplikasi. Detail informasi terkait mohon baca “perjanjian pinjaman”.</div>
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
                    <div className="right">Jawaban : Sistem akan melakukan pembaruan halaman setelah Anda berhasil melakukan pembayaran pinjaman, sebelum update system terjadi, SMS masih dapat terkirim; Mohon abaikan SMS penagihan jika Anda telah berhasil melakukan pembayaran pinjaman.</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Q：Apakah data yang saya isi bisa diketahui orang lain?</p>
                  {/*<div className="answer">Jawaban:......</div>*/}
                </div>
                <div className="detail">
                  <div className="desc">
                    <div className="right">Jawaban : Kami berusaha melindungi informasi anda dengan berbagai keamanan fisik, elektronik dan pengaturan yang wajar untuk, membuat informasi data anda tidak bocor, rusak atau hilang, termasuk namun tidak terbatas pada SSL, penyimpanan enskripsi informasi, pengendalian akses pusat data.</div>
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
