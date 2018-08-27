import axios from 'axios';
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
export default util;