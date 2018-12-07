import React from 'react';
import './style/index.css';

class CouponRule extends React.Component {
  state = {
    DOKUList:[],
    BNIList:[],
  };

  componentWillMount() {
  }

  componentDidMount() {
    var bank = this.props.location.query.bank || '';
    var DOKU = [{
        title:'Mandiri ATM',
        detail:'<p>1. Masukkan kartu ATM Mandiri, lalu masukkan PIN ATM.</p>'+
        '<p>2. Pilih menu "Bayar/Beli"</p>'+
        '<p>3. Pilih "Lainnya" dan pilih "Lainnya" kembali</p>'+
        '<p>4. Pilih "Ecommerce"</p>'+
        '<p>5. Masukkan 5 digit awal dari nomor Mandiri VA (Virtual Account) yang di dapat (contoh: 88899)</p>'+
        '<p>6. Masukkan keseluruhan nomor VA xxxx xxxx xxxx xxxx </p>'+
        '<p>7. Masukkan jumlah pembayaran</p>'+
        '<p>8. Nomor VA, Nama dan Jumlah pembayaran akan ditampilkan di layar</p>'+
        '<p>9. Tekan angka 1 dan pilih "YA"</p>'+
        '<p>10. Konfirmasi pembayaran dan pilih "YA"</p>'+
        '<p>11. Transaksi selesai. Mohon simpan bukti transaksi.</p>'
      },{
        title:'Mandiri Internet Banking',
        detail:'<p>1. Akses ke <a class="linkColor" href="https://ib.bankmandiri.co.id/retail/Login.do?action=form&lang=in_ID">https://ib.bankmandiri.co.id/retail/Login.do?action=form&lang=in_ID</a></p>'+
        '<p>2. Masukkan User ID dan PIN, kemudian login</p>'+
        '<p>3. Pilih menu “Pembayaran”</p>'+
        '<p>4. Pilih Menu “Multi Payment”</p>'+
        '<p>5. Pilih Billing Name “DOKU VA Aggregator”</p>'+
        '<p>6. Masukkan VA No xxxx xxxx xxxx xxxx</p>'+
        '<p>7. Masukkan Nominal Transaksi</p>'+
        '<p>8. Klik tombol ”Continue“</p>'+
        '<p>9. Centang pada bagian Total Tagihan</p>'+
        '<p>10. Klik tombol ”Continue“</p>'+
        '<p>11. Input PIN Mandiri Appli 1 dari Token</p>'+
        '<p>12. Selesai dan Simpan Bukti Pembayaran</p>'
      },{
        title:'Mandiri Online Apps',
        detail:'<p>1. Install aplikasi Mandiri Online</p>'+
        '<p>2. Masukkan User ID dan PIN, kemudian login</p>'+
        '<p>3. Pilih Menu Pembayaran</p>'+
        '<p>4. Klik Buat Pembayaran Baru</p>'+
        '<p>5. Pilih Multipayment</p>'+
        '<p>6. Pilih "DOKU VA Aggregator" pada bagian penyedia jasa</p>'+
        '<p>7. Masukkan Nomor VA xxxx xxxx xxxx xxxx</p>'+
        '<p>8. Klik Go, kemudian masukkan nominal transaksi</p>'+
        '<p>9. Klik "Konfirmasi"</p>'+
        '<p>10. Klik "Lanjut"</p>'+
        '<p>11. Klik "Konfirmasi"</p>'+
        '<p>12. Masukkan MPIN (PIN SMS Banking)</p>'+
        '<p>13. Selesai dan Simpan Bukti Pembayaran Anda</p>'
      },{
        title:'Alfa Group',
        detail:'<p>1. Catat kode VA pembayaran dan datang ke gerai Alfamart, Alfa Midi, Alfa Express, Lawson atau DAN+DAN terdekat</p>'+
        '<p>2. Informasikan ke kasir bahwa ingin melakukan pembayaran Pinjam Gampang</p>'+
        '<p>3. Jika kasir tidak mengetahui pembayaran Pinjam Gampang, informasikan ke kasir untuk membuka terminal e-transaction dan pilih “No. 2 Menu Pembayaran” atau cari pada menu search</p>'+
        '<p>4. Minta kasir untuk menekan “Shift” dan “?” lalu ketik “Pinjam Gampang”, setelah itu klik OK</p>'+
        '<p>5. Minta kasir untuk pilih “No. 1 Pinjam Gampang - Pembayaran Pinjam Gampang”</p>'+
        '<p>6. Kasir akan menanyakan kode VA pembayaran dan berikan kode VA Anda 88888xxxxxxxxxx</p>'+
        '<p>7. Kasir akan konfirmasi data seperti pembayaran Pinjam Gampang, nama lengkap Anda dan nominal pembayaran. Silahkan lakukan pembayaran ke kasir sejumlah nominal yang disebutkan/p>'+
        '<p>8. Terima struk sebagai bukti pembayaran telah sukses dilakukan dan Anda juga akan menerima notifikasi dari Pinjam Gampang. Selesai.</p>'
      }];
    var BNI = [{
        title:'Melalui ATM BNI',
        detail:'<p>1. Masukkan Kartu Anda</p>'+
        '<p>2. Pilih Bahasa</p>'+
        '<p>3. Masukkan PIN ATM Anda</p>'+
        '<p>4. Pilih "Menu Lainnya"</p>'+
        '<p>5. Pilih "Transfer"</p>'+
        '<p>6. Pilih Jenis rekening yang akan Anda gunakan</p>'+
        '<p>7. Pilih “Virtual Account Billing”</p>'+
        '<p>8. Masukkan nomor Virtual Account Anda xxxx xxxx xxxx xxxx</p>'+
        '<p>9. Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi</p>'+
        '<p>10. Konfirmasi, apabila telah sesuai, lanjutkan transaksi</p>'+
        '<p>11. Selesai</p>'
      },{
        title:'Melalui ATM Bersama',
        detail:'<p>1. Masukkan kartu ke mesin ATM Bersama</p>'+
        '<p>2. Pilih "Transaksi Lainnya"</p>'+
        '<p>3. Pilih menu "Transfer"</p>'+
        '<p>4. Pilih "Transfer ke Bank Lain"</p>'+
        '<p>5. Masukkan kode bank BNI (009) dan 16 Digit Nomor Virtual Account xxxx xxxx xxxx xxxx</p>'+
        '<p>6. Masukkan nominal transfer sesuai tagihan atau kewajiban Anda. Nominal yang berbeda tidak dapat diproses</p>'+
        '<p>7. Konfirmasi rincian Anda akan tampil di layar, cek dan tekan “Ya” untuk melanjutkan.</p>'+
        '<p>8. Transaksi Berhasil</p>'
      },{
        title:'Melalui mobile banking BNI',
        detail:'<p>1. Akses BNI Mobile Banking dari handphone kemudian masukkan user ID dan password</p>'+
        '<p>2. Pilih menu “Transfer”</p>'+
        '<p>3. Pilih menu “Virtual Account Billing” kemudian pilih rekening debet</p>'+
        '<p>4. Masukkan Nomor Virtual Account Anda xxxx xxxx xxxx xxxx pada menu “input baru”</p>'+
        '<p>5. Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi</p>'+
        '<p>6. Konfirmasi transaksi dan masukkan Password Transaksi</p>'+
        '<p>7. Pembayaran Anda Telah Berhasil.</p>'
      },{
        title:'Melalui iBank Personal BNI',
        detail:'<p>1. Ketik alamat <a class="linkColor" href="https://ibank.bni.co.id">https://ibank.bni.co.id</a> kemudian klik “Enter”</p>'+
        '<p>2. Masukkan User ID dan Password</p>'+
        '<p>3. Pilih menu “Transfer” </p>'+
        '<p>4. Pilih “Virtual Account Billing”</p>'+
        '<p>5. Kemudian masukan Nomor Virtual Account Anda xxxx xxxx xxxx xxxx yang hendak dibayarkan. Lalu pilih rekening debet yang akan digunakan. Kemudian tekan “lanjut”</p>'+
        '<p>6. Kemudin tagihan yang harus dibayarkan akan muncul pada layar konfirmasi</p>'+
        '<p>7. Masukkan Kode Otentikasi Token</p>'+
        '<p>8. Pembayaran Anda telah berhasil</p>'
      },{
        title:'Melalui BNI sms banking',
        detail:'<p>1. Buka aplikasi SMS Banking BNI</p>'+
        '<p>2. Pilih menu Transfer</p>'+
        '<p>3. Pilih menu Trf rekening BNI</p>'+
        '<p>4. Masukkan nomor rekening tujuan dengan 16 digit Nomor Virtual Account xxxx xxxx xxxx xxxx</p>'+
        '<p>5. Masukkan nominal transfer sesuai tagihan atau kewajiban Anda. Nominal yang berbeda tidak dapat diproses</p>'+
        '<p>6. Pilih “Proses” kemudian “Setuju”</p>'+
        '<p>7. Reply sms dengan ketik pin sesuai perintah</p>'+
        '<p>8. Transaksi Berhasil</p></br>'+
        '<p>Atau Dapat juga langsung mengetik sms dengan format: </p>'+
        '<p>TRF[SPASI]NomorVA[SPASI]NOMINAL</p>'+
        '<p>dan kemudian kirim ke 3346</p>'+
        '<p>Contoh : TRF 8277087781881441 44000</p>'
      },{
        title:'Dari Bank Lain',
        detail:'<p>1. Pilih menu "Transfer antar bank" atau “Transfer online antarbank”</p>'+
        '<p>2. Masukkan kode bank BNI (009) atau pilih bank yang dituju yaitu BNI</p>'+
        '<p>3. Masukan 16 Digit Nomor Virtual Account xxxx xxxx xxxx xxxx  pada kolom rekening tujuan</p>'+
        '<p>4. Masukkan nominal transfer sesuai tagihan atau kewajiban Anda. Nominal yang berbeda tidak dapat diproses</p>'+
        '<p>5. Masukkan jumlah pembayaran (Contoh : 44000)[AC8] </p>'+
        '<p>6. Konfirmasi rincian Anda akan tampil di layar, cek dan apabila sudah sesuai silahkan lanjutkan transaksi sampai dengan selesai</p>'+
        '<p>7. Transaksi Berhasil</p>'
      }];
    this.setState({
      DOKUList:DOKU,
      BNIList:BNI
    })
  }

