import React from 'react';
import PCLoan from './PC/home/loan';//PcLoan
import MobileLoan from './H5/home/loan';//H5Loan

class Index extends React.Component {
  state = {};

  componentDidMount() {
    $('.moreNav').hide();
  }

  render() {
    let showLoan = $(window).width() > 1025 ? <PCLoan/> : <MobileLoan/>;
    return (
      <div style={{'height':'100%'}}>
        {showLoan}
      </div>
    );
  }
}

export default Index;
