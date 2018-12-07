const webpack = require('webpack');
const WebpackConfig = require('webpack-config');
const path = require('path');

// 每次打包之前，自动删除文件夹
const cleanWebpackPlugin = require('clean-webpack-plugin');

//path改为域名
module.exports = new WebpackConfig.Config().extend('webpack.config.js').merge({
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new cleanWebpackPlugin('dist'),
        new webpack.optimize.UglifyJsPlugin({
          minimize: true,
          compress: {
            warnings: false
          }
        })
    ],
    output:{
        publicPath:'/'
    },
     module: {
        loaders: [
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: path.posix.join('', 'img/[name].[hash:7].[ext]')
            }
          }
        ]
    }
});