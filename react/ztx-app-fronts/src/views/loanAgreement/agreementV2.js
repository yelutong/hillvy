import React from 'react';
import './index.css';


class LoanAgreement extends React.Component {
  state = {
    contractData:{},
    contractNo:''
  };

  componentWillMount() {
    
  }

  render() {
    return (
      <div className="padding20 privacyService V2">
        <div className="topest">
          <b>Pribadi dan Rahasia</b>
        </div>
        <div className="topest">
          <b>Hak cipta perjanjian ini dimiliki oleh PT Kredit Plus Teknologi</b>
        </div>
        <div className="firstTitle">PERJANJIAN PEMBERIAN PINJAMAN</div>
        <div className="secondTitle">
          Nomor Perjanjian:<b> [{this.props.contractData.contractNo||''}]</b>
        </div>
        <div className="secondTitle">
          <b>ANTARA</b>
        </div>
        <div className="secondTitle">
          <b>Pemberi Pinjaman ID [{this.props.contractData.lenderIdNum||''}]</b>
        </div>
        <div className="secondTitle">
          <b>Sebagai Pemberi Pinjaman</b>
        </div>
        <div className="secondTitle">
          <b>dan</b>
        </div>
        <div className="secondTitle">
          <b>Penerima Pinjaman ID [{this.props.contractData.borrowerIdNum || ''}]</b>
        </div>
        <div className="secondTitle">
          <b>Sebagai Debitur</b>
        </div>

        <div className="serviceDetail">
          <p>Pada tanggal <b>[{this.props.contractData.loanDate || 'dd/mm/yyyy'}] telah ditandatangani</b> Perjanjian Pemberian Pinjaman Pribadi (“Perjanjian”) dibuat oleh</p>
        </div>
        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num">1)</span>
            <span className="text">Pemberi Pinjaman, dengan nomor ID Pemberi Pinjaman [{this.props.contractData.lenderIdNum ||'•'}], dengan identitas dan informasi pribadi yang tersimpan dalam basis data aplikasi Pinjam Gampang, selanjutnya disebut Pemberi Pinjaman</span>
          </div>
          <div className="lessNum">
            <span className="num">2)</span>
            <span className="text">Penerima Pinjaman, dengan nomor ID Penerima Pinjaman [{this.props.contractData.borrowerIdNum||'•'}], dengan identitas dan informasi pribadi yang tersimpan dalam basis data aplikasi Pinjam Gampang, selanjutnya disebut Penerima Pinjaman.</span>
          </div>
        </div>
        <div className="serviceDetail">
          <p>Pemberi Pinjaman dan Penerima Pinjaman sepakat untuk membuat Perjanjian Pemberian Pinjaman Pribadi (selanjutnya disebut “Perjanjian”) dengan ketentuan dan syarat-syarat sebagai berikut:</p>
        </div>

        <div className="serviceDetail">
          <div className="lessNum title">
            <span className="num"><b>1.</b></span>
            <span className="text"><b>DEFINISI</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft">
              <span className="secondNum">
                <span className="num">a.</span>
                <span className="text">Perjanjian Pemberian Pinjaman adalah Perjanjian ini bersama dengan semua Lampiran, addendum dan setiap perubahan atasnya, dibuat dan ditandatangani oleh dan antara Pemberi Pinjaman dan Penerima Pinjaman secara elektronik melalui perantara digital, sebagaimana didefinisikan pada Tabel Perincian Pinjaman Pribadi di atas.</span>
              </span>
              <span className="secondNum">
                <span className="num">b.</span>
                <span className="text">Pinjaman adalah Fasilitas Pemberian Pinjaman dalam bentuk tunai untuk bagi Penerima Pinjaman.</span>
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
                <span className="text">Portal adalah situs www.kreditplusteknologi.id atau pada aplikasi “Pinjam Gampang”.</span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum title">
            <span className="num"><b>2.</b></span>
            <span className="text"><b>PINJAMAN</b></span>
          </div>
        </div>
        <div className="serviceDetail aggrementForm">
          <div>
            <div className="textRight lessLeft threeEara">
              <ul>
                <li style={{'borderRight':'1px solid #e6e6e6'}}>a.  Jumlah Pokok Pinjaman</li>
                <li>Rp[{this.props.contractData.principal||'•'}]</li>
              </ul>
              <ul>
                <li style={{'borderRight':'1px solid #e6e6e6'}}>b.  Biaya Jasa (biaya terkait) yang dibebankan dan dipotong di muka</li>
                <li>Rp[{this.props.contractData.serviceAmt||'•'}]</li>
              </ul>
              <ul>
                <li style={{'borderRight':'1px solid #e6e6e6'}}>c.  Bunga dibayar di muka</li>
                <li>Rp[{this.props.contractData.preInterest||'•'}]</li>
              </ul>
              <ul>
                <li style={{'borderRight':'1px solid #e6e6e6'}}>d.  Jumlah yang akan diterima</li>
                <li>Rp[{this.props.contractData.loanAmount||'•'}]</li>
              </ul>
              <ul>
                <li>e.  Tanggal Efektif Pinjaman</li>
                <li style={{'borderLeft':'1px solid #e6e6e6'}}>[{this.props.contractData.loanDate?(this.props.contractData.loanDate.split('-')[2]+'/'+this.props.contractData.loanDate.split('-')[1]+'/'+this.props.contractData.loanDate.split('-')[0]):'dd/mm/yyyy'}] saat sejumlah nominal sebagaimana huruf d diterima di rekening bank Penerima Pinjaman</li>
              </ul>
              <ul>
                <li>f.  Jangka Waktu Pinjaman</li>
                <li style={{'borderLeft':'1px solid #e6e6e6'}}>[{this.props.contractData.term || ''}] hari kalender sejak Tanggal Efektif Pinjaman</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum title">
            <span className="num"><b>3.</b></span>
            <span className="text"><b>KEWAJIBAN PEMBAYARAN PINJAMAN</b></span>
          </div>
        </div>
        <div className="serviceDetail aggrementForm">
          <div>
            <div className="textRight lessLeft threeEara">
              <ul>
                <li>a.  Tanggal Jatuh Tempo</li>
                <li style={{'borderLeft':'1px solid #e6e6e6'}}>[{this.props.contractData.returnDate?(this.props.contractData.returnDate.split('-')[2]+'/'+this.props.contractData.returnDate.split('-')[1]+'/'+this.props.contractData.returnDate.split('-')[0]):'dd/mm/yyyy'}]</li>
              </ul>
              <ul>
                <li style={{'borderRight':'1px solid #e6e6e6'}}>b.  Jumlah yang harus dibayarkan saat Tanggal Jatuh Tempo</li>
                <li>Rp[{this.props.contractData.returnAmt||'•'}]</li>
              </ul>
              <ul>
                <li>c.  Pembayaran Pinjaman</li>
                <li style={{'borderLeft':'1px solid #e6e6e6'}}>dilakukan ke virtual account yang disampaikan kepada Penerima Pinjaman oleh Layanan Pinjam Gampang</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum title">
            <span className="num"><b>4.</b></span>
            <span className="text"><b>SYARAT-SYARAT UMUM</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft">
              <span className="secondNum">
                <span className="num">4.1</span>
                <span className="text">Penerima Pinjaman merupakan WNI berdomisili di Indonesia berusia minimum 21 (dua puluh satu) tahun, dan memiliki penghasilan tetap.</span>
              </span>
              <span className="secondNum">
                <span className="num">4.2</span>
                <span className="text">Penerima Pinjaman telah mengajukan permohonan Pinjaman kepada Pemberi Pinjaman melalui Layanan Pinjam Gampang dan Pemberi Pinjaman dengan ini menyetujui permohonan untuk menyediakan Pinjaman sesuai dengan Syarat dan Ketentuan Perjanjian ini dan, dengan demikian, Penerima Pinjaman dengan ini menyetujui untuk melakukan pelunasan setiap dan seluruh jumlah utang atas pinjaman yang diberikan oleh Pemberi Pinjaman serta menanggung biaya-biaya yang diperlukan sebagaimana diatur dalam Perjanjian ini.</span>
              </span>
              <span className="secondNum">
                <span className="num">4.3</span>
                <span className="text">Pemberi Pinjaman dan Penerima Pinjaman dengan ini menyetujui Syarat dan Ketentuan sebagaimana diatur di dalam Tabel Perincian Pinjaman, setiap penambahan dan perubahan atas Perjanjian dan/atau perjanjian lainnya yang merupakan satu kesatuan dan bagian yang tidak terpisahkan dari Perjanjian termasuk, tetapi tidak terbatas pada, jumlah pokok pinjaman, jangka waktu pinjaman, bunga pinjaman, pembayaran kembali pinjaman, dan denda untuk keterlambatan pembayaran pinjaman.</span>
              </span>
              <span className="secondNum">
                <span className="num">4.4</span>
                <span className="text">Istilah yang didefinisikan dalam Syarat dan Ketentuan ini menggunakan definisi sebagaimana dinyatakan dalam Tabel Perincian Pinjaman Pribadi, kecuali apabila didefinisikan dengan cara lain dalam Syarat dan Ketentuan ini.</span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum title">
            <span className="num"><b>5.</b></span>
            <span className="text"><b>PERNYATAAN</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft">
              <div>Penerima Pinjaman dengan ini menyatakan sebagai berikut:</div>
              <span className="secondNum">
                <span className="num">5.1</span>
                <span className="text">Penerima Pinjaman setuju dan mengerti bahwa Pemberi Pinjaman telah menunjuk PT Kredit Plus Teknologi sebagai sebuah perusahaan Penyelenggara Layanan Pinjam Meminjam Berbasis Teknologi Informasi yang menghubungkan Penerima Pinjaman dengan Pemberi Pinjaman, termasuk namun tidak terbatas untuk melakukan promosi, proses pendaftaran, verifikasi data, pemberian persetujuan pinjaman, penyaluran pinjaman, penagihan, dan administrasi atas Pinjaman yang diberikan Pemberi Pinjaman kepada Penerima Pinjaman. Seluruh pembayaran atau biaya yang dibayarkan melalui PT Kredit Plus Teknologi adalah untuk kepentingan dan keuntungan Pemberi Pinjaman. </span>
              </span>
              <span className="secondNum">
                <span className="num">5.2</span>
                <span className="text">Penerima Pinjaman mengajukan permohonan penyediaan Pinjaman melalui Layanan Pinjam Gampang dan mengikuti prosedur yang disediakan oleh Layanan Pinjam Gampang untuk dapat menerima Pinjaman dari Pemberi Pinjaman.</span>
              </span>
              <span className="secondNum">
                <span className="num">5.3</span>
                <span className="text">Penerima Pinjaman memahami bahwa persetujuan atas Pinjaman tersebut adalah semata-mata berdasarkan penilaian mutlak dari Pemberi Pinjaman melalui Layanan Pinjam Gampang dan berdasarkan penandatanganan Penerima Pinjaman atas dokumen-dokumen hukum dan elektronik yang diperlukan dan formalitas lain yang disyaratkan oleh Layanan Pinjam Gampang.
                  <span className="lastNum">
                    <span className="num">a.</span>
                    <span className="text">Penerima Pinjaman memahami dan menyetujui bahwa Penerima Pinjaman diwajibkan untuk memberikan Data Pribadi kepada Layanan Pinjam Gampang sehingga memungkinkan Layanan Pinjam Gampang untuk menilai apakah Penerima Pinjaman memenuhi syarat untuk mendapatkan Pinjaman yang akan ditawarkan dan diberikan oleh Pemberi Pinjaman. </span>
                  </span>
                  <span className="lastNum">
                    <span className="num">b.</span>
                    <span className="text">Penerima Pinjaman juga menyetujui bahwa Penerima Pinjaman akan bertanggung jawab secara hukum untuk setiap pemalsuan dari, dan penggunaan secara tidak sah atas, Data Pribadi yang diberikan kepada Layanan Pinjam Gampang.</span>
                  </span>
                </span>
              </span>
              <span className="secondNum">
                <span className="num">5.4</span>
                <span className="text">Penerima Pinjaman memahami dan menyetujui bahwa Data Pribadi yang diberikan disini kepada Layanan Pinjam Gampang, akan digunakan, untuk memproses permohonan Pinjaman dan/atau memenuhi peraturan perundang-undangan yang berlaku. Penerima Pinjaman dengan ini memberikan kuasa dan wewenang penuh kepada Layanan Pinjam Gampang dan perwakilannya yang sah untuk, pada setiap saat, tanpa pemberitahuan terlebih dahulu kepada Penerima Pinjaman, melaksanakan seluruh atau setiap tindakan dan fungsi-fungsi: 
                  <span className="lastNum">
                    <span className="num">(i)</span>
                    <span className="text">pengumpulan, penyimpanan, penggunaan, pemeliharaan, penganalisaan, perumusan, penyiaran dan penyebaran atas Data Pribadi; </span>
                  </span>
                  <span className="lastNum">
                    <span className="num">(ii)</span>
                    <span className="text">melakukan pemeriksaan kredit, referensi dan membuat pertanyaan-pertanyaan dan verifikasi berdasarkan data dan informasi yang diberikan kepada, atau dikumpulkan oleh, Pemberi Pinjaman apabila dan pada saat Pemberi Pinjaman mempertimbangkan perlunya hal tersebut semata-mata berdasarkan penilaian mutlaknya; dan</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">(iii)</span>
                    <span className="text">membagi, mendapatkan dan/atau mengungkapkan Data Pribadi kepada/dari setiap biro informasi kredit, lembaga keuangan, setiap otoritas pemerintah lain yang berwenang atau setiap pihak ketiga yang terikat perjanjian dengan Pemberi Pinjaman untuk keperluan verifikasi dan penilaian yang sesuai atas informasi dan Data Pribadi.</span>
                  </span>
                </span>
              </span>
              <span className="secondNum">
                <span className="num">5.5</span>
                <span className="text">Tanda tangan Penerima Pinjaman yang digunakan dalam Perjanjian ini menggunakan tanda tangan elektronik yang memiliki kekuatan hukum sama dengan tanda tangan yang digunakan dalam dokumen-dokumen hukum lain miliknya termasuk, tetapi tidak terbatas pada, Kartu Tanda Penduduk (KTP) atau paspor dan, oleh karenanya, penggunaan tanda tangan tersebut adalah sah.</span>
              </span>
              <span className="secondNum">
                <span className="num">5.6</span>
                <span className="text"> Penerima Pinjaman mengakui dan menyetujui bahwa Perjanjian ini beserta Syarat dan Ketentuan dan Pelunasan Pinjaman yang ditandatangani menggunakan tanda tangan elektronik merupakan tanda tangan yang sah dari pihak Penerima Pinjaman.</span>
              </span>
              <span className="secondNum">
                <span className="num">5.7</span>
                <span className="text">Penerima Pinjaman telah menerima salinan dari: 
                  <span className="lastNum">
                    <span className="num">a)</span>
                    <span className="text">Perjanjian ini;</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">b)</span>
                    <span className="text">Syarat dan Ketentuan;</span>
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>6.</b></span>
            <span className="text"><b>FORM PERMOHONAN PINJAMAN</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft">
              <span className="secondNum">
                <span className="num">6.1</span>
                <span className="text">Perjanjian ini dibuat dan ditandatangani sesuai dengan Formulir. </span>
              </span>
              <span className="secondNum">
                <span className="num">6.2</span>
                <span className="text">Penerima Pinjaman bertanggung jawab atas ketepatan dan kebenaran isi dari Formulir, yang merupakan satu kesatuan dan bagian yang tidak terpisahkan dari Perjanjian ini.</span>
              </span>
              <span className="secondNum">
                <span className="num">6.3</span>
                <span className="text">Terkait dengan penggunaan Formulir elektronik dalam pengajuan pinjaman serta penandatanganan perjanjian pinjaman secara digital, sesuai dengan Undang-undang Republik Indonesia No 11 Tahun 2008 mengenai Informasi dan Transaksi Elektronik, dijelaskan pada Bab III pasal 5 ayat 1 yang menyebutkan bahwa Informasi Elektronik dan/atau Dokumen Elektronik dan/atau hasil cetaknya merupakan Alat Bukti Hukum Yang Sah.</span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>7.</b></span>
            <span className="text"><b>PENGAKUAN UTANG</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft">
              <span className="secondNum">
                <span className="num">7.1</span>
                <span className="text">Terkait dengan Pasal 2 di atas, maka Penerima Pinjaman dengan ini (sekarang dan untuk dikemudian hari atau pada waktu yang berlaku), menerima pinjaman dari Pemberi Pinjaman dan oleh karena itu Penerima Pinjaman mengakui bahwa dirinya benar dan secara sah telah berutang kepada Pemberi Pinjaman untuk sejumlah uang sebagaimana tercantum dalam Tabel Perincian Pinjaman Pribadi ditambah dengan bunga dan biaya-biaya lainnya yang wajib dibayar oleh Penerima Pinjaman kepada Pemberi Pinjaman berdasarkan Perjanjian ini.</span>
              </span>
              <span className="secondNum">
                <span className="num">7.2</span>
                <span className="text">Dalam Perjanjian ini, pemberian pinjaman diberikan kepada Penerima Pinjaman setelah Penerima Pinjaman dinyatakan lolos verifikasi dan telah disetujui permohonan pinjamannya dan setelah Pemberi Pinjaman dan Penerima Pinjaman menandatangani Perjanjian ini.</span>
              </span>
              <span className="secondNum">
                <span className="num">7.3</span>
                <span className="text">Pemberi Pinjaman dengan ini mengakui dengan sebagaimana mestinya dan menerima pengakuan utang yang diberikan oleh Penerima Pinjaman sebagaimana diatur dalam Pasal 7.1 diatas.</span>
              </span>
              <span className="secondNum">
                <span className="num">7.4</span>
                <span className="text">Pembukuan dan catatan-catatan keuangan dari Pemberi Pinjaman dan atau pembukuan dan catatan-catatan yang dibuat Penyelenggara Layanan untuk Pemberi Pinjaman merupakan salah satu bukti dari semua jumlah utang Penerima Pinjaman terhadap Pemberi Pinjaman berdasarkan Perjanjian ini, dan pembukuan dan catatan-catatan keuangan tersebut mengikat Penerima Pinjaman.</span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>8.</b></span>
            <span className="text"><b>PELUNASAN LEBIH AWAL</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft">
              <span className="secondNum">
                <span className="num">8.1</span>
                <span className="text">Penerima Pinjaman dapat melunasi seluruh jumlah Pinjaman yang terutang sebelum berakhirnya jangka waktu pinjaman apabila Penerima Pinjaman bermaksud untuk melunasi, dengan jumlah pembayaran yang harus dilakukan sama seperti jumlah kewajiban pembayaran saat kewajiban jatuh tempo.</span>
              </span>
              <span className="secondNum">
                <span className="num">8.2</span>
                <span className="text">Posisi total jumlah terutang harian sejak pencairan sampai dengan hari jatuh tempo diinformasikan dalam Jadwal Pembayaran Pinjaman dalam halaman akun pribadi peminjam yang akan diberikan kepada setiap Penerima Pinjaman.</span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>9.</b></span>
            <span className="text"><b>BUNGA, DENDA, DAN BIAYA</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft">
              <span className="secondNum">
                <span className="num">9.1</span>
                <span className="text">Penerima Pinjaman dikenakan Biaya di Muka, dipotongkan pada saat menerima Pokok Pinjaman, yang besarnya sebagaimana tercantum dalam Pasal 2 huruf b dan Pasal 2 huruf c dan/atau dalam Formulir Elektronik yang disampaikan dan disetujui melalui Aplikasi dan menjadi satu kesatuan dengan Perjanjian ini.</span>
              </span>
              <span className="secondNum">
                <span className="num">9.2</span>
                <span className="text">Pemberi Pinjaman membebankan/mengenakan bunga atas utang dalam bentuk Pinjaman Penerima Pinjaman yang besarnya sebagaimana tercantum dalam Tabel Perincian Pinjaman Pribadi. Bunga atas utang yang dipotongkan berdasarkan Pasal 9.1 tersebut di atas oleh Penyelenggara merupakan bunga tetap atas pinjaman.</span>
              </span>
              <span className="secondNum">
                <span className="num">9.3</span>
                <span className="text">Untuk setiap keterlambatan pembayaran pinjaman yang terutang dan telah jatuh tempo, Penerima Pinjaman dikenakan denda sebagai berikut:
                  <span className="lastNum">
                    <span className="num">1)</span>
                    <span className="text">Dari Tanggal Keterlambatan sampai dengan hari ketiga keterlambatan akan dikenakan denda keterlambatan, dimana denda adalah sebesar {this.props.contractData.fixedRate||'x'}% dari pokok pinjaman. 
                      <span style={{'display':'block'}}>Mulai dari hari keempat sejak tanggal keterlambatan, akan dikenakan denda keterlambatan sebesar {this.props.contractData.defaultRate||'x'}% dari jumlah pokok pinjaman dibebankan setiap hari sampai dengan pelunasan penuh pinjaman;</span>
                    </span>
                  </span>
                  <span className="lastNum">
                    <span className="num">2)</span>
                    <span className="text">Sejak Tanggal Keterlambatan, akan dikenakan bunga {(this.props.contractData.overdueRate == '0' || this.props.contractData.overdueRate)?this.props.contractData.overdueRate:'x'}%  dari jumlah pokok pinjaman setiap harinya sampai dengan pelunasan penuh pinjaman;
                    </span>
                  </span>
                  <span className="lastNum">
                    <span className="num">3)</span>
                    <span className="text">Denda keterlambatan yang harus dibayar Penerima Pinjaman paling banyak sebesar 100% dari jumlah Pokok Pinjaman.
                    </span>
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>10.</b></span>
            <span className="text"><b>CIDERA JANJI</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft">
              <span className="secondNum">
                <span className="num">10.1</span>
                <span className="text">Penerima Pinjaman dianggap telah melakukan Cidera Janji, yang cukup dibuktikan hanya dengan lewatnya waktu, di mana peristiwa tersebut tidak perlu dibuktikan lagi namun cukup dengan terjadinya salah satu peristiwa-peristiwa sebagai berikut:
                  <span className="lastNum">
                    <span className="num">a.</span>
                    <span className="text">Penerima Pinjaman telah gagal untuk memenuhi salah satu atau lebih kewajibannya sebagaimana ditentukan dalam Perjanjian ini; atau
                    </span>
                  </span>
                  <span className="lastNum">
                    <span className="num">b.</span>
                    <span className="text">Penerima Pinjaman telah, atau tidak, atau gagal melakukan pembayaran pinjaman pada saat pembayaran pinjaman terkait jatuh tempo; atau
                    </span>
                  </span>
                  <span className="lastNum">
                    <span className="num">c.</span>
                    <span className="text">Penerima Pinjaman telah dinyatakan pailit berdasarkan putusan pengadilan yang berwenang; atau
                    </span>
                  </span>
                  <span className="lastNum">
                    <span className="num">d.</span>
                    <span className="text">Setiap data, informasi, dokumen, identitas pribadi, pernyataan atau keterangan yang diberikan Penerima Pinjaman ternyata tidak menggambarkan kondisi yang sesungguhnya/sebenarnya.
                    </span>
                  </span>
                </span>
              </span>
              <span className="secondNum">
                <span className="num">10.2</span>
                <span className="text">Dalam hal Penerima Pinjaman melakukan Cidera Janji, maka Pemberi Pinjaman berhak menuntut pelunasan kepada Penerima Pinjaman, sebagaimana disetujui oleh Penerima Pinjaman untuk melakukan pelunasan atas seluruh kewajiban Penerima Pinjaman, secara seketika dan sekaligus lunas, termasuk, tetapi tidak terbatas pada, jumlah utang pokok ditambah bunga, pinjaman dan denda keterlambatan pembayaran dan seluruh biaya-biaya lainnya.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">10.3</span>
                <span className="text">Penerima Pinjaman setuju dengan tidak mengesampingkan Pasal 1131 dan 1132 KUH Perdata terkait pemberlakuannya, maka persyaratan, peraturan atau ketentuan yang lainnya tetap berlaku dan mengikat para pihak.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">10.4</span>
                <span className="text">Penerima Pinjaman setuju apabila terjadi Cidera Janji, Data Pribadi Penerima Pinjaman dapat disampaikan kepada Otoritas Jasa Keuangan maupun institusi atau Lembaga pemerintah yang berwenang untuk melakukan pengumpulan Data Pribadi kreditur bermasalah dan Penerima Pinjaman dengan ini memahami dan menerima segala akibat hukum yang dapat dikenakan kepadanya karena Cidera Janji yang dilakukan Penerima Pinjaman. 
                </span>
              </span>
              <span className="secondNum">
                <span className="num">10.5</span>
                <span className="text">Pemberi Pinjaman, melalui Penyelenggara Layanan atau berdasarkan kebijakan Penyelenggara Layanan, berhak memberikan hak substitusi kepada pihak ketiga, dalam hal ini jasa penagihan, apabila Penerima Pinjaman telah melewati batas waktu keterlambatan lebih dari 30 (tiga puluh) hari.
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>11.</b></span>
            <span className="text"><b>LAIN-LAIN</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft">
              <span className="secondNum">
                <span className="num">11.1</span>
                <span className="text">Syarat dan Ketentuan ini dapat diubah oleh Pemberi Pinjaman hanya setelah kesepakatan bersama secara tertulis dengan Penerima Pinjaman.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">11.2</span>
                <span className="text">Pemberi Pinjaman dapat mengusulkan perubahan-perubahan atas Syarat dan Ketentuan ini utamanya sehubungan dengan perubahan-perubahan persyaratan hukum, untuk dapat menyediakan layanan yang lebih baik kepada Penerima Pinjaman dan sehubungan dengan tujuan-tujuan bisnis Pemberi Pinjaman.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">11.3</span>
                <span className="text">Pemberi Pinjaman harus menginformasikan kepada Penerima Pinjaman mengenai usulan perubahan atas Syarat dan Ketentuan ini dalam bentuk tertulis (dan melalui setiap cara yang patut), paling tidak 7 (tujuh) hari kerja di awal sebelum tanggal efektif perubahan-perubahan yang diusulkan tersebut.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">11.4</span>
                <span className="text">Penerima Pinjaman wajib untuk membaca dan memahami perubahan yang diusulkan atas Syarat dan Ketentuan yang tertera pada Aplikasi atau pada laman situs www.kreditplusteknologi.id
                </span>
              </span>
              <span className="secondNum">
                <span className="num">11.5</span>
                <span className="text">Penerima Pinjaman akan menyatakan persetujuannya atas setiap dan seluruh perubahan atas Syarat dan Ketentuan ini dengan melaksanakan setiap transaksi (utamanya dengan pembayaran jumlah angsuran, dengan setiap penggunaan Fasilitas pembiayaan, dan sebagainya) setiap saat setelah tanggal efektif perubahan atas Syarat dan Ketentuan tersebut. 
                </span>
              </span>
              <span className="secondNum">
                <span className="num">11.6</span>
                <span className="text">Dalam hal Penerima Pinjaman tidak setuju dengan perubahan atas Syarat dan Ketentuan tersebut, Penerima Pinjaman dapat dengan segera mengakhiri Perjanjian ini, namun hal ini harus dilaksanakan oleh Penerima Pinjaman hanya sebelum tanggal efektif perubahan Syarat dan Ketentuan tersebut. Tidak setujunya Penerima Pinjaman terhadap Syarat dan Ketentuan yang baru tidak meniadakan atau menghilangkan kewajiban pembayaran atas Pinjaman. Dalam hal Penerima Pinjaman tidak setuju dengan perubahan atas Syarat dan Ketentuan dan hendak mengakhiri Perjanjian ini, Penerima Pinjaman wajib menyelesaikan seluruh kewajiban pembayaran yang terutang melalui Penyedia Layanan.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">11.7</span>
                <span className="text">Penerima Pinjaman wajib memberitahukan secara tertulis kepada Pemberi Pinjaman, melalui Penyelenggara Layanan, atas setiap terjadi perubahan data Penerima Pinjaman termasuk, tetapi tidak terbatas pada, setiap perubahan alamat tempat tinggal Penerima Pinjaman.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">11.8</span>
                <span className="text">Penerima Pinjaman dengan ini setuju bahwa, semata-mata berdasarkan kebijakan Pemberi Pinjaman sendiri, dan tanpa pemberitahuan sebelumnya atau tanpa perlu diketahui oleh Penerima Pinjaman, Pemberi Pinjaman berhak dan berwenang untuk mengalihkan baik seluruh maupun sebagian hak dan kewajibannya yang timbul berdasarkan Perjanjian ini kepada pihak ketiga mana pun.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">11.9</span>
                <span className="text">Pemberi Pinjaman dapat, dalam hal terdapat pengalihan seperti pada Pasal 11.6, melanjutkan pelaksanaan administrasi hak dan kewajiban tersebut melalui Penyelenggara Layanan. Penerima Pinjaman dengan ini setuju bahwa, dalam hal tersebut, Pemberi Pinjaman dapat menggunakan informasi mengenai hak dan kewajiban yang dialihkan tersebut untuk pemenuhan kewajiban-kewajiban Pemberi Pinjaman lainnya yang timbul dari Perjanjian ini. 
                </span>
              </span>
              <span className="secondNum">
                <span className="num" style={{'margin-left':'-2%','width':'10%'}}>11.10</span>
                <span className="text">Dengan menandatangani dan menyetujui formulir aplikasi ini, Penerima Pinjaman sebagai pemohon menyatakan bahwa data telekomunikasi yang Penerima Pinjaman berikan dalam formulir aplikasi pemanfaatan produk Pemberi Pinjaman adalah yang sebenar-benarnya; dalam hal ini Pemberi Pinjaman dapat melakukan kegiatan verifikasi data telekomunikasi Penerima Pinjaman yang dibagikan di dalam formulir aplikasi Penerima Pinjaman.
                </span>
              </span>
              <span className="secondNum">
                <span className="num" style={{'margin-left':'-2%','width':'10%'}}>11.11</span>
                <span className="text">Penerima Pinjaman memberikan persetujuan kepada Pemberi Pinjaman untuk mendapatkan informasi data telekomunikasi Penerima Pinjaman dari sumber lainnya dimana informasi terkait tidak dapat ditarik kembali.
                </span>
              </span>
              <span className="secondNum">
                <span className="num" style={{'margin-left':'-2%','width':'10%'}}>11.12</span>
                <span className="text">Penerima Pinjaman telah memahami syarat dan ketentuan dari permohonan aplikasi ini serta tujuan dan konsekuensi dari pengolahan data telekomunikasi kepada pihak lain di luar badan hukum Pemberi Pinjaman (Dengan ini Penerima Pinjaman telah menyetujui untuk terikat dengan setiap masing-masing Syarat dan Ketentuan yang terkandung dalam perjanjian ini dan dengan tegas diartikan bahwa Penerima Pinjaman telah membaca secara seksama Perjanjian ini).
                </span>
              </span>
              <span className="secondNum">
                <span className="num" style={{'margin-left':'-2%','width':'10%'}}>11.13</span>
                <span className="text">Mengenai Perjanjian, Penerima Pinjaman dan Pemberi Pinjaman dengan ini melepaskan haknya berdasarkan Pasal 1266 KUHPerdata sepanjang yang mengatur tentang tata cara mengakhiri sesuatu perjanjian.
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>12.</b></span>
            <span className="text"><b>PENAFSIRAN DAN PENYELESAIAN SENGKETA</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft">
              <span className="secondNum">
                <span className="num">12.1</span>
                <span className="text">Segala sengketa yang timbul terkait dengan penafsiran dan pelaksanaan Perjanjian ini, akan diselesaikan antara Penerima Pinjaman dan Pemberi Pinjaman secara musyawarah untuk mufakat.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">12.2</span>
                <span className="text">Dalam hal tidak dapat diselesaikan secara musyarah untuk mufakat, maka setiap dan seluruh perselisihan yang timbul dari atau sehubungan dengan pelaksanaan Perjanjian ini, Para Pihak sepakat untuk menyelesaikan perselisihan melalui Badan Arbitrase Nasional Indonesia.
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="bottomEare">
          <div className="left">
            <div className="key"><b>Pemberi Pinjaman</b></div>
            <div><b>[{this.props.contractData.lenderName||'•'}]</b></div>
          </div>
          <div className="right">
            <div className="key"><b>Penerima Pinjaman</b></div>
            <div><b>[{this.props.contractData.borrowerName||'•'}]</b></div>
          </div>
        </div>


      </div>
    );
  }
}

LoanAgreement.defaultProps = {
};

export default LoanAgreement;
