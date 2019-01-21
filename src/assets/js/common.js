// console.log('this is commonjs')
import Vue from 'vue'
import { Dialog, Toast } from 'vant';
import apis from '@/config/api';
import { priceToFen, priceToYuan } from '@/utils/util.js'
import FastClick from 'fastclick';
if (process.env.NODE_ENV === 'production') {
    FastClick.attach(document.body); // 使用 fastclick
}
Toast.setDefaultOptions({
    // loadingType: 'spinner',
    duration: 1000
})

Vue.prototype.$toast = Toast;
Vue.prototype.$dialog = Dialog;
Vue.use(Dialog);

// loading
Vue.prototype.$loading = (param) => {
    return Toast.loading({
        duration: 30000,
        ...param
    });
};

//获取七牛资源全路径
Vue.prototype.$getImg = (res, width) => {
    if (!res) return false;
    //全链接
    if (res.indexOf('http') > -1) {
        return res;
    } else {
        //七牛地址
        return apis.qiniuUrl + res + `?imageView/2/2/w/${width || 640}`
    }
}

//表单点击光标到最后
Vue.prototype.$inputEnd = (e) => {
    let target = e.target;
    let end = target.value.length;
    let type = target.type;
    if (type == 'text' || type == 'tel' || type == 'search' || type == 'password' || type == 'url') {
        target.setSelectionRange(end, end)
    }
}

//价格转换
Vue.prototype.$priceToFen = priceToFen;
Vue.prototype.$priceToYuan = priceToYuan;
