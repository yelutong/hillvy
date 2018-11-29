const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var CompressionWebpackPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

commonConfig = {
    entry: {
        app: [
            "babel-polyfill",
            path.join(__dirname, 'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].js',
        publicPath: "/"
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=2192&name=images/[hash:8].[name].[ext]'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            favicon:'./favicon.ico',
            template: path.join(__dirname, 'src/index.html')
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
        new webpack.optimize.AggressiveMergingPlugin(),//合并块
        new CompressionWebpackPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.html$/,
          threshold: 10240,
          minRatio: 0.8
        }),
    ],

    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers'),
            mock: path.join(__dirname, 'mock')
        }
    }
};

module.exports = commonConfig;