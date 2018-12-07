import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import format from '../../js/format';
import Nav from 'components/Nav/Nav';
import './index.css';


class AssetsReport extends Component { 

    constructor(props){
      super(props); 
      this.state = {
      }
      console.log(this.props.location.state.assetsData)
    }

    componentDidMount = () => {
    }

    render() {
        return (
          <div className="AssetsReport">
            <Nav />
            <div className="assetsTop bg-white">
            <div className="atop1 justify-content-space-between vux-1px-b">
               <div>
               <p className="fs-13 txt-gray lh-28">Total Nilai Akun</p>
               <p className={this.props.location.state.assetsData.totalAmt&&String(this.props.location.state.assetsData.totalAmt).length>9?"fs-18 lh-28":"fs-25 lh-28"}>{format.addDot(this.props.location.state.assetsData.totalAmt||0)}</p>
               </div>
               <div>
               <p className="fs-13 txt-gray lh-28 txt-right">Dana Tersedia</p>
               <p className={this.props.location.state.assetsData.balance&&String(this.props.location.state.assetsData.balance).length>9?"fs-18 txt-blue lh-28 txt-right":"fs-25 txt-blue lh-28 txt-right"}>{format.addDot(this.props.location.state.assetsData.balance||0)}</p>
               </div>
            </div>
            <div className="atop2 justify-content-start">
               <div className="assetsBottom flex1 vux-1px-r">
               <p className="fs-15 lh-24">Dana Tertunda</p>
               <p className="fs-15 txt-gray lh-24">{format.addDot(this.props.location.state.assetsData.frzzAmount||0)}</p>
               </div>
               <div className="assetsBottom flex1 pdl15">
               <p className="fs-15 lh-24">Dana Teralokasi</p>
               <p className="fs-15 txt-gray lh-24">{format.addDot(this.props.location.state.assetsData.principal||0)}</p>
               </div>
            </div>
            </div>
          </div>     
        )           
    }
}

export default withRouter(AssetsReport);
 