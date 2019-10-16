// 在http.js中引入axios
import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到



// var TIME_OUT = 50000; //如果请求的时间超过'timeout'，请求将被中止
// var st_base_prefix = 'https://api.coindesk.com';
// const base_axios_options = {
//     headers: {
//         'content-type': 'application/json'
//     },
//     timeout: TIME_OUT,
//     withCredentials: true, //是否跨站点访问控制请求
// };

// const org_base = `${st_base_prefix}`;
// const orgAxios = axios.create(Object.assign({}, {
//     baseURL: org_base
// }, base_axios_options));
// export const orgModuleApi = {
//     save: (params) => {
//         return orgAxios.post('/sysOrg/save', params).then(res => res.data);
//     },
//     getByPage: (params) => {
//         return orgAxios.post('/v1/bpi/currentprice.json', QS.stringify(params)).then(res => res.data);
//     },
//     test: (params) => {
//         //return "test";
//         return orgAxios.get('/sysOrg/test', params).then(res => res.data);
//     }
// };

// 环境的切换
// if (process.env.NODE_ENV == 'development') {
//     axios.defaults.baseURL = 'https://api.coindesk.com';
// } else if (process.env.NODE_ENV == 'debug') {
//     axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'production') {
//     axios.defaults.baseURL = '';
// };

// axios.defaults.baseURL = 'http://mobile.520cai.cn/mobile.php';

// 请求超时时间
axios.defaults.timeout = 10000;
// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.post['Content-Type'] = 'text/plain';


// /**
//  * get方法，对应get请求
//  * @param {String} url [请求的url地址]
//  * @param {Object} params [请求时携带的参数]
//  */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        });
    });
};

// /** 
//  * post方法，对应post请求 
//  * @param {String} url [请求的url地址] 
//  * @param {Object} params [请求时携带的参数] 
//  */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    });
};