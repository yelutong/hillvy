import React from 'react';
import {  Toast, Button, Modal } from 'antd-mobile';
import regOk from '../../images/new/regOk.png';
import DateApi from '../../js/dateFormat.js';


class RegSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
    };
  }
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
    console.log(0);
  }
   onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  render() {
    return ( 
      <div className="RegSuccess RecommendReg">
        <div className="vertical-view">
         <img src={regOk} />
         <div className="fs-18 center">
          <p>Selamat!</p>
          <p>Registrasi Anda telah berhasil!</p>
         </div>
         <div className="center fs-13 txt-gray mt5">
           <p>Ajukan sekarang di aplikasi</p>
           <p>Pinjam Gampang dan dapatkan</p>
           <p>potongan hingga Rp40.000!</p>
         </div>
         <div className="justify-content-space-around horizontal-view m15 regSuccBtn">
          <Button type="ghost" inline className="mt25  txt-yellow">Buka Aplikasi</Button>
          <Button type="primary"  onClick={this.showModal('modal1')} inline className="mt25 txt-green1">Download</Button>
         </div>
         <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div>
            Nomor telepon ini telah terdaftar sehingga tidak memenuhi kriteria untuk berpartisipasi. Mohon masukan nomor telepon yang baru!
          </div>
        </Modal>
        </div> 
      </div> 
      );
  }
}

export default RegSuccess;


