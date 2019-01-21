/**
 * ajax请求
 * 在 vue 中直接使用 this.$ajax 使用，方法见 axios 文档 https://github.com/axios/axios
*/
import axios from 'axios';
import Vue from 'vue';
import apis from './api';
import intercept from '../utils/intercept';
import cookie from "js-cookie";

//设置请求 baseUrl ，请求可以直接写接口。使用全路径会忽略 baseUrl
axios.defaults.baseURL = apis.ajaxUrl;

if (process.env.NODE_ENV === 'production') {
    axios.defaults.headers.common['token'] = cookie.get("token") || cookie.get("wbtoken");
}


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    return intercept.request.common(config);
}, function (error) {
    // 对请求错误做些什么
    console.log('axios req err:', error)
    return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(function (response) {
    return intercept.response.common(response);
}, function (error) {
    // 对响应错误做点什么
    console.log('axios res err:', error)
    return Promise.reject(error);
});
// console.log(apis)
Vue.prototype.$ajax = axios;
Vue.prototype.$apis = apis;
