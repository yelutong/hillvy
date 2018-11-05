import React from 'react';
import axios from 'axios';
import restStore from './store';

class LoanAgreement extends React.Component {
  state = {
    contractData:{},
    contractNo:''
  };

  componentWillMount() {
    console.log(this.props);
    var contractNo = this.props.location.query.contractNo;
    var token = this.props.location.query.token;
    if(contractNo && token){
      localStorage.setItem('token',token);
      if(App){
        App.showLoading(true);
      }
      axios.get(restStore.contractData,{params:{
        contractNo:contractNo
      }}).then((res) => {
          if(App){
            App.showLoading(false);
          }
          if(res.data.code == '0000'){
            console.log(res.data.body.principal)
            this.setState({
              contractData:res.data.body,
              contractNo:contractNo
            },() => {
              console.log(this.state.contractData)
            })
          }
      });
    }
  }

  render() {
    return (
      <div className="padding20 privacyService">
        <div className="topest">
          <b>Pribadi dan Rahasia</b>
        </div>
        <div className="topest">
          <b>Hak cipta perjanjian ini dimiliki oleh PT Kredit Plus Teknologi</b>
        </div>
        <div className="firstTitle">PERJANJIAN PEMBERIAN PINJAMAN</div>
        <div className="secondTitle">
          Nomor Perjanjian:<b> [{this.state.contractNo||''}]</b>
        </div>
        <div className="secondTitle">
          <b>ANTARA</b>
        </div>
        <div className="secondTitle">
          <b>[Pemberi Pinjaman]</b>
        </div>
        <div className="secondTitle">
          <b>Sebagai Kreditur</b>
        </div>
        <div className="secondTitle">
          <b>dan</b>
        </div>
        <div className="secondTitle">
          <b>[Penerima Pinjaman]</b>
        </div>
        <div className="secondTitle">
          <b>Sebagai Debitur</b>
        </div>

        <div className="serviceDetail">
          <p>Pada hari <b>[•]</b>, tanggal <b>[•]</b> tahun <b>[•] telah ditandatangani</b> Perjanjian Pemberian Pinjaman Pribadi <b>(“Perjanjian”)</b> dibuat oleh:</p>
        </div>
        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num">1)</span>
            <span className="text"><b>[{this.state.contractData.lenderName?('Pemberi Pinjaman: '+this.state.contractData.lenderName):'Pemberi Pinjaman'}]</b>, [{this.state.contractData.lenderIdNum?('Nomor KTP: '+this.state.contractData.lenderIdNum):'Nomor KTP'}], [{this.state.contractData.lenderBirth?('Tanggal lahir: '+this.state.contractData.lenderBirth):'Tanggal lahir'}], [{this.state.contractData.lenderPhone?('Nomor Telepon HP: '+this.state.contractData.lenderPhone):'Nomor Telepon HP'}], [Alamat], selanjutnya disebut <b>Kreditur</b>.</span>
          </div>
          <div className="lessNum">
            <span className="num">2)</span>
            <span className="text"><b>[{this.state.contractData.borrowerName?('Penerima Pinjaman: '+this.state.contractData.borrowerName):'Penerima Pinjaman'}]</b>, [{this.state.contractData.borrowerIdNum?('Nomor KTP: '+this.state.contractData.borrowerIdNum):'Nomor KTP'}], [{this.state.contractData.borrowerBirth?('Tanggal lahir: '+this.state.contractData.borrowerBirth):'Tanggal lahir'}], [{this.state.contractData.borrowerPhone?('Nomor Telepon HP: '+this.state.contractData.borrowerPhone):'Nomor Telepon HP'}], [Alamat], selanjutnya disebut <b>Debitur</b>.</span>
          </div>
        </div>
        <div className="serviceDetail">
          <p><b>[{this.state.contractData.lenderName?('Pemberi Pinjaman: '+this.state.contractData.lenderName):'Pemberi Pinjaman'}] dengan [{this.state.contractData.borrowerName?('Penerima Pinjaman: '+this.state.contractData.borrowerName):'Penerima Pinjaman'}]</b> sepakat untuk membuat Perjanjian Pemberian Pinjaman Pribadi (selanjutnya disebut “<b>Perjanjian</b>”) dengan ketentuan dan syarat-syarat sebagai berikut:</p>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>1.</b></span>
            <span className="text"><b>DEFINISI</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft">
              <span className="secondNum">
                <span className="num">a.</span>
                <span className="text">Perjanjian Pemberian Pinjaman Pribadi adalah Perjanjian ini bersama dengan semua Lampiran, addendum dan setiap perubahan atasnya, dibuat dan ditandatangani oleh dan antara Kreditur dan Debitur melalui perantara digital, sebagaimana didefinisikan pada Tabel Perincian Pinjaman Pribadi di atas.</span>
              </span>
              <span className="secondNum">
                <span className="num">b.</span>
                <span className="text">Fasilitas Pemberian Pinjaman Pribadi atau Fasilitas adalah penyediaan jasa keuangan yang ditawarkan dan diberikan oleh Kreditur</span>
              </span>
              <span className="secondNum">
                <span className="num">c.</span>
                <span className="text">Pinjaman adalah Fasilitas Pemberian Pinjaman Pribadi dalam bentuk tunai untuk keperluan dana pendidikan, dana darurat, penyembuhan, pembelian komoditas/barang tertentu.</span>
              </span>
              <span className="secondNum">
                <span className="num">d.</span>
                <span className="text">Data Pribadi adalah data dan informasi yang benar dan lengkap tentang Debitur terkait setiap aspek dari informasi pribadi, kegiatan usaha/pekerjaan, kredit dan posisi keuangan Debitur termasuk, tetapi tidak terbatas pada foto dari Debitur.</span>
              </span>
              <span className="secondNum">
                <span className="num">e.</span>
                <span className="text">Formulir Aplikasi atau Formulir adalah formulir permohonan Pinjaman yang diajukan oleh Debitur sebagaimana ditentukan dalam Tabel Perincian Pinjaman Pribadi yang akan berfungsi sebagai formulir permohonan Fasilitas pinjaman pribadi.</span>
              </span>
              <span className="secondNum">
                <span className="num">f.</span>
                <span className="text">Tanggal Keterlambatan adalah hari berikutnya dari tanggal jatuh tempo yang selanjutnya</span>
              </span>
              <span className="secondNum">
                <span className="num">g.</span>
                <span className="text">Portal adalah situs www.kreditplusteknologi.id atau pada aplikasi “Pinjam Gampang”</span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>2.</b></span>
            <span className="text"><b>PINJAMAN</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft threeEara">
              <span className="secondNum">
                <span className="num">a.</span>
                <span className="text">Jumlah Pinjaman: </span>
                <span className="argument">Rp[{this.state.contractData.principal?this.state.contractData.principal:'•'}]</span>
              </span>
              <span className="secondNum">
                <span className="num">b.</span>
                <span className="text">Biaya Jasa:</span>
                <span className="argument">Rp[{this.state.contractData.serviceAmt?this.state.contractData.serviceAmt:'•'}]</span>
              </span>
              <span className="secondNum">
                <span className="num">c.</span>
                <span className="text">Jumlah pinjaman yang akan diterima:</span>
                <span className="argument">Rp[{this.state.contractData.loanAmount?this.state.contractData.loanAmount:'•'}]</span>
              </span>
              <span className="secondNum">
                <span className="num">d.</span>
                <span className="text">Tanggal Efektif Pinjaman:</span>
                <span className="argument">[{this.state.contractData.loanDate?this.state.contractData.loanDate:'•'}]</span>
              </span>
              <span className="secondNum">
                <span className="num">e.</span>
                <span className="text">Jangka Waktu Pinjaman:</span>
                <span className="argument">[{this.state.contractData.term?(this.state.contractData.term+'hari'):'•'}]</span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>3.</b></span>
            <span className="text"><b>KEWAJIBAN PEMBAYARAN PINJAMAN</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft threeEara">
              <span className="secondNum">
                <span className="num">a.</span>
                <span className="text">Mulai Tanggal Pembayaran Pinjaman:</span>
                <span className="argument">[{this.state.contractData.returnDate?this.state.contractData.returnDate:'•'}]</span>
              </span>
              <span className="secondNum">
                <span className="num">b.</span>
                <span className="text">Suku Bunga Pinjaman:</span>
                <span className="argument">[{this.state.contractData.interest?this.state.contractData.interest:'•'}]</span>
              </span>
              <span className="secondNum">
                <span className="num">c.</span>
                <span className="text">Nilai angsuran setiap bulan:</span>
                <span className="argument">[{this.state.contractData.interest?this.state.contractData.interest:'•'}]</span>
              </span>
              <span className="secondNum">
                <span className="num">d.</span>
                <span className="text">Pembayaran Pinjaman di Transfer ke Rekening:</span>
                <span className="argument">[{this.state.contractData.returnAmt?this.state.contractData.returnAmt:'•'}]</span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>4.</b></span>
            <span className="text"><b>SYARAT-SYARAT UMUM</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft">
              <span className="secondNum">
                <span className="num">4.1</span>
                <span className="text">Debitur merupakan WNI berdomisili di Indonesia. Usia minimum 21 (dua puluh satu) tahun sesuai dengan batasan usia cakap hukum menurut KUH Perdata.</span>
              </span>
              <span className="secondNum">
                <span className="num">4.2</span>
                <span className="text">Kreditur berdasarkan pertimbangan tertentu dapat memberikan persetujuan kepada Debitur yang berusia kurang dari 21 (dua puluh satu) tahun untuk mengajukan pinjaman kepada Kreditur.</span>
              </span>
              <span className="secondNum">
                <span className="num">4.3</span>
                <span className="text">Debitur telah mengajukan permohonan kepada Kreditur untuk memberikan Fasilitas kepada Debitur dan Kreditur dengan ini menyetujui permohonan untuk menyediakan Fasilitas pinjaman sesuai dengan Syarat dan Ketentuan Perjanjian ini dan, dengan demikian, Debitur dengan ini menyetujui untuk melakukan pelunasan setiap dan seluruh jumlah hutang atas pinjaman yang diberikan oleh Kreditur.</span>
              </span>
              <span className="secondNum">
                <span className="num">4.4</span>
                <span className="text">Kreditur dan Debitur dengan ini menyetujui Syarat dan Ketentuan sebagaimana diatur di dalam Tabel Perincian Pinjaman Pribadi, setiap penambahan dan perubahan atas Perjanjian dan/atau perjanjian lainnya yang merupakan satu kesatuan dan bagian yang tidak terpisahkan dari Perjanjian termasuk, tetapi tidak terbatas pada, jumlah hutang pokok, jangka waktu pembiayaan, pembayaran pinjaman dan denda untuk keterlambatan pembayaran pinjaman.</span>
              </span>
              <span className="secondNum">
                <span className="num">4.5</span>
                <span className="text">Istilah yang didefinisikan dalam Syarat dan Ketentuan ini menggunakan definisi sebagaimana dinyatakan dalam Tabel Perincian Pinjaman Pribadi dan Jadwal Angsuran, kecuali apabila didefinisikan dengan cara lain dalam Syarat dan Ketentuan ini.</span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>5.</b></span>
            <span className="text"><b>PERNYATAAN</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft">
              <div>Debitur dengan ini menyatakan sebagai berikut:</div>
              <span className="secondNum">
                <span className="num">5.1</span>
                <span className="text">Debitur setuju dan mengerti bahwa kreditur telah menunjuk PT Kredit Plus Teknologi sebagai sebuah perusahaan web Portal yang akan menghubungkan Debitur dengan Kreditur, termasuk namun tidak terbatas untuk melakukan promosi Fasilitas, proses pendaftaran, proses penagihan atas Pinjaman yang diberikan Kreditur kepada Debitur. Seluruh pembayaran atau biaya yang dibayarkan melalui PT Kredit Plus Teknologi adalah untuk kepentingan dan keuntungan Kreditur.</span>
              </span>
              <span className="secondNum">
                <span className="num">5.2</span>
                <span className="text">Debitur mengajukan permohonan penyediaan jasa keuangan dalam bentuk Pinjaman yang ditawarkan dan diberikan oleh Kreditur (sebagaimana dijelaskan juga dalam Tabel Perincian Pinjaman Pribadi di atas) </span>
              </span>
              <span className="secondNum">
                <span className="num">5.3</span>
                <span className="text">Debitur memahami bahwa persetujuan atas Pinjaman tersebut adalah semata-mata berdasarkan penilaian mutlak dari Kreditur dan berdasarkan penandatanganan Debitur atas dokumen-dokumen hukum yang diperlukan dan formalitas lain yang disyaratkan oleh Kreditur.
                  <span className="lastNum">
                    <span className="num">a.</span>
                    <span className="text">Debitur memahami dan menyetujui bahwa Debitur diwajibkan untuk memberikan Data Pribadi sehingga memungkinkan Kreditur untuk menilai apakah Debitur memenuhi syarat untuk mendapatkan Pinjaman dan jasa keuangan lainnya yang akan ditawarkan dan diberikan oleh Kreditur.</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">b.</span>
                    <span className="text">Debitur juga menyetujui bahwa Debitur akan bertanggung jawab secara hukum untuk setiap pemalsuan dari, dan penggunaan secara tidak sah atas, Data Pribadi yang diberikan kepada Kreditur.</span>
                  </span>
                </span>
              </span>
              <span className="secondNum">
                <span className="num">5.4</span>
                <span className="text">Debitur memahami dan menyetujui bahwa Data Pribadi yang diberikan disini kepada Kreditur, akan digunakan, oleh Kreditur, untuk memproses permohonan Fasilitas dan/atau memenuhi peraturan perundang-undangan yang berlaku. Debitur dengan ini memberikan kuasa dan wewenang penuh kepada Kreditur dan perwakilannya yang sah untuk, pada setiap saat, tanpa pemberitahuan kepada Debitur,melaksanakan seluruh atau setiap tindakan dan fungsi-fungsi:
                  <span className="lastNum">
                    <span className="num">(i)</span>
                    <span className="text">pengumpulan, penyimpanan, penggunaan, pemeliharaan, penganalisaan, perumusan, penyiaran dan penyebaran atas Data Pribadi; </span>
                  </span>
                  <span className="lastNum">
                    <span className="num">(ii)</span>
                    <span className="text">melakukan pemeriksaan kredit, referensi dan membuat pertanyaan-pertanyaan dan verifikasi berdasarkan data dan informasi yang diberikan kepada, atau dikumpulkan oleh,Kreditur apabila dan pada saat Kreditur mempertimbangkan perlunya hal tersebut semata-mata berdasarkan penilaian mutlaknya; dan</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">(iii)</span>
                    <span className="text">membagi, mendapatkan dan/atau mengungkapkan Data Pribadi kepada/dari setiap biro informasi kredit, lembaga keuangan, setiap otoritas pemerintah lain yang berwenang atau setiap pihak ketiga yang terikat perjanjian dengan Kreditur untuk keperluan verifikasi dan penilaian yang sesuai atas informasi dan Data Pribadi.</span>
                  </span>
                </span>
              </span>
              <span className="secondNum">
                <span className="num">5.5</span>
                <span className="text">Debitur juga setuju bahwa Kreditur dapat menyediakan Data Pribadi kepada badan hukum dan orang-orang lainnya yang bekerjasama dengan Kreditur pada saat:
                  <span className="lastNum">
                    <span className="num">a)</span>
                    <span className="text">melaksanakan Perjanjian ini;</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">b)</span>
                    <span className="text">memberlakukan pelaksanaan Perjanjian ini;</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">c)</span>
                    <span className="text">melaksanakan tujuan kegiatan usaha Kreditur; dan</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">d)</span>
                    <span className="text">melaksanakan kewajiban-kewajiban yang ditetapkan oleh peraturan perundang-undangan yang berlaku.Berdasarkan ini, Kreditur berhak untuk menyediakan Data Pribadi khususnya, tetapi tidak terbatas, kepada penasihat-penasihat hukum, keuangan dan perpajakan, perusahaan yang melaksanakan layanan pengemasan dan pos, bank dan badan hukum atau orang-orang lainnya yang memastikan, mengatur atau menyediakan sumber pembiayaan, badan-badan pengawas, pengadilan, juru sita dan sebagainya.</span>
                  </span>
                </span>
              </span>
              <span className="secondNum">
                <span className="num">5.6</span>
                <span className="text">Debitur juga setuju bahwa Data Pribadi dapat dikumpulkan dan diproses dalam sistem informasi Kreditur untuk keperluan: 
                  <span className="lastNum">
                    <span className="num">a)</span>
                    <span className="text">pemrosesan dan pengiriman penawaran produk dan layanan Kreditur;</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">b)</span>
                    <span className="text">pengikutsertaan Debitur pada program kesetiaan pelanggan;</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">c)</span>
                    <span className="text">pemilihan pelanggan untuk membuat penawaran produk dan layanan dan untuk penilaiannya;</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">d)</span>
                    <span className="text">riset pemasaran oleh Kreditur; dan</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">e)</span>
                    <span className="text">pengiriman penawaran produk dan layanan. Kreditur tidak bertanggung jawab pada isi dari penawaranpenawaran tersebut.</span>
                  </span>
                </span>
              </span>
              <span className="secondNum">
                <span className="num">5.7</span>
                <span className="text">Debitur juga menyetujui, dan dengan ini memberikan kuasa dan wewenang penuh kepada Kreditur, karyawan, agen dan perusahaan terkaitnya, bahwa mereka dapat berbagi dan menggunakan Data Pribadi Debitur untuk berbagai macam skema tawaran pinjaman lainnya atau skema promosi lainnya, yang dapat ditawarkan dan disediakan oleh Kreditur.</span>
              </span>
              <span className="secondNum">
                <span className="num">5.8</span>
                <span className="text">Debitur juga setuju dan dengan ini memberi kuasa dan wewenang penuh kepada Kreditur untuk membuat dan menyimpan salinan/fotokopi dokumen identitas Debitur dan dokumen lainnya yang diserahkan oleh Debitur kepada Kreditur. Debitur juga setuju bahwa Kreditur dapat menggunakan salinan/fotokopi dokumen identitas Debitur tersebut untuk keperluan perlindungan hak dan kepentingan Debitur dan/atau Kreditur.</span>
              </span>
              <span className="secondNum">
                <span className="num">5.9</span>
                <span className="text">Debitur dengan ini menyatakan bahwa dia telah mengetahui Syarat dan Ketentuan serta Pelunasan Pinjaman tersebut, memahaminya, termasuk kuasa yang diberikan berdasarkan Syarat dan Ketentuan tersebut dan berjanji untuk terikat pada Syarat dan Ketentuan serta Jadwal Angsuran tersebut.</span>
              </span>
              <span className="secondNum">
                <span className="num">5.10</span>
                <span className="text">Tandatangan Debitur yang digunakan dalam Perjanjian ini menggunakan tanda tangan elektronik yang sama dengan tandatangan yang digunakan dalam dokumen-dokumen hukum lain miliknya termasuk, tetapi tidak terbatas pada, Kartu Tanda Penduduk (KTP) atau paspor dan, oleh karenanya, penggunaan tandatangan tersebut adalah sah.</span>
              </span>
              <span className="secondNum">
                <span className="num">5.11</span>
                <span className="text">Debitur mengakui dan menyetujui bahwa Perjanjian beserta Syarat dan Ketentuan dan Pelunasan Pinjaman yang ditandatangani menggunakan tanda tangan elektronik merupakan tanda tangan yang sah dari pihak Debitur.</span>
              </span>
              <span className="secondNum">
                <span className="num">5.12</span>
                <span className="text">Debitur telah menerima salinan asli dari:
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
                <span className="text">Perjanjian ini dibuat dan ditandatangani sesuai dengan Formulir.</span>
              </span>
              <span className="secondNum">
                <span className="num">6.2</span>
                <span className="text">Debitur bertanggung jawab atas ketepatan dan kebenaran isi dari Formulir, yang merupakan satu kesatuan dan bagian yang tidak terpisahkan dari Perjanjian ini.</span>
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
            <span className="text"><b>PENGAKUAN HUTANG</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft">
              <span className="secondNum">
                <span className="num">7.1</span>
                <span className="text">Terkait dengan Pasal 2 di atas, maka Debitur dengan ini (sekarang dan untuk dikemudian hari atau pada waktu yang berlaku), menerima pinjaman dari Kreditur dan oleh karena itu Debitur mengakui bahwa dirinya benar dan secara sah telah berhutang kepada Kreditur untuk sejumlah uang sebagaimana tercantum dalam Tabel Perincian Pinjaman Pribadi ditambah dengan bunga dan biaya-biaya lainnya yang wajib dibayar oleh Debitur kepada Kreditur berdasarkan Perjanjian ini.</span>
              </span>
              <span className="secondNum">
                <span className="num">7.2</span>
                <span className="text">Dalam Perjanjian ini, pemberian pinjaman diberikan kepada Debitur setelah Debitur dinyatakan lolos verifikasi dan telah disetujui permohonan pinjamannya dan setelah Kreditur dan Debitur menandatangani Perjanjian ini. </span>
              </span>
              <span className="secondNum">
                <span className="num">7.3</span>
                <span className="text">Kreditur dengan ini mengakui dengan sebagaimana mestinya dan menerima pengakuan hutang yang diberikan oleh Debitur sebagaimana diatur dalam Pasal 7.1 diatas.</span>
              </span>
              <span className="secondNum">
                <span className="num">7.4</span>
                <span className="text">Pembukuan dan catatan-catatan keuangan dari Kreditur merupakan satu-satunya bukti yang lengkap dari semua jumlah hutang Debitur terhadap Kreditur berdasarkan Perjanjian ini, dan pembukuan dan catatan-catatan keuangan tersebut mengikat Debitur.</span>
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
                <span className="text">Debitur berhak untuk melunasi seluruh jumlah yang terhutang sebelum berakhirnya jangka waktu pinjaman apabila Debitur bermaksud untuk melunasi, seluruh hutangnya sebelum berakhirnya jangka waktu pembiayaan.</span>
              </span>
              <span className="secondNum">
                <span className="num">8.2</span>
                <span className="text">Debitur harus melunasi seluruh jumlah pinjaman dan total bunga yang diberikan sejak hari pencairan sampai dengan hari pelunasan dipercepat dengan perhitungan bunga harian.</span>
              </span>
              <span className="secondNum">
                <span className="num">8.3</span>
                <span className="text">Posisi total jumlah terhutang harian sejak pencairan sampai dengan hari jatuh tempo diinformasikan dalam Jadwal Pembayaran Pinjaman dalam halaman akun pribadi peminjam yang akan diberikan kepada setiap Debitur.</span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>9.</b></span>
            <span className="text"><b>BUNGA, DENDA DAN BIAYA</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft">
              <span className="secondNum">
                <span className="num">9.1</span>
                <span className="text">Kreditur membebankan/mengenakan bunga atas hutang dalam bentuk Fasilitas pinjaman Debitur yang besarnya sebagaimana tercantum dalam Tabel Perincian Pinjaman Pribadi, yang wajib dibayar oleh Debitur kepada Kreditur dengan pembayaran secara penuh atau sebagaimana ditentukan menurut Perjanjian ini.</span>
              </span>
              <span className="secondNum">
                <span className="num">9.2</span>
                <span className="text">Untuk setiap keterlambatan pembayaran pinjaman yang terhutang dan telah jatuh tempo, Debitur dikenakan denda sebagai berikut:
                  <span className="lastNum">
                    <span className="num">1)</span>
                    <span className="text"> Dari Tanggal Keterlambatan akan dikenakan biaya denda keterlambatan, dimana biaya denda adalah sebesar ({this.state.contractData.fixedRate?this.state.contractData.fixedRate:'xx'})% dari pokok pinjaman.
                      <span style={{'display':'block'}}>Mulai dari hari keempat sejak tanggal keterlambatan, denda adalah sebesar ({this.state.contractData.defaultRate?this.state.contractData.defaultRate:'xx'})% dari jumlah pokok pinjaman dibebankan setiap hari sampai dengan pelunasan penuh pinjaman;</span>
                    </span>
                  </span>
                  <span className="lastNum">
                    <span className="num">2)</span>
                    <span className="text">Sejak Tanggal Keterlambatan, akan dikenakan denda ({this.state.contractData.rate?this.state.contractData.rate:'xx'})% dari jumlah pokok pinjaman setiap harinya sampai dengan pelunasan penuh pinjaman; 
                    </span>
                  </span>
                  <span className="lastNum">
                    <span className="num">3)</span>
                    <span className="text">Sejak hari ke {this.state.contractData.overdueCountMaxDay?this.state.contractData.overdueCountMaxDay:'81'} dari Tanggal Keterlambatan, tidak ada lagi denda keterlambatan. 
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
                <span className="text">Debitur dianggap telah melakukan Cidera Janji, yang cukup dibuktikan hanya dengan lewatnya waktu, di mana peristiwa tersebut tidak perlu dibuktikan lagi namun cukup dengan terjadinya salah satu peristiwa-peristiwa sebagai berikut:
                  <span className="lastNum">
                    <span className="num">a.</span>
                    <span className="text">Debitur telah gagal untuk memenuhi salah satu atau lebih kewajibannya sebagaimana ditentukan dalam Perjanjian ini; atau
                    </span>
                  </span>
                  <span className="lastNum">
                    <span className="num">b.</span>
                    <span className="text">Debitur telah, atau tidak, atau gagal melakukan pembayaran pinjaman pada saat pembayaran pinjaman terkait jatuh tempo; atau
                    </span>
                  </span>
                  <span className="lastNum">
                    <span className="num">c.</span>
                    <span className="text">Debitur telah dinyatakan pailit berdasarkan putusan pengadilan yang berwenang; atau
                    </span>
                  </span>
                  <span className="lastNum">
                    <span className="num">d.</span>
                    <span className="text">Setiap data, informasi, dokumen, identitas pribadi, pernyataan atau keterangan yang diberikan Debitur ternyata tidak menggambarkan kondisi yang sesungguhnya/sebenarnya.
                    </span>
                  </span>
                </span>
              </span>
              <span className="secondNum">
                <span className="num">10.2</span>
                <span className="text">Dalam hal Debitur melakukan Cidera Janji, maka Kreditur berhak menuntut pelunasan kepada Debitur, sebagaimana disetujui oleh Debitur untuk melakukan pelunasan atas seluruh kewajiban Debitur, secara seketika dan sekaligus lunas, termasuk, tetapi tidak terbatas pada, jumlah hutang pokok ditambah bunga, pinjaman dan denda keterlambatan pembayaran dan seluruh biaya-biaya lainnya.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">10.3</span>
                <span className="text">Debitur setuju dengan tidak mengesampingkan Pasal 1131 dan 1132 KUH Perdata terkait pemberlakuannya, maka persyaratan, peraturan atau ketentuan yang lainnya tetap berlaku dan mengikat para pihak.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">10.4</span>
                <span className="text">Debitur setuju untuk diumumkan pada situs Pinjam Gampang dan sosial media Pinjam Gampang terkait informasi kredit beserta namanya apabila Debitur melakukan Cidera Janji yang cukup dibuktikan hanya dengan lewatnya waktu pembayaran.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">10.5</span>
                <span className="text">Kreditur berhak memberikan hak substitusi kepada pihak ketiga, dalam hal ini jasa penagihan, apabila Debitur telah melewati batas waktu keterlambatan lebih dari 30 (tiga puluh) hari.
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
                <span className="text">Syarat dan Ketentuan ini dapat diubah oleh Kreditur hanya setelah kesepakatan bersama secara tertulis dengan Debitur. 
                </span>
              </span>
              <span className="secondNum">
                <span className="num">11.2</span>
                <span className="text">Kreditur dapat mengusulkan perubahan-perubahan atas Syarat dan Ketentuan ini utamanya sehubungan dengan perubahan-perubahan persyaratan hukum, untuk dapat menyediakan layanan yang lebih baik kepada Debitur dan sehubungan dengan tujuan-tujuan bisnis Kreditur. 
                </span>
              </span>
              <span className="secondNum">
                <span className="num">11.3</span>
                <span className="text">Kreditur harus menginformasikan kepada Debitur mengenai usulan perubahan atas Syarat dan Ketentuan ini dalam bentuk tertulis (dan melalui setiap cara yang patut), paling tidak 7 (tujuh) hari kerja di awal sebelum tanggal efektif perubahan-perubahan yang diusulkan tersebut. 
                </span>
              </span>
              <span className="secondNum">
                <span className="num">11.4</span>
                <span className="text">Debitur wajib untuk membaca dan memahami perubahan yang diusulkan atas Syarat dan Ketentuan baik di kantor Kreditur atau pada laman situs http://kreditplusteknologi.id 
                </span>
              </span>
              <span className="secondNum">
                <span className="num">11.5</span>
                <span className="text">Debitur akan menyatakan persetujuannya atas setiap dan seluruh perubahan atas Syarat dan Ketentuan ini dengan melaksanakan setiap transaksi (utamanya dengan pembayaran jumlah angsuran, dengan setiap penggunaan Fasilitas pembiayaan, dan sebagainya) setiap saat setelah tanggal efektif perubahan atas Syarat dan Ketentuan tersebut. 
                </span>
              </span>
              <span className="secondNum">
                <span className="num">11.6</span>
                <span className="text">Dalam hal Debitur tidak setuju dengan perubahan atas Syarat dan Ketentuan tersebut, Debitur dapat dengan segera mengakhiri Perjanjian ini, namun hal ini harus dilaksanakan oleh Debitur hanya sebelum tanggal efektif perubahan Syarat dan Ketentuan tersebut.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">11.7</span>
                <span className="text">Debitur wajib memberitahukan secara tertulis kepada Kreditur setiap terjadi perubahan data Debitur termasuk, tetapi tidak terbatas pada, setiap perubahan alamat tempat tinggal Debitur.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">11.8</span>
                <span className="text">Debitur dengan ini setuju bahwa, semata-mata berdasarkan kebijakan Kreditur sendiri, dan tanpa pemberitahuan sebelumnya atau tanpa perlu diketahui oleh Debitur, Kreditur berhak dan berwenang untuk mengalihkan baik seluruh maupun sebagian hak dan kewajibannya yang timbul berdasarkan Perjanjian ini kepada pihak ketiga mana pun. 
                </span>
              </span>
              <span className="secondNum">
                <span className="num">11.9</span>
                <span className="text">Kreditur dapat, dalam hal terdapat pengalihan seperti pada Pasal 11.8, melanjutkan pelaksanaan administrasi hak dan kewajiban tersebut. Debitur dengan ini setuju bahwa, dalam hal tersebut, Kreditur dapat menggunakan informasi mengenai hak dan kewajiban yang dialihkan tersebut untuk pemenuhan kewajiban-kewajiban Kreditur lainnya yang timbul dari Perjanjian ini.
                </span>
              </span>
              <span className="secondNum">
                <span className="num" style={{'marginLeft':'-2%','width':'10%'}}>11.10</span>
                <span className="text">Dengan menandatangani dan menyetujui formulir aplikasi ini, Debitur sebagai pemohon menyatakan bahwa data telekomunikasi yang Debitur berikan dalam formulir aplikasi pemanfaatan produk Kreditur adalah yang sebenar-benarnya; dalam hal ini Kreditur dapat melakukan kegiatan verifikasi data telekomunikasi Debitur yang dibagikan di dalam formulir aplikasi Debitur.
                </span>
              </span>
              <span className="secondNum">
                <span className="num" style={{'marginLeft':'-2%','width':'10%'}}>11.11</span>
                <span className="text">Debitur memberikan persetujuan kepada Kreditur untuk mendapatkan informasi data telekomunikasi Debitur dari sumber lainnya dimana informasi terkait tidak dapat ditarik kembali.
                </span>
              </span>
              <span className="secondNum">
                <span className="num" style={{'marginLeft':'-2%','width':'10%'}}>11.12</span>
                <span className="text">Debitur telah memahami syarat dan ketentuan dari permohonan aplikasi ini serta tujuan dan konsekuensi dari pengolahan data telekomunikasi kepada pihak lain di luar badan hukum Kreditur (Dengan ini Debitur telah menyetujui untuk terikat dengan setiap masing-masing Syarat dan Ketentuan yang terkandung dalam perjanjian ini dan dengan tegas diartikan bahwa Debitur telah membaca secara seksama Perjanjian ini).
                </span>
              </span>
              <span className="secondNum">
                <span className="num" style={{'marginLeft':'-2%','width':'10%'}}>11.13</span>
                <span className="text">Mengenai Perjanjian, Debitur dan Kreditur dengan ini melepaskan haknya berdasarkan Pasal 1266 KUHPerdata sepanjang yang mengatur tentang tata cara menghentikan/mengakhiri sesuatu perjanjian.
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
                <span className="text">Segala sengketa yang timbul terkait dengan penafsiran dan pelaksanaan Perjanjian ini, akan diselesaikan antara Debitur dan Kreditur secara musyawarah untuk mufakat.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">12.2</span>
                <span className="text">Dalam hal  tidak dapat diselesaikan secara musyarah untuk mufakat, maka setiap dan seluruh perselisihan yang timbul dari atau sehubungan dengan pelaksanaan Perjanjian ini, para pihak sepakat memilih domisili hukum yang tetap di Kantor Panitera Pengadilan Negeri Jakarta Selatan. Meskipun demikian, Debitur dengan ini mengakui dan menyetujui bahwa Kreditur berhak untuk mengajukan gugatan terhadap Debitur di setiap Pengadilan Negeri lainnya yang memiliki yurisdiksi atau kewenangan atas Debitur dan aset Debitur.
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="bottomEare">
          <div className="left">
            <div className="key"><b>Kreditur</b></div>
            <div><b>[{this.state.contractData.lenderName?this.state.contractData.lenderName:'•'}]</b></div>
          </div>
          <div className="right">
            <div className="key"><b>Debitur</b></div>
            <div><b>[{this.state.contractData.borrowerName?this.state.contractData.borrowerName:'•'}]</b></div>
          </div>
        </div>


      </div>
    );
  }
}

LoanAgreement.defaultProps = {
};

export default LoanAgreement;