  showMoreDetail = (index,e) => {
    $(e.currentTarget).toggleClass('allTitle').find('.icon').toggleClass('more');
    $('.detai-'+index).fadeToggle();
  }


  render() {
    return (
      <div className="couponRule">
        <div className="ruleList">
          <div className="bankTitle">Tata Cara Pembayaran Mandiri</div>
          {
            this.state.DOKUList.map((item,index) => {
              return (
                <div className="ruleItem" key={index}>
                  <div className="ruleTitle" onClick={this.showMoreDetail.bind(this,index)}>
                    <span className="titleText">{item.title}</span>
                    <span className="icon more"></span>
                  </div>
                  <div className={'ruleDetail detai-'+index} style={{'display':'none'}} dangerouslySetInnerHTML = {{__html:item.detail}}>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="ruleList">
          <div className="bankTitle" style={{'marginTop':'1rem'}}>Tata Cara Pembayaran BNI</div>
          {
            this.state.BNIList.map((item,index) => {
              return (
                <div className="ruleItem" key={index}>
                  <div className="ruleTitle" onClick={this.showMoreDetail.bind(this,('a'+index))}>
                    <span className="titleText">{item.title}</span>
                    <span className="icon more"></span>
                  </div>
                  <div className={'ruleDetail detai-a'+index} style={{'display':'none'}} dangerouslySetInnerHTML = {{__html:item.detail}}>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

CouponRule.defaultProps = {
};

export default CouponRule;
