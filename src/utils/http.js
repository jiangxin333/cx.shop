'use strict'

import axios from 'axios'
import qs from 'qs'
import store from '../store'
import {Toast} from 'vant';
import router from "@/router";
import Encrypt from '@/utils/jsencrypt.min.js'

axios.interceptors.request.use(config => {    // 这里的config包含每次请求的内容
    //loading
    store.state.loading = true;
    return config;
}, err => {
    return Promise.reject(err);
});

axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
});

function checkStatus(response) {
    //loading
    store.state.loading = false;
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        switch (response.data.code) {
            case 200:
                response = response.data == [] ? '' : response;
                break;
//          case 500:
//              Toast('服务器发生错误');
//              break;
            case 404:
                Toast('请求地址不存在');
                break;
            case 401:
                router.push({
                    path: "/login",
                    querry: {redirect: router.currentRoute.fullPath}    //从哪个页面跳转
                });
                break;
            default:
                Toast(response.data.msg);
                break;
        }
        return response
    } else {
        // 异常状态下，把错误信息返回去
        Toast('服务器发生错误');
    }
}

function checkCode(res) {
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if (res.status === -404) {
//      alert(res.msg)
    }
    if (res.data && (!res.data.success)) {
        // alert(res.data.error_msg)
    }
    return res
}
// 请求方式的配置
export default {
    post (url, data) {  //  post
        return axios({
            method: 'POST',
            baseURL: '/backapis',
            url,
            data: qs.stringify(data),
            timeout: 500000,
            headers: {
                'Accept': 'application/json; charset=utf-8',
            }
        }).then((response) => {
            return checkStatus(response)
        }).then((res) => {
            return checkCode(res)
        })
    },
    get (url, params) {  // get
        return axios({
            method: 'get',
            baseURL: '/backapis',
            url,
            params, // get 请求时带的参数
            timeout: 500000,
            headers: {
//          	'Accept': 'application/json; charset=utf-8',
//          	'token' : token
//              'Authorization' : token
            }
        }).then((response) => {
            return checkStatus(response)
        }).then((res) => {
            return checkCode(res)
        })
    },
    postToken (url, data) {  //  带token的post
        let token = localStorage.getItem('token');
        let uuid = localStorage.getItem('setid')
        
        let marks = localStorage.getItem('mark')
//      this.getCookie('setid');
        //判断token是否存在，有就传，没有就不传
        if(token){
        	token = token
        }else{
        	token = ''
        }
        if(!token){
            router.push({
                path: "/login",
                querry: {redirect: router.currentRoute.fullPath}    //从哪个页面跳转
            });
            return new Promise((resolve, reject) => {
                resolve();
                return false;
            });
        }
        console.log(token)
        var Encrypt = new JSEncrypt();
		Encrypt.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCjTNfZA2HVz4qtcj" +
            "Y1bYhynp5T2AF0TE60MpYEpYs8dbsMvQhFbN+7KLea1HkzEM1I5a+c" +
            "gdWIF8iwuQE58aMy428f2cC0LRabdaKLhcOV4jxNLGK4mVcWMtq8g8" +
            "2sOnXZK8MG124RrrGLyWwksAvxrkGrk7JukHr2lMpxhFBy6wIDAQAB");
            
            var entoken = Encrypt.encryptLong(token + url)
            var entoken = entoken.replace(/\r\n/g,"");
        console.log(uuid)
        console.log(url)
        console.log(marks)
        console.log(token)
        console.log(entoken)
        return axios({
            method: 'POST',
            baseURL: '/backapis',
            url,
            data: qs.stringify(data),
            timeout: 500000,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'token':  entoken,
                "mark" : marks
//          	'Content-Type':'multipart/form-data',
            }
        }).then((response) => {
            return checkStatus(response)
        }).then((res) => {
            return checkCode(res)
        })
    },
    getToken (url, params) {  // 带token的get
        let token = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).token || '';
//      if(!token){
//          router.push({
//              path: "/login",
//              querry: {redirect: router.currentRoute.fullPath}    //从哪个页面跳转
//          });
//          return new Promise((resolve, reject) => {
//              resolve();
//              return false;
//          });
//      }
        return axios({
            method: 'get',
            baseURL: '/backapis',
            url,
            params, // get 请求时带的参数
            timeout: 500000,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'token': token || '',
            }
        }).then((response) => {
            return checkStatus(response)
        }).then((res) => {
            return checkCode(res)
        })
    },
    postImg (url, data) {  //  上传图片的post，data不需要qsstring
        return axios({
            method: 'POST',
            baseURL: '/backapis',
            url,
            data: data,
            timeout: 500000,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'token': localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).token,
//          	'Content-Type':'multipart/form-data',
            }
        }).then((response) => {
            return checkStatus(response)
        }).then((res) => {
            return checkCode(res)
        })
    },
}


//axios封装
