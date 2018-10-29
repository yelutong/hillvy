import React from 'react';
import axios from 'axios';

class PrivacyService extends React.Component {
  state = {};

  componentWillMount() {
    
  }

  render() {
    return (
      <div className="FAQ padding10 privacyService">
        <div className="firstTitle">PERJANJIAN PRIVASI DAN OTORISASI</div>
        <div className="serviceDetail">
          <p>Perjanjian Kerahasiaan Privasi dan Otorisasi ini (“<b>Perjanjian</b>”) dibuat dan ditandatangani secara elektronik pada tanggal pendaftaran Akun Layanan Pinjam Gampang atas nama Pihak Kedua pada Website Pihak Pertama oleh dan antara:</p>
        </div>
        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num">1.</span>
            <span className="text"><b>PT.Kredit Plus Teknologi</b>, suatu perseroan terbatas yang didirikan berdasarkan hukum Negara Republik Indonesia, yang beralamat di  Unit E, 28th Floor, The Prominence Office Tower, Jl. Jalur Sutera Barat No.15, Alam Sutera Tangerang 15143 - Indonesia, selanjutnya disebut sebagai“Penyelenggara Layanan ”;</span>
          </div>
          <div className="lessNum">
            <span className="num">2.</span>
            <span className="text"><b>Anda</b>, dalam hal ini bertindak untuk dan atas nama diri sendiri, selanjutnya dalam perjanjian ini disebut “Calon Penerima Pinjaman”.</span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>Dalam Perjanjian, Penyelenggara Layanan dan Calon Penerima Pinjaman secara bersama-sama juga disebut sebagai “Para Pihak” dan secara sendiri-sendiri juga disebut sebagai “Pihak”.</div>
          <div>Para Pihak terlebih dahulu menerangkan hal-hal sebagai berikut:</div>
        </div>
        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num">1.</span>
            <span className="text">Penyelenggara Layanan adalah perusahaan penyelenggara layanan pinjam meminjam uang berbasis teknologi informasi yang telah terdaftar di Otoritas Jasa Keuangan Indonesia;</span>
          </div>
          <div className="lessNum">
            <span className="num">2.</span>
            <span className="text">Calon Penerima Pinjaman adalah individu atau badan hukum yang cakap di hadapan hukum untuk mewakili dirinya sendiri berdasarkan peraturan perundang-undangan yang berlaku di Indonesia;</span>
          </div>
          <div className="lessNum">
            <span className="num">3.</span>
            <span className="text">Bahwa Calon Penerima Pinajaman berkeinginan untuk meminjam sejumlah dana melalui layanan Pinjam Gampang yang diselenggarakan oleh Penyelenggara Layanan;</span>
          </div>
          <div className="lessNum">
            <span className="num">4.</span>
            <span className="text">Bahwa atas permohonan Calon Penerima Pinajaman, Penyelenggara Layanan wajib melakukan verifikasi identitas Calon Penerima Pinajaman; dan</span>
          </div>
          <div className="lessNum">
            <span className="num">5.</span>
            <span className="text">Bahwa Calon Penerima Pinajaman bersedia memberikan informasi pribadi kepada dan untuk digunakan oleh Penyelenggara Layanan.</span>
          </div>
          <div>Berdasarkan hal-hal tersebut di atas, Para Pihak sepakat untuk mengikatkan dengan ketentuan-ketentuan dan syarat-syarat sebagaimana tercantum dalam pasal-pasal berikut:</div>
        </div>

        <div className="firstTitle">PASAL 1 </div>

        <div className="firstTitle">DEFINISI</div>

        <div className="serviceDetail">
          <p>Istilah di bawah ini, apabila dipergunakan dalam Perjanjian, mempunyai arti sebagai berikut:</p>
        </div>
        <div className="serviceDetail">“<b>Afiliasi</b>“ adalah setiap perusahaan atau badan hukum yang (a) mengendalikan suatu Pihak baik secara langsung maupun tidak langsung, atau (b) yang dikendalikan baik secara langsung maupun tidak langsung oleh suatu Pihak, atau (c) dikendalikan secara langsung maupun tidak langsung oleh perusahaan atau badan yang secara langsung atau tidak langsung mengendalikan suatu Pihak. Konteks “Pengendalian” dalam Pasal ini adalah kepemilikan langsung atau tidak langsung atas mayoritas saham atau hak suara dalam suatu perusahaan, kemitraan atau badan hukum.</div>
        <div className="serviceDetail">“<b>Akun Pinjam Gampang</b>“ berarti identitas unik yang digunakan untuk mengklasifikasikan Calon Penerima Pinjaman dan mencatat kegiatan Calon Penerima Pinjaman dalam Situs Web dan Layanan milik  Penyelenggara Layanan yang dilakukan dengan cara pendaftaran pada Situs Web Penyelenggara Layanan.</div>
        <div className="serviceDetail">“<b>Data Pribadi</b>“ berarti termasuk namun tidak terbatas pada (i) nama, (ii) tanda pengenal/identitas, (iii) alamat, (iv) nomor telepon dan alamat surat elektronik yang biasa digunakan, (v) informasi biometrik, (vi) dan informasi tambahan lainnya yang diperlukan Penyelenggara Layanan dalam melakukan verifikasi identitas Calon Penerima Pinjaman .</div>
        <div className="serviceDetail">“<b>Informasi Operasi Calon Penerima Pinjaman</b>“ berarti termasuk namun tidak terbatas pada alamat IP komputer, model perangkat keras, system operasi yang digunakan Pihak Kedua, lokasi Pihak Kedua saat mengakses website layanan Pihak Pertama, dan informasi lain yang terkait dengan layanan Pihak Pertama.</div>
        <div className="serviceDetail">“<b>Keadaan Kahar</b>“ berarti suatu keadaan atau kejadian yang berada di luar kendali yang tidak disebabkan karena kelalaian salah satu Pihak dan tidak dapat diperkirakan sebelum Para Pihak menandatangani Perjanjian serta yang secara langsung mempengaruhi pelaksanaan Perjanjian. Keadaan atau kejadian tersebut termasuk namun tidak terbatas pada: kebakaran, banjir, gempa bumi, angin topan, letusan gunung berapi, wabah penyakit, pemogokan buruh, perang atau tindakan kekerasan atau sejenisnya baik dinyatakan maupun tidak dinyatakan secara tegas, tindakan Pemerintah untuk mengubah/mecabut/menerbitkan peraturan perundang-undangan yang terkait dengan usaha Penyelenggara Layanan. Keadaan Kahar tidak termasuk kekurangan atau ketiadaan dana Calon Penerima Pinjaman, atau pencabutan izin usaha.</div>
        <div className="serviceDetail">“<b>Layanan</b>“ <b>berarti Layanan Pinjam Gampang yang</b>meliputi, namun tidak terbatas pada penilaian kredit, penarikan tunai, penagihan dan pembayaran, dan layanan lainya yang disediakan oleh Penyelenggara Layanan sebagaimana dapat diakses melalui Website  Penyelenggara Layanan .</div>
        <div className="serviceDetail">“<b>Pemerintah</b>“ berarti pemerintah Republik Indonesia yang diwakili oleh kementrian apapun termasuk pemerintah daerah, badan dan biro yang berwenang.“Pemerintahan”, saat dicetak kapital harus menjadi kata sifat dari Pemerintah.</div>
        <div className="serviceDetail">“<b>Pihak Ketiga</b>“ berarti setiap pihak selain Pihak Pertama atau Pihak Kedua.</div>
        <div className="serviceDetail">“<b>POJK 77</b>“ berarti Peraturan Otoritas Jasa Keuangan No.77/POJK.01/2016 tentang Layanan Pinjam Meminjam Uang Berbasis Teknologi Informasi</div>
        <div className="serviceDetail">“<b>Website Penyelenggara Layanan</b>“ berarti suatu halaman dalam jaringan internet dengan alamat www.kreditplusteknologi.id yang dikelola dan dioperasikan oleh Penyelenggara Layanan yang berisikan kumpulan informasi Layanan milik  Penyelenggara Layanan dan sebagai sarana komunikasi dan korespondensi antara Para Pihak.</div>

        <div className="firstTitle">PASAL 2 </div>
        <div className="firstTitle">RUANG LINGKUP PERJANJIAN</div>
        <div className="serviceDetail">
          <div>
            <span className="num">2.1</span>
            <span className="text">Calon Penerima Pinjaman dengan ini sepakat untuk memberikan Data Pribadi Calon Penerima Pinjaman kepada dan mengizinkan Penyelenggara Layanan untuk mengumpulkan, menggunakan, serta menyimpan Data Pribadi Calon Penerima Pinjaman untuk keperluan verifikasi Calon Penerima Pinjaman ;</span>
          </div>
          <div>
            <span className="num">2.2</span>
            <span className="text">Penyelenggara Layanan dengan ini sepakat untuk menerima dan akan mengumpulkan, menggunakan, menyimpan serta menjaga kerahasiaan Data Pribadi Calon Penerima Pinjaman guna melakukan verifikasi identitas Calon Penerima Pinjaman .</span>
          </div>
        </div>

        <div className="firstTitle">PASAL 3 </div>
        <div className="firstTitle">DATA PRIBADI CALON PENERIMA PINJAMAN</div>
        <div className="serviceDetail">
          <div>
            <span className="num"><b>3.1</b></span>
            <span className="text"><b>PENGUMPULAN DATA PRIBADI CALON PENERIMA PINJAMAN</b></span>
          </div>
          <div>
            <div className="textRight">
              <div>Calon Penerima Pinjaman dengan ini setuju dan sepakat untuk memberikan otorisasi kepada Penyelenggara Layanan untuk mengumpulkan dan menggunakan Data Pribadi Calon Penerima Pinjaman .</div>
              <span>
                3.1.1.Data Pribadi Calon Penerima Pinjaman yang wajib diberikan kepada Penyelenggara Layanan dan dapat dikumpulkan, digunakan, disimpan oleh Penyelenggara Layanan termasuk namun tidak terbatas pada:
                <span className="lastNum">
                  <span className="num">a)</span>
                  <span className="text">Identitas diri;</span>
                </span>
                <span className="lastNum">
                  <span className="num">b)</span> 
                  <span className="text">Rekening bank Calon Penerima Pinjaman atau rekening pembayaran lainnya;</span>
                </span>
                <span className="lastNum">
                  <span className="num">c)</span>
                  <span className="text">Tempat dilakukannya pendaftaran pada akun Pinjam Gampang di Website Calon Penerima Pinjaman ;</span>
                </span>
                <span className="lastNum">
                  <span className="num">d)</span>
                  <span className="text">Catatan transaksi bisnis (antara lain terkait sisa saldo,daftar transfer, pembayaran kredit) dan informasi dari media sosial;</span>
                </span>
                <span className="lastNum">
                  <span className="num">e) </span>
                  <span className="text">Informasi dari buku alamat yang terdapat pada telepon seluler, akun media sosial maupun email;</span>
                </span>
                <span className="lastNum">
                  <span className="num">f)</span>
                  <span className="text">Informasi transaksi melalui Akun Pinjam Gampang;</span>
                </span>
                <span className="lastNum">
                  <span className="num">g)</span>
                  <span className="text">Informasi dari Pihak Ketiga terkait layanan Penyelenggara Layanan;</span>
                </span>
                <span className="lastNum">
                  <span className="num">h)</span>
                  <span className="text">Informasi Operasi Calon Penerima Pinjaman;</span>
                </span>
                <span className="lastNum">
                  <span className="num">i)</span>
                  <span className="text">Informasi yang diberikan pada saat Calon Penerima Pinjaman menghubungi tim layanan pelanggan Penyelenggara Layanan, dan informasi yang diberikan saat Calon Penerima Pinjaman berpartisipasi dalam survey, kuesioner dari Penyelenggara Layanan;</span>
                </span>
                <span className="lastNum">
                  <span className="num">j)</span>
                  <span className="text">Email dan akun media sosial; dan</span>
                </span>
                <span className="lastNum">
                  <span className="num">k)</span>
                  <span className="text">Informasi yang dikumpulkan saat Calon Penerima Pinjaman  berinteraksi dengan Afiliasi dan mitra bisnis Penyelenggara Layanan.
                  </span>
                </span>
              </span>
            </div>

            <div className="textRight">
              <span>
                3.1.2.Pengumpulan Data Pribadi Calon Penerima Pinjaman oleh Penyelenggara Layanan dilakukan dengan melakukan akses termasuk namun tidak terbatas pada:
                <span className="lastNum">
                  <span className="num">a)</span>
                  <span className="text">Akun Pinjam Gampang milik Calon Penerima Pinjaman ;</span>
                </span>
                <span className="lastNum">
                  <span className="num">b)</span>
                  <span className="text">Kartu Kredit/Rekening Bank Calon Penerima Pinjaman ;</span>
                </span>
                <span className="lastNum">
                  <span className="num">c)</span>
                  <span className="text">Akun Media Sosial Calon Penerima Pinjaman (Facebook, Twitter, LinkedIn, dan akun lainnya);</span>
                </span>
                <span className="lastNum">
                  <span className="num">d)</span>
                  <span className="text">Akun bisnis elektronik Calon Penerima Pinjaman (Tokopedia, Bukalapak, Blibli, Lazada, Elevenia, Ticket.com, Traveloka, Agoda, dll);</span>
                </span>
                <span className="lastNum">
                  <span className="num">e)</span>
                  <span className="text">Nomor ponsel Calon Penerima Pinjaman ; dan</span>
                </span>
                <span className="lastNum">
                  <span className="num">f)</span>
                  <span className="text">Bank atau pihak ketiga lainnya yang dipilih Penyelenggara Layanan selama proses pendaftaran.</span>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <span className="num"><b>3.2</b></span>
            <span className="text"><b>PENGGUNAAN DATA PRIBADI CALON PENERIMA PINJAMAN</b></span>
          </div>
          <div>
            <div className="textRight">
              <div>Calon Penerima Pinjaman dengan ini setuju dan sepakat untuk memberikan otorisasi kepada Pihak Pertama untuk menggunakan Data Pribadi Calon Penerima Pinjaman untuk kepentingan:
                <span className="lastNum">
                  <span className="num">a)</span>
                  <span className="text">Kepatuhan terhadap peraturan perundang-undangan yang berlaku;</span>
                </span>
                <span className="lastNum">
                  <span className="num">b)</span>
                  <span className="text">Penyelenggaraan jasa pinjam meminjam;</span>
                </span>
                <span className="lastNum">
                  <span className="num">c)</span>
                  <span className="text">Peningkatan Layanan milik Penyelenggara Layanan kepada Calon Penerima Pinjaman ;</span>
                </span>
                <span className="lastNum">
                  <span className="num">d)</span>
                  <span className="text">Pemberitahuan kepada Calon Penerima Pinjaman tentang status Layanan Penyelenggara Layanan atau untuk menerima informasi tentang Layanan milik Penyelenggara Layanan, serta untuk memberitahukan kepada Calon Penerima Pinjaman mengenai status pemasaran dan informasi elektronik komersial lainnya;</span>
                </span>
                <span className="lastNum">
                  <span className="num">e)</span>
                  <span className="text">Memberikan Calon Penerima Pinjaman sebuah lingkaran sosial yang lebih luas;</span>
                </span>
                <span className="lastNum">
                  <span className="num">f)</span>
                  <span className="text">Pencegahan perbuatan melawan hukum; dan</span>
                </span>
                <span className="lastNum">
                  <span className="num">g)</span>
                  <span className="text">Kegunaan lain yang diizinkan oleh Calon Penerima Pinjaman .</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <span className="num">3.3</span>
            <span className="text">Tunduk pada ketentuan tersebut Pasal 3 ayat 3.2 di atas, Penyelenggara Layanan dapat bekerjasama dan melakukan pertukaran Data Pribadi Calon Penerima Pinjaman untuk keperluan mitigasi risiko dengan:</span>
          </div>
          <div>
            <div className="textRight" style={{'marginTop':'0px'}}>
              <div>
                <span className="lastNum">
                  <span className="num">a)</span>
                  <span className="text">Otoritas Jasa Keuangan (“OJK”);</span>
                </span>
                <span className="lastNum">
                  <span className="num">b)</span>
                  <span className="text">Pajak</span>
                </span>
                <span className="lastNum">
                  <span className="num">c)</span>
                  <span className="text">Pengadilan</span>
                </span>
                <span className="lastNum">
                  <span className="num">d)</span>
                  <span className="text">Payment Partner;</span>
                </span>
                <span className="lastNum">
                  <span className="num">e)</span>
                  <span className="text">Penyelenggara layanan pendukung berbasis teknologi informasi;</span>
                </span>
                <span className="lastNum">
                  <span className="num">f)</span>
                  <span className="text">Afiliasi Pihak Pertama; dan</span>
                </span>
                <span className="lastNum">
                  <span className="num">g)</span>
                  <span className="text">Karyawan, pegawai, direktur Pihak Pertama dan Afiliasi Pihak Pertama.</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <span className="num"><b>3.4</b></span>
            <span className="text"><b>PERUBAHAN DATA PRIBADI CALON PENERIMA PINJAMAN</b></span>
          </div>
          <div>
            <div className="textRight" style={{'marginTop':'0px'}}>
              <div>
                Calon Penerima Pinjaman dapat mengubah Data Pribadi Calon Penerima Pinjaman sesuai dengan prosedur yang telah ditentukan oleh Pihak Pertama dan wajib segera menginformasikannya kepada Pihak Pertama.
              </div>
            </div>
          </div>
        </div>

        <div className="firstTitle">PASAL 4</div>
        <div className="firstTitle">PERLINDUNGAN DATA PRIBADI CALON PENERIMA PINJAMAN</div>
        <div className="serviceDetail">Penyelenggara Layanan akan berupaya sebaik mungkin menjaga kerahasiaan setiap Data Pribadi Calon Penerima Pinjaman , baik yang disampaikan langsung oleh Calon Penerima Pinjaman pada saat pendaftaran Akun Pinjam Gampang, maupun yang dikumpulkan oleh Calon Penerima Pinjaman berdasarkan ketentuan Perjanjian ini baik dengan menggunakan perangkat keras dan perangkat lunak yang teruji keamanannya secara fisik, elektronik dan administrasi yang wajar.</div>

        <div className="firstTitle">PASAL 5</div>
        <div className="firstTitle">PENYIMPANAN DATA PRIBADI CALON PENERIMA PINJAMAN</div>
        <div className="serviceDetail">
          <div>
            <span className="num">5.1</span>
            <span className="text">Semua Data Pribadi Calon Penerima Pinjaman yang diterima Penyelenggara Layaan berdasarkan Perjanjian ini akan disimpan dengan aman di negara Indonesia dan di lokasi Afiliasi Penyelenggara Layanan.</span>
          </div>
          <div>
            <span className="num">5.2</span>
            <span className="text">Setelah lewatnya jangka waktu penyimpanan sebagaimana dimaksud Pasal 6.2 Perjanjian ini, Calon Penerima Pinjaman dapat meminta Penyelenggara Layanan untuk memusnahkan Data Pribadi Pihak Kedua baik pada sistem elektronik milik Penyelenggara Layanan maupun secara fisik.</span>
          </div>
        </div>

        <div className="firstTitle">PASAL 6</div>
        <div className="firstTitle">JANGKA WAKTU</div>
        <div className="serviceDetail">
          <div>
            <span className="num">6.1</span>
            <span className="text">Perjanjian ini berlaku efektif pada tanggal pendaftaran Akun Pinjam Gampang atas nama Calon Penerima Pinjaman pada Website Penyelenggara Layanan dan akan berakhir pada saat penutupan Akun Pinjam Gampang Calon Penerima Pinjaman berdasarkan Perjanjian ini</span>
          </div>
          <div>
            <span className="num">6.2</span>
            <span className="text">Penyelenggara Layanan berhak menyimpan Data Pribadi Calon Penerima Pinjaman di sistem elektronik Pihak Pertama paling singkat selama 5 (lima) tahun sejak penutupan Akun Pinjam Gampang Calon Penerima Pinjaman berdasarkan Perjanjian ini. Ketentuan ini akan tetap berlaku walaupun Perjanjian ini berakhir atau diakhiri.</span>
          </div>
        </div>

        <div className="firstTitle">PASAL 7</div>
        <div className="firstTitle">PERNYATAAN DAN JAMINAN</div>
        <div className="serviceDetail">
          <div>
            <span className="num"><b>7.1</b></span>
            <span className="text"><b>Calon Penerima Pinjaman Menyatakan dan Menjamin:</b></span>
          </div>
          <div>
            <div className="textRight">
              <div>
                <span className="lastNum">
                  <span className="num">a)</span>
                  <span className="text">Terkait dengan kapasitasnya mengikatkan diri dalam Perjanjian:
                    <span className="lastNum">
                      <span className="num">-</span>
                      <span className="text">Bahwa Penyelenggara Layanan adalah perusahaan yang didirikian berdasarkan hukum Indonesia yang telah mendapatkan izin usaha sebagaimana dipersyaratkan peraturan perundang-undangan yang berlaku dan akan menjaga keberlakuan izin usaha tersebut sampai dengan berakhirnya Perjanjian; atau</span>
                    </span>
                    <span className="lastNum">
                      <span className="num">-</span>
                      <span className="text">Bahwa Calon Penerima Pinjaman adalah warga negara Indonesia yang cakap hukum serta mampu bertindak untuk dan atas namanya sendiri berdasarkan hukum Indonesia.</span>
                    </span>
                  </span>
                </span>
              </div>
              <div>
                <span className="lastNum">
                  <span className="num">b)</span>
                  <span className="text">Penyelenggara Layanan telah mendapatkan persetujuan rapat umum pemegang saham untuk menandatangani Perjanjian;</span>
                </span>
              </div>
              <div>
                <span className="lastNum">
                  <span className="num">c)</span>
                  <span className="text">Calon Penerima Pinjaman merupakan pemilik Data Pribadi dan berhak mengungkapkan Data Pribadi Pihak Kedua kepada Pihak Pertama;</span>
                </span>
              </div>
              <div>
                <span className="lastNum">
                  <span className="num">d)</span>
                  <span className="text">Calon Penerima Pinjaman adalah satu-satunya pihak yang dapat menggunakan akun Pinjam Gampang milik Calon Penerima Pinjaman ;</span>
                </span>
              </div>
              <div>
                <span className="lastNum">
                  <span className="num">e)</span>
                  <span className="text">Penyelenggara Layanan akan menjaga kerahasiaan kata sandi Akun Pinjam Gampang milik Calon Penerima Pinjaman;</span>
                </span>
              </div>
              <div>
                <span className="lastNum">
                  <span className="num">f)</span>
                  <span className="text">Calon Penerima Pinjaman bertanggung jawab sendiri untuk semua tindakan dan pernyataan yang dibuat dengan menggunakan Akun Pinjam Gampang dan kata sandi Akun Tunai milik Calon Penerima Pinjaman;</span>
                </span>
              </div>
              <div>
                <span className="lastNum">
                  <span className="num">g)</span>
                  <span className="text">Seluruh Data Pribadi yang diberikan Calon Penerima Pinjaman adalah akurat, benar, valid, terkini dan lengkap sesuai dengan persyaratan pendaftaran Akun Pinjam Gampang;</span>
                </span>
              </div>
              <div>
                <span className="lastNum">
                  <span className="num">h)</span>
                  <span className="text">Calon Penerima Pinjaman akan menaati semua instruksi, syarat dan ketentuan yang berlaku pada saat mengajukan permohonan melalui Website Penyelenggara Layanan;</span>
                </span>
              </div>
              <div>
                <span className="lastNum">
                  <span className="num">i)</span>
                  <span className="text">Calon Penerima Pinjaman tidak akan mengajukan permohonan ganti nama asli untuk tujuan apa pun yang melanggar hukum atau dilarang oleh Perjanjian ini. Calon Penerima Pinjaman tidak akan menggunakan Layanan Real Name Verification dengan cara apapun yang dapat merusak, melumpuhkan, mengganggu atau menyebabkan kerusakan ke website lain atau Website Penyelenggara Layanan atau mengganggu penggunaan aplikasi pembuktian keaslian nama sebenarnya di Akun Pinjam Gampang; dan</span>
                </span>
              </div>
              <div>
                <span className="lastNum">
                  <span className="num">j)</span>
                  <span className="text">Calon Penerima Pinjaman tidak akan memperoleh atau berusaha memperoleh informasi selain yang disediakan pada Website Penyelenggara Layanan terkait Layanan Penyelenggara Layanan, dengan cara melanggar hukum atau Perjanjian ini.</span>
                </span>
              </div>
            </div>
          </div>
          <div>
            <span className="num"><b>7.2</b></span>
            <span className="text"><b>PERNYATAAN DAN JAMINAN PENYELENGGARA LAYANAN</b></span>
          </div>
          <div>
            <div className="textRight">Penyelenggara Layanan dengan ini menjamin dan menyatakan bahwa:
              <span className="lastNum">
                <span className="num">a)</span>
                <span className="text">Penyelenggara Layanan telah memiliki izin dari OJK dan otoritas terkait lainnya;</span>
              </span>
              <span className="lastNum">
                <span className="num">b)</span>
                <span className="text">Dengan tetap tunduk pada ketentuan peraturan perundang-undangan yang berlaku, Penyelenggara Layanan akan menjaga kerahasian Data Pribadi Calon Penerima Pinjaman dalam sistem elektronik Penyelenggara Layanan; dan</span>
              </span>
              <span className="lastNum">
                <span className="num">c)</span>
                <span className="text">Calon Penerima Pinjaman akan menggunakan Data Pribadi Calon Penerima Pinjaman  untuk kepentingan permohonan pinjaman dan pemutakhiran Layanan Penyelenggara Layanan kepada Calon Penerima Pinjaman.</span>
              </span>
            </div>
          </div>
        </div>

        <div className="firstTitle">PASAL 8</div>
        <div className="firstTitle">INDEMNIFIKASI</div>
        <div className="serviceDetail">
          <div>
            <div className="lastNum">Calon Penerima Pinjaman wajib melindungi, mengganti rugi dan membebaskan Pihak Pertama dari dan terhadap segala klaim, kerugian, pertanggungjawaban, tuntutan, gugatan serta putusan (termasuk biaya hukum) yang timbul karena adanya :</div>
            <div className="textRight">
              <div className="lastNum">
                <span className="num">a)</span>
                <span className="text">Kerugian Pihak Ketiga;</span>
              </div>
              <div className="lastNum">
                <span className="num">b)</span>
                <span className="text">Penyalahgunaan Data Pribadi oleh pihak selain Penyelenggara Layanan;</span>
              </div>
              <div className="lastNum">
                <span className="num">c)</span>
                <span className="text">Penggunaan Akun Pinjam Gampang oleh Calon Penerima Pinjaman;</span>
              </div>
              <div className="lastNum">
                <span className="num">d)</span>
                <span className="text">Penggunaan dana pinjaman oleh Calon Penerima Pinjaman;</span>
              </div>
              <div className="lastNum">
                <span className="num">e)</span>
                <span className="text">Pengungkapan Kata Sandi kepada Pihak Ketiga yang dilakukan bukan oleh Penyelenggara Layanan;</span>
              </div>
              <div className="lastNum">
                <span className="num">f)</span>
                <span className="text">Tautan terhadap Website selain Website Penyelenggara Layanan;</span>
              </div>
              <div className="lastNum">
                <span className="num">g)</span>
                <span className="text">Masalah yang terdapat pada sistem bank yang digunakan dan dipilih Calon Penerima Pinjaman;</span>
              </div>
              <div className="lastNum">
                <span className="num">h)</span>
                <span className="text">Masalah jaringan operasi terkait koneksi bank atau faktor Keadaan Kahar lainnya;</span>
              </div>
              <div className="lastNum">
                <span className="num">i)</span>
                <span className="text">Penggunaan atau kegagalan Calon Penerima Pinjaman dalam menggunakan Layanan Penyelenggara Layanan;</span>
              </div>
              <div className="lastNum">
                <span className="num">j)</span>
                <span className="text">Biaya dan kerugian karena pembelian atau pengambilalihan barang, sampel, data, informasi atau transaksi yang sah oleh Calon Penerima Pinjaman melalui Layanan Penyelenggara Layanan;</span>
              </div>
              <div className="lastNum">
                <span className="num">k)</span>
                <span className="text">Kesalahpahaman Calon Penerima Pinjaman atas Layanan milik Penyelenggara Layanan;</span>
              </div>
              <div className="lastNum">
                <span className="num">l)</span>
                <span className="text">Kerugian lain yang timbul dari Layanan milik Penyelenggara Layanan yang tidak disebabkan oleh Penyelenggara Layanan ;</span>
              </div>
              <div className="lastNum">
                <span className="num">m)</span>
                <span className="text">Setiap kerusakan yang disebabkan oleh serangan peretas, gangguan atau serangan virus pada komputer, penyesuaian teknis di sektor telekomunikasi, penutupan sementara karena peraturan pemerintah, dan kerusakan lainnya yang bukan merupakan kesalahan informasi yang telah diotentikasi Penyelenggara Layanan bocor, hilang, dicuri atau dirusak;</span>
              </div>
              <div className="lastNum">
                <span className="num">n)</span>
                <span className="text">Segala risiko yang timbul akibat devaluasi mata uang;</span>
              </div>
              <div className="lastNum">
                <span className="num">o)</span>
                <span className="text">Tidak terpenuhinya faktor validitas, akurasi, ketepatan, keandalan, kualitas, stabilitas, kelengkapan atau ketepatan waktu dari informasi dan teknologi pada Layanan milik Penyelenggara Layanan.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="firstTitle">PASAL 9</div>
        <div className="firstTitle">PERUBAHAN PERJANJIAN</div>
        <div className="serviceDetail">
          <div>
            <span className="num">9.1</span>
            <span className="text">Calon Penerima Pinjaman setuju bahwa setiap saat Penyelenggara Layanan dapat mengubah Perjanjian ini dan mengumumkannya pada laman Website Penyelenggara Layanan dan Layanan milik Penyelenggara Layanan serta memberitahukan secara langsung kepada Calon Penerima Pinjaman. Perubahan Perjanjian bahwa akan berlaku efektif segera setelah dipublikasikan.</span>
          </div>
          <div>
            <span className="num">9.2</span>
            <span className="text">Calon Penerima Pinjaman dapat mengakses perubahan Perjanjian tersebut melalui halaman Website Penyelenggara Layanan dan Layanan milik Calon Penerima Pinjaman.</span>
          </div>
          <div>
            <span className="num">9.3</span>
            <span className="text">Jika Calon Penerima Pinjaman memutuskan untuk tetap menggunakan Layanan Penyelenggara Layanan setelah pemberitahuan perubahan Perjanjian tersebut berlaku efektif, maka Calon Penerima Pinjaman dianggap telah sepenuhnya membaca, memahami dan sepakat atas seluruh isi Perjanjian termasuk segala perubahannya.</span>
          </div>
          <div>
            <span className="num">9.4</span>
            <span className="text">Jika Calon Penerima Pinjaman tidak setuju dengan isi dari perubahan Perjanjian sebagaimana dimaksud dalam Pasal 9.1 Perjanjian ini, Calon Penerima Pinjaman wajib segera menginformasikan penolakan tersebut kepada Pihak Pertama dan sepakat untuk berhenti menggunakan Layanan Penyelenggara Layanan.</span>
          </div>
        </div>

        <div className="firstTitle">PASAL 10</div>
        <div className="firstTitle">PENGAKHIRAN PERJANJIAN</div>
        <div className="serviceDetail">
          <div>
            <span className="num">10.1</span>
            <span className="text">Penyelenggara Layanan dapat secara sepihak mengakhiri Perjanjian lebih awal dengan pemberitahuan tiga (3) hari sebelumnya apabila Calon Penerima Pinjaman melanggar syarat dan ketentuan sebagaimana diatur dalam Perjanjian;</span>
          </div>
          <div>
            <span className="num">10.2</span>
            <span className="text">Dalam hal Penyelenggara Layanan mengakhiri Perjanjian lebih awal sebagaimana dimaksud dalam Pasal 10.1, Penyelenggara Layanan berhak menangguhkan atau menghentikan Layanan Penyelenggara Layanan kepada Calon Penerima Pinjaman baik sebagian atau seleruhnya;10.3 Dalam hal pengakhiran Perjanjian, Para Pihak sepakat mengesampingkan ketentuan Pasal 1266 Kitab Undang-Undang Hukum Perdata.</span>
          </div>
        </div>

        <div className="firstTitle">PASAL 11</div>
        <div className="firstTitle">HUKUM YANG MENGATUR</div>
        <div className="serviceDetail">Perjanjian ini akan diatur oleh dan ditafsirkan dalam segala hal berdasarkan hukum Negara Republik Indonesia.</div>

        <div className="firstTitle">PASAL 12</div>
        <div className="firstTitle">PENYELESAIAN SENGKETA</div>
        <div className="serviceDetail">Setiap sengketa yang timbul dari atau sehubungan dengan Perjanjian dan tidak dapat diselesaikan secara musyawarah mufakat oleh Para Pihak dalam jangka waktu tiga puluh (30) hari setelah pemberitahuan sengketa pertama kali akan di selesaikan melalui Badan Arbitrase Nasional Indonesia (BANI) dan tunduk pada prosedur BANI Rules yang berlaku pada saat permohonan arbitrase didaftarkan. Demikian, Para Pihak menandatangani Perjanjian ini dalam rangkap 2 (dua) yang masing-masing mempunyai kekuatan hukum yang sama. </div>

        <div style={{'marginTop':'4%'}}>Perjanjian ini ditandatangani di atas meterai cukup pada hari, tanggal, bulan dan tahun yang disebutkan pertama kali pada Perjanjian ini.</div>
      </div>
    );
  }
}

PrivacyService.defaultProps = {
};

export default PrivacyService;
