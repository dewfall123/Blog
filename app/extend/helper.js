// app/extend/helper.js
'use strict';
const assert = require('assert');
const utility = require('utility');
const is = require('is-type-of');

module.exports = {

    utility,

    /**
     * 计算文件md5名字
     * @param {*} string
     */
    filename(name) {
        if (!is.string(name)) {
            assert('filename must be a string');
            return;
        }
        const defaultSuffix = '';
        try {
            const [ preName, suffix = defaultSuffix ] = name.split('.');
            const md5Name = utility.md5(preName) + (suffix ? '.' + suffix : '');
            return md5Name;
        } catch (err) {
            return utility.md5(name);
        }
    },
};
