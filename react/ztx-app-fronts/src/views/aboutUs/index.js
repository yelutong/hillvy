import React from 'react';
import AboutUsA from './images/aboutA.png';
import AboutUsB from './images/aboutB.png';
import AboutUsLogo from './images/aboutUsLogoBig.png';

class AboutUs extends React.Component {
  state = {thisQuestion:{},languga:'Indonesian'};

  componentWillMount() {
    var languga = this.props.location.query.languga || 'Indonesian';
    console.log(languga);
    this.setState({languga:languga});
  }

  render() {
    return (
      <div className="aboutUs"> 
        <img className="aboutUsImg" src={AboutUsA} />
        <div className="productIntro">
          <div className="firstTitle">Tentang Pinjam Gampang</div>
          <p className="mainDesc">Pinjam Gampang merupakan aplikasi pinjaman tunai yang dikembangkan oleh PT. Kredit Plus Teknologi. Aplikasi ini merupakan solusi total atas kebutuhan pinjaman tunai nominal kecil perorangan. Hanya dengan menyelesaikan permohonan dalam3 menit, Anda bisa mendapat pinjaman tunai hingga Rp5.000.000.</p>
          <div className="features">
            <div className="firstTitle">Ciri Khas Produk</div>
            <div className="thisFeatures">
              <div className="secondTitle">Minim Persyaratan</div>
              <p className="mainDesc">Tiga langkah menyelesaikan permohonan! Anda dapat mengajukan permohonan pinjaman hanya dengan foto wajah selfie Anda, KTP difoto, Kartu Tanda Pengenal Kerja difoto atau foto selfie Anda dengan mengenakan seragam kerja, serta mengisi beberapa informasi pribadi Anda.</p>
            </div>
            <div className="thisFeatures">
              <div className="secondTitle">Persyaratan ringan</div>
              <p className="mainDesc">Tidak perlu jaminan! Tidak perlu agunan! Kami memberi penilaian atas tingkat keterpercayaan Anda dengan menerapkan teknologi analisa data besar (big data), dan memberikan pinjaman tunai kepada Anda.</p>
            </div>
            <div className="thisFeatures">
              <div className="secondTitle">Plafon Tinggi</div>
              <p className="mainDesc">Rentang jumlah pinjaman adalah Rp600.000 s/d Rp5.000.000. Setelah pembayaran pinjaman dilakukan secara tepat waktu, tingkat keterpercayaan Anda akan terakumulasi, sehingga plafon jumlah pinjaman Anda pun ikut bertambah.</p>
            </div>
            <div className="thisFeatures">
              <div className="secondTitle">Pencairan cepat</div>
              <p className="mainDesc">Tiga jam! Pinjaman cair ke dalam rekening. Demi memenuhi kebutuhan pinjaman Anda tepat waktu, kami dapat menyelesaikan verifikasi, menyetujui permohonan pinjaman, mencairkan pinjaman pada hari yang sama</p>
            </div>
          </div>
        </div>
        <div className="companyIntro">
          <img className="aboutUsImg" src={AboutUsB} />
          <div className="firstTitle">Tentang PT. Kredit Plus Teknologi</div>
          <p className="mainDesc">PT. Kredit Plus Teknologi(“PT KPT”) didirikan pada November 2017, merupakan sebuah platform layanan informasi yang menyelenggarakan kegiatan pinjam meminjam berbasis teknologi informasi. PT KPT menfokuskan kegiatan usaha pada penanganan data besar (big data) dan pengembangan teknologi finasial agar dapat secara berkesinambungan memberi solusi dan layanan keuangan pintar dengan efisiensi yang lebih tinggi.</p>
          <p className="mainDesc">Perseroan menghadirkan produk-produk investasi dengan pengembalian tinggi dan aman untuk para penyandang dana/lender. Layanan yang aman dengan efisiensi tinggi dan pengalaman pelanggan yang sempurna merupakan ciri khas produk kami.</p>
          <p className="mainDesc">Dalam pengembangan usaha, Perseroan senantiasa menerapkan dan mempertahankan falsafah Profesional, Seksama, Displin dan Kepatuhan peraturan, sehingga resiko usaha dapat dikendalikan secara efektif dengan mengandalkan kekuatan teknologi dan tim manajemen yang dimiliki Perseroan serta strategi pemasaran yang mengutamakan penyaluran pinjaman tunai dalam nominal kecil yang dapat menjangkau khalayk peminjam yang lebih luas.</p>
          <p className="mainDesc">Kami akan terus menerus memberi kontribusi untuk industri keuangan inklusif dan teknologi finansial di Indonesia, tumbuh Bersama Indonesia, dan menbawa kesejahteraan bagi masyarakat Indonesia.</p>
        </div>
        <img className="bottomLogo" src={AboutUsLogo} />
      </div>
    );
  }
}

AboutUs.defaultProps = {
};

export default AboutUs;
