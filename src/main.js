// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { JSEncrypt } from 'jsencrypt'

//vantUI
import Vant from 'vant';
import {Lazyload} from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.use(Lazyload, {
    error: require("./assets/images/error_img.png"),
    loading: '',
    lazyComponent: false
});

//封装axios
import axios from './utils/http';
Vue.prototype.$axios = axios;
import Util from "./utils/utils";
Vue.prototype.util = new Util();

import JsEncrypt from 'jsencrypt'
Vue.prototype.jsEncrypt = JsEncrypt;


//vuex
import Vuex from 'vuex'
Vue.use(Vuex);
import store from './store'

//复制到剪切板
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import vantHeader from '@/components/vant-header';
Vue.component('vantHeader', vantHeader);
import vantFooter from '@/components/vant-footer';
Vue.component('vantFooter', vantFooter);

import waterfall from 'vue-waterfall2'
Vue.use(waterfall);


Vue.filter('formatPriceFb', function (value, mt, f1, f2, type) {
    if (type == 'obj') {
        let sumMoney = 0.00;
        value.map((item, idx) => {
            sumMoney = parseFloat(parseFloat(sumMoney) + parseFloat(item.totalProductPrice)).toFixed(2);
        });
        value = parseFloat(sumMoney).toFixed(2)
    } else {
        value = parseFloat(value).toFixed(2);
    }
    value = value.toString().split('.');
    return `
            <div class="product-price product-price--fb" style="margin-top: ${mt}rem !important">
                <p class="formatPrice1">
                    <span class="symbol">¥</span><span class="big-price" style="font-size:${f1}rem !important;">${value[0] != undefined ? value[0] : ''}</span><span class="small-price" style="font-size:${f2}rem !important;">.${value[1] != undefined ? value[1] : ''}</span>
                </p>
            </div>`;
});
//设置cookie
Vue.prototype.setCookie = function(c_name,value,expiredays) {
  var exdate=new Date()
  exdate.setDate(exdate.getDate()+expiredays)
  document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
};

//获取cookie
Vue.prototype.getCookie=function(c_name) {
  if (document.cookie.length>0)
  {
    var  c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1)
    {
      c_start=c_start + c_name.length+1
     var c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
    }
  }
  return ""
};

//加密挂在全局
//Vue.prototype.$getCode = function(sum){
//	//new 一个对象
//	var encrypt = new JSEncrypt()
//	//秘钥
//	encrypt.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCjTNfZA2HVz4qtcj" +
//          "Y1bYhynp5T2AF0TE60MpYEpYs8dbsMvQhFbN+7KLea1HkzEM1I5a+c" +
//          "gdWIF8iwuQE58aMy428f2cC0LRabdaKLhcOV4jxNLGK4mVcWMtq8g8" +
//          "2sOnXZK8MG124RrrGLyWwksAvxrkGrk7JukHr2lMpxhFBy6wIDAQAB")
//	let data = encrypt.encrypt(sum)
//	return data
//}

Vue.filter('goodsDetailPrice', function (value, f1, f2, f3) {
    value = parseFloat(value).toFixed(2);
    value = value.toString().split('.');
    return `
            <span class="formatPrice1">
                <span class="symbol" style="font-size:${f1}rem !important;">¥</span><span class="big-price" style="font-size:${f2}rem !important;">${value[0] != undefined ? value[0] : ''}</span><span class="small-price" style="font-size:${f3}rem !important;">.${value[1] != undefined ? value[1] : ''}</span>
            </span>`;
});

// 分段加密


Vue.config.productionTip = false;
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
});
