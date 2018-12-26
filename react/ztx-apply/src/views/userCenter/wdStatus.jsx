import React from 'react';
import config from '../../config/base';
import {  Toast,Button,Steps,List } from 'antd-mobile';
import axios from 'axios';

const Step = Steps.Step;  
const Item = List.Item;
const customIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" className="am-icon am-icon-md">
    <g fillRule="evenodd" stroke="transparent" strokeWidth="4">
      <path d="M21 0C9.402 0 0 9.402 0 21c0 11.6 9.402 21 21 21s21-9.4 21-21C42 9.402 32.598 0 21 0z" />
      <path fill="#FFF" d="M29 18.73c0-.55-.447-1-1-1H23.36l4.428-5.05c.407-.46.407-1.208 0-1.668-.407-.46-1.068-.46-1.476 0l-5.21 5.89-5.21-5.89c-.406-.46-1.067-.46-1.475 0-.406.46-.406 1.207 0 1.667l4.43 5.05H14.23c-.55 0-.998.45-.998 1 0 .554.448.97 1 .97h5.9v3.942h-5.9c-.552 0-1 .448-1 1s.448.985 1 .985h5.9v4.896c0 .552.448 1 1 1 .55 0 .968-.284.968-.836v-5.06H28c.553 0 1-.433 1-.985s-.447-1-1-1h-5.9v-3.94H28c.553 0 1-.418 1-.97z" />
    </g>
  </svg>
);


class wdStatus extends React.Component {
  constructor(props) {
    super(props);
  } 

  componentWillMount() {
    document.body.classList.add("bg-white");
  } 
  componentWillUnmount() {
    document.body.classList.remove("bg-white");
  }

  render() {
    return ( 
      <div className="wdStatus mt10">
      <div className="vertical-view pdlr15" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'start', minHeight: '150px', backgroundColor: '#fff' }}>
     
      <Steps current={1} status="process" className="pdl15">
        <Step title="Pengajuan Penarikan Dana" className="step1"  description="" />
        <Step title="Sedang Diproses" className="step2"  description="Perkiraan sebelum 24/01 20:15 dicairkan ke rekening" />
        <Step title="Penarikan Dana berhasil" className="step3" description="" /> 
      </Steps>
        
       <Item className="flex1 black3" extra={'Rp50.000'}>Jumlah Penarikan</Item>
       <Item className="flex1 black3" extra={'BCA 1234****5678'}>Rekening Tujuan</Item> 
       
      </div>
        <Button type="primary" className="m30 txt-green1">OK</Button>
      </div> 
      );
  }
}

export default wdStatus;


