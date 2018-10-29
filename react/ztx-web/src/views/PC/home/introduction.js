import React from 'react';
import TopNav from '../../public/topNav';//顶部导航
import PCBottom from '../../public/bottom';//底部

import city from '../../../images/city.jpg';


class Introduction extends React.Component {
  state = {indexs:0,language:sessionStorage.getItem('language') || 'Id'};

  componentDidMount() {
    $('.PCindex .indexBottom').css('background-color','#ffffff');
    $('.PCindex .mainBottom .titles').css('color','#5A6169');
    $('.PCindex .PCBottom .mainDesc ul').css({'color':'#868E96','opacity':'1'});
    $('.PCindex .copyRight').css('background-color','#F8F9FA');
  }

  componentWillUnmount() {
    $('.PCindex .indexBottom').css('background-color','#212529');
    $('.PCindex .copyRight').css('background-color','#ffffff');
    $('.PCindex .mainBottom .titles').css('color','#ffffff');
    $('.PCindex .PCBottom .mainDesc ul').css({'color':'#ffffff','opacity':'0.5'});
  }

  render() {
    return (
      <div className="PCindex" style={{'overflow':'auto'}}>
        <TopNav />{/*顶部导航栏*/}
        <div className="Introduction">
          <div className="topBg">
            <img src={city} />
          </div>
          <div className="main">
            <div className="title">{this.state.language == 'Id'?'Profil perusahaan':'Company profile'}</div>
            <div className="mainText">
              {this.state.language == 'Id'?(<span><b>PT. Kredit Plus Teknologi(“PT KPT”)</b> didirikan pada November 2017, merupakan sebuah platform layanan informasi yang menyelenggarakan kegiatan pinjam meminjam berbasis teknologi informasi. PT KPT menfokuskan kegiatan usaha pada penanganan data besar (big data) dan pengembangan teknologi finasial agar dapat secara berkesinambungan memberi solusi dan layanan keuangan pintar dengan efisiensi yang lebih tinggi. Perusahaan menghadirkan produk-produk investasi dengan pengembalian tinggi dan aman untuk para penyandang dana/lender. Layanan yang aman dengan efisiensi tinggi dan pengalaman pelanggan yang sempurna merupakan ciri khas produk kami. Dalam pengembangan usaha, Perusahaan senantiasa menerapkan dan mempertahankan falsafah Profesional, Seksama, Displin dan Kepatuhan peraturan, sehingga resiko usaha dapat dikendalikan secara efektif dengan mengandalkan kekuatan teknologi dan tim manajemen yang dimiliki Perusahaan serta strategi pemasaran yang mengutamakan penyaluran pinjaman tunai dalam nominal kecil yang dapat menjangkau khalayak peminjam yang lebih luas. Kami akan terus menerus memberi kontribusi untuk industri keuangan inklusif dan teknologi finansial di Indonesia, tumbuh bersama Indonesia, dan membawa kesejahteraan bagi masyarakat Indonesia.</span>):
              (<span>As an information service platform that organizes borrowing and lending activity based on information technology, <b>PT. Kredit Plus Teknologi ("PT KPT")</b> was established in November 2017. By focusing on big data processing and financial technology development, PT KPT provides users with highly efficient intelligent financial services and solutions. PT KPT offers high return investment products and funding safety guarantee to the funders / lenders, and speedy cash loan to the borrowers. High quality service and perfect customers’ experiences are the features of our products. Insisting on professional, self-discipline and compliance regulatory framework, PT KPT effectively controls the business risk through our own technology, excellent management team as well as marketing strategy that distributes small amount of loan to large number of borrowers. We will continuously make our own contribution to the Fin Tech industry of Indonesia, grow together with Indonesia and bring prosperity to Indonesia.</span>)}
            </div>
          </div>
        </div>
        <div className="swiper-slide orange-slide indexBottom erea" style={{'padding-top':'2em'}}>{/*bottom*/}
          <PCBottom/>
        </div>
      </div>
    );
  }
}

export default Introduction;
