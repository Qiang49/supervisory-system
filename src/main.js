import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCropper from 'vue-cropper'
import './plugins/element.js'
import './assets/css/base.css'


Vue.use(VueCropper)
import axios from 'axios'
axios.defaults.baseURL = '/prod-api'
axios.interceptors.request.use(config => {
    // console.log(config);
    // config.headers.Authorization = localStorage.getItem('Authorization')
    return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 获取当前时间
let date = new Date();
let seperator1 = "-";
let year = date.getFullYear();
let month = date.getMonth() + 1;
let strDate = date.getDate();
let hour = date.getHours();
let min = date.getMinutes()
if (month >= 1 && month <= 9) {
    month = "0" + month;
}
if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
}
if (hour >= 0 && hour <= 9) {
    hour = "0" + hour
}
if (min >= 0 && min <= 9) {
    min = "0" + min
}
let currentdate = year + seperator1 + month + seperator1 + strDate
let currentdatehours = year + seperator1 + month + seperator1 + strDate + ' ' + hour + ':' + min;

Vue.prototype.currentdate = currentdate
Vue.prototype.currentdatehours = currentdatehours

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')