import Vue from 'vue'
import App from './App.vue'
import router from './router'
import emptylist from '@/components/empty-list.vue'

import commoncss from './assets/css/common.css'
import commonjs from './assets/js/common.js'
import store from './store'

import validate from '@/utils/validate.js'

Vue.component('empty-list', emptylist);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
