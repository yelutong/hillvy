import React, {Component} from 'react';
import {withRouter } from 'react-router-dom';
import './NetError.css';//获取title

import netError from './images/netError.png';

class NetError extends Component { 
  state={
      
  }

  componentWillReceiveProps (nextProps) {
     
  }
  componentDidMount(){
    console.log('this.props',this.props);
  }


  render() {
    return (
      <div className="netError">
          <img src={netError} />
          <div className="text">Koneksi Bermasalah</div>
          <div className="btn" onClick={this.props.refresh}>Coba Lagi</div>
      </div>
    )
  }
}

export default withRouter(NetError)