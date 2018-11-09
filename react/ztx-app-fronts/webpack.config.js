const WebpackConfig = require('webpack-config');
const path = require('path');
const webpack = require('webpack');

// 分离 css 到独立的文件中
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 压缩 css 资源文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CompressionWebpackPlugin = require('compression-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  devtool: 'inline-source-map',
  entry: {
    vendor: ['react','axios','react-dom', 'react-router', 'file-loader'] //第三方库
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: path.join(__dirname, './dist'), // 必填项
    filename:"js/[name].bundle.js",
    sourceMapFilename: 'js/[file].map',
    chunkFilename: 'js/[name].[chunkhash:5].chunk.js'
  },
  debug: true,
  devtool:'false',
  devServer: {
    disableHostCheck: true,
    public: '192.168.1.1'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.(css|less)$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader","less-loader")
      },
      {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'image-webpack-loader',// 压缩图片
          query: {
            bypassOnDebug: true,
          }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.join('', '/fonts/[name].[hash:7].[ext]')
        }
      }
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loaders: ['es3ify-loader']
      },
    ],
  },
  resolve: {
     extensions: ['', '.js', '.jsx'],
     alias:{
      
    }
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ 
        name: 'vendor', 
        filename: 'js/vendor.bundle.js' 
    }),
    new HtmlWebpackPlugin({
      title:'Index',
      template:'./src/index.html',
      filename:'./index.html',
      showRrrors:true,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      favicon:'./favicon.ico',
      hash:true
    }),  
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new ExtractTextPlugin("css/[name].css")
 ],
};
  
module.exports = new WebpackConfig.Config().merge(config);