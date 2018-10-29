import React from 'react';
import PCHome from './PC/home/index';//PcHome
import MobileHome from './H5/home/index';//H5Home


class Index extends React.Component {
  state = {};
  
  componentDidMount() {
    $('.moreNav').hide();
  }

  render() {
    let showHome = $(window).width() > 1025 ? <PCHome/> : <MobileHome/>;
    return (
      <div style={{'height':'100%'}}>
      {showHome}
      </div>
    );
  }
}

export default Index;
