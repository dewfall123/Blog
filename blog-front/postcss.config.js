module.exports = ({ file, options, env }) => {
    return {
        parser: 'sugarss',
        plugins: {
            'autoprefixer': {},
        }
    };
};
