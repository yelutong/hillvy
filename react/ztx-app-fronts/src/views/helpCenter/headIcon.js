import React from 'react';
import {Link } from 'react-router';
/*四个logo图片路径*/
import iconA from './images/account.png';
import iconB from './images/Applicaton.png';
import iconC from './images/Loan.png';
import iconD from './images/Repayment.png';

class HeadIcon extends React.Component {
  state = {};
  componentWillMount() {

  }
  render() {
    return (
      <div className="headIcon">
        <ul>
          <li>
            <Link className="link morePadding" to={'/SecondHC/:'+(this.props.languga=='Indonesian'?'Akun':'Account')+'?languga='+this.props.languga}>
              <span>
                <img src={iconA} />
              </span>
              <p>Akun</p>
            </Link>
          </li>
          <li>
            <Link className="link" to={'/SecondHC/:'+(this.props.languga == 'Indonesian'?'Pengisian Pengajuan':'Applicaton')+'?languga='+this.props.languga}>
              <span>
                <img src={iconB} />
              </span>
              <p>Pengisian Pengajuan</p>
            </Link>
          </li>
          <li>
            <Link className="link" to={'/SecondHC/:'+(this.props.languga == 'Indonesian'?'Produk Pinjaman':'Loan')+'?languga='+this.props.languga}>
              <span>
                <img src={iconC} />
              </span>
              <p>Produk Pinjaman</p>
            </Link>
          </li>
          <li>
            <Link className="link morePadding" to={'/SecondHC/:'+(this.props.languga == 'Indonesian'?'Pelunasan':'Repayment')+'?languga='+this.props.languga}>
              <span className="iconMiddle">
                <img src={iconD} />
              </span>
              <p>Pelunasan</p>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

HeadIcon.defaultProps = {
};

export default HeadIcon;
