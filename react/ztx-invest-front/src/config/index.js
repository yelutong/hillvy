import axios from 'axios';

//封装axios 方法，统一捕捉catch异常
export default {
    get: (url, params) => {
        return axios.get(url,params).catch(
	        	(error) => {
	        		//window.location.href='#/login';//异常的时候页面跳转
	        	}
        )
    },
    post: (url, params) => {
        return axios.post(url,params).catch(
	        	(error) => {
	        		//window.location.href='#/login';//异常的时候页面跳转
	        	}
        )
    },
    put: (url, params) => {
        return axios.put(url,params).catch(
	        	(error) => {
	        		//window.location.href='#/login';//异常的时候页面跳转
	        	}
        )
    },
    delete: (url, params) => {
        return axios.delete(url,params).catch(
	        	(error) => {
	        		//window.location.href='#/login';//异常的时候页面跳转
	        	}
        )
    }
}