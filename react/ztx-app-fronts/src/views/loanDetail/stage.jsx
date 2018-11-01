import React from 'react';
import { Button, Card, List  } from 'antd-mobile';
import TopPic1 from '../../images/loan/LoanStage01.png';
import TopPic2 from '../../images/loan/loanDetail02.png';
import loan01 from '../../images/loan/loan01.png';
import loan02 from '../../images/loan/loan02.png';
import loan03 from '../../images/loan/loan03.png';
import loan04 from '../../images/loan/loan04.png';
import loan05 from '../../images/loan/loan05.png';
import loan06 from '../../images/loan/loan06.png';
import loan07 from '../../images/loan/loan07.png';
import loan08 from '../../images/loan/loan08.png';
const Item = List.Item;
const Brief = Item.Brief;

class LoanStageDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      largestAmt:this.props.location.query&&this.props.location.query.largestAmt?this.props.location.query.largestAmt:'',
      term:this.props.location.query&&this.props.location.query.term?this.props.location.query.term:'',
    }
  }
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
      if(document.title == 'Pusat Bantuan' || document.title == 'LoanDetailExplain'){
        var scrollTop =  $(window).scrollTop() ;
        var topHeight = $('.LoanStageDetail .title').outerHeight();
        if(scrollTop>topHeight){
          document.title = 'Pusat Bantuan';
        }else{
          document.title = 'LoanDetailExplain';
        }
      }
    })
    return (
      <div className="LoanDetailExplain LoanStageDetail">
      <div className="topPic"><img className="topPic1" src={TopPic1}/></div>
      <div className="vertical-view bradius-px5 content justify-content-center">
        <div className="horizontal-view expTop">
          <i className="TopPic2"><img src={TopPic2}/></i>
          <div className="vux-1px-r ct1 center flex1 justify-content-center">
            <h3 className="txt-gray fsize-normal">Hingga</h3>
            <h3 className="txt-ztx fsize-normal"><i>{this.state.largestAmt}</i></h3>
          </div>
          <div className="ct1 center flex1 justify-content-center">
            <h3 className="txt-gray fsize-normal">Tenor</h3>
            <h3 className="txt-ztx fsize-normal"><i>{this.state.term}</i></h3>
          </div>
        </div>
        
        <div className="explainCenter">
          <Card.Header
            title="Syarat"
            thumb={loan01}
          />
        <Item
          thumb={loan02}
        >Warga negara Indones</Item>
        <Item
          thumb={loan03}
        >
          Berusia 21 tahun ke atas
        </Item>
        <Item
          thumb={loan04}
        >
          Berpenghasilan stabi
        </Item>
        <Item align="top" wrap="true"
          thumb={loan05}
        >
          Memiliki akun sosial media,e-commerce,provider nomor dan BPJS  
        </Item>
        </div>
      </div>

       <Card.Header
            title="Dokumen Persyaratan"
            thumb={loan01}
          />
        <Item
          thumb={loan06}
        >KTP</Item>
        <Item  wrap="true" thumb={loan07} multipleLine>
          Identitas Kerja <Brief>atau NPWP</Brief>
        </Item>
        <Item  wrap="true" thumb={loan08} multipleLine>
          Dokumen Lainnya <Brief>(untuk meningkatkan skor kredit)</Brief>
        </Item>
        <Button type="primary" className="EXpBtn">Ajukan</Button>
      </div>
    );
 }
}

LoanStageDetail.defaultProps = {
};

export default LoanStageDetail;