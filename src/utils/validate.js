//表单校验插件

import Vue from 'vue'
import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';
// import zh_CN from 'vee-validate/dist/locale/zh_CN'
// import VueI18n from 'vue-i18n';
// Vue.use(VueI18n)
// const i18n = new VueI18n({
//     locale: 'zh_CN',
// })
Vue.use(VeeValidate, {
    // i18n,
    // i18nRootKey: 'validation',
    // dictionary: {
    //     zh_CN
    // }
});
Validator.extend('url', {
    getMessage: field => '请输入正确的链接格式如：http://www.yidake.com',
    validate: value => {
        return /(http|https){1}(:\/\/)?([\da-z-\.]+)\.([a-z]{2,6})([\/\w \.-?&%-=]*)*\/?/.test(value)
    }
});
Validator.extend('mobile', {
    getMessage: field => '请输入正确的手机个格式',
    validate: value => {
        return /^1(3|4|5|6|7|8|9)\d{9}$/.test(value)
    }
});

Validator.extend('idnumber', {
    getMessage: field => '请输入正确的身份证号码',
    validate: value => {
        return /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)
    }
});
Validator.extend('gtaward', {
    getMessage: field => '基础佣金≥1元',
    validate: value => {
        return /^[1-9]|([1-9][0-9]+)$/.test(value)
    }
});



export default Validator
