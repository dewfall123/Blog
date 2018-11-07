import axios from 'axios';
import dayjs from 'dayjs';
import AdvancedFormat from 'dayjs/plugin/RelativeTime'
dayjs.extend(AdvancedFormat)

import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ?
    'http://localhost:7001' :
    env === 'production' ?
    'http://localhost:7001' :
    'http://localhost:7001';

util.ajax = axios;


util.oneOf = function (value, validList) {
 for (let i = 0; i < validList.length; i++) {
   if (value === validList[i]) {
     return true
   }
 }
 return false
}

util.toNow = (s) => {
  return dayjs(s).fromNow();
};

export default util;