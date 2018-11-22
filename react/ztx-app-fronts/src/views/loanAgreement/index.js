import React from 'react';
import axios from 'axios';
import restStore from './store';
import AgreementV1 from './agreementV1';//v1的合同
import AgreementV2 from './agreementV2';//v2的合同

class LoanAgreement extends React.Component {
  state = {
    contractData:{},
    contractNo:'',
    contractVersion:''
  };

  componentWillMount() {
    console.log(this.props);
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
            console.log(res.data.body.principal)
            this.setState({
              contractData:res.data.body,
              contractVersion:res.data.body.contractVersion
            },() => {
              console.log(this.state.contractData)
            })
          }
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.contractVersion == '1'?
          <AgreementV1 contractData = {this.state.contractData}/>:
          this.state.contractVersion == '2'?
          <AgreementV2 contractData = {this.state.contractData}/>:''
        }
      </div>
    );
  }
}

LoanAgreement.defaultProps = {
};

export default LoanAgreement;
