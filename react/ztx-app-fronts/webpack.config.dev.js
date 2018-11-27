const webpack = require('webpack');
const WebpackConfig = require('webpack-config');
const path = require('path');

//path改为域名
module.exports = new WebpackConfig.Config().extend('webpack.config.js').merge({
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    output:{
        publicPath:'',
    },
    module: {
        loaders: [
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: path.posix.join('/dist','img/[name].[hash:7].[ext]')
            }
          }
        ]
    }
});