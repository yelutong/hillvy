import React, {Component} from 'react';
import left from './images/left.png';
import './Nav.css';//获取title

class Nav extends Component { 
  state={
      
  }

  componentDidMount(){

  }
  
  /*
  *@description 返回
  */
  goBack () {
     window.history.go(-1);
  }

  render() {
    return (
      <div className="nav">
          <div className="left" onClick={this.goBack.bind(this)}>
            <img src={left} />
          </div>
          <div className="middle">Perjanjian</div>
          <div className="right"></div>
      </div>
    )
  }
}

export default Nav