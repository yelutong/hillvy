import React from 'react';
import PCIntroduction from './PC/home/introduction';//introduction
import MobileIntroduction from './H5/home/introduction';//introduction

class Index extends React.Component {
  state = {};

  componentDidMount() {
    $('.moreNav').hide();
  }

  render() {
    let showIntroduction = $(window).width() > 1025 ? <PCIntroduction/> : <MobileIntroduction/>;
    return (
      <div style={{'height':'100%'}}>
        {showIntroduction}
      </div>
    );
  }
}

export default Index;
