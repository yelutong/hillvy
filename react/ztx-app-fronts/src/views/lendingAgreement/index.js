import React from 'react';
import axios from 'axios';
import restStore from './store';

class LendingAgreement extends React.Component {
  state = {
    contractData:{}
  };

  componentWillMount() {
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
            this.setState({
              contractData:res.data.body
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
          <p>Perjanjian Layanan Kerjasama ini dibuat pada tanggal [{this.state.contractData.loanDate?this.state.contractData.loanDate:'•'}] (selanjutnya disebut “<b>Perjanjian</b>”) oleh dan antara:</p>
        </div>
        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num">1.</span>
            <span className="text">
              [<b>nama Pemberi Pinjaman</b>], suatu perseroan terbatas yang didirikan berdasarkan hukum di [•] berkedudukan di [•] dan beralamat di [•], dalam hal ini diwakili oleh [nama Pihak yang sah mewakili Pemberi Pinjaman] selaku [•] dari dan oleh karenanya sah bertindak bertindak untuk dan atas nama [xxx], selanjutnya disebut <b>Pemberi Pinjaman</b>.
              <span style={{'display':'block','margin-top':'0.2em'}}><b>Jika orang perseroangan</b></span>
              <span style={{'display':'block','margin-top':'0.2em'}}>[<b>nama Pemberi Pinjaman</b>], warga negara [<b>warga negara Pemberi Pinjaman</b>], pemegang kartu tanda pengenal [{this.state.contractData.lenderName?this.state.contractData.lenderName:'xxxx'}] dengan No. [{this.state.contractData.lenderIdNum?this.state.contractData.lenderIdNum:'xxx'}], beralamat di [xxxx], dalam hal ini bertindak untuk dan atas nama dirinya, selanjutnya disebut <b>Pemberi Pinjaman</b>.</span>
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

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>4.</b></span>
            <span className="text"><b>Pemberian dan Pengembalian Dana Pinjaman</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft lendingAgreement">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Bahwa Pemberi Pinjaman dengan ini sepakat bahwa dana yang disetorkan/dipergunakan pada Layanan ini tidak berasal dari/untuk ditujukan tindak pidana pencucian uang (Money Laundering)
                </span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Pemberi Pinjaman sepakat akan memberikan dana pinjaman kepada Penyelenggara Layanan (“<b>Pinjaman</b>”) sebesar Rp[{this.state.contractData.principal?this.state.contractData.principal:'xxxx'}] ([xxxx] rupiah) untuk jangka waktu [{this.state.contractData.term?(this.state.contractData.term+'hari'):'xxx'}] yang berlaku efektif sejak Perjanjian ini ditandatangani.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">3.</span>
                <span className="text">Pemberi Pinjaman menyetujui dan sepakat menyetorkan Pinjaman sebagaimana dimaksud pada ayat (2) dikirimkan melalui transfer dari Rekening Pemberi Pinjaman kepada Rekening Escrow Penyelenggara Layanan paling lambat [2] hari sejak ….. disetujuinya permohonan layanan dari calon Penerima Pinjaman yang sesuai dengan kriteria sebagaimana dimaksud dalam Pasal 3 Perjanjian ini.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">4.</span>
                <span className="text">Pemberi Pinjaman dengan ini mengenakan bunga kepada Penerima Pinjaman sebesar [xxx] % ([xxx] persen) pertahun  atau sebesar [{this.state.contractData.rate?this.state.contractData.rate:'xxx'}] perhari dan bunga berlaku efektif sejak Pinjaman tercatat pada Rekening Escrow Penyelenggara Layanan.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">5.</span>
                <span className="text">Pemberi Pinjaman setuju dan sepakat untuk memberikan kuasa kepada Penyelenggara Layanan berhak untuk melakukan pendebetan pada Rekening Escrow  dan menyalurkannya kepada rekening Penerima Pinjaman pada saat sistem menyetujui aplikasi permohonan Pinjaman Penerima Pinjaman yang sesuai dengan kriteria yang diajukan oleh Pemberi Pinjaman.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">6.</span>
                <span className="text">Penyelenggara Layanan wajib untuk melakukan transfer kepada Pemberi Pinjaman paling lambat [2] hari setelah menerima dana pengembalian Pinjaman beserta dari Penerima Pinjaman paling lambat [2] hari setelah dana setelah dana Pinjaman masuk ke Rekening Escrow Penyelenggara Layanan.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">7.</span>
                <span className="text">Dalam hal tidak terdapat Penerima Pinjaman yang sesuai dengan kriteria Pemberi Pinjaman sampai dengan jangka waktu xxx (2) hari terhitung sejak Pinjaman aktif di Rekening Escrow Penyelenggara Layanan, maka Penyelenggara Layanan wajib mengembalikan Pinjaman tersebut kepada Pemberi Pinjaman.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">8.</span>
                <span className="text">Dalam hal terjadi hal sebagaimana dimaksud pada ayat (7) diatas, maka Pemberi Pinjaman tidak berhak atas bunga dari Pinjaman tersebut dan Penyelenggara Pinjaman tidak berhak atas komisi dari hal tersebut.
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>5.</b></span>
            <span className="text"><b>Komisi</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft lendingAgreement">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Atas setiap persetujuan permohonan pinjaman yang diajukan Penerima Pinjaman, Penyelenggara berhak atas komisi sebesar [{this.state.contractData.serviceRate?this.state.contractData.serviceRate:'xxx'}] % terhitung dari jumlah pinjaman yang diajukan Penerima Pinjaman. 
                  <span style={{'display':'block'}}>Jika terdapat denda atas keterlambatan, pendapatan denda adalah sebesar ({this.state.contractData.fixedRate?this.state.contractData.fixedRate:'xx'})% dari pokok pinjaman. Mulai dari hari keempat sejak tanggal keterlambatan, pendapatan denda adalah sebesar ({this.state.contractData.defaultRate?this.state.contractData.defaultRate:'xx'})% dari jumlah pokok pinjaman dibebankan setiap hari sampai dengan pelunasan penuh pinjaman;</span>
                </span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Komisi akan dipotong pada saat transaksi Pinjam Meminjam selesai.
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>6.</b></span>
            <span className="text"><b>Jangka Waktu Perjanjian</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft lendingAgreement">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Perjanjian ini berlaku untuk jangka waktu [{this.state.contractData.term?this.state.contractData.term:'xxx'}] hari dan secara efektif berlaku sejak Perjanjian ini ditandatangani.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Selambat-lambatnya [3] bulan sebelum jangka waktu berakhirnya Perjanjian ini, Para Pihak sepakat untuk saling memberitahukan maksudnya dalam hal ingin memperpanjang Perjanjian ini.
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>7.</b></span>
            <span className="text"><b>Akses Penggunaan Dana</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft lendingAgreement">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Penyelenggara Layanan dengan ini sepakat untuk menyediakan dan memberikan Akses Penggunaan Dana kepada Pemberi Pinjaman atas penggunaan dananya.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Akses Penggunaan Dana sebagaimana dimaksud pada ayat (1) diatas, termasuk namun tidak terbatas pada:
                  <span className="lastNum">
                    <span className="num">a.</span>
                    <span className="text">Jumlah dana yang dipinjamkan kepada Penerima Pinjaman;</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">b.</span>
                    <span className="text">Tujuan pemanfaatan dana oleh Penerima Pinjaman;</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">c.</span>
                    <span className="text">Besaran bunga pinjaman;</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">d.</span>
                    <span className="text">Jangka waktu pinjaman.</span>
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>8.</b></span>
            <span className="text"><b>Hak dan Kewajiban Pemberi Pinjaman</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft lendingAgreement">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Pemberi Pinjaman dengan ini berhak atas pengembalian dana beserta bunga secara tepat waktu.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Pemberi Pinjaman berhak atas Hak Penggunaan Data Penerima Pinjaman sebagai tertuang dalam Pasal 7 Perjanjian ini.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">3.</span>
                <span className="text">Pemberi Pinjaman diwajibkan untuk menyetorkan dana Pinjaman paling lambat [3] hari setelah disetujuinya permohonan Pinjaman dari calon Penerima Pinjaman yang sesuai dengan kriteria sebagaimana tertuang dalam Pasal 3 ayat (1) Perjanjian ini.
                </span>
              </span>
              <span className="secondNum">
                <span className="num">4.</span>
                <span className="text">Pemberi Pinjaman dilarang untuk dengan cara apapun, memberikan data dan/atau informasi mengenai Penerima Pinjaman kepada Pihak Ketiga.
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>9.</b></span>
            <span className="text"><b>Hak dan Kewajiban Penyelenggara Layanan</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft lendingAgreement">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Setelah Transaksi antara Pemberi Pinjaman dan Penerima Pinjaman berakhir, Pemberi Pinjaman setuju untuk memberikan komisi kepada Penyelenggara Layanan dengan presentase sebesar [{this.state.contractData.serviceRate?this.state.contractData.serviceRate:'xxx'}] % dari nominal dana Pinjaman yang diberikan.
                  <span className="lastNum">
                    Jika terdapat denda atas keterlambatan, pendapatan denda adalah sebesar ({this.state.contractData.fixedRate?this.state.contractData.fixedRate:'xx'})% dari pokok pinjaman. Mulai dari hari keempat sejak tanggal keterlambatan, pendapatan denda adalah sebesar ({this.state.contractData.defaultRate?this.state.contractData.defaultRate:'xx'})% dari jumlah pokok pinjaman dibebankan setiap hari sampai dengan pelunasan penuh pinjaman;
                  </span>
                </span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Penyelenggara Layanan wajib untuk termasuk namun tidak terbatas pada:
                  <span className="lastNum">
                    <span className="num">a.</span>
                    <span className="text">Melakukan verifikasi Penerima Pinjaman yang sesuai dengan kriteria Penerima Pinjaman sebagaimana tertuang dalam Pasal III ayat (1) Perjanjian ini.</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">b.</span>
                    <span className="text">Menyalurkan Pinjaman kepada Penerima Pinjaman</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">c.</span>
                    <span className="text">Melakukan penagihan kepada Penerima Pinjaman yang telah jatuh tempo.</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">d.</span>
                    <span className="text">Menyalurkan kembali dana Pinjaman beserta bunga kepada Pemberi Pinjaman paling lambat [3] hari setelah dana Pinjaman masuk ke Rekening Escrow Penyelenggara Layanan</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">e.</span>
                    <span className="text">Dalam hal terjadi masalah teknis pada sistem yang mengganggu terlaksananya Perjanjian ini termasuk namun tidak terbatas pada masalah akses atau sebab-sebab lain yang untuk sementara waktu menyebabkan proses pengiriman informasi dari sistem Layanan  terganggu, Penyelenggara berkewajiban memberitahukan kepada Pemberi Pinjaman melalui email, telepon, atau cara lain, paling lambat 1 (satu) kali 24 (dua puluh empat) jam setelah terjadinya hal-hal tersebut.</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">f.</span>
                    <span className="text">Penyelenggara dilarang dengan cara apapun, memberikan data dan/atau informasi mengenai Pemberi Pinjaman kepada Pihak Ketiga, kecuali termasuk namun tidak terbatas pada:
                      <span className="lastNum">
                        <span className="num">1)</span>
                        <span className="text">Telah mendapatkan persetujuan secara elektronik dari Pemberi Pinjaman; dan/atau</span>
                      </span>
                      <span className="lastNum">
                        <span className="num">2)</span>
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
          <div className="lessNum">
            <span className="num"><b>10.</b></span>
            <span className="text"><b>Kuasa</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft lendingAgreement">
              <span className="secondNum">
                Pemberi Pinjaman dengan ini setuju dan sepakat untuk memberikan kuasa kepada Penyelenggara Layanan untuk termasuk namun tidak terbatas pada kegiatan sebagai berikut:
                <div className="textRight lessLeft lendingAgreement">
                  <span className="lastNum">
                    <span className="num">a.</span>
                    <span className="text">Melakukan verifikasi Penerima Pinjaman yang sesuai dengan kriteria Pemberi Pinjaman sebagaimana tertuang dalam Pasal 3 Perjanjian ini;</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">b.</span>
                    <span className="text">Melakukan pendebetan atas dana Pemberi Pinjaman yang tersimpan dalam Rekening Escrow Penyelengara Layanan dalam hal terdapat  Penerima Pinjaman yang sesuai dengan kriteria yang diberikan Pemberi Pinjmaan sebagaimana tertuang dalam Pasal 2 Perjanjian ini;
                    </span>
                  </span>
                  <span className="lastNum">
                    <span className="num">c.</span>
                    <span className="text">Menagihkan Pinjaman kepada Penerima Pinjaman pada saat jatuh tempo;
                    </span>
                  </span>
                  <span className="lastNum">
                    <span className="num">d.</span>
                    <span className="text">Menyalurkan kembali dana hasil Pinjaman beserta bunga kepada Pemberi Pinjaman.
                    </span>
                  </span>
                </div>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>11.</b></span>
            <span className="text"><b>Pernyataan Pemberi Pinjaman</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft lendingAgreement">
              <div>Pemberi Pinjaman dengan ini menyatakan sebagai berikut:</div>
              <div className="textRight lessLeft lendingAgreement">
                <span className="secondNum">
                  <span className="num">1.</span>
                  <span className="text">Bahwa pihak yang mewakili Pemberi Pinjaman untuk menandatangani Perjanjiian ini adalah pihak yang sah dan berwenang untuk bertindak untuk dan taas nama serta mewakili Pemberi Pinjaman.
                  </span>
                </span>
                <span className="secondNum">
                  <span className="num">2.</span>
                  <span className="text">Bahwa semua informasi yang tercantum dalam Perjanjian ini adalah benar dan sah, bilamana dikemudian hari terdapat tuntutan dalam bentuk dari pihak ketiga atas transaksi terhadap Penyelenggara maka saya,  Pemberi Pinjaman, bertanggung jawab penuh atas tuntutan pihak ketiga tersebut  baik yang besifat kasus perdata maupun pidana;
                  </span>
                </span>
                <span className="secondNum">
                  <span className="num">3.</span>
                  <span className="text">Semua penyetoran dana hanya ditujukan kepada Rekening Escrow pada Bank yang ditunjuk oleh Penyelenggara;
                  </span>
                </span>
                <span className="secondNum">
                  <span className="num">4.</span>
                  <span className="text">Semua sumber dana yang saya gunakan untuk Layanan ini bukan didapatkan atau berasal dari pencucian uang (Money Laundering) atau kegiatan lain yang melanggar hokum.
                  </span>
                </span>
                <span className="secondNum">
                  <span className="num">5.</span>
                  <span className="text">Bahwa tidak akan menggunakan Layanan ini sebagai sarana untuk melakukan tindakan yang dapat dikategorikan melanggar hokum termasuk tidak terbatas pada tindakan pidana pencucian uang
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>12.</b></span>
            <span className="text"><b>Pengakhiran</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft lendingAgreement">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Perjanjian ini dapat diakhiri dengan ketentuan:
                  <span className="lastNum">
                    <span className="num">a.</span>
                    <span className="text">Apabila Para Pihak mengalihkan hak dan kewajibannya dalam Perjanjian ini kepada Pihak lain tanpa persetujuan Pihak satunya;
                    </span>
                  </span>
                  <span className="lastNum">
                    <span className="num">b.</span>
                    <span className="text">Apabila sebelum jangka waktu Perjanjian berakhir, Para Pihak menyepakati untuk mengakhiri Perjanjian secara tertulis;
                    </span>
                  </span>
                  <span className="lastNum">
                    <span className="num">c.</span>
                    <span className="text">Apabila salah satu Pihak melakukan pelanggaran atau kelalaian sebagaimana diatur dalam Perjanjian ini, termasuk namun tidak terbatas pada:
                      <span className="lastNum">
                        <span className="num">1)</span>
                        <span className="text">Dalam hal sampai dengan [90] hari dana Pengembalian Pinjaman dari Penerima Pinjaman yang ada pada rekening Escrow tidak disalurkan oleh Penyelenggara kepada Pemberi Pinjaman;
                        </span>
                      </span>
                      <span className="lastNum">
                        <span className="num">2)</span>
                        <span className="text">Dalam hal Penyelenggara Layanan menyalurkan dana kepada calon Penerima yang tidak sesuai dengan kriteria yang telah ditentukan oleh Pemberi Pinjaman sebagaimana tertuang dalam Pasal 3 Perjanjian ini;
                        </span>
                      </span>
                      <span className="lastNum">
                        <span className="num">3)</span>
                        <span className="text">Dalam hal Pemberi Pinjaman memberikan data dan/atau informasi mengenai Penerima Pinjaman kepada Pihak Ketiga sebagaimana dimaksud dalam Pasal 8 ayat (4) Perjanjian ini.
                        </span>
                      </span>
                      <span className="lastNum">
                        <span className="num">4)</span>
                        <span className="text">Dalam hal Penyelenggara Layanan memberikan data dan/atau informasi mengenai Pemberi Pinjaman kepada Pihak Ketiga sebagaimana dimaksud dalam Pasal 9 huruf f Perjanjian ini. 
                        </span>
                      </span>
                    </span>
                  </span>
                  <span className="lastNum">
                  <span className="num">d.</span>
                    <span className="text">Apabila salah satu pihak mengalami pailit atau tidak dapat menjalankan usaha atau menghentikan usahanya atau perusahaan dibubarkan sebagaimana disebutkan didalam Perjanjian ini;
                    </span>
                  </span>
                  <span className="lastNum">
                    <span className="num">e.</span>
                    <span className="text">Apabila Para Pihak sepakat untuk tidak melakukan memperpanjang Perjanjian ini.
                    </span>
                  </span>
                </span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Pihak yang bermaksud untuk mengakhiri Perjanjian ini sebelum waktu pengakhiran wajib menyampaikan pemberitahuan secara tertulis kepada Pihak lainnya, dalam jangka waktu [xxx] hari kalender sebelum tanggal pengakhiran.</span>
              </span>
              <span className="secondNum">
                <span className="num">3.</span>
                <span className="text">Apabila Perjanjian ini diakhiri karena sebab apapun, masing-masing pihak wajib memenuhi kewajibannya yang telah dibuat dengan Pihak lainnya berdasarkan Perjanjian ini dan menyelesaikan seluruh utang, tanggung jawab dan kewajiban finansial lain kepada Pihak lainnya, yang terhutang setelah pengakhiran Perjanjian ini.</span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>13.</b></span>
            <span className="text"><b>Pelangaran</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft lendingAgreement">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Jika Para Pihak melakukan pelanggaran Perjanjian ini, maka salah satu Pihak dapat memberikan peringatan pada pihak lain secara tertulis berkaitan dengan pelanggaran yang terjadi dan Perjanjian ini akan berakhir kecuali tidak ada perbaikan dalam 30 hari setelah surat peringatan ini diberikan </span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Yang termasuk sebagai pelanggaran Perjanjian ini namun tidak terbatas pada:
                  <span className="lastNum">
                    <span className="num">a.</span>
                    <span className="text">Dalam hal sampai dengan [90] hari dana Pengembalian Pinjaman dari Penerima Pinjaman yang ada pada rekening Escrow tidak disalurkan oleh Penyelenggara kepada Pemberi Pinjaman;</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">b.</span>
                    <span className="text">Dalam hal Penyelenggara Layanan menyalurkan dana kepada calon Penerima yang tidak sesuai dengan kriteria yang telah ditentukan oleh Pemberi Pinjaman sebagaimana tertuang dalam Pasal 3 Perjanjian ini;</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">c.</span>
                    <span className="text">Dalam hal Pemberi Pinjaman memberikan data dan/atau informasi mengenai Penerima Pinjaman kepada Pihak Ketiga sebagaimana dimaksud dalam Pasal 8 ayat (4) Perjanjian ini.</span>
                  </span>
                  <span className="lastNum">
                    <span className="num">d.</span>
                    <span className="text">Dalam hal Penyelenggara Layanan memberikan data dan/atau informasi mengenai Pemberi Pinjaman kepada Pihak Ketiga sebagaimana dimaksud dalam Pasal 9 huruf f Perjanjian ini. </span>
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>14.</b></span>
            <span className="text"><b>Pemberitahuan</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft lendingAgreement">
              <div>Pemberitahuan yang diperlukan atau yang diperbolehkan oleh Perjanjian ini harus secara tertulis dan dapat diserahkan langsung atau dapat dikirim melalui teleks, e-mail, faksimili, atau surat tercatat dibayar di muka yang dialamatkan ke pihak-pihak, sebagai berikut:</div>
              <div style={{'margin-top':'1em'}}>
                <b style={{'text-decoration':'underline'}}>Kepada Penyelenggara Layanan</b>
                <div>
                  <b>PT Kredit Plus Teknologi</b>
                </div>
                <div className="valueKey">
                  <div className="left">Nama</div>
                  <div className="right">: [{this.state.contractData.lenderName?this.state.contractData.lenderName:'nama PIC'}]</div>
                </div>
                <div className="valueKey">
                  <div className="left">Jabatan</div>
                  <div className="right">: [Jabatan PIC]</div>
                </div>
                <div className="valueKey">
                  <div className="left">Alamat</div>
                  <div className="right">: The Prominence Office Tower Unit E Jl. Jalur Sutera Barat No. 15, Alam Sutera Tangerang-Banten</div>
                </div>
                <div className="valueKey">
                  <div className="left">Email</div>
                  <div className="right">: [xxx]</div>
                </div>
                <div className="valueKey">
                  <div className="left">Telp</div>
                  <div className="right">: [xxx]</div>
                </div>
              </div>

              <div style={{'margin-top':'1em'}}>
                <b style={{'text-decoration':'underline'}}>Kepada Pemberi Pinjaman</b>
                <div className="valueKey">
                  <div className="left">Nama</div>
                  <div className="right">: [{this.state.contractData.borrowerName?this.state.contractData.borrowerName:'nama PIC'}]</div>
                </div>
                <div className="valueKey">
                  <div className="left">Jabatan</div>
                  <div className="right">: [Jabatan PIC]</div>
                </div>
                <div className="valueKey">
                  <div className="left">Alamat</div>
                  <div className="right">: [xxx]</div>
                </div>
                <div className="valueKey">
                  <div className="left">Email</div>
                  <div className="right">: [xxx]</div>
                </div>
                <div className="valueKey">
                  <div className="left">Telp</div>
                  <div className="right">: [{this.state.contractData.borrowerPhone?this.state.contractData.borrowerPhone:'xxx'}]</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>15.</b></span>
            <span className="text"><b>Hukum Yang Berlaku dan Penyelesaian Sengketa</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft lendingAgreement">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Perjanjian ini diatur dan ditafsirkan sesuai dengan hokum Republik Indonesia.</span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Para Pihak sepakat bahwa setiap perselisihan atau klaim yang timbul sebagai akibat atau berkenaan dengan Perjanjian ini atau pelanggaran ketentuan Perjanjian ini akan diselesaikan secara musyawarah.</span>
              </span>
              <span className="secondNum">
                <span className="num">3.</span>
                <span className="text">Apabila Para Pihak tidak dapat menyelesaikan perselisihan, klaim atau pelanggaran dengan cara musyawarah, maka Pihak yang mengalami suatu kerugian berhak mengajukan permohonan penyelesaian melalui Pengadilan Negeri Tangerang.</span>
              </span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">
          <div className="lessNum">
            <span className="num"><b>16.</b></span>
            <span className="text"><b>Ketentuan Lain – Lain</b></span>
          </div>
        </div>
        <div className="serviceDetail">
          <div>
            <div className="textRight lessLeft lendingAgreement">
              <span className="secondNum">
                <span className="num">1.</span>
                <span className="text">Perjanjian ini mengikat untuk Para Pihak dengan ketentuan bahwa hak dan kewajiban Para Pihak  tidak dapat dialihkan atau dilimpahkan, seluruhnya atau sebagian, secara langsung atau tidak langsung, baik secara sukarela, berdasarkan hukum yang berlaku atau lainnya, kepada orang, firma atau perusahaan lain tanpa persetujuan tertulis sebelumnya dari Pihak lainnya.</span>
              </span>
              <span className="secondNum">
                <span className="num">2.</span>
                <span className="text">Setiap pemberitahuan yang diperlukan atau diizinkan berdasarkan Perjanjian ini dianggap telah diberikan apabila dikirimkan dengan email/surat tercatat/jasa pos udara atau melalui teleks dengan konfirmasi jasa surat udara telah dilunasi, ke alamat Penyelenggara Layanan atau Penerima Pinjaman yang terakhir kali diberitahukan</span>
              </span>
              <span className="secondNum">
                <span className="num">3.</span>
                <span className="text">Pembaharuan, pengakhiran, perubahan atau pelepasan ketentuan di dalam Perjanjian ini, atau syarat dan ketentuan di dalam Perubahan tersebut hanya berlaku dan mengikat apabila dibuat secara tertulis dan disetujui dengan membubuhkan tanda tangan secara digital atau tanda lainnya disepakati oleh Para Pihak.</span>
              </span>
              <span className="secondNum">
                <span className="num">4.</span>
                <span className="text">Perjanjian ini tidak dapat diubah dengan cara apapun kecuali berdasarkan kesepakatan bersama secara tertulis yang ditandatangani oleh pejabat sah Para Pihak.</span>
              </span>
              <span className="secondNum">
                <span className="num">5.</span>
                <span className="text">Setiap hal yang belum diatur di dalam Perjanjian ini akan diputuskan secara terpisah melalui perundingan antara Para Pihak.</span>
              </span>
              <span className="secondNum">
                <span className="num">6.</span>
                <span className="text">Perjanjian ini berlaku dan mengikat kepada Para Pihak sejak Perjanjian ini di tandatangani secara digital atau tanda lainnya yang disepakati oleh Para Pihak. </span>
              </span>
              <span className="secondNum">
                Demikian Perjanjian ini ditandatangani secara digital oleh perwakilan yang sah Para Pihak pada tanggal dan tahun yang disebutkan pada bagian awal Perjanjian ini.
              </span>
            </div>
          </div>
        </div>

        <div className="bottomEare">
          <div className="left">
            <div className="key" style={{'margin-bottom':'0px'}}>Penyelenggara Layanan</div>
            <div><b>PT KREDIT PLUS TEKNOLOGI</b></div>
          </div>
          <div className="right" style={{'text-align':'left'}}>
            <div className="key" style={{'margin-bottom':'0px'}}>Pemberi Pinjaman</div>
            <div><b>[{this.state.contractData.borrowerName?this.state.contractData.borrowerName:'xxxxx'}]</b></div>
          </div>
        </div>

        <div className="bottomEare">
          <div className="left">
            <div className="key" style={{'margin-bottom':'0px'}}><b style={{'text-decoration':'underline'}}>Nama</b></div>
            <div>Jabatan</div>
          </div>
          <div className="right" style={{'text-align':'left'}}>
            <div className="key" style={{'margin-bottom':'0px'}}><b style={{'text-decoration':'underline'}}>Nama</b></div>
            <div>Jabatan</div>
          </div>
        </div>

        {/*给客户的邮寄单*/}
        <div style={{'margin-top':'4em'}}>
          <div className="secondTitle">[KOP SURAT DALAM HAL PEMBERI PINJAMAN MERUPAKAN BADAN HUKUM]</div>
          <div className="secondTitle"><b>SURAT KUASA</b></div>
          <div className="serviceDetail">Yang bertandantangan dibawah ini,</div>
          <div className="serviceDetail">[xxx], suatu perseroan terbatas yang didirikan berdasarkan hokum di [xxx] berkedudukan di [xxxx] dan beralamat di [xxxx], dalam hal ini diwakili oleh [xxxx] selaku [xxxx], dari dan oleh karenanya sah bertindak bertindak untuk dan atas nama [xxx], selanjutnya disebut <b>Pemberi Pinjaman</b>.</div>
          <div className="serviceDetail"><b style={{'text-decoration':'underline'}}>Jika orang perseroangan</b></div>
          <div className="serviceDetail">[xxxx], warga negara [xxxx], pemegang kartu tanda pengenal [xxxx] dengan No. [xxx], beralamat di [xxxx], dalam hal ini bertindak untuk dan atas nama dirinya, selanjutnya disebut <b>Pemberi Kuasa</b></div>
          <div className="serviceDetail">Dengan ini memberikan kuasa baik kepada</div>
          <div className="serviceDetail"><b>PT Kredit Plus Teknologi</b>, suatu perseroan terbatas yang didirikan di Indonesia beramat di The Prominence Office Tower Unit E Jl. Jalur Sutera Barat No. 15, Alam Sutera Tangerang-Banten sebagai penyelenggara Fintech P2P Lending dengan situs www.kreditplusteknologi.co.id , dalam hal ini diwakili oleh Tian Jingjing selaku Direktur, dan oleh karenanya sah bertindak untuk dan atas nama <b>PT Kredit Plus Teknologi</b> selanjutnya disebut <b>Penerima Kuasa</b>
          </div>
          <div className="serviceDetail" style={{'text-align':'center','margin':'1em 0em'}}><b>------------------KHUSUS------------------</b></div>

          <div className="serviceDetail">
            <div>Bertindak untuk dan atas nama <b>Pemberi Kuasa</b>, untuk menyalurkan Pinjaman milik <b>Pemberi Kuasa</b> termasuk namun tidak terbatas pada </div>
            <div className="lessNum">
              <span className="num">1.</span>
              <span className="text">melakukan verifikasi Penerima Pinjaman yang sesuai dengan kriteria Pemberi Pinjaman.</span>
            </div>
            <div className="lessNum">
              <span className="num">2.</span>
              <span className="text">melakukan pendebetan atas dana Pemberi Pinjaman yang tersimpan dalam Rekening Escrow Penyelengara Layanan untuk disalurkan kepada Penerima Pinjaman.</span>
            </div>
            <div className="lessNum">
              <span className="num">3.</span>
              <span className="text">menagihkan Pinjaman kepada Penerima Pinjaman.</span>
            </div>
            <div className="lessNum">
              <span className="num">4.</span>
              <span className="text">menyalurkan kembali dana hasil Pinjaman beserta bunga kepada Pemberi Pinjaman.</span>
            </div>
          </div>
        </div>

        <div className="serviceDetail">Surat Kuasa ini diberikan tanpa hak subtitusi.</div>

        <div className="serviceDetail">[xxx],[xxx] 2018</div>

        <div className="form serviceDetail">
          <ul>
            <li>
              <p>Penerima Kuasa,</p>
              <p><b>PT KREDIT PLUS TEKNOLOGI</b></p>
            </li>
            <li>
              <p>Pemberi Kuasa,</p>
              <p>[xxx]</p>
            </li>
          </ul>
          <ul>
            <li>&nbsp;
            </li>
            <li>
              <p>Materai Rp6.000,-</p>
            </li>
          </ul>
          <ul>
            <li>
              <p><b style={{'text-decoration':'underline'}}>Nama</b></p>
              <p>Jabatan</p>
            </li>
            <li>
              <p><b style={{'text-decoration':'underline'}}>Nama</b></p>
              <p>Jabatan</p>
            </li>
          </ul>
        </div>


      </div>
    );
  }
}

LendingAgreement.defaultProps = {
};

export default LendingAgreement;
