import React from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import './index.css';
import { List, Tabs } from 'antd-mobile';
import Cart from '../Cart/index';
import VContent from '../VContent/index';
import User from '../user/index';

class IndexContent extends React.Component{
    constructor(props){
      super(props); 
      this.state = {
         tabArr: '',
         tabIndex: 0
      }
    }
    
    componentWillMount(){
      this.mounted = true;
      this.getBegin();
    }

    componentWillUnmount() {
      this.mounted = false;
    }
     
    getBegin = () => {
      let tabs = [
        { title: '新品' ,route: 0 },
        { title: '生鲜' ,route: 1 },
        { title: '食品' ,route: 2 },
        { title: '美妆' ,route: 3  },
        { title: '男装' ,route: 4  },
        { title: '女装' ,route: 5  },
        { title: '护肤' ,route: 6  },
        { title: '数码' ,route: 7  },
        { title: '图书' ,route: 8  },
      ];
      
      if(this.mounted){
        this.setState({
          tabArr : tabs 
        }, () => {
          console.log(this.state.tabArr)
        });
      } 

    }
  
    tabContent =() =>(
     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '150px', backgroundColor: '#fff' }}>
    {
       (() => {
          switch (this.state.tabIndex) { 
            case 0:
              return <Cart />
              break;
            case 1:
              return <VContent />
              break;
            case 2:
             return <User />
             break;
            case 3:
             return <Cart />
              break;
            case 4:
             return <Cart />
              break; 
            default:
             return null; 
          }
        }
        )()
      
    }
    </div>
    );

    render(){ 
        return (
        <div className="flex1 IndexContent">
        <Tabs tabBarUnderlineStyle={{textAlign:'center'}} tabs={this.state.tabArr} prerenderingSiblingsNumber={1} onTabClick={(item)=>{ this.state.tabIndex=item.route }} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={6.8} />}>
        {this.tabContent}
        </Tabs>
        </div>
        )
    }
} 


export default withRouter(IndexContent);