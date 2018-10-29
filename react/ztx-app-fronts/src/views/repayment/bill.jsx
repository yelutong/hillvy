import React from 'react';
import {  Result, Button, List, Tabs, WhiteSpace, Badge } from 'antd-mobile';
import bill01 from '../../images/loan/bill01.png';
import bill02 from '../../images/loan/bill02.png';
import noLoan from '../../images/loan/noLoan.png';
const Item = List.Item;
const Brief = Item.Brief;
const myImg = src => <img src={src} className="imgc spe am-icon am-icon-md" alt="" />;

const tabs = [
  { title: <Badge>Pending</Badge> },
  { title: <Badge>Lunas</Badge> },
];

class RepaymentBill extends React.Component {
  state = {languga:'Indonesian'};
  componentWillMount() {
    var languga = this.props.location.query.languga || 'Indonesian';
    console.log(languga);
    this.setState({languga:languga});
  }

  componentDidMount() {

  }
  routerTo(v) {
    console.log(`/LendDtail/${v}`);
    this.props.router.push(`/LendDtail/${v}`);//依赖React-Router3.X版本
  } 
  render() {
    $(window).scroll(function(){
      if(document.title == 'Pusat Bantuan' || document.title == 'RepaymentBill'){
        var scrollTop =  $(window).scrollTop() ;
        var topHeight = $('.RepaymentBill .title').outerHeight();
        if(scrollTop>topHeight){
          document.title = 'Pusat Bantuan';
        }else{
          document.title = 'RepaymentBill';
        }
      }
    })
    let billLength=1,billConent;
    if(billLength==0){
        billConent=(
          <div>
          <Result
          img={myImg(noLoan)}
          message={(
            <div>
            <p>Daftar pinjaman Anda kosong.</p>
            <p>Ayo ajukan pinjaman sekarang di Pinjam Gampang !</p>
            </div>
          )}
          />
          </div>
        )
      }else{
        billConent=(
        <div>
        <div className="vertical-view billList flex1">
        <p className="bg-gray lh-30 pb5 txt-gray center">Tanggal Pengajuan 24:00 22-may-2018</p>
        <Item arrow="horizontal" onClick={()=>{this.routerTo('d1')}}><Brief>Nomor Perjanjian : 13523438158</Brief></Item>
        
        <div className="noLine">
         <Item
          thumb={bill01}
        >Sisa Pembayaran：Rp 1.000.000</Item>
        <Item
          thumb={bill02}
        >
          Tanggal Pembayaran：14hari
        </Item>
        </div>

          <div className="horizontal-view align-items-center">
            <div className="flex1 txt-orange listLeft">Terlambat 1 hari</div>
            <div className="flex1 txt-right"><Button onClick={()=>{alert('点击了我')}} type="primary" inline style={{ marginRight: '20px' }}>Bayar</Button></div>
          </div>
        </div>
        
        <div className="vertical-view billList flex1">
        <p className="bg-gray lh-30 pb5 txt-gray center">Tanggal Pengajuan 24:00 22-may-2018</p>
        <Item arrow="horizontal" onClick={()=>{this.routerTo('d2')}}><Brief>Nomor Perjanjian : 13523438158</Brief></Item>
        <div className="noLine">
         <Item
          thumb={bill01}
        >Sisa Pembayaran：Rp 1.000.000</Item>
        <Item
          thumb={bill02}
        >
          Tanggal Pembayaran：14hari
        </Item>
        </div>

          <div className="horizontal-view align-items-center">
            <div className="flex1 txt-blue listLeft">Terlambat 1 hari</div>
            <div className="flex1 txt-right"><Button  onClick={()=>{alert('点击了我')}} type="primary" inline style={{ marginRight: '20px' }}>Bayar</Button></div>
          </div> 
        </div>

         <div className="vertical-view billList flex1">
        <p className="bg-gray lh-30 pb5 txt-gray center">Tanggal Pengajuan 24:00 22-may-2018</p>
        <Item arrow="horizontal" onClick={()=>{this.routerTo('d3')}}><Brief>Nomor Perjanjian : 13523438158</Brief></Item>
        <div className="noLine">
         <Item
          thumb={bill01}
        >Sisa Pembayaran：Rp 1.000.000</Item>
        <Item
          thumb={bill02}
        >
          Tanggal Pembayaran：14hari
        </Item>
        </div>

           <div className="horizontal-view align-items-center">
            <div className="flex1 txt-blue listLeft">Terlambat 1 hari</div>
            <div className="flex1 txt-right"><Button onClick={()=>{alert('点击了我')}}  type="primary" inline style={{ marginRight: '20px' }}>Bayar</Button></div>
          </div>
        </div>
        </div>
        )
      }
    return (
      <div className="RepaymentBill">
         <Tabs tabs={tabs}
      initialPage={0}
      tabBarActiveTextColor="#333"
      tabBarInactiveTextColor="#999"
      onChange={(tab, index) => { console.log('onChange', index, tab); }}
      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
    >

      <div className="vertical-view" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'start', minHeight: '150px', backgroundColor: '#f5f5f5' }}>
        
        {billConent}

      </div>
      <div className="Lunas" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'start', minHeight: '150px', backgroundColor: '#f5f5f5' }}>
        

        <div className="vertical-view billList flex1">
        <p className="bg-gray lh-30 pb5 txt-gray center">Tanggal Pengajuan 24:00 22-may-2018</p>
        <Item arrow="horizontal" onClick={()=>{this.routerTo('d5')}}><Brief>Nomor Perjanjian : 13523438158</Brief></Item>
        <div className="noLine">
         <Item
          thumb={bill01}
        >Sisa Pembayaran：Rp 1.000.000</Item>
        <Item
          thumb={bill02}
        >
          Tanggal Pembayaran：14hari
        </Item>
        </div>
          <div className="horizontal-view align-items-center">
            <div className="flex1 txt-black listLeft lh-36 h36">Telah lunas</div>
          </div>
        </div>



      </div>
    </Tabs>
      </div>
    );
 }
}

RepaymentBill.defaultProps = {
};

export default RepaymentBill;

