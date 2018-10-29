import React from 'react';
import PCAnnouncement from './PC/home/announcement';//risk
import MobileAnnouncement from './H5/home/announcement';//risk

class Index extends React.Component {
  state = {};

  componentDidMount() {
    $('.moreNav').hide();
  }

  render() {
    let showAnnouncement = $(window).width() > 1025 ? <PCAnnouncement/> : <MobileAnnouncement/>;
    return (
      <div style={{'height':'100%'}}>
        {showAnnouncement}
      </div>
    );
  }
}

export default Index;
