import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
import Vue from "vue";
import md5 from 'js-md5';
Vue.prototype.$mdjm = md5;

var utils = {
    is_weixin: function() {
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
            // alert("这个是微信的浏览器");
        } else {
            return false;
            // alert("这个不是微信的浏览器");
        }
    },

    is_PC: function() {
        if(/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)) {
            // console.log('手机端登录的');

        } else {
            // console.log('PC端登录的');
            window.location.href = "http://www.520cai.com/";
        }
    },

    is_iosAndroid: function() {
        // var u = navigator.userAgent,
        //     app = navigator.appVersion;
        // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //g
        // var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        var u = navigator.userAgent,
            app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isAndroid) {
            return true;
        }
        if(isIOS) {
            return false;
        }
    },

    navClassStyle: function() { //根据浏览器的地址栏地址来显示NAV导航的点击特效
        //      var href = 'https://m.520cai.com/wap/index.html#/game?nums=2';
        var href = window.location.href;
        var page = href.split("?")[1];
        //          console.log(page);
        if(page != undefined) {
            var page1 = href.split('#')[1].split('?')[0];
            if(page1 == "/") {
                page1 = "/index";
            }
            //              console.log(page1);
            return page1;
        } else {
            var page2 = href.split('#')[1];
            if(page2 == "/") {
                page2 = "/index";
            }
            return page2;
        }
    },
    mdjm_fun: function(params, value) {
        var access = this.$mdjm(JSON.stringify(params) + value);
        params['access'] = access;
        //   console.log(params);
        return params;
    },

    is_tel: function(tel) {
        //手机号码的正则
        if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(tel))) {
            // console.log("联系方式为空或者格式不正确！请重新填写！");
            // document.mobileform.mobile.focus();
            return 0;
        } else {
            return 1;
        }
    },

    is_email: function(email) {
        if(!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(email))) {
            // console.log("邮箱为空或者格式不正确！请重新填写！");
            return 0;
        } else {
            return 1;
        }
    },
    //手机号码中间隐藏正则
    telPhoneHide: function(tel) {
        var reg = /^(\d{3})\d{4}(\d{4})$/;
        tel = tel.replace(reg, "$1****$2");
        // console.log(tel);
        return tel;
    },

    axios_post: function(value, params_data, QS, url, mdjm, axios) {
        var that = this;

        function mdjm_fun(params) {
            var access = mdjm(JSON.stringify(params) + value);
            params["access"] = access;
            return params;
        }

        axios({
                method: "post",
                url: url,
                data: QS.stringify(mdjm_fun(params_data))
            })
            .then(function(response) {
                if(response.data.status == 0) {
                    //请求不成功
                    return response.data.msg;
                } else if(response.data.status == 1) {
                    //请求成功
                    return response.data.data;
                }
            })
            .catch(function(error) {
                // console.log(error);
            });
    }
};

export default utils;