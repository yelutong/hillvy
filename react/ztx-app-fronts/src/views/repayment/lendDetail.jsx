import React from 'react';
import {  Button, List, Accordion } from 'antd-mobile';
import lend01 from '../../images/loan/bill01.png';
import lend02 from '../../images/loan/bill02.png';
import lend03 from '../../images/loan/bill03.png';
const Item = List.Item;
const Brief = Item.Brief;
  
class LendDtail extends React.Component {
  state = {languga:'Indonesian'};
  componentWillMount() {
    var languga = this.props.location.query.languga || 'Indonesian';
    console.log(languga);
    this.setState({languga:languga});
  }
  onChange = (key) => {
    console.log(key);
  }
  componentDidMount() {

  }

  render() {
    $(window).scroll(function(){
      if(document.title == 'Pusat Bantuan' || document.title == 'LendDtail'){
        var scrollTop =  $(window).scrollTop() ;
        var topHeight = $('.LendDtail .title').outerHeight();
        if(scrollTop>topHeight){
          document.title = 'Pusat Bantuan';
        }else{
          document.title = 'LendDtail';
        }
      }
    })
    let accDetail=(
      <div className="lendDt">
          <Item extra={'22-May-2018'}>Tanggal Diterima</Item>
          <Item extra={'22-May-2018'}>Nominal Pinjaman</Item>
          <Item extra={'22-May-2018'}>Tenor</Item>
          <Item extra={'22-May-2018'}>Nominal Diterima</Item>
          <Item extra={'22-May-2018'}>Nominal Pembayaran</Item>
          <Item onClick={() => {}} className="accLineBttom">Baca Perjanjian Pemberian Pinjaman</Item>
      </div>
      )/*accLineBttom点击查看借款协议*/
    let rpContent,rp=100.000;
    let rpValue="RP "+100.000;
    let paySucc=(
       <div className="paySucc">Telah lunas</div>
      );
    if(rp==0){
      rpContent=(
        <div className="rp0 center">Sementara kosong</div>
        )
      }else{
      rpContent=(
        <div className="rp1">
        <Item multipleLine extra={paySucc}>
          Rp1.004.900<Brief>10:00 22-May-2018</Brief>
        </Item>
        <Item multipleLine extra={paySucc}>
          Rp1.004.900<Brief>10:00 22-May-2018</Brief>
        </Item>
        </div>
        )
      }
    return (
      <div className="LendDtail">
        <div className="vertical-view" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'start', minHeight: '150px', backgroundColor: '#f5f5f5' }}>
        
        <div className="vertical-view billList flex1">
        <Item><Brief>Nomor Perjanjian : 13523438158</Brief></Item>
        <div className="noLine">
         <Item
          thumb={lend01}
        >Sisa Pembayaran：Rp 1.000.000</Item>
        <Item
          thumb={lend02}
        >
          Durasi Pinjaman：14ha
        </Item>
        <Item
          thumb={lend03}
        >
          Sisa Tenor：1
        </Item>
        </div>
        </div>
        
        <Accordion className="my-accordion lendList" onChange={this.onChange}>
         <Accordion.Panel header="Daftar Pembayaran" className="pad1">
           {rpContent}
         </Accordion.Panel>
          <Accordion.Panel header={rpValue} className="accExtra"></Accordion.Panel>
          <Accordion.Panel header="Detail pinjaman" className="pad2">
            {accDetail}
          </Accordion.Panel>
          <Accordion.Panel header="Jadwal Pembayaran" className="pad3">
            
            <div className="horizontal-view listHead align-items-center">
              <span className="flex1">Tanggal Pembayaran</span>
              <span className="flex1">Nominal Pembayaran</span>
              <span className="flex1">Telah Luna</span>
            </div>
            <ul className="listUl">
              <li className="horizontal-view vux-1px-t">
                <span className="flex1">26-Oct-2018</span>
                <span className="flex1">RP 10.000</span>
                <span className="flex1">RP 10.000</span>
              </li>
              <li className="horizontal-view vux-1px-t">
                <span className="flex1">25-May-2018</span>
                <span className="flex1">RP 10.000</span>
                <span className="flex1">RP 10.000</span>
              </li>
              <li className="horizontal-view vux-1px-t listActive">
                <span className="flex1">25-May-2018</span>
                <span className="flex1">RP 10.000</span>
                <span className="flex1">RP 0</span>
              </li>
            </ul>
          </Accordion.Panel>
        </Accordion>

        <Button type="primary" onClick={()=>{alert('点击了我')}}>Bayar</Button>
      </div> 
      </div>
    );
 }
}

LendDtail.defaultProps = {
};

export default LendDtail;

   //<List className="accExtra"> <Item>Rp 0 </Item></List>

