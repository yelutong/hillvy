import React from 'react';
import './style/couponRule.css';

class CouponRule extends React.Component {
  state = {
    ruleList:[{
      title:'1.Apa saja jenis kuponnya?',
      detail:'<p><label>Kupon pembayaran</label> : digunakan pada saat pembayaran untuk mengurangi jumlah yang harus dibayarkan.</p>'
    },{
      title:'2.Bagaimana cara mendapatkan kupon?',
      detail:'<p>Pinjam Gampang akan melakukan promosi di waktu yang tidak ditentukan. Pengguna diharapkan lebih sering membuka aplikasi Pinjam Gampang dan memperhatikan notifikasi pembaritahuan kegiatan promosi. Jangan sampai terlewat ya!</p>'
    },{
      title:'3.Bagaimana cara menggunakan kupon?',
      detail:'<p>Pada saat Pengguna melakukan pembayaran, kupon dapat digunakan untuk mengurangi nominal pembayaran. Satu kupon hanya dapat digunakan untuk satu kontrak.</p>'
    },{
      title:'4.Apakah kupon dapat ditukar uang tunai?',
      detail:'<p>Kupon tidak dapat ditukar menjadi uang tunai. Pengguna dapat menggunakan kupon untuk mengurangi jumlah pembayaran.</p>'
    }]
  };

  componentDidMount() {

  }

  showMoreDetail = (index,e) => {
    $(e.currentTarget).toggleClass('allTitle').find('.icon').toggleClass('more');
    $('.detai-'+index).fadeToggle();
  }


  render() {
    return (
      <div className="couponRule">
        <div className="ruleList">
          {
            this.state.ruleList.map((item,index) => {
              return (
                <div className="ruleItem" data-key={index}>
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
      </div>
    );
  }
}

CouponRule.defaultProps = {
};

export default CouponRule;
