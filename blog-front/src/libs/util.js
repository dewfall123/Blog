import axios from 'axios';
import dayjs from 'dayjs';
import AdvancedFormat from 'dayjs/plugin/relativeTime'
dayjs.extend(AdvancedFormat);
import { Message } from 'iview';

import env from '../config/env';


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// const TIPS = new Map([
//     [/^0_200$/, Message.success(msg)],
//     [/^[^0]_200$/, Message.error(msg || '结果异常!')],
//     [/^[^0]_[^2]\d\d$/, Message.error(msg || '服务异常!')],
// ]);

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.data) {
        if (response.data.result !== 0) {
            Message.error(response.data.msg || '请求结果异常!');
        } else {
            response.data.msg && Message.success(response.data.msg);
        }
    }
    return response;
}, function (error) {
    let response = error.response;
    if (response.data && response.data.result !== 0) {
        Message.error(response.data.msg || '请求异常!');
    }
    return Promise.reject(error);
});


const util = {
    title(title) {
        title = title ? title + '' : '且坐吃茶~';
        window.document.title = title;
    },
    ajaxUrl: env === 'development' ?
        'http://localhost:7001' : env === 'production' ?
        'http://localhost:7001' : 'http://localhost:7001',

    ajax: axios,

    oneOf(value, validList) {
        for (let i = 0; i < validList.length; i++) {
            if (value === validList[i]) {
                return true
            }
        }
        return false
    },

    dayjs: dayjs,

};
const install = function (Vue) {
    // 添加实例方法
    Object.keys(util).forEach(key => {
        Vue.prototype[`${key}`] = util[key];
    });
}

export default {
    util,
    install
};