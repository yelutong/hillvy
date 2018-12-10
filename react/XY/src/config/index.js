import axios from 'axios';
import { Toast } from 'antd-mobile';

//封装axios 方法，统一捕捉catch异常
export default {
    get: (url, params) => {
        return axios.get(url,params).catch(
	        	(error) => {
                    //先隐藏loading，再弹出提示
                    Toast.hide();
                    //先隐藏loading，再弹出提示
                    if(!error.response){
                        Toast.info('没网络啦');
                    }else{
                        
                    }
	        	}
        )
    },
    post: (url, params) => {
        return axios.post(url,params).catch(
	        	(error) => {
	        		//先隐藏loading，再弹出提示
                    Toast.hide();
                    //先隐藏loading，再弹出提示
                    if(!error.response){
                        console.log('没网络啦');
                    }else{
                        
                    }
	        	}
        )
    },
    put: (url, params) => {
        return axios.put(url,params).catch(
	        	(error) => {
	        		//先隐藏loading，再弹出提示
                    Toast.hide();
                    //先隐藏loading，再弹出提示
                    if(!error.response){
                        console.log('没网络啦');
                    }else{
                       
                    }
	        	}
        )
    },
    delete: (url, params) => {
        return axios.delete(url,params).catch(
	        	(error) => {
	        		//先隐藏loading，再弹出提示
                    Toast.hide();
                    //先隐藏loading，再弹出提示
                    if(!error.response){
                        console.log('没网络啦');
                    }else{
                       
                    }
	        	}
        )
    }
}