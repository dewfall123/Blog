const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

fs.writeFile('./src/config/env.js', 'export default "production";', function(err) {
    if (err) {
        console.log(err);
    }
});

const outpath = path.join(__dirname, '../app/public/dist/');
module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    output: {
        path: outpath,
        publicPath: '/public/dist/',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js',
    },
    plugins: [
        new CleanWebpackPlugin('../app/public/dist/*', {
            allowExternal: true,
        }),
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true,
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendors',
        //     filename: 'vendors.[hash].js',
        // }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
              ie8: false,
              ecma: 8,
              parse: {...options},
              mangle: {
                ...options,
                properties: {
                  // mangle property options
                }
              },
              output: {
                comments: false,
                beautify: false,
                ...options
              },
              compress: {...options},
              warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../../view/blog/index.html',
            template: './src/template/index.ejs',
            inject: false,
        }),
    ],
});
