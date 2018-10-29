import React from 'react';
import PCRisk from './PC/home/risk';//risk
import MobileRisk from './H5/home/risk';//risk

class Index extends React.Component {
  state = {};

  componentDidMount() {
    $('.moreNav').hide();
  }

  render() {
    let showRisk = $(window).width() > 1025 ? <PCRisk/> : <MobileRisk/>;
    return (
      <div style={{'height':'100%'}}>
        {showRisk}
      </div>
    );
  }
}

export default Index;
