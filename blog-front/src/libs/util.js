import axios from 'axios';
import dayjs from 'dayjs';
import AdvancedFormat from 'dayjs/plugin/relativeTime'
dayjs.extend(AdvancedFormat)

import env from '../config/env';

const util = {
    title(title) {
        title = title ? title + ' - Home' : 'iView project';
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

export default { util, install };