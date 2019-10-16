// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable no-new */
import Vue from 'vue';
import App from './App';

import router from './router';
import store from './store/index'; //引入store
import './config/rem';
import axios from 'axios';
import VueLazyLoad from 'vue-lazyload';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {
	Alert,
	Confirm,
	Toast
} from 'wc-messagebox'
import 'wc-messagebox/style.css'
import VueClipboard from 'vue-clipboard2'
import $jq from 'jquery'
import Cropper from "cropperjs";
import VueCropper from 'vue-cropper'
import md5 from 'js-md5';
// axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://m.520cai.com/mobile.php' : 'http://192.168.0.217/mobile.php';
axios.defaults.baseURL = 'http://admin.520cai.cn/mobile.php'; //正式服
// axios.defaults.baseURL = 'http://www.520cai.com/mobile.php';//正式服
// axios.defaults.baseURL = 'http://admin.520cai.cn/mobile.php';//测试服
// axios.defaults.baseURL = 'http://admin.qf_520cai.cn/mobile.php';
// axios.defaults.baseURL = 'http://192.168.0.217/mobile.php';
// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-type'] = 'multipart/form-data';
import code from "./components/commons/code.vue"
Vue.prototype.$axios = axios;
Vue.prototype.$jq = $jq;
Vue.prototype.$mdjm = md5;
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(Alert);
Vue.use(Confirm);
Vue.use(Toast);
Vue.use(ElementUI, {
	size: 'small',
	zIndex: 3000
});
Vue.use(VueClipboard);
Vue.use(VueLazyLoad);
Vue.use(VueAwesomeSwiper);
Vue.use(code, Cropper, VueCropper);
Vue.config.productionTip = false;



new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
});
