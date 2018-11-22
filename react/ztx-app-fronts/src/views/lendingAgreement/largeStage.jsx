import React from 'react';
import axios from 'axios';
import config from '../../config/base';
import DateApi from '../../js/dateFormat.js';
import { Toast } from 'antd-mobile';

const myImg = src => <img src={src} className="imgc spe am-icon am-icon-md" alt="" />;

class LargeStageAgree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amtData:{}
    }
    localStorage.setItem('token',this.props.location.query.token||localStorage.getItem('token'));
    this.getAmtVaule();
  }
  state = {languga:'Indonesian'};
  componentWillMount() {
    var languga = this.props.location.query.languga || 'Indonesian';
    console.log(languga);
    this.setState({languga:languga});
  }

  componentDidMount() {

  }
  
  getAmtVaule = () => {
    let url=config.protocol+'://'+config.domainApply+'/kpt-apply/apply/agreement';
    axios.get(url,{params:{"contractNo":this.props.location.query.contractNo}}).then((res) => {
    if(res.data.code == '0000'){
       console.log(res); 
       let amtData = res.data.body; 
       console.log(amtData); 
       var dateInfo = Date.parse(new Date(amtData.loanDate));
       var returnDate = Date.parse(new Date(amtData.returnDate));
       amtData.loanDate = DateApi.format2(dateInfo);
       amtData.returnDate = DateApi.format2(returnDate);
       this.setState({amtData:amtData});
        } 
      }).catch(function (error) {
　　    Toast.info(String(error)); 
     });
  }
  render() {
    return (
      <div className="LargeStageAgree padding20 privacyService">
        <div className="topest"><b>Pribadi dan Rahasia</b></div>
        <div className="topest"><b>Hak cipta perjanjian ini dimiliki oleh PT Kredit Plus Teknologi</b></div>
        <div className="secondTitle mt25">
          <b>PERJANJIAN PEMBERIAN PINJAMAN</b>
        </div>
        <div className="secondTitle">
          <b>Nomor Perjanjian: [{this.state.amtData.contractNo}]</b>
        </div>
        <div className="secondTitle mt25">
          <b>ANTARA</b>
        </div>
        <div className="secondTitle">
          <b>Pemberi Pinjaman ID [{this.state.amtData.lenderIdNum}]</b>
        </div>
        <div className="secondTitle">
          <b>Sebagai Pemberi Pinjaman</b>
        </div>
        <div className="secondTitle mt25">
          <b>dan</b>
        </div>
        <div className="secondTitle mt25">
          <b>Penerima Pinjaman ID [{this.state.amtData.borrowerIdNum}]</b>
        </div>
        <div className="secondTitle">
          <b>Sebagai Penerima Pinjaman</b>
        </div> 
        <div className="serviceDetail mt25">
          <p>Pada tanggal <b>[{this.state.amtData.loanDate}]</b> telah ditandatangani Perjanjian Pemberian Pinjaman Pribadi <b>(“Perjanjian”)</b> dibuat oleh:</p>
        </div>
        <div className="serviceDetail mt25">
          <div className="lessNum">
            <span className="num">1)</span>
            <span className="text">
              Pemberi Pinjaman, dengan nomor ID Pemberi Pinjaman [{this.state.amtData.lenderIdNum}], dengan identitas dan informasi pribadi yang tersimpan dalam basis data aplikasi Pinjam Gampang, selanjutnya disebut Pemberi Pinjaman
            </span>
          </div>
          <div className="lessNum">
            <span className="num">2)</span>
            <span className="text">
              Penerima Pinjaman, dengan nomor ID Penerima Pinjaman [{this.state.amtData.borrowerIdNum}], dengan identitas dan informasi pribadi yang tersimpan dalam basis data aplikasi Pinjam Gampang, selanjutnya disebut Penerima Pinjaman
            </span>
          </div>
        </div>
        <div className="serviceDetail mt25">
          <p><b>Pemberi Pinjaman dan Penerima Pinjaman</b> sepakat untuk membuat Perjanjian Pemberian Pinjaman Pribadi (selanjutnya disebut <b>“Perjanjian”</b>) dengan ketentuan dan syarat-syarat sebagai berikut:</p>
        </div>

        <div className="serviceDetail mt25">
          <div className="lessNum">
            <span className="num"><b>1.</b></span>
            <span className="text"><b>Definisi</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft lendingAgreement">
              <span className="secondNum">
                <span className="num">a.</span>
                <span className="text">Perjanjian Pemberian Pinjaman adalah Perjanjian ini bersama dengan semua Lampiran, addendum dan setiap perubahan atasnya, dibuat dan ditandatangani oleh dan antara Pemberi Pinjaman dan Penerima Pinjaman secara elektronik melalui perantara digital, sebagaimana didefinisikan pada Tabel Perincian Pinjaman Pribadi di atas.</span>
              </span>
              <span className="secondNum">
                <span className="num">b.</span>
                <span className="text">Pinjaman adalah Fasilitas Pemberian Pinjaman dalam bentuk tunai untuk bagi Penerima Pinjaman</span>
              </span>
              <span className="secondNum">
                <span className="num">c.</span>
                <span className="text">Data Pribadi adalah data dan informasi yang benar dan lengkap tentang Penerima Pinjaman terkait setiap aspek dari informasi pribadi, kegiatan usaha/pekerjaan, kredit dan posisi keuangan Penerima Pinjaman termasuk, tetapi tidak terbatas pada foto dari Penerima Pinjaman.</span>
              </span>
              <span className="secondNum">
                <span className="num">d.</span>
                <span className="text">Formulir Aplikasi atau Formulir adalah formulir permohonan Pinjaman yang diajukan oleh Penerima Pinjaman sebagaimana ditentukan dalam Layanan Aplikasi Pinjam Gampang yang diisi dan disampaikan oleh Penerima Pinjaman.</span>
              </span>
              <span className="secondNum">
                <span className="num">e.</span>
                <span className="text">Layanan Pinjam Gampang atau Aplikasi Pinjam Gampang atau Pinjam Gampang adalah aplikasi layanan pinjam meminjam uang berbasis teknologi informasi yang mempertemukan Pemberi Pinjaman dan Penerima Pinjaman dalam rangka melakukan Perjanjian ini.</span>
              </span>
              <span className="secondNum">
                <span className="num">f.</span>
                <span className="text">Tanggal Jatuh Tempo adalah tanggal saat Penerima Pinjaman harus membayarkan kembali sejumlah Pokok Pinjaman dan Bunga.</span>
              </span>
              <span className="secondNum">
                <span className="num">g.</span>
                <span className="text">Tanggal Keterlambatan adalah hari berikutnya dari tanggal jatuh tempo yang selanjutnya.</span>
              </span>
              <span className="secondNum">
                <span className="num">h.</span>
                <span className="text">Portal adalah situs www.kreditplusteknologi.co.id atau pada aplikasi “Pinjam Gampang”.</span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail mt25">
          <div className="lessNum">
            <span className="num"><b>2.</b></span>
            <span className="text"><b>PINJAMAN</b></span>
          </div>
        </div>
        <div className="serviceDetail lsTable">
          <div>
             <table>
             <tbody>
               <tr><td><span className="num">a.</span><span className="text">umlah Pokok Pinjaman</span></td><td>:</td><td>Rp[{DateApi.addDot(this.state.amtData.contractAmt||0)}]</td></tr>
               <tr><td><span className="num">b.</span><span className="text">Biaya Jasa (biaya terkait) yang dibebankan dan dipotong di muka</span></td><td>:</td><td>Rp[{DateApi.addDot(this.state.amtData.serviceAmt||0)}]</td></tr>
               <tr><td><span className="num">c.</span><span className="text">Bunga dibayar di muka</span></td><td>:</td><td>Rp[{DateApi.addDot(this.state.amtData.preInterest||0)}]</td></tr>
               <tr><td><span className="num">d.</span><span className="text">Jumlah yang akan diterima</span></td><td>:</td><td>Rp[{DateApi.addDot(this.state.amtData.loanAmount||0)}]</td></tr>
               <tr><td><span className="num">e.</span><span className="text">Tanggal Efektif Pinjaman</span></td><td>:</td><td>[{this.state.amtData.returnDate}] saat sejumlah nominal sebagaimana huruf d diterima di rekening bank Penerima Pinjaman</td></tr>
               <tr><td><span className="num">f.</span><span className="text">Jangka Waktu Pinjaman</span></td><td>:</td><td>[{this.state.amtData.term}] {this.state.amtData.termType&&this.state.amtData.termType=='DAY'?'hari':'bulan'} sejak Tanggal Efektif Pinjaman</td></tr>
               <tr><td><span className="num">g.</span><span className="text">Jumlah Cicilan</span></td><td>:</td><td>[{this.state.amtData.loanDate}]</td></tr>
             </tbody>
             </table>
          </div>
        </div>
        
         <div className="serviceDetail mt25">
          <div className="lessNum">
            <span className="num"><b>3.</b></span>
            <span className="text"><b>KEWAJIBAN PEMBAYARAN PINJAMAN</b></span>
          </div>
        </div>
        <div className="serviceDetail lsTable">
          <div>
             <table>
             <tbody>
               <tr><td><span className="num">a.</span><span className="text">Tanggal Jatuh Tempo Cicilan</span></td><td>:</td><td>[{this.state.amtData.returnDate}]</td></tr>
               <tr><td><span className="num">b.</span><span className="text">Jumlah yang harus dibayarkan saat Tanggal Jatuh Tempo</span></td><td>:</td><td>Rp[{DateApi.addDot(this.state.amtData.returnAmt||0)}]</td></tr>
               <tr><td><span className="num">c.</span><span className="text">Pembayaran Pinjaman</span></td><td>:</td><td>dilakukan ke virtual account yang disampaikan kepada Penerima Pinjaman oleh Layanan Pinjam Gampang</td></tr>
             </tbody>             
             </table>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>4.</b></span>
            <span className="text"><b>SYARAT-SYARAT UMUM</b></span>
          </div>
        </div>
        <div className="serviceDetail">
            <div className="textRight lessLeft lendingAgreement">
              <p className="secondNum">
                <span className="num1">4.1</span>
                <span className="text1">Penerima Pinjaman merupakan WNI berdomisili di Indonesia berusia minimum 21 (dua puluh satu) tahun, dan memiliki penghasilan tetap</span>
              </p>
              <p className="secondNum">
                <span className="num1">4.2</span>
                <span className="text1">Penerima Pinjaman telah mengajukan permohonan Pinjaman kepada Pemberi Pinjaman melalui Layanan Pinjam Gampang dan Pemberi Pinjaman dengan ini menyetujui permohonan untuk menyediakan Pinjaman sesuai dengan Syarat dan Ketentuan Perjanjian ini dan, dengan demikian, Penerima Pinjaman dengan ini menyetujui untuk melakukan pelunasan setiap dan seluruh jumlah utang atas pinjaman yang diberikan oleh Pemberi Pinjaman serta menanggung biaya-biaya yang diperlukan sebagaimana diatur dalam Perjanjian ini.
                </span>
              </p>
              <p className="secondNum">
                <span className="num1">4.3</span>
                <span className="text1">Pemberi Pinjaman dan Penerima Pinjaman dengan ini menyetujui Syarat dan Ketentuan sebagaimana diatur di dalam Tabel Perincian Pinjaman, setiap penambahan dan perubahan atas Perjanjian dan/atau perjanjian lainnya yang merupakan satu kesatuan dan bagian yang tidak terpisahkan dari Perjanjian termasuk, tetapi tidak terbatas pada, jumlah pokok pinjaman, jangka waktu pinjaman, bunga pinjaman, pembayaran kembali pinjaman, dan denda untuk keterlambatan pembayaran pinjaman.
                </span>
              </p>
              <p className="secondNum">
                <span className="num1">4.4</span>
                <span className="text1">Istilah yang didefinisikan dalam Syarat dan Ketentuan ini menggunakan definisi sebagaimana dinyatakan dalam Tabel Perincian Pinjaman Pribadi, kecuali apabila didefinisikan dengan cara lain dalam Syarat dan Ketentuan ini.
                </span>
              </p>
            </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>5.</b></span>
            <span className="text"><b>PERNYATAAN</b></span>
          </div>
        </div>
        <div className="serviceDetail">
            <div className="textRight lessLeft lendingAgreement">
              <p className="secondNum">Penerima Pinjaman dengan ini menyatakan sebagai berikut:</p>
              <p className="secondNum">
                <span className="num1">5.1</span>
                <span className="text1">Penerima Pinjaman setuju dan mengerti bahwa Pemberi Pinjaman telah menunjuk PT Kredit Plus Teknologi sebagai sebuah perusahaan Penyelenggara Layanan Pinjam Meminjam Berbasis Teknologi Informasi yang menghubungkan Penerima Pinjaman dengan Pemberi Pinjaman, termasuk namun tidak terbatas untuk melakukan promosi, proses pendaftaran, verifikasi data, pemberian persetujuan pinjaman, penyaluran pinjaman, penagihan, dan administrasi atas Pinjaman yang diberikan Pemberi Pinjaman kepada Penerima Pinjaman. Seluruh pembayaran atau biaya yang dibayarkan melalui PT Kredit Plus Teknologi adalah untuk kepentingan dan keuntungan Pemberi Pinjaman. </span>
              </p>
              <p className="secondNum">
                <span className="num1">5.2</span>
                <span className="text1">Penerima Pinjaman mengajukan permohonan penyediaan Pinjaman melalui Layanan Pinjam Gampang dan mengikuti prosedur yang disediakan oleh Layanan Pinjam Gampang untuk dapat menerima Pinjaman dari Pemberi Pinjaman. 
                </span>
              </p>
              <div className="secondNum">
                <div className="num1">5.3</div>
                <div className="text1">
                Penerima Pinjaman memahami bahwa persetujuan atas Pinjaman tersebut adalah semata-mata berdasarkan penilaian mutlak dari Layanan Pinjam Gampang untuk kepentingan Pemberi Pinjaman dan berdasarkan penandatanganan Penerima Pinjaman atas dokumen-dokumen hukum dan elektronik yang diperlukan dan formalitas lain yang disyaratkan oleh Layanan Pinjam Gampang.
                <br/>
                <span className="num">a.</span><span className="text">Penerima Pinjaman memahami dan menyetujui bahwa Penerima Pinjaman diwajibkan untuk memberikan Data Pribadi kepada Layanan Pinjam Gampang sehingga memungkinkan Layanan Pinjam Gampang untuk menilai apakah Penerima Pinjaman memenuhi syarat untuk mendapatkan Pinjaman yang akan ditawarkan dan diberikan oleh Pemberi Pinjaman. </span>
                <span className="num">b.</span><span className="text">Penerima Pinjaman juga menyetujui bahwa Penerima Pinjaman akan bertanggung jawab secara hukum untuk setiap pemalsuan dari, dan penggunaan secara tidak sah atas, Data Pribadi yang diberikan kepada Layanan Pinjam Gampang.</span>
                </div>
              </div>
              <p className="secondNum">
                <span className="num1">5.4</span>
                <span className="text1">
                Penerima Pinjaman memahami dan menyetujui bahwa Data Pribadi yang diberikan disini kepada Layanan Pinjam Gampang, akan digunakan, untuk memproses permohonan Pinjaman dan/atau memenuhi peraturan perundang-undangan yang berlaku. Penerima Pinjaman dengan ini memberikan kuasa dan wewenang penuh kepada Layanan Pinjam Gampang dan perwakilannya yang sah untuk, pada setiap saat, tanpa pemberitahuan terlebih dahulu kepada Penerima Pinjaman, melaksanakan seluruh atau setiap tindakan dan fungsi-fungsi: 
                <br/>
                <span className="secondNum"><span className="num1">(i)</span><span className="text1">pengumpulan, penyimpanan, penggunaan, pemeliharaan, penganalisaan, perumusan, penyiaran dan penyebaran atas Data Pribadi;</span></span>
                <span className="secondNum"><span className="num1">(ii)</span><span className="text1">melakukan pemeriksaan kredit, referensi dan membuat pertanyaan-pertanyaan dan verifikasi berdasarkan data dan informasi yang diberikan kepada, atau dikumpulkan oleh, Pemberi Pinjaman apabila dan pada saat Pemberi Pinjaman mempertimbangkan perlunya hal tersebut semata-mata berdasarkan penilaian mutlaknya; dan</span></span>
                <span className="secondNum"><span className="num1">(iii)</span><span className="text1">membagi, mendapatkan dan/atau mengungkapkan Data Pribadi kepada/dari setiap biro informasi kredit, lembaga keuangan, setiap otoritas pemerintah lain yang berwenang atau setiap pihak ketiga yang terikat perjanjian dengan Pemberi Pinjaman untuk keperluan verifikasi dan penilaian yang sesuai atas informasi dan Data Pribadi.</span></span>
                </span>
              </p>
              <p className="secondNum">
                <span className="num1">5.5</span>
                <span className="text1">
                Tanda tangan Penerima Pinjaman yang digunakan dalam Perjanjian ini menggunakan tanda tangan elektronik yang memiliki kekuatan hukum sama dengan tanda tangan yang digunakan dalam dokumen-dokumen hukum lain miliknya termasuk, tetapi tidak terbatas pada, Kartu Tanda Penduduk (KTP) atau paspor dan, oleh karenanya, penggunaan tanda tangan tersebut adalah sah.
                </span>
              </p>
              <p className="secondNum">
                <span className="num1">5.6</span>
                <span className="text1">
                Penerima Pinjaman mengakui dan menyetujui bahwa Perjanjian ini beserta Syarat dan Ketentuan dan Pelunasan Pinjaman yang ditandatangani menggunakan tanda tangan elektronik merupakan tanda tangan yang sah dari pihak Penerima Pinjaman.
                </span>
              </p>
              <p className="secondNum">
                <span className="num1">5.7</span>
                <span className="text1">
                Penerima Pinjaman telah menerima salinan dari: 
                <br/>
                <span className="secondNum"><span className="num">(a)</span><span className="text">Perjanjian ini; </span></span>
                <span className="secondNum"><span className="num">(b)</span><span className="text">Syarat dan Ketentuan;</span></span>
                </span>
              </p>
            </div>
        </div>
        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>6.</b></span>
            <span className="text"><b>FORM PERMOHONAN PINJAMAN</b></span>
          </div>
        </div>
         <div className="serviceDetail">
            <div className="textRight lessLeft lendingAgreement">
            <p className="secondNum">
                <span className="num1">6.1</span>
                <span className="text1">
                Perjanjian ini dibuat dan ditandatangani sesuai dengan Formulir. 
                </span>
            </p>
            <p className="secondNum">
                <span className="num1">6.2</span>
                <span className="text1">
                Penerima Pinjaman bertanggung jawab atas ketepatan dan kebenaran isi dari Formulir, yang merupakan satu kesatuan dan bagian yang tidak terpisahkan dari Perjanjian ini.
                </span>
            </p>
            <p className="secondNum">
                <span className="num1">6.3</span>
                <span className="text1">
                Terkait dengan penggunaan Formulir elektronik dalam pengajuan pinjaman serta penandatanganan perjanjian pinjaman secara elektronik, sesuai dengan Undang-undang Republik Indonesia No 11 Tahun 2008 mengenai Informasi dan Transaksi Elektronik, dijelaskan pada Bab III pasal 5 ayat 1 yang menyebutkan bahwa Informasi Elektronik dan/atau Dokumen Elektronik dan/atau hasil cetaknya merupakan Alat Bukti Hukum Yang Sah.
                </span>
            </p>
            </div>
          </div>
          <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>7.</b></span>
            <span className="text"><b>PENGAKUAN UTANG</b></span>
          </div>
        </div>
          <div className="serviceDetail">
            <div className="textRight lessLeft lendingAgreement">
            <p className="secondNum">
                <span className="num1">7.1</span>
                <span className="text1">
                Terkait dengan Pasal 2 di atas, maka Penerima Pinjaman dengan ini (sekarang dan untuk dikemudian hari atau pada waktu yang berlaku), menerima pinjaman dari Pemberi Pinjaman dan oleh karena itu Penerima Pinjaman mengakui bahwa dirinya benar dan secara sah telah berutang kepada Pemberi Pinjaman untuk sejumlah uang sebagaimana tercantum dalam Tabel Perincian Pinjaman Pribadi ditambah dengan bunga dan biaya-biaya lainnya yang wajib dibayar oleh Penerima Pinjaman kepada Pemberi Pinjaman berdasarkan Perjanjian ini.
                </span>
            </p>
           <p className="secondNum">
                <span className="num1">7.2</span>
                <span className="text1">
                Dalam Perjanjian ini, pemberian pinjaman diberikan kepada Penerima Pinjaman setelah Penerima Pinjaman dinyatakan lolos verifikasi dan telah disetujui permohonan pinjamannya dan setelah Pemberi Pinjaman dan Penerima Pinjaman menandatangani Perjanjian ini. 
                </span>
            </p>
            <p className="secondNum">
                <span className="num1">7.3</span>
                <span className="text1">
                Pemberi Pinjaman dengan ini mengakui dengan sebagaimana mestinya dan menerima pengakuan utang yang diberikan oleh Penerima Pinjaman sebagaimana diatur dalam Pasal 7.1 diatas.
                </span>
            </p>
            <p className="secondNum">
                <span className="num1">7.4</span>
                <span className="text1">
                Pembukuan dan catatan-catatan keuangan dari Pemberi Pinjaman dan atau pembukuan dan catatan-catatan yang dibuat Penyelenggara Layanan untuk Pemberi Pinjaman merupakan salah satu bukti dari semua jumlah utang Penerima Pinjaman terhadap Pemberi Pinjaman berdasarkan Perjanjian ini, dan pembukuan dan catatan-catatan keuangan tersebut mengikat Penerima Pinjaman.
                </span>
            </p>
           </div>
          </div>  
        
        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>8.</b></span>
            <span className="text"><b>PELUNASAN LEBIH AWAL</b></span>
          </div>
        </div>
          <div className="serviceDetail">
            <div className="textRight lessLeft lendingAgreement">
            <p className="secondNum">
                <span className="num1">8.1</span>
                <span className="text1">
                Penerima Pinjaman dapat melunasi seluruh jumlah Pinjaman yang terutang sebelum berakhirnya jangka waktu pinjaman apabila Penerima Pinjaman bermaksud untuk melunasi, dengan jumlah pembayaran yang harus dilakukan sama seperti jumlah kewajiban pembayaran saat kewajiban jatuh tempo.
                </span>
            </p>
           <p className="secondNum">
                <span className="num1">8.2</span>
                <span className="text1">
                Posisi total jumlah terutang harian sejak pencairan sampai dengan hari jatuh tempo diinformasikan dalam Jadwal Pembayaran Pinjaman dalam halaman akun pribadi peminjam yang akan diberikan kepada setiap Penerima Pinjaman.
                </span>
            </p>
           </div>
          </div> 
          <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>9.</b></span>
            <span className="text"><b>BUNGA, DENDA, DAN BIAYA</b></span>
          </div>
        </div>
          <div className="serviceDetail">
            <div className="textRight lessLeft lendingAgreement">
            <p className="secondNum">
                <span className="num1">9.1</span>
                <span className="text1">
                Penerima Pinjaman dikenakan Biaya di Muka dan bunga di muka, dipotongkan pada saat menerima Pokok Pinjaman, yang besarnya sebagaimana tercantum dalam Pasal 2 huruf b dan Pasal 2 huruf c dan/atau dalam Formulir Elektronik yang disampaikan dan disetujui melalui Aplikasi dan menjadi satu kesatuan dengan Perjanjian ini. 
                </span>
            </p>
           <p className="secondNum">
                <span className="num1">9.2</span>
                <span className="text1">
                Pemberi Pinjaman membebankan/mengenakan bunga atas utang dalam bentuk Pinjaman Penerima Pinjaman yang besarnya sebagaimana tercantum dalam Tabel Perincian Pinjaman Pribadi. Bunga atas utang yang dipotongkan berdasarkan Pasal 9.1 tersebut di atas oleh Penyelenggara merupakan bunga tetap atas pinjaman.
                </span>
            </p>
            <p className="secondNum">
                <span className="num1">9.3</span>
                <span className="text1">
                Untuk setiap keterlambatan pembayaran pinjaman yang terutang dan telah jatuh tempo, Penerima Pinjaman dikenakan denda sebagai berikut:
                <br/>
                <span className="secondNum"><span className="num">1)</span><span className="text">Dari Tanggal Keterlambatan sampai dengan hari ketiga keterlambatan akan dikenakan denda keterlambatan, dimana denda adalah sebesar 5% (lima persen) dari pokok pinjaman. <br/>Mulai dari hari keempat sejak tanggal keterlambatan, akan dikenakan denda keterlambatan sebesar 1,5% (satu koma lima persen) dari jumlah pokok pinjaman dibebankan setiap hari sampai dengan pelunasan penuh pinjaman;</span></span>
                <span className="secondNum"><span className="num">2)</span><span className="text">Sejak Tanggal Keterlambatan, akan dikenakan bunga keterlambatan 0,1% (nol koma satu) dari jumlah pokok pinjaman setiap harinya sampai dengan pelunasan penuh pinjaman; </span></span>
                <span className="secondNum"><span className="num">3)</span><span className="text">3)Denda keterlambatan beserta bunga keterlambatan yang harus dibayar Penerima Pinjaman paling banyak sebesar 100% dari jumlah Pokok Pinjaman. </span></span>
                </span>
            </p>
           </div>
          </div>
          <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>10.</b></span>
            <span className="text"><b>CIDERA JANJI</b></span>
          </div>
        </div>
          <div className="serviceDetail">
            <div className="textRight lessLeft lendingAgreement">
            <p className="secondNum">
                <span className="num2">10.1</span>
                <span className="text2">
                Penerima Pinjaman dianggap telah melakukan Cidera Janji, yang cukup dibuktikan hanya dengan lewatnya waktu, di mana peristiwa tersebut tidak perlu dibuktikan lagi namun cukup dengan terjadinya salah satu peristiwa-peristiwa sebagai berikut:
                <br/>
                <span className="secondNum"><span className="num">a.</span><span className="text">Penerima Pinjaman telah gagal untuk memenuhi salah satu atau lebih kewajibannya sebagaimana ditentukan dalam Perjanjian ini; atau</span></span>
                <span className="secondNum"><span className="num">b.</span><span className="text">Penerima Pinjaman telah, atau tidak, atau gagal melakukan pembayaran pinjaman pada saat pembayaran pinjaman terkait jatuh tempo; atau</span></span>
                <span className="secondNum"><span className="num">c.</span><span className="text">Penerima Pinjaman telah dinyatakan pailit berdasarkan putusan pengadilan yang berwenang; atau</span></span>
                <span className="secondNum"><span className="num">d.</span><span className="text">man ternyata tidak menggambarkan kondisi yang sesungguhnya/sebenarnya.</span></span>
                </span>
            </p>
           <p className="secondNum">
                <span className="num2">10.2</span>
                <span className="text2">
                Dalam hal Penerima Pinjaman melakukan Cidera Janji, maka Pemberi Pinjaman berhak menuntut pelunasan kepada Penerima Pinjaman, sebagaimana disetujui oleh Penerima Pinjaman untuk melakukan pelunasan atas seluruh kewajiban Penerima Pinjaman, secara seketika dan sekaligus lunas, termasuk, tetapi tidak terbatas pada, jumlah utang pokok ditambah bunga, pinjaman dan denda keterlambatan pembayaran dan seluruh biaya-biaya lainnya.
                </span>
            </p>
            <p className="secondNum">
                <span className="num2">10.3</span>
                <span className="text2">
                Penerima Pinjaman setuju dengan tidak mengesampingkan Pasal 1131 dan 1132 KUH Perdata terkait pemberlakuannya, maka persyaratan, peraturan atau ketentuan yang lainnya tetap berlaku dan mengikat para pihak.
                </span>
            </p>
            <p className="secondNum">
                <span className="num2">10.4</span>
                <span className="text2">
                Penerima Pinjaman setuju apabila terjadi Cidera Janji, Data Pribadi Penerima Pinjaman dapat disampaikan kepada Otoritas Jasa Keuangan maupun institusi atau Lembaga pemerintah yang berwenang untuk melakukan pengumpulan Data Pribadi kreditur bermasalah dan Penerima Pinjaman dengan ini memahami dan menerima segala akibat hukum yang dapat dikenakan kepadanya karena Cidera Janji yang dilakukan Penerima Pinjaman. 
                </span>
            </p>
            <p className="secondNum">
                <span className="num2">10.5</span>
                <span className="text2">
                Pemberi Pinjaman, melalui Penyelenggara Layanan atau berdasarkan kebijakan Penyelenggara Layanan, berhak memberikan hak substitusi kepada pihak ketiga, dalam hal ini jasa penagihan, apabila Penerima Pinjaman telah melewati batas waktu keterlambatan lebih dari 30 (tiga puluh) hari.
                </span>
            </p>
           </div>
          </div>
          <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>11.</b></span>
            <span className="text"><b>LAIN-LAIN</b></span>
          </div>
        </div>
          <div className="serviceDetail">
            <div className="textRight lessLeft lendingAgreement">
            <p className="secondNum">
                <span className="num2">11.1</span>
                <span className="text2">
                Syarat dan Ketentuan ini dapat diubah oleh Pemberi Pinjaman hanya setelah kesepakatan bersama secara tertulis dengan Penerima Pinjaman.
                </span>
            </p>
           <p className="secondNum">
                <span className="num2">11.2</span>
                <span className="text2">
                  Pemberi Pinjaman dapat mengusulkan perubahan-perubahan atas Syarat dan Ketentuan ini utamanya sehubungan dengan perubahan-perubahan persyaratan hukum, untuk dapat menyediakan layanan yang lebih baik kepada Penerima Pinjaman dan sehubungan dengan tujuan-tujuan bisnis Pemberi Pinjaman. 
                  </span>
            </p>
            <p className="secondNum">
                <span className="num2">11.3</span>
                <span className="text2">
                  Pemberi Pinjaman harus menginformasikan kepada Penerima Pinjaman mengenai usulan perubahan atas Syarat dan Ketentuan ini dalam bentuk tertulis (dan melalui setiap cara yang patut), paling tidak 7 (tujuh) hari kerja di awal sebelum tanggal efektif perubahan-perubahan yang diusulkan tersebut.
                  </span>
            </p>
            <p className="secondNum">
                <span className="num2">11.4</span>
                <span className="text2">
                Penerima Pinjaman wajib untuk membaca dan memahami perubahan yang diusulkan atas Syarat dan Ketentuan yang tertera pada Aplikasi atau pada laman situs http://kreditplusteknologi.id 
                </span>
            </p>
            <p className="secondNum">
                <span className="num2">11.5</span>
                <span className="text2">
                Penerima Pinjaman akan menyatakan persetujuannya atas setiap dan seluruh perubahan atas Syarat dan Ketentuan ini dengan melaksanakan setiap transaksi (utamanya dengan pembayaran jumlah angsuran, dengan setiap penggunaan Fasilitas pembiayaan, dan sebagainya) setiap saat setelah tanggal efektif perubahan atas Syarat dan Ketentuan tersebut. 
                </span>
            </p>
            <p className="secondNum">
                <span className="num2">11.6</span>
                <span className="text2">
                Dalam hal Penerima Pinjaman tidak setuju dengan perubahan atas Syarat dan Ketentuan tersebut, Penerima Pinjaman dapat dengan segera mengakhiri Perjanjian ini, namun hal ini harus dilaksanakan oleh Penerima Pinjaman hanya sebelum tanggal efektif perubahan Syarat dan Ketentuan tersebut. Tidak setujunya Penerima Pinjaman terhadap Syarat dan Ketentuan yang baru tidak meniadakan atau menghilangkan kewajiban pembayaran atas Pinjaman. Dalam hal Penerima Pinjaman tidak setuju dengan perubahan atas Syarat dan Ketentuan dan hendak mengakhiri Perjanjian ini, Penerima Pinjaman wajib menyelesaikan seluruh kewajiban pembayaran yang terutang melalui Penyedia Layanan.
                </span>
            </p>
           <p className="secondNum">
                <span className="num2">11.7</span>
                <span className="text2">
                 Penerima Pinjaman wajib memberitahukan secara tertulis kepada Pemberi Pinjaman, melalui Penyelenggara Layanan, atas setiap terjadi perubahan data Penerima Pinjaman termasuk, tetapi tidak terbatas pada, setiap perubahan alamat tempat tinggal Penerima Pinjaman.
                 </span>
            </p>
            <p className="secondNum">
                <span className="num2">11.8</span>
                <span className="text2">
                  Penerima Pinjaman dengan ini setuju bahwa, semata-mata berdasarkan kebijakan Pemberi Pinjaman sendiri, dan tanpa pemberitahuan sebelumnya atau tanpa perlu diketahui oleh Penerima Pinjaman, Pemberi Pinjaman berhak dan berwenang untuk mengalihkan baik seluruh maupun sebagian hak dan kewajibannya yang timbul berdasarkan Perjanjian ini kepada pihak ketiga mana pun. 
                  </span>
            </p>
            <p className="secondNum">
                <span className="num2">11.9</span>
                <span className="text2">
                  Pemberi Pinjaman dapat, dalam hal terdapat pengalihan seperti pada Pasal 11.6, melanjutkan pelaksanaan administrasi hak dan kewajiban tersebut melalui Penyelenggara Layanan. Penerima Pinjaman dengan ini setuju bahwa, dalam hal tersebut, Pemberi Pinjaman dapat menggunakan informasi mengenai hak dan kewajiban yang dialihkan tersebut untuk pemenuhan kewajiban-kewajiban Pemberi Pinjaman lainnya yang timbul dari Perjanjian ini. 
                  </span>
            </p>
            <p className="secondNum">
                <span className="num2">11.10</span>
                <span className="text2">
                Dengan menandatangani dan menyetujui formulir aplikasi ini, Penerima Pinjaman sebagai pemohon menyatakan bahwa data telekomunikasi yang Penerima Pinjaman berikan dalam formulir aplikasi pemanfaatan produk Pemberi Pinjaman adalah yang sebenar-benarnya; dalam hal ini Pemberi Pinjaman dapat melakukan kegiatan verifikasi data telekomunikasi Penerima Pinjaman yang dibagikan di dalam formulir aplikasi Penerima Pinjaman.
                </span>
            </p>
            <p className="secondNum">
                <span className="num2">11.11</span>
                <span className="text2">
                  Penerima Pinjaman memberikan persetujuan kepada Pemberi Pinjaman untuk mendapatkan informasi data telekomunikasi Penerima Pinjaman dari sumber lainnya dimana informasi terkait tidak dapat ditarik kembali.
                  </span>
            </p>
           <p className="secondNum">
                <span className="num2">11.12</span>
                <span className="text2">
                Penerima Pinjaman telah memahami syarat dan ketentuan dari permohonan aplikasi ini serta tujuan dan konsekuensi dari pengolahan data telekomunikasi kepada pihak lain di luar badan hukum Pemberi Pinjaman (Dengan ini Penerima Pinjaman telah menyetujui untuk terikat dengan setiap masing-masing Syarat dan Ketentuan yang terkandung dalam perjanjian ini dan dengan tegas diartikan bahwa Penerima Pinjaman telah membaca secara seksama Perjanjian ini).
                </span>
            </p>
            <p className="secondNum">
                <span className="num2">11.13</span>
                <span className="text2">
                Mengenai Perjanjian, Penerima Pinjaman dan Pemberi Pinjaman dengan ini melepaskan haknya berdasarkan Pasal 1266 KUHPerdata sepanjang yang mengatur tentang tata cara mengakhiri sesuatu perjanjian.
                </span>
            </p>
           </div>
          </div>
           <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>12.</b></span>
            <span className="text"><b>PENAFSIRAN DAN PENYELESAIAN SENGKETA</b></span>
          </div>
        </div>
          <div className="serviceDetail">
            <div className="textRight lessLeft lendingAgreement">
            <p className="secondNum">
                <span className="num2">12.1</span>
                <span className="text2">
                Segala sengketa yang timbul terkait dengan penafsiran dan pelaksanaan Perjanjian ini, akan diselesaikan antara Penerima Pinjaman dan Pemberi Pinjaman secara musyawarah untuk mufakat.
                </span>
            </p>
           <p className="secondNum">
                <span className="num2">12.2</span>
                <span className="text2">
                Dalam hal tidak dapat diselesaikan secara musyarah untuk mufakat, maka setiap dan seluruh perselisihan yang timbul dari atau sehubungan dengan pelaksanaan Perjanjian ini, Para Pihak sepakat untuk menyelesaikan perselisihan melalui Badan Arbitrase Nasional Indonesia.
                </span>
            </p>
            </div>
         </div>
         <div className="bottomEare">
           <div className="left">
             <div className="key"><b>Pemberi</b></div> 
             <div className="key"><b>Penerima Pinjaman</b></div> 
            </div>
            <div className="right">
             <div className="key"><b>Pinjaman</b></div>
            </div>
            <div className="left">
              <div><b>[{this.state.amtData.lenderIdNum}]</b></div>
            </div>
            <div className="right">
             <div><b>[{this.state.amtData.borrowerIdNum}]</b></div>
            </div>
          </div>
      </div>
    );
 }
}

LargeStageAgree.defaultProps = {
};

export default LargeStageAgree;

