import React from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import './index.css';
import { List } from 'antd-mobile';

class IndexContent extends React.Component{
    constructor(props){
      super(props); 
      this.state = {

      } 
    }
    
    componentWillMount = () => {
       
    }
    componentWillUnmount = () => {
      
    }
    
    render(){
        return (
        <div className="flex1">
         购物车
        </div>
        )
    }
} 


export default withRouter(IndexContent);