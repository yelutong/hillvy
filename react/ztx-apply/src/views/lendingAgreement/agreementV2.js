import React from 'react';

class LendingAgreement extends React.Component {
  state = {
    contractData:{}
  };

  componentWillReceiveProps() {
    console.log(this.props.contractData);
  }

  render() {
    return (
      <div className="padding20 privacyService">
        <div className="firstTitle">PERJANJIAN KERJA SAMA LAYANAN</div>
        <div className="secondTitle">
          <b>ANTARA</b>
        </div>
        <div className="secondTitle">
          <b>PT KREDIT PLUS TEKNOLOGI</b>
        </div>
        <div className="secondTitle">
          <b>DENGAN</b>
        </div>
        <div className="secondTitle">
          <b>Pemberi Pinjaman</b>
        </div>
        <div className="secondTitle">
          <b>No. [{this.props.contractData.lendContractNo || '•'}]</b>
        </div>

        <div className="serviceDetail">
          <p>Perjanjian Layanan Kerja Sama ini dibuat dan ditandatangani secara elektronik pada tanggal pendaftaran Akun Layanan Pinjam Gampang atas nama Pemberi Pinjaman pada Aplikasi Penyelenggara Layanan (selanjutnya disebut “<b>Perjanjian</b>”) oleh dan antara:</p>
        </div>
        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num">1.</span>
            <span className="text">
               <b>PT Kredit Plus Teknologi</b>, suatu perseroan terbatas yang didirikan berdasarkan hukum Republik Indonesia, beralamat di The Prominence Office Tower Unit A&F, lantai 1, Jl. Jalur Sutera Barat No. 15, Panunggangan Timur, Pinang, Tangerang, Banten, 15143 - Indonesia, dalam hal ini diwakili oleh Direktur, selanjutnya disebut <b>Penyelenggara Layanan</b>.
            </span>
          </div>
          <div className="lessNum">
            <span className="num">2.</span>
            <span className="text">
              <b>Pemberi Pinjaman</b>, yaitu Pemberi Pinjaman sebagai Pengguna Aplikasi Pinjam Gampang dengan ID [{this.props.contractData.lenderIdNum||'•'}] sebagaimana identitas yang disampaikan saat Pendaftaran Pengguna sebagai Pemberi Pinjaman, bertindak mewakili diri sendiri sebagai Pemberi Pinjaman Perseorangan atau entitasnya sebagai Pemberi Pinjaman Badan Hukum keduanya disebut sebagai <b>Pemberi Pinjaman</b>;
            </span>
          </div>
        </div>
        <div className="serviceDetail">
          <p>Pemberi Pinjaman dan Penyelenggara Layanan secara sendiri-sendiri disebut sebagai <b>Pihak</b> dan bersama-sama disebut <b>Para Pihak</b>.</p>
        </div>
        <div className="serviceDetail">
          <p>Para Pihak menerangkan hal-hal sebagai berikut:</p>
        </div>
        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num">1.</span>
            <span className="text">
              Penyelenggara Layanan yang telah memperoleh Surat Tanda Terdaftar nomor S-272/NB.213/2018 tertanggal 13 April 2018 dari Otoritas Jasa Keuangan dan diawasi oleh Otoritas Jasa Keuangan untuk menyediakan, mengelola, dan mengoperasikan Layanan Pinjam Gampang kepada Pengguna Layanan.
            </span>
          </div>
          <div className="lessNum">
            <span className="num">2.</span>
            <span className="text">
               Pemberi Pinjaman memiliki kecakapan dan kemampuan secara hukum untuk terikat dalam Perjanjian ini dan bersedia menyediakan dana kepada Penyelenggara Layanan untuk dapat diberikan kepada Penerima Pinjaman
            </span>
          </div>
        </div>
        <div className="serviceDetail">
          <p>Selanjutnya Para Pihak sepakat untuk menandatangani Perjanjian Kerja Sama Layanan (“<b>Perjanjian</b>”) dengan syarat dan ketentuan sebagai berikut:</p>
        </div>

        <div className="serviceDetail">
          <div className="lessNum align-center" style={{'marginTop':'1rem'}}>
            <div className="text"><b>Pasal 1</b></div>
            <div className="text"><b>Definisi</b></div>
          </div>
        </div>
        <div className="serviceDetail">
          Kecuali ditentukan lain secara tegas dalam Perjanjian ini, istilah-istilah dibawah ini memiliki pengertian-pengertian sebagai berikut:
        </div>
        <div className="serviceDetail">
          <div>
            <div className="lessNum">
              <span className="secondNum">
                <span className="num">a.</span>
                <span className="text"><b>Perjanjian</b> adalah perjanjian ini beserta Lampiran yang menyertainya dan setiap dokumen yang disertakan sebagai referensi, yang masing-masing sebagai satu kesatuan dan dapat diubah sewaktu waktu sesuai ketentuan Perjanjian ini;</span>
              </span>
              <span className="secondNum">
                <span className="num">b.</span>
                <span className="text"><b>Layanan Pinjam Gampang</b> (“<b>Layanan</b>”) adalah Aplikasi Pinjam Gampang yang mengelola Layanan Pinjam Meminjam Uang Berbasis Teknologi Informasi;</span>
              </span>
              <span className="secondNum">
                <span className="num">c.</span>
                <span className="text"><b>Pengguna Layanan</b> adalah setiap Pemberi Pinjaman dan Penerima Pinjaman yang menggunakan Layanan;</span>
              </span>
              <span className="secondNum">
                <span className="num">d.</span>
                <span className="text"><b>Penyelenggara Layanan</b> adalah Pihak yang mengoperasikan dan mengelola serta bertanggung jawab atas Layanan Pinjam Gampang.</span>
              </span>
              <span className="secondNum">
                <span className="num">e.</span>
                <span className="text"><b>Pemberi Pinjaman</b> adalah Warga Negara Indonesia/Warga Negara Asing ataupun Badan Hukum Indonesia/Badan Hukum Asing yang mendaftar pada Penyelenggara Layanan melalui Layanan Pinjam Gampang dan bersedia menyediakan dana kepada Penyelenggara Layanan untuk dapat disalurkan kembali kepada Penerima\Pinjaman dan mempunyai piutang berdasarkan Perjanjian Layanan;</span>
              </span>
              <span className="secondNum">
                <span className="num">f.</span>
                <span className="text"><b>Penerima Pinjaman</b> adalah warga Negara Indonesia yang mendaftar pada Penyelenggara Layanan melalui Layanan dan mempunyai Pinjaman berdasarkan Perjanjian Layanan;</span>
              </span>
              <span className="secondNum">
                <span className="num">g.</span>
                <span className="text"><b>Pinjaman</b> adalah total uang yang disalurkan kepada Penerima Pinjaman dalam bentuk mata uang Rupiah oleh Penyelenggara Layanan yang berasal dari Pemberi Pinjaman dengan nilai total maksimal yang tidak melebihi Rp2.000.000.000,00 (dua miliar Rupiah) atau sesuai dengan ketentuan Peraturan Otoritas Jasa Keuangan No. 77/POJK.01/2016 tentang Layanan Pinjam Meminjam Uang Berbasis Teknologi Informasi (“<b>POJK No. 77/2016</b>”);</span>
              </span>
              <span className="secondNum">
                <span className="num">h.</span>
                <span className="text"><b>Akses Informasi Penggunaan Dana</b> atau <b>Akses Penggunaan Dana</b> adalah akses informasi yang disediakan Penyelenggara Layanan kepada Pemberi Pinjaman dan Penerima Pinjaman untuk penggunaan Layanan pada terkait dengan penggunaan dana yang diberikan kepada Pemberi Pinjaman kepada Penyelenggara Layanan.</span>
              </span>
              <span className="secondNum">
                <span className="num">i.</span>
                <span className="text"><b>Komisi</b> adalah suatu bentuk pembayaran yang yang diterima oleh Penyelenggara Layanan dari setiap pemberian Pinjaman dari Pemberi Pinjaman kepada Penerima Pinjaman.</span>
              </span>
              <span className="secondNum">
                <span className="num">j.</span>
                <span className="text"><b>Rekening Penampungan</b> atau Escrow Account adalah rekening resmi dan telah diberitahukan kepada Otoritas Jasa Keuangan (“OJK”) atas nama Penyelenggara Layanan yang digunakan untuk menyalurkan dana pemberian Pinjaman/pengembalian dana dari Pemberi Pinjaman kepada Penerima Pinjaman melalui Layanan milik Penyelenggara Layanan yaitu Aplikasi Pinjam Gampang.</span>
              </span>
              <span className="secondNum">
                <span className="num">k.</span>
                <span className="text"><b>Perjanjian Layanan</b> adalah seperangkat perjanjian yang mengikat Pengguna Layanan dan Penyelenggara Layanan dalam satu transaksi layanan pinjam meminjam uang berbasis teknologi informasi sebagaimana tunduk dan diatur dalam POJK No. 77/2016. </span>
              </span>
              <span className="secondNum">
                <span className="num">l.</span>
                <span className="text"><b>Keadaan Kahar</b> adalah salah satu peristiwa atau keadaan berikut yang secara langsung mempengaruhi kemampuan salah satu atau Para Pihak untuk melakukan kewajibannya berdasarkan Perjanjian ini, termasuk: (a) bencana alam termasuk tetapi tidak terbatas pada badai, gempa bumi, angin topan, tornado, banjir atau tindakan Tuhan lainnya; (c) perang, aksi terorisme, pemberontakan, kerusuhan atau kerusuhan sipil lainnya; (d) epidemi, pembatasan karantina atau pembatasan atau penasihat kesehatan publik lainnya; (e) pemogokan atau penutupan perusahaan atau gangguan ketenagakerjaan lainnya; (f) gangguan terhadap layanan transportasi lokal, nasional atau internasional; (g) gangguan terhadap layanan internet lokal, nasional atau internasional; (h) pemadaman listrik; (i) konfigurasi perangkat Pengguna; atau (j) setiap peristiwa lain yang berada di luar kendali wajar Para Pihak yang akan mempengaruhi operasi layanan berdasarkan Perjanjian ini.</span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum align-center" style={{'marginTop':'1rem'}}>
            <div className="text"><b>Pasal 2</b></div>
            <div className="text"><b>Penunjukan</b></div>
          </div>
        </div>
        <div className="serviceDetail">
          Pemberi Pinjaman dengan ini sepakat untuk menunjuk Penyelenggara Layanan sebagai pihak yang menyediakan Layanan dan menghubungkan antara Pemberi Pinjaman dengan Penerima Pinjaman, termasuk tetapi tidak terbatas untuk melakukan promosi Layanan, proses pendaftaran, penyaluran Pinjaman, proses penagihan dan menerima pembayaran atas Pinjaman yang diberikan Pemberi Pinjaman kepada Penerima Pinjaman.
        </div>

        <div className="serviceDetail">
          <div className="lessNum align-center" style={{'marginTop':'1rem'}}>
            <div className="text"><b>Pasal 3</b></div>
            <div className="text"><b>Kriteria Penerima Pinjaman</b></div>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="lessNum">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Pemberi Pinjaman dengan ini sepakat untuk menyalurkan dana Pinjaman kepada calon Penerima Pinjaman dengan kriteria sebagai berikut:
                  <span className="lastNum" style={{'display':'block'}}>
                    a. Warga Negara Indonesia;
                  </span>
                  <span className="lastNum" style={{'display':'block'}}>
                    b. Berumur 21 tahun sampai 40 tahun;
                  </span>
                  <span className="lastNum" style={{'display':'block'}}>
                    c. Memiliki penghasilan tetap.
                  </span>
                </span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Penyelenggara Layanan dengan ini setuju dan sepakat untuk dan atas nama Pemberi Pinjaman, melakukan penerimaan pendaftaran calon Penerima Pinjaman, verifikasi data, telaah dokumen, dan menyalurkan Pinjaman dari Pemberi Pinjaman dalam hal terdapat calon Penerima Pinjaman yang sesuai dengan kriteria sebagaimana dimaksud pada ayat (1) Pasal ini dan kriteria tambahan yang ditetapkan oleh Penyelenggara Layanan atas kebijakannya dari waktu ke waktu.
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum align-center" style={{'marginTop':'1rem'}}>
            <div className="text"><b>Pasal 4</b></div>
            <div className="text"><b>Pemberian dan Pengembalian Dana Pinjaman</b></div>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="lessNum">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Pemberi Pinjaman setuju akan memberikan dana Pinjaman melalui Penyelenggara Layanan sebagaimana jumlah nominal Pinjaman dan untuk jangka waktu pinjaman (“<b>Tenor</b>”) tertentu yang dipilih dan dikonfirmasi melalui Layanan yang berlaku efektif sejak Perjanjian Layanan disetujui dan ditandatangani secara elektronik.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Pemberi Pinjaman setuju dan sepakat untuk menyetorkan Pinjaman sebagaimana dimaksud pada ayat (1) dan dikirimkan melalui transfer dari rekening Pemberi Pinjaman kepada Rekening Penampungan dalam waktu paling lambat 12 (dua belas) jam sejak disetujuinya Pinjaman dan Tenor yang telah dikonfirmasi oleh Penyelenggara Layanan melalui Layanan. Apabila dalam waktu paling lambat 12 (dua belas) jam tersebut Pemberi Pinjaman tidak melakukan transfer ke Rekening Penampungan, Pemberi Pinjaman dianggap tidak dapat melanjutkan Perjanjian ini dan Perjanjian ini batal dengan sendirinya.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">3.</span>
                <span className="text">Pemberi Pinjaman setuju dan sepakat untuk memberikan kuasa kepada Penyelenggara Layanan sehingga Penyelenggara Layanan berhak melakukan pendebetan pada Rekening Penampung dan menyalurkannya kepada rekening Penerima Pinjaman pada saat sistem menyetujui aplikasi permohonan Pinjaman Penerima Pinjaman yang sesuai dengan kriteria yang disepakati antara Pemberi Pinjaman dengan Penyelenggara Layanan.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">4.</span>
                <span className="text">Penyelenggara Layanan wajib untuk melakukan transfer kembali Pinjaman dan Bunga yang sudah dibayarkan Penerima Pinjaman ke rekening Pemberi Pinjaman paling lambat 2 (dua) hari kerja setelah menerima instruksi pengembalian dana dari Pemberi Pinjaman. 
                </span>
              </span>
              <span className="secondNum">
                <span className="num">5.</span>
                <span className="text">Pemberi Pinjaman dengan ini mengenakan bunga kepada Penerima Pinjaman sebesar 0,1% (nol koma satu persen) per hari setelah Pinjaman disalurkan kepada Penerima Pinjaman oleh Penyelenggara Layanan.
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum align-center" style={{'marginTop':'1rem'}}>
            <div className="text"><b>Pasal 5</b></div>
            <div className="text"><b>Komisi dan Biaya-Biaya</b></div>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="lessNum">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Setiap persetujuan permohonan Pinjaman yang diajukan Penerima Pinjaman, Penyelenggara Layanan berhak atas Komisi yang akan disepakati oleh Pemberi Pinjaman dan Penyelenggara Layanan dalam formulir elektronik terpisah yang merupakan satu kesatuan dengan Perjanjian ini. </span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Komisi akan dipotong secara otomatis pada saat penyaluran Pinjaman kepada Penerima Pinjaman telah selesai.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">3.</span>
                <span className="text">Terhadap keterlambatan Pembayaran, Pemberi Pinjaman sepakat untuk mengenakan kepada Penerima Pinjaman:
                  <span style={{'display':'block'}}>a.  Denda keterlambatan tetap untuk keterlambatan 1 (satu) sampai 3 (tiga) hari</span>
                  <span style={{'display':'block'}}>b.  Denda harian untuk keterlambatan lebih dari 3 (tiga) hari</span>
                  <span style={{'display':'block'}}>c.  Bunga pinjaman</span>
                  Besarnya denda keterlambatan tetap dan denda harian disepakati oleh Pemberi Pinjaman, Penyelenggara Layanan, dan Penerima Pinjaman dalam formulir elektronik terpisah yang merupakan satu kesatuan dengan Perjanjian ini.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">4.</span>
                <span className="text">Pemberi Pinjaman sepakat bahwa denda keterlambatan dan denda harian yang dibayarkan oleh Pemberi Pinjaman menjadi hak komisi Penyelenggara Layanan sedangkan Bunga Pinjaman menjadi hak Pemberi Pinjaman.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">5.</span>
                <span className="text">Pemberi Pinjaman dengan ini menyatakan bersedia menanggung biaya-biaya yang timbul sehubungan dengan Layanan yang digunakan berdasarkan Perjanjian ini baik biaya jasa hak Penyelenggara Layanan maupun biaya kepada pihak ketiga. Pemberi Pinjaman juga memberikan kuasa kepada Penyelenggara Layanan untuk membayarkan biaya-biaya berikut kepada pihak ketiga terkait, antara lain tetapi tidak terbatas pada:
                  <span style={{'display':'block'}}>a.  Biaya Jasa yang merupakan hak Penyelenggara Layanan;</span>
                  <span style={{'display':'block'}}>b.  Biaya kontrol risiko termasuk tetapi tidak terbatas pada verifikasi telepon genggam, identitas, verifikasi bank;</span>
                  <span style={{'display':'block'}}>c.  Biaya penggunaan jasa pihak ketiga termasuk tetapi tidak terbatas pada layanan pesan (SMS);</span>
                  <span style={{'display':'block'}}>d.  Biaya lain-lain yang timbul sehubungan dengan Layanan</span>
                  yang sudah diinformasikan oleh Penyelenggara Layanan dalam formulir tersendiri dan merupakan bagian yang tidak terpisahkan dari Perjanjian ini kepada Pemberi Pinjaman melalui Aplikasi (selanjutnya disebut “<b>Formulir Biaya</b>”). Dengan memberikan konfirmasi atas pilihan terhadap Pinjaman dan Tenor yang dilakukan melalui Layanan, Pemberi Pinjaman dianggap telah mengetahui dan setuju atas Komisi dan Biaya-Biaya yang menjadi hak Penyelenggara Layanan.
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum align-center" style={{'marginTop':'1rem'}}>
            <div className="text"><b>Pasal 6</b></div>
            <div className="text"><b>Pembayaran Pinjaman Lebih Cepat </b></div>
          </div>
        </div>
        <div className="serviceDetail">
          Penerima Pinjaman diperkenankan melakukan pembayaran lebih cepat dari ketentuan Tenor yang disepakati menurut Pasal 4 ayat (2) Perjanjian ini, dengan jumlah total pembayaran pokok pinjaman dan bunga tetap sesuai dengan perhitungan berdasarkan Tenor yang telah dipilih dan disepakati.
        </div>

        <div className="serviceDetail">
          <div className="lessNum align-center" style={{'marginTop':'1rem'}}>
            <div className="text"><b>Pasal 7</b></div>
            <div className="text"><b>Jangka Waktu Perjanjian</b></div>
          </div>
        </div>
        <div className="serviceDetail">
         Perjanjian ini berlaku sejak Perjanjian ini ditandatangani dan terus berlangsung selama ketentuan Pemberi Pinjaman masih menjadi Pengguna Layanan dan terikat oleh Perjanjian ini, oleh karenanya tunduk pada syarat-syarat dan ketentuan-ketentuan yang tercantum dalam Layanan, termasuk tetapi tidak terbatas Perjanjian ini dan setiap tambahan dan/atau perubahannya, Perjanjian Privasi dan Otorisasi, serta kebijakan lain.
        </div>

        <div className="serviceDetail">
          <div className="lessNum align-center" style={{'marginTop':'1rem'}}>
            <div className="text"><b>Pasal 8</b></div>
            <div className="text"><b>Akses Penggunaan Dana</b></div>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="lessNum">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Penyelenggara Layanan dengan ini sepakat untuk menyediakan dan memberikan Akses Penggunaan Dana kepada Pemberi Pinjaman atas penggunaan dananya.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Akses Penggunaan Dana sebagaimana dimaksud pada ayat (1) di atas, termasuk namun tidak terbatas pada:
                  <span style={{'display':'block'}}>a.  Jumlah dana yang dipinjamkan kepada Penerima Pinjaman;</span>
                  <span style={{'display':'block'}}>b.  Tujuan pemanfaatan dana oleh Penerima Pinjaman;</span>
                  <span style={{'display':'block'}}>c.  Besaran bunga pinjaman;</span>
                  <span style={{'display':'block'}}>d.  Jangka waktu pinjaman.</span>
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum align-center" style={{'marginTop':'1rem'}}>
            <div className="text"><b>Pasal 9</b></div>
            <div className="text"><b>Hak dan Kewajiban Pemberi Pinjaman</b></div>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="lessNum">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Pemberi Pinjaman dengan ini berhak atas pengembalian dana beserta bunga secara tepat waktu.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">
                  Pemberi Pinjaman berhak atas Akses Penggunaan Dana sebagaimana tertuang dalam Pasal 8 Perjanjian ini.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">3.</span>
                <span className="text">
                  Pemberi Pinjaman diwajibkan untuk menyetorkan dana Pinjaman sesuai Pasal 4 ayat (3) Perjanjian ini.
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum align-center" style={{'marginTop':'1rem'}}>
            <div className="text"><b>Pasal 10</b></div>
            <div className="text"><b>Hak dan Kewajiban Penyelenggara Layanan</b></div>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="lessNum">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">
                  Penyelenggara Layanan akan menyampaikan kepada Pemberi Pinjaman tentang penjadwalan pembayaran pinjaman (loan repayment schedule) dari Penerima Pinjaman. 
                </span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">
                  Setelah pemberian pinjaman berakhir, Pemberi Pinjaman setuju untuk memberikan komisi kepada Penyelenggara Layanan sesuai dengan Formulir Biaya yang sudah disampaikan dan disepakati melalui Layanan.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">3.</span>
                <span className="text">
                   Penyelenggara Layanan wajib, namun tidak terbatas, untuk melakukan hal-hal berikut:
                   <span style={{'display':'block'}}>a. Melakukan verifikasi Penerima Pinjaman yang sesuai dengan kriteria Penerima Pinjaman sebagaimana tertuang dalam Pasal 3 ayat (1) Perjanjian ini;</span>
                   <span style={{'display':'block'}}>b. Menyalurkan Pinjaman kepada Penerima Pinjaman;</span>
                   <span style={{'display':'block'}}>c. Melakukan penagihan kepada Penerima Pinjaman yang telah jatuh tempo;</span>
                   <span style={{'display':'block'}}>d. Menyalurkan pembayaran kembali Pinjaman beserta bunga dari Penerima Pinjaman kepada Pemberi Pinjaman paling lambat 2 (dua) hari kerja) setelah menerima instruksi pengembalian dari Pemberi Pinjaman;</span>
                    <span style={{'display':'block'}}>e.  Dalam hal terjadi masalah teknis pada sistem yang mengganggu terlaksananya Perjanjian ini termasuk namun tidak terbatas pada masalah akses atau sebab-sebab lain yang untuk sementara waktu menyebabkan proses pengiriman informasi dari sistem Layanan  terganggu, Penyelenggara Layanan berkewajiban memberitahukan kepada Pemberi Pinjaman melalui email, telepon, atau cara lain, paling lambat 1 (satu) kali 24 (dua puluh empat) jam setelah terjadinya hal-hal tersebut dan (i) apabila masalah teknis hanya terjadi pada sistem internal Penyelenggara, berkewajiban menyelesaikan masalah tersebut dalam 24 (dua puluh empat) jam sejak pemberitahuan kepada Pemberi Pinjaman; atau (ii) apabila masalah teknis terjadi pada sistem yang berada di bawah kendali pihak ketiga lain (termasuk tetapi tidak terbatas pada bank, payment gateway, dan lain-lain), berkewajiban memantau dan mendorong pihak ketiga agar dengan segera menyelesaikan permasalahan, serta selalu menginformasikan kepada Pemberi Pinjaman mengenai status penyelesaian masalah.</span>
                    <span style={{'display':'block'}}>f.  Penyelenggara Layanan dilarang dengan cara apapun, memberikan data dan/atau informasi mengenai Pemberi Pinjaman atau Penerima Pinjaman kepada Pihak Ketiga, kecuali termasuk namun tidak terbatas pada:
                       <span className="textRight lessLeft lendingAgreement" style={{'paddingLeft':'0px'}}>
                          <span className="secondNum">
                            <span className="num">1).</span>
                            <span className="text">Telah mendapatkan persetujuan secara elektronik dari Pemberi Pinjaman atau Penerima Pinjaman; dan/atau</span>
                          </span>
                          <span className="secondNum">
                            <span className="num">2).</span>
                            <span className="text">Diwajibkan oleh ketentuan peraturan perundang-undangan yang berlaku.</span>
                          </span>
                        </span>
                    </span>
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum align-center" style={{'marginTop':'1rem'}}>
            <div className="text"><b>Pasal 11</b></div>
            <div className="text"><b>Pembatasan Kewajiban dan Tanggung Jawab Penyelenggara Layanan</b></div>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="lessNum">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Sejauh terjadinya Keadaan Kahar, Penyelenggara Layanan tidak bertanggung jawab atas setiap dan semua klaim, kewajiban, tuntutan, proses hukum atau gugatan terhadap segala macam sifat, kerugian, kerusakan atau biaya yang timbul dari atau sehubungan dengan pelaksanaan Perjanjian ini, termasuk, namun tidak terbatas pada (i) penggunaan fasilitas secara ilegal, tidak wajar atau tidak sah; (ii) setiap gangguan, cacat atau kerusakan fasilitas; (iii) setiap ketidakmampuan Penyelenggara Layanan untuk melaksanakan kewajibannya kepada Pemberi Pinjaman dengan alasan atau yang disebabkan oleh tindakan Pemberi Pinjaman atau tindakan atau kelalaian Pemberi Pinjaman; atau (iv) segala pelanggaran Pemberi Pinjaman atas kewajiban, itikad baik, dan kesepakatan yang adil.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">
                  Tanggung jawab Penyelenggara Layanan, apabila ada, paling banyak hanya sebesar satu kali Biaya Jasa yang diterima atas Layanan yang diberikan kepada Pemberi Pinjaman.
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum align-center" style={{'marginTop':'1rem'}}>
            <div className="text"><b>Pasal 12</b></div>
            <div className="text"><b>Kuasa</b></div>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="lessNum">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Pemberi Pinjaman dengan ini setuju dan sepakat untuk memberikan kuasa kepada Penyelenggara Layanan untuk termasuk namun tidak terbatas pada kegiatan sebagai berikut:
                  <span className="textRight lessLeft lendingAgreement" style={{'paddingLeft':'0px'}}>
                    <span className="lastNum">
                      <span className="num">a.</span>
                      <span className="text">Melakukan verifikasi Penerima Pinjaman yang sesuai dengan kriteria Pemberi Pinjaman sebagaimana tertuang dalam Pasal 3 Perjanjian ini; 
                      </span>
                    </span>
                    <span className="lastNum">
                      <span className="num">b.</span>
                      <span className="text">Melakukan pendebetan atas dana Pemberi Pinjaman yang tersimpan dalam Rekening Penampungan milik Penyelenggara Layanan dalam hal terdapat Penerima Pinjaman yang sesuai dengan kriteria yang diberikan Pemberi Pinjaman sebagaimana tertuang dalam Pasal 3 Perjanjian ini;
                      </span>
                    </span>
                    <span className="lastNum">
                      <span className="num">c.</span>
                      <span className="text">Menagihkan Pinjaman kepada Penerima Pinjaman pada saat jatuh tempo;
                      </span>
                    </span>
                    <span className="lastNum">
                    <span className="num">d.</span>
                      <span className="text">Menyalurkan kembali pembayaran Pinjaman beserta bunga kepada Pemberi Pinjaman.
                      </span>
                    </span>
                  </span>
                </span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Pemberi Pinjaman setuju untuk menandatangani surat kuasa sebagaimana akan diberikan tersendiri oleh Penyelenggara Layanan.</span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum align-center" style={{'marginTop':'1rem'}}>
            <div className="text"><b>Pasal 13</b></div>
            <div className="text"><b>Pernyataan dan Jaminan Pemberi Pinjaman</b></div>
          </div>
        </div>
        <div className="serviceDetail">Pemberi Pinjaman dengan ini menyatakan sebagai berikut:</div>
        <div className="serviceDetail">
          <div>
            <div className="lessNum">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Pemberi Pinjaman dengan ini menyatakan dana yang disetorkan/dipergunakan pada Layanan ini tidak berasal dari atau bertujuan untuk melakukan tindak pidana pencucian uang (Money Laundering) atau pendanaan terorisme atau hasil perbuatan lain yang melanggar hukum.</span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Pihak yang mewakili Pemberi Pinjaman untuk menandatangani Perjanjian ini adalah pihak yang sah dan berwenang untuk bertindak untuk dan atas nama serta mewakili Pemberi Pinjaman.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">3.</span>
                <span className="text">Semua informasi yang tercantum dalam Perjanjian ini adalah benar dan sah, bilamana dikemudian hari terdapat tuntutan dalam bentuk dari pihak ketiga atas transaksi terhadap Penyelenggara Layanan, maka Pemberi Pinjaman, bertanggung jawab penuh atas tuntutan dan/atau gugatan pihak ketiga tersebut;
                </span>
              </span>
              <span className="secondNum">
                <span className="num">4.</span>
                <span className="text">Semua penyetoran dana hanya ditujukan kepada Rekening Escrow pada Bank yang ditunjuk oleh Penyelenggara Layanan;
                </span>
              </span>
              <span className="secondNum">
                <span className="num">5.</span>
                <span className="text">Tidak akan menggunakan Layanan ini sebagai sarana untuk melakukan tindakan yang dapat dikategorikan melanggar hukum termasuk tidak terbatas pada tindakan pidana pencucian uang dan/atau pendanaan kegiatan terorisme.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">6.</span>
                <span className="text">Pemberi Pinjaman mengetahui segala resiko-resiko yang ditanggung dalam memberikan Pinjaman dan telah diketahui pada saat Penyelenggara Layanan memberitahukan sebelum memberikan Pinjaman melalui pernyataan (disclamer) di laman situs atau Layanan.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">7.</span>
                <span className="text">Pemberi Pinjaman telah memahami bahwa risiko kredit atau gagal bayar dan seluruh kerugian terkait dengan kesepakatan pinjam meminjam antara Pemberi Pinjaman dengan Penerima Pinjaman merupakan risiko yang ditanggung oleh Pemberi Pinjaman sendiri. 
                </span>
              </span>
              <span className="secondNum">
                <span className="num">8.</span>
                <span className="text">Tidak ada lembaga atau otoritas yang bertanggung jawab atas risiko gagal bayar dan kerugian tersebut, termasuk PT Kredit Plus Teknologi yang hanya sebagai Penyelenggara Layanan.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">9.</span>
                <span className="text">Setiap kecurangan dan tindakan ilegal dilaporkan sepenuhnya kepada Otoritas Jasa Keuangan (OJK) dan masyarakat luas sesuai peraturan perundang-undangan yang berlaku. 
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum align-center" style={{'marginTop':'1rem'}}>
            <div className="text"><b>Pasal 14</b></div>
            <div className="text"><b>Pembatalan dan Pengakhiran</b></div>
          </div>
        </div>
        <div className="serviceDetail">Pemberi Pinjaman dengan ini menyatakan sebagai berikut:</div>
        <div className="serviceDetail">
          <div>
            <div className="lessNum">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Perjanjian ini batal dengan sendirinya apabila Pemberi Pinjaman tidak melakukan transfer dana sebagaimana diatur dalam Pasal 4 ayat 3 dan Pasal 8 ayat 3 Perjanjian ini. Tidak ada hak dan kewajiban Para Pihak yang timbul akibat batalnya Perjanjian berdasarkan ayat ini.</span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Penyelenggara Layanan dan Pemberi Pinjaman dengan ini mengabaikan keberlakukan Pasal 1266 dan Pasal 1267 Kitab Undang-Undang Hukum Perdata sepanjang mengenai diperlukan pembatalan perjanjian di muka pengadilan.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">3.</span>
                <span className="text">Perjanjian ini tidak dapat diakhiri terlebih dahulu baik oleh Penyelenggara Layanan maupun Pemberi Pinjaman. Namun apabila Perjanjian ini berakhir demi hukum atau karena perintah peraturan perundang-undangan, perintah pengadilan, perintah Otoritas Jasa Keuangan maupun institusi negara yang memiliki kewenangan untuk itu, masing-masing pihak wajib memenuhi kewajibannya yang telah dibuat dengan Pihak lainnya berdasarkan Perjanjian ini dan menyelesaikan seluruh pinjaman, tanggung jawab dan kewajiban finansial lain kepada Pihak lainnya, yang terhutang setelah pengakhiran Perjanjian ini.
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum align-center" style={{'marginTop':'1rem'}}>
            <div className="text"><b>Pasal 15</b></div>
            <div className="text"><b>Pelanggaran</b></div>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="lessNum">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Jika Para Pihak melakukan pelanggaran Perjanjian ini, maka salah satu Pihak dapat memberikan peringatan pada pihak lain secara tertulis berkaitan dengan pelanggaran yang terjadi dan Perjanjian ini akan berakhir kecuali tidak ada perbaikan dalam 30 (tiga puluh) hari setelah surat peringatan diberikan. </span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Yang termasuk sebagai pelanggaran Perjanjian ini namun tidak terbatas pada:
                </span>
              </span>
              <span className="textRight lessLeft lendingAgreement">
                <span className="lastNum">
                  <span className="num">a.</span>
                  <span className="text">Dalam hal sampai dengan lebih dari 2 (dua) hari kerja) sejak Pemberi Pinjaman memberikan instruksi pengembalian pinjaman, dana Pemberi Pinjaman yang ada pada Rekening Penampungan tidak disalurkan kembali oleh Penyelenggara Layanan kepada Pemberi Pinjaman;
                  </span>
                </span>
              </span>
              <span className="textRight lessLeft lendingAgreement">
                <span className="lastNum">
                  <span className="num">b.</span>
                  <span className="text">Dalam hal Penyelenggara Layanan menyalurkan dana kepada calon Penerima yang tidak sesuai dengan kriteria yang telah ditentukan oleh Pemberi Pinjaman sebagaimana tertuang dalam Pasal 3 Perjanjian ini;
                  </span>
                </span>
              </span>
              <span className="textRight lessLeft lendingAgreement">
                <span className="lastNum">
                  <span className="num">c.</span>
                  <span className="text">Dalam hal Pemberi Pinjaman memberikan data dan/atau informasi mengenai Penerima Pinjaman kepada Pihak Ketiga.
                  </span>
                </span>
              </span>
              <span className="textRight lessLeft lendingAgreement">
                <span className="lastNum">
                  <span className="num">d.</span>
                  <span className="text">Dalam hal Penyelenggara Layanan memberikan data dan/atau informasi mengenai Pemberi Pinjaman kepada Pihak Ketiga sebagaimana dimaksud dalam Pasal 10 huruf f Perjanjian ini. 
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum align-center" style={{'marginTop':'1rem'}}>
            <div className="text"><b>Pasal 16</b></div>
            <div className="text"><b>Pemberitahuan</b></div>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="lessNum">
              <div>Pemberitahuan yang diperlukan atau yang diperbolehkan oleh Perjanjian ini harus secara tertulis dan dapat diserahkan langsung atau dapat dikirim melalui teleks, e-mail, faksimili, atau surat tercatat dibayar di muka yang dialamatkan ke pihak-pihak, sebagai berikut:</div>
              <div style={{'marginTop':'1em'}}>
                <b style={{'textDecoration':'underline'}}>Kepada Penyelenggara Layanan</b>
                <div>
                  <b>PT Kredit Plus Teknologi</b>
                </div>
                <div className="valueKey">
                  <div className="left">Email</div>
                  <div className="right">: kpt@kreditplusteknologi.id</div>
                </div>
                <div className="valueKey">
                  <div className="left">Telepon</div>
                  <div className="right">: (021) 3003 3358;</div>
                </div>
              </div>

              <div style={{'marginTop':'1em'}}>
                <b style={{'textDecoration':'underline'}}>Kepada Pemberi Pinjaman</b>
                <div>Sebagaimana informasi yang disampaikan dalam pendaftaran akun.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum align-center" style={{'marginTop':'1rem'}}>
            <div className="text"><b>Pasal 17</b></div>
            <div className="text"><b>Hukum Yang Berlaku dan Penyelesaian Sengketa</b></div>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="lessNum">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Perjanjian ini diatur dan ditafsirkan sesuai dengan hukum Republik Indonesia.</span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Pemberi Pinjaman berhak menyampaikan pengaduan (“<b>Pengaduan</b>”) sesuai ketentuan Peraturan Otoritas Jasa Keuangan Nomor 18 tahun 2018 tentang Layanan Pengaduan Konsumen di Sektor Jasa Keuangan (“<b>POJK No. 18/2018</b>”).</span>
              </span>
              <span className="secondNum">
                <span className="num">3.</span>
                <span className="text">Para Pihak sepakat bahwa setiap Pengaduan, perselisihan atau klaim yang timbul sebagai akibat atau berkenaan dengan Perjanjian ini atau pelanggaran ketentuan Perjanjian ini akan diselesaikan secara musyawarah, sesuai dengan POJK No. 18/2018.</span>
              </span>
              <span className="secondNum">
                <span className="num">4.</span>
                <span className="text">Apabila Para Pihak tidak dapat menyelesaikan Pengaduan, perselisihan, klaim atau pelanggaran setelah seluruh proses dalam POJK No. 18/2018 telah dilalui, maka Pihak yang mengalami suatu kerugian material berhak mengajukan permohonan penyelesaian melalui Badan Arbitrase Nasional Indonesia.</span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum align-center" style={{'marginTop':'1rem'}}>
            <div className="text"><b>Pasal 18</b></div>
            <div className="text"><b>Ketentuan Lain – Lain</b></div>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="lessNum">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Perjanjian ini mengikat untuk Para Pihak dengan ketentuan bahwa hak dan kewajiban Para Pihak tidak dapat dialihkan atau dilimpahkan, seluruhnya atau sebagian, secara langsung atau tidak langsung, baik secara sukarela, berdasarkan hukum yang berlaku atau lainnya, kepada orang, firma atau perusahaan lain tanpa persetujuan tertulis sebelumnya dari Pihak lainnya.</span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Setiap pemberitahuan yang diperlukan atau diizinkan berdasarkan Perjanjian ini dianggap telah diberikan apabila dikirimkan dengan surel/telepon/surat tercatat/jasa pos udara atau melalui teleks dengan konfirmasi jasa surat udara telah dilunasi, ke alamat Penyelenggara Layanan atau Pemberi Pinjaman yang terakhir kali diberitahukan</span>
              </span>
              <span className="secondNum">
                <span className="num">3.</span>
                <span className="text">Pembaharuan, pengakhiran, perubahan atau pelepasan ketentuan di dalam Perjanjian ini, atau syarat dan ketentuan di dalam Perubahan tersebut hanya berlaku dan mengikat apabila dibuat secara tertulis dan disetujui dengan membubuhkan tanda tangan secara elektronik atau tanda lainnya disepakati oleh Para Pihak.</span>
              </span>
              <span className="secondNum">
                <span className="num">4.</span>
                <span className="text">Perjanjian ini tidak dapat diubah dengan cara apapun kecuali berdasarkan kesepakatan bersama secara tertulis yang ditandatangani oleh Para Pihak.</span>
              </span>
              <span className="secondNum">
                <span className="num">5.</span>
                <span className="text">Perjanjian ini berlaku dan mengikat kepada Para Pihak sejak Perjanjian ini ditandatangani secara elektronik atau tanda lainnya yang disepakati oleh Para Pihak. </span>
              </span>
              Demikian Perjanjian ini ditandatangani secara elektronik oleh perwakilan yang sah Para Pihak pada tanggal dan tahun yang disebutkan pada bagian awal Perjanjian ini.
            </div>
          </div>
        </div>


        {/*给客户的邮寄单*/}
        <div style={{'marginTop':'4em'}}>
          <div className="secondTitle"><b>SURAT KUASA</b></div>
          <div className="serviceDetail">Yang bertandantangan di bawah ini,</div>
          <div className="serviceDetail">[identitas <b>Pemberi Pinjaman</b> sesuai data dalam aplikasi] selanjutnya disebut <b>Pemberi Kuasa</b>.</div>
          <div className="serviceDetail" style={{'marginTop':'1rem','marginBottom':'1rem'}}>Sehubungan dengan pelaksanaan Perjanjian Kerja Sama Layanan nomor [nomor perjanjian] (“<b>Perjanjian</b>”) dengan ini memberikan kuasa kepada:</div>
          <div className="serviceDetail"><b>PT Kredit Plus Teknologi</b>, suatu perseroan terbatas yang didirikan berdasarkan hukum Republik Indonesia beralamat di The Prominence Office Tower Unit A & F, lantai 1 Jl. Jalur Sutera Barat No. 15, Alam Sutera, Panunggangan Timur, Pinang, Tangerang-Banten sebagai Penyelenggara Layanan Pinjam Meminjam Uang Berbasis Teknologi Informasi (LPMUBTI) dengan situs www.kreditplusteknologi.id dan aplikasi <a>Pinjam Gampang</a>, dalam hal ini diwakili oleh Direktur, dan oleh karenanya sah bertindak untuk dan atas nama <b>PT Kredit Plus Teknologi</b> selanjutnya disebut <b>Penerima Kuasa</b>
          </div>
          <div className="serviceDetail" style={{'textAlign':'center','margin':'1em 0em','whiteSpace':'nowrap','overflow':'hiden'}}><b>------------------KHUSUS------------------</b></div>

          <div className="serviceDetail">
            <div>Bertindak untuk dan atas nama <b>Pemberi Kuasa</b>, untuk menyalurkan Pinjaman milik <b>Pemberi Kuasa</b> termasuk namun tidak terbatas pada: </div>
            <div className="lessNum">
              <span className="num">1.</span>
              <span className="text">melakukan verifikasi Penerima Pinjaman yang sesuai dengan kriteria Pemberi Pinjaman yang disepakati dalam Perjanjian Kerjasama Layanan.</span>
            </div>
            <div className="lessNum">
              <span className="num">2.</span>
              <span className="text">melakukan pendebetan atas dana Pemberi Pinjaman yang tersimpan dalam Rekening Penampungan atas nama Penyelengara Layanan untuk disalurkan kepada Penerima Pinjaman.</span>
            </div>
            <div className="lessNum">
              <span className="num">3.</span>
              <span className="text">menagihkan pembayaran kembali Pinjaman kepada Penerima Pinjaman.</span>
            </div>
            <div className="lessNum">
              <span className="num">4.</span>
              <span className="text">menyalurkan kembali dana hasil Pinjaman beserta bunga kepada Pemberi Pinjaman.</span>
            </div>
          </div>
        </div>
         <div className="serviceDetail">Surat Kuasa ini diberikan tanpa hak subtitusi, kecuali untuk pelaksanaan kuasa pada angka 3 di atas, mengenai penagihan pembayaran kembali Pinjaman, Penerima Kuasa dapat bekerjasama dengan pihak ketiga pelaksana penagihan. </div>
        <div className="serviceDetail">Kuasa ini berakhir dengan sendirinya apabila Perjanjian berakhir atau diakhiri.</div>

        <div className="serviceDetail align-center">[{this.props.contractData.loanDate?(this.props.contractData.loanDate.split('-')[2]):'xx'}] [{this.props.contractData.loanDate?(this.props.contractData.loanDate.split('-')[1]):'xx'}] [{this.props.contractData.loanDate?(this.props.contractData.loanDate.split('-')[0]):'xxxx'}]</div>

        <div className="bottomEare">
          <div className="left">
            <div className="key" style={{'marginBottom':'0px'}}>Penerima Kuasa,</div>
            <div><b>PT KREDIT PLUS TEKNOLOGI</b></div>
          </div>
          <div className="right" style={{'textAlign':'left'}}>
            <div className="key" style={{'marginBottom':'0px'}}>Pemberi Kuasa,</div>
          </div>
        </div>
        <div className="bottomEare">
          <div className="left">
            <div className="key" style={{'marginBottom':'0px'}}><b style={{'textDecoration':'underline'}}>{this.props.contractData.lenderName||'xxxxx'}</b></div>
          </div>
          <div className="right" style={{'textAlign':'left'}}>
            <div className="key" style={{'marginBottom':'0px'}}><b style={{'textDecoration':'underline'}}>{this.props.contractData.borrowerName||'xxxxx'}</b></div>
          </div>
        </div>
      </div>
    );
  }
}

LendingAgreement.defaultProps = {
};

export default LendingAgreement;
