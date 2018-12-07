import axios from 'axios';
import { Toast } from 'antd-mobile';

//封装axios 方法，统一捕捉catch异常
export default {
    get: (url, params) => {
        return axios.get(url,params).catch(
	        	(error) => {
                    //先隐藏loading，再弹出提示
                    if(App){ 
                        App.showLoading(false);
                    }else{
                        Toast.hide();
                    }
                    //先隐藏loading，再弹出提示
                    if(!error.response){
                        console.log('没网络啦');
                        if(App){
                            App.showToast('Koneksi bermasalah. Silahkan periksa kembali koneksi Anda');
                        }else{
                            Toast.info('Koneksi bermasalah. Silahkan periksa kembali koneksi Anda');
                        }
                    }else{
                        if(App){
                            App.showToast('Koneksi bermasalah. Silahkan periksa kembali koneksi Anda (code:'+error.response.status+')');
                        }else{
                            Toast.info('Koneksi bermasalah. Silahkan periksa kembali koneksi Anda (code:'+error.response.status+')');
                        }
                    }
	        		//window.location.href='#/login';//异常的时候页面跳转
	        	}
        )
    },
    post: (url, params) => {
        return axios.post(url,params).catch(
	        	(error) => {
	        		//先隐藏loading，再弹出提示
                    if(App){ 
                        App.showLoading(false);
                    }else{
                        Toast.hide();
                    }
                    //先隐藏loading，再弹出提示
                    if(!error.response){
                        console.log('没网络啦');
                        if(App){
                            App.showToast('Koneksi bermasalah. Silahkan periksa kembali koneksi Anda');
                        }else{
                            Toast.info('Koneksi bermasalah. Silahkan periksa kembali koneksi Anda');
                        }
                    }else{
                        if(App){
                            App.showToast('Koneksi bermasalah. Silahkan periksa kembali koneksi Anda (code:'+error.response.status+')');
                        }else{
                            Toast.info('Koneksi bermasalah. Silahkan periksa kembali koneksi Anda (code:'+error.response.status+')');
                        }
                    }
	        	}
        )
    },
    put: (url, params) => {
        return axios.put(url,params).catch(
	        	(error) => {
	        		//先隐藏loading，再弹出提示
                    if(App){ 
                        App.showLoading(false);
                    }else{
                        Toast.hide();
                    }
                    //先隐藏loading，再弹出提示
                    if(!error.response){
                        console.log('没网络啦');
                        if(App){
                            App.showToast('Koneksi bermasalah. Silahkan periksa kembali koneksi Anda');
                        }else{
                            Toast.info('Koneksi bermasalah. Silahkan periksa kembali koneksi Anda');
                        }
                    }else{
                        if(App){
                            App.showToast('Koneksi bermasalah. Silahkan periksa kembali koneksi Anda (code:'+error.response.status+')');
                        }else{
                            Toast.info('Koneksi bermasalah. Silahkan periksa kembali koneksi Anda (code:'+error.response.status+')');
                        }
                    }
	        	}
        )
    },
    delete: (url, params) => {
        return axios.delete(url,params).catch(
	        	(error) => {
	        		//先隐藏loading，再弹出提示
                    if(App){ 
                        App.showLoading(false);
                    }else{
                        Toast.hide();
                    }
                    //先隐藏loading，再弹出提示
                    if(!error.response){
                        console.log('没网络啦');
                        if(App){
                            App.showToast('Koneksi bermasalah. Silahkan periksa kembali koneksi Anda');
                        }else{
                            Toast.info('Koneksi bermasalah. Silahkan periksa kembali koneksi Anda');
                        }
                    }else{
                        if(App){
                            App.showToast('Koneksi bermasalah. Silahkan periksa kembali koneksi Anda (code:'+error.response.status+')');
                        }else{
                            Toast.info('Koneksi bermasalah. Silahkan periksa kembali koneksi Anda (code:'+error.response.status+')');
                        }
                    }
	        	}
        )
    }
}