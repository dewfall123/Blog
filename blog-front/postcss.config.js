module.exports = ({ file, options, env }) => {
    return {
        parser: 'sugarss',
        plugins: {
        'postcss-import': {},
        'postcss-cssnext': {},
        'cssnano': {},
        'autoprefixer': {},
        }
    };
};
