import React from 'react';
import PCHelpCenter from './PC/home/helpCenter';//helpCenter
import MobileHelpCenter from './H5/home/helpCenter';//helpCenter

class Index extends React.Component {
  state = {};

  componentDidMount() {
    $('.moreNav').hide();
  }

  render() {
    let showHelpCenter = $(window).width() > 1025 ? <PCHelpCenter/> : <MobileHelpCenter/>;
    return (
      <div style={{'height':'100%'}}>
        {showHelpCenter}
      </div>
    );
  }
}

export default Index;
