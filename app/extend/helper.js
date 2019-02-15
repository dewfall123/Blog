// app/extend/helper.js
'use strict';
const assert = require('assert');

const utility = require('utility');
const is = require('is-type-of');
const markdown = require('markdown').markdown;
const cheerio = require('cheerio');

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

    /**
     * 分离markdown标签
     * @param {*} str
     */
    summary(str) {
        const html = markdown.toHTML(str);
        const $html = cheerio.load(html);
        const sLength = this.config.summary.length || 150;
        return $html.text().replace(/\s/g, ' ').substr(0, sLength) + '...';
    },

    // 删除undefined属性
    delUndefined(o) {
        for (const key in o) {
            if (!o[key] && o[key] !== 0) {
                delete o[key];
            }
        }
        return o;
    },
};
