import React from 'react';
import { Result, Icon, WhiteSpace } from 'antd-mobile';

const myImg = src => <img src={src} className="imgc spe am-icon am-icon-md" alt="" />;

class LargeStageAgree extends React.Component {
  state = {languga:'Indonesian'};
  componentWillMount() {
    var languga = this.props.location.query.languga || 'Indonesian';
    console.log(languga);
    this.setState({languga:languga});
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="LargeStageAgree padding20 privacyService">
        <div className="firstTitle">PERJANJIAN KERJASAMA LAYANAN</div>
        <div className="secondTitle">
          <b>ANTARA</b>
        </div>
        <div className="secondTitle">
          <b>[Pemberi Pinjaman]</b>
        </div>
        <div className="secondTitle">
          <b>DENGAN</b>
        </div>
        <div className="secondTitle">
          <b>PT KREDIT PLUS TEKNOLOGI</b>
        </div>
        <div className="secondTitle">
          <b>No. [•]</b>
        </div>

        <div className="serviceDetail">
          <p>Perjanjian Layanan Kerjasama ini dibuat pada tanggal [] (selanjutnya disebut “<b>Perjanjian</b>”) oleh dan antara:</p>
        </div>
        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num">1.</span>
            <span className="text">
              [<b>nama Pemberi Pinjaman</b>], suatu perseroan terbatas yang didirikan berdasarkan hukum di [•] berkedudukan di [•] dan beralamat di [•], dalam hal ini diwakili oleh [nama Pihak yang sah mewakili Pemberi Pinjaman] selaku [•] dari dan oleh karenanya sah bertindak bertindak untuk dan atas nama [xxx], selanjutnya disebut <b>Pemberi Pinjaman</b>.
              <span style={{'display':'block','marginTop':'0.2em'}}><b>Jika orang perseroangan</b></span>
              <span style={{'display':'block','marginTop':'0.2em'}}>[<b>nama Pemberi Pinjaman</b>], warga negara [<b>warga negara Pemberi Pinjaman</b>], pemegang kartu tanda pengenal [] dengan No. [], beralamat di [xxxx], dalam hal ini bertindak untuk dan atas nama dirinya, selanjutnya disebut <b>Pemberi Pinjaman</b>.</span>
            </span>
          </div>
          <div className="lessNum">
            <span className="num">2.</span>
            <span className="text">
              <b>PT Kredit Plus Teknologi</b>, suatu perseroan terbatas yang didirikan di Indonesia beralamat di The Prominence Office Tower Unit E Jl. Jalur Sutera Barat No. 15, Alam Sutera Tangerang-Banten, dalam hal ini diwakili oleh Tian Jingjing selaku Direktur, dan oleh karenanya sah bertindak untuk dan atas nama <b>PT Kredit Plus Teknologi</b> selanjutnya disebut <b>Penyelenggara Layanan</b>.
            </span>
          </div>
        </div>
        <div className="serviceDetail">
          <p>Pemberi Pinjaman  dan Penyelenggara Layanan secara sendiri-sendiri disebut sebagai Pihak dan Bersama-sama disebut Para Pihak.</p>
        </div>
        <div className="serviceDetail">
          <p>Para Pihak menerangkan hal-hal sebgai berikut:</p>
        </div>
        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num">1.</span>
            <span className="text">
              Bahwa Pemberi Pinjaman merupakan badan hukum yang bergerak dalam bidang [xxx] yang bersedia menyediakan dana kepada Penyelenggara Layanan untuk dapat disalurkan kembali kepada Penerima Pinjaman.
            </span>
          </div>
          <div className="lessNum">
            <span className="num">2.</span>
            <span className="text">
              Bahwa Penyelenggara Layanan merupakan badan hukum yang telah memperoleh perizinan dan diawasi  oleh Otoritas Jasa Keuangan untuk menyediakan, mengelola dan mengoperasikan Layanan Pinjam Gampang kepada Pengguna Layanan.
            </span>
          </div>
        </div>
        <div className="serviceDetail">
          <p>Selanjutnya Para Pihak sepakat untuk menandatangani Perjanjian Kerjasama Layanan (“<b>Perjanjian</b>”) dengan syarat dan ketentuan sebagai berikut:</p>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>1.</b></span>
            <span className="text"><b>Definisi</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft lendingAgreement">
              <div>Kecuali ditentukan lain secara tegas dalam Perjanjian ini, istilah-istilah dibawah ini memiliki pengertian-pengertian sebagai berikut:</div>
              <span className="secondNum">
                <span className="num">a.</span>
                <span className="text"><b>Perjanjian</b> adalah perjanjian ini, Lampiran yang menyertainya dan setiap dokumen yang disertakan sebagai referensi, yang masing-masing dapat diamandemen sewaktu waktu sesuai ketentuan Perjanjian ini;</span>
              </span>
              <span className="secondNum">
                <span className="num">b.</span>
                <span className="text"><b>Layanan Pinjam Gampang</b> (“<b>Layanan</b>”) adalah sistem yang mengelola layanan pinjam meminjam uang berbasis teknologi informasi. </span>
              </span>
              <span className="secondNum">
                <span className="num">c.</span>
                <span className="text"><b>Pengguna Layanan</b> adalah setiap Pemberi Pinjaman dan Penerima Pinjaman yang menggunakan Layanan.</span>
              </span>
              <span className="secondNum">
                <span className="num">d.</span>
                <span className="text"><b>Pemberi Pinjaman</b> adalah Warga Negara Indonesia/Warga Negara Asing/Badan Hukum Indonesia/Badan Hukum Asing yang yang bersedia menyediakan dana kepada Penyelenggara Layanan untuk dapat disalurkan kembali kepada Penerima Pinjaman</span>
              </span>
              <span className="secondNum">
                <span className="num">e.</span>
                <span className="text"><b>Penerima Pinjaman</b> adalah warga Negara Indonesia dan/atau badan hukum Indonesia yang mempunyai utang karena perjanjian Layanan.</span>
              </span>
              <span className="secondNum">
                <span className="num">f.</span>
                <span className="text"><b>Akses Informasi Penggunaan Dana</b> (“<b>Akses Penggunaan Dana</b>”) adalah akses informasi yang disediakan Penyelenggara Layanan kepada Pemberi Pinjaman dan Penerima Pinjaman untuk penggunaan Layanan pada  terkait dengan penggunaan dana yang diberikan kepada Pemberi Pinjaman kepada Penyelenggara Layanan.</span>
              </span>
              <span className="secondNum">
                <span className="num">g.</span>
                <span className="text"><b>Komisi</b> adalah komisi yang yang diterima oleh Penyelenggara dari setiap  pemberian pinjaman dari Pemberi Pinjaman kepada Penerima Pinjaman.</span>
              </span>
              <span className="secondNum">
                <span className="num">h.</span>
                <span className="text"><b>Rekening Escrow</b> adalah rekening atas nama Penyelenggara Layanan yang peruntukan dari setiap penggunaan dana Pemberi Pinjaman dan Penerima Pinjaman untuk  kepada Penyelenggara Layanan.</span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>2.</b></span>
            <span className="text"><b>Penunjukan</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft">
              <div>Bahwa Pemberi Pinjaman dengan ini sepakat untuk menunjuk PT Kredit Plus Teknologi selaku Penyelenggara Layanan sebagai pihak yang menyediakan dan menghubungkan antara Pemberi Pinjaman denagn Penerima Pinjaman, termasuk namun tidak terbatas untuk melakukan promosi Fasilitas, proses pendaftaran, proses penagihan atas Layanan yang diberikan Pemberi Pinjaman kepada Penerima Pinjaman. Seluruh pembayaran atau biaya yang dibayarkan melalui PT Kredit Plus Teknologi adalah untuk kepentingan dan keuntungan Pemberi Pinjaman</div>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>3.</b></span>
            <span className="text"><b>Kriteria Penerima Pinjaman</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft lendingAgreement">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Pemberi Pinjaman dengan ini sepakat untuk menyalurkan dana Pinjaman kepada calon Penerima Pinjaman dengan kriteria sebagai berikut:
                  <span className="lastNum">
                    a.Warga Negara Indonesia
                  </span>
                  <span className="lastNum">
                    b.Umur : 21-40
                  </span>
                </span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Penyelenggara Layanan dengan ini setuju dan sepakat untuk menyalurkan dana Pinjaman Pemberi Pinjaman dalam hal terdapat calon Penerima Pinjaman yang sesuai dengan kriteria sebagaimana dimaksud pada ayat (1) Pasal ini.
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
 }
}

LargeStageAgree.defaultProps = {
};

export default LargeStageAgree;

