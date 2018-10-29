import React from 'react'; 
 
class RepaymentList extends React.Component {
  state = {languga:'Indonesian'};
  componentWillMount() {
    var languga = this.props.location.query.languga || 'Indonesian';
    console.log(languga);
    this.setState({languga:languga});
  }

  componentDidMount() {

  }

  render() {
    $(window).scroll(function(){
      if(document.title == 'Pusat Bantuan' || document.title == 'RepaymentList'){
        var scrollTop =  $(window).scrollTop() ;
        var topHeight = $('.RepaymentList .title').outerHeight();
        if(scrollTop>topHeight){
          document.title = 'Pusat Bantuan';
        }else{
          document.title = 'RepaymentList';
        }
      }
    })
    return (
      <div className="RepaymentList">
      <div>
        <p className="txt-gray txt-red2">Berikut contoh rencana pengembalian dengan asumsi hari ini adalah tanggal pembayaran.</p>
        <p className="txt-gray txt-red2">Untuk rencana pengembalian didasarkan pada yang tertera di aplikasi setelah lolos verifikasi</p>
      </div>
        <div className="horizontal-view listHead align-items-center">
          <span className="flexg1 flex1">Tenor</span>
          <span className="flexg2 flex1">Tanggal Pembayaran</span>
          <span className="flexg2 flex1">Nominal Pembayaran</span>
        </div>
        <ul className="listUl">
        <li className="horizontal-view vux-1px-t">
          <span className="flexg1 flex1">1</span>
          <span className="flexg2 flex1">25-May-2018</span>
          <span className="flexg2 flex1">Rp1.004.90</span>
        </li>
        <li className="horizontal-view vux-1px-t">
          <span className="flexg1 flex1">2</span>
          <span className="flexg2 flex1">25-May-2018</span>
          <span className="flexg2 flex1">Rp1.004.90</span>
        </li>
        <li className="horizontal-view vux-1px-t">
          <span className="flexg1 flex1">3</span>
          <span className="flexg2 flex1">25-May-2018</span>
          <span className="flexg2 flex1">Rp1.004.90</span>
        </li>
        <li className="horizontal-view vux-1px-t">
          <span className="flexg1 flex1">4</span>
          <span className="flexg2 flex1">25-May-2018</span>
          <span className="flexg2 flex1">Rp1.004.90</span>
        </li>
        </ul>   
      </div>
    );
 }
}

RepaymentList.defaultProps = {
};

export default RepaymentList;

