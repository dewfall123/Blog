module.exports = {
    extends: 'eslint-config-egg',
    // 'off' -> 0 关闭规则
    // 'warn' -> 1 开启警告规则
    //'error' -> 2 开启错误规则
    rules: {
        'indent': ['error', 4],
        'linebreak-style': 0,
        'valid-jsdoc': 0,
    },
    env: {
        'browser': true,
        'commonjs': true,
        'es6': true
    },
    plugins: [
        'html',
    ],
    extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        // 'plugin:vue/recommended'
    ],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true
        },
        ecmaVersion: 6,
        sourceType: 'module',
    },
    validate: [
        'javascript',
        { 'language': 'vue', 'autoFix': true }
    ]
}