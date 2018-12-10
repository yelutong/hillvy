import React, {Component} from 'react';
import { Toast} from 'antd-mobile';
import {withRouter } from 'react-router-dom';
import NewError from '../errorNet/NetError';


class Loading extends Component {
    state = {
        NewError:false
    }
  componentDidMount = () => {
        if(navigator.onLine){
          //alert('联网');
            this.setState({
                NewError:false
            })
            Toast.loading('Loading...',1);
        }else{
          //alert('未联网');
          this.setState({
            NewError:true
          })
        }
    }

    componentWillUnmount() {
      Toast.hide();
    }

     /*
      *@description 返回 该方法传给网络异常的时候返回
      */
      errorBack = () =>{
        if(navigator.onLine){
          //alert('联网');
          if(window.location.pathname == '/CommonTabs'){
            window.location.href='/CommonTabs';
          }else{
            this.props.history.goBack();
          }
        }else{
          Toast.info('nda');
        }
      }

    render() {
        return (
            <div>
                {this.state.NewError?<NewError refresh={this.errorBack.bind(this)}/>:''}
            </div>
        )
    }
}

export default  withRouter(Loading)