module.exports = {
    extends: "eslint-config-egg",
    // "off" -> 0 关闭规则
    // "warn" -> 1 开启警告规则
    //"error" -> 2 开启错误规则
    rules: {
        'indent': ["error", 4],
        'linebreak-style': 0,
    }
}