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
                  <p className="name">Q：Layanan pinjaman apa yang disediakan oleh Pinjam Gampang?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <p className="detail" style={{'padding-bottom':'2em','display':'none'}}>
					Jawaban：Jumlah pinjaman：Rp600.000~Rp5.000.000 Jangka waktu pinjaman：7/14 hari
                </p>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Bagaimana cara mengajukan permohonan pinjaman melalui Pinjam Gampang?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <p className="detail" style={{'padding-bottom':'2em','display':'none'}}>Jawaban : Pada Google Play lakukan pencarian dengan mengetik “Pinjam Gampang”, kemudian unduh/download aplikasi tersebut. Buka aplikasi, tidak perlu menyerahkan dokumen berbentuk kertas, ikuti petunjuk pada halaman aplikasi untuk menyelesaikan. ( mohon untuk menyiapkan KTP dan kartu bank sebelum mengajukan permohonan )
                </p>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Pertanyaan seputar peminjaman kredit?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <div className="detail" style={{'padding-bottom':'2em','display':'none'}}>
                  <p>Warga Negara Indonesia. </p>
                  <p>Usia di atas 21 tahun.</p>
                  <p>mempunyai penghasilan stabil.</p>
                </div>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Saat ini, kota mana saja yang dapat menggunakan layanan Pinjam Gampang?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <p className="detail" style={{'padding-bottom':'2em','display':'none'}}>Jawaban : Untuk saat ini layanan ini terbuka untuk 7 wilayah sebagai berikut : Jakarta, Bandung, Surabaya, Bekasi, Tangerang, Bogor, Tangerang Selatan.</p>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Bank mana saja yang dapat digunakan untuk pengiriman dana pinjaman?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <p className="detail" style={{'padding-bottom':'2em','display':'none'}}>Jawaban : Saat ini bank yang telah bekerjasama untuk pengiriman dana pinjaman adalah Bank Mandiri, BCA, BNI, BRI, BTN, CIMB, Bank Permata, Bank Panin, Bank Danamon Indonesia. </p>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Bagaimana proses permohonan pinjaman di Pinjam Gampang?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <p className="detail" style={{'padding-bottom':'2em','display':'none'}}>Jawaban : Anda hanya perlu memilih jumlah pinjaman dan waktu jatuh tempo, mengikuti petunjuk pada aplikasi untuk proses verifikasi( data pribadi, informasi pekerjaan, informasi kontak dan lainnya), Mohon untuk diisi dengan jujur dan tepat. Sistem akan melakukan analisa pada data besar/big data  berdasarkan informasi yang anda berikan, kemudian memberikan informasi jumlah pinjaman dan jatuh tempo yang disetujui.</p>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Berapa lama yang dibutuhkan untuk memverifikasi permohonan pinjaman saya?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <p className="detail" style={{'padding-bottom':'2em','display':'none'}}>Jawab: Kami akan melakukan verifikasi secepat mungkin pada permohonan pinjaman Anda, waktu paling cepat yang dibutuhkan untuk menyelesaikan permohonan pinjaman adalah 3 menit, umunya verifikasi dapat diselesaikan pada hari yang sama. Terimakasih atas pengertian dan dukungan Anda.</p>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Setelah lolos tahap verifikasi, berapa lama waktu untuk transfer dana?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <p className="detail" style={{'padding-bottom':'2em','display':'none'}}>Jawaban：Transfer dana membutuhkan waktu 1-3 hari kalender, mohon untuk sabar menunggu atau hubungi kami di (021) 3003 3358/0812 9088 5538 untuk bertanya secara langsung, kami akan secepatnya membantu anda.</p>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Bagaimana cara melakukan pembayaran pinjaman?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <p className="detail" style={{'padding-bottom':'2em','display':'none'}}>Jawaban : Sebelum jatuh tempo, kami akan mengirimakan SMS untuk mengingatkan anda tanggal jatuh tempo. Anda dapat melakukan pembayaran pinjaman melalui metode transfer dari mesin ATM, selain itu anda juga bisa melakukan pembayaran di Alfamart/AlfaMidi/Alfa Express/Lawson/DAN+DAN. Setelah melakukan pembayaran, Aplikasi Pinjam Gampang akan otomatis mendapat informasi pembayaran anda dan status pinjaman anda menjadi telah dilunasi.</p>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Apa akibatnya jika saya terlambat melakukan pembayaran?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <p className="detail" style={{'padding-bottom':'2em','display':'none'}}>Jawaban : Anda harus membayar biaya keterlambatan pembayaran. Biaya keterlambatan tertera pada layar aplikasi. Detail informasi terkait mohon baca “perjanjian pinjaman”.</p>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Sudah melakukan pembayaran pinjaman, mengapa masih menerima SMS penagihan?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <p className="detail" style={{'padding-bottom':'2em','display':'none'}}>Sistem akan melakukan pembaruan halaman setelah Anda berhasil melakukan pembayaran pinjaman, sebelum update system terjadi, SMS masih dapat terkirim; Mohon abaikan SMS penagihan jika Anda telah berhasil melakukan pembayaran pinjaman.</p>
              </li>
              <li>
                <div className="showItem">
                  <p className="name">Q：Apakah data yang saya isi bisa diketahui orang lain?</p>
                  {/*<p className="detailTitle">Jawaban:......</p>*/}
                </div>
                <p className="detail" style={{'padding-bottom':'2em','display':'none'}}>Jawaban : Kami berusaha melindungi informasi anda dengan berbagai keamanan fisik, elektronik dan pengaturan yang wajar untuk, membuat informasi data anda tidak bocor, rusak atau hilang, termasuk namun tidak terbatas pada SSL, penyimpanan enskripsi informasi, pengendalian akses pusat data.</p>
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
