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
            if(App){
                App.showLoading(true);
            }else{
                Toast.loading('');
            }
        }else{
          //alert('未联网');
          this.setState({
            NewError:true
          })
        }
    }

    componentWillUnmount() {
        if(App){
	        App.showLoading(false);
	    }else{
	        Toast.hide();
	    }
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
          //alert('未联网');
          if(App){
              App.showToast('Koneksi bermasalah. Silahkan periksa kembali koneksi Anda');
          }else{
              Toast.info('Koneksi bermasalah. Silahkan periksa kembali koneksi Anda');
          }
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