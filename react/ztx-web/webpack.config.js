var path = require('path');
var webpack = require('webpack');
var config = require('./config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CompressionWebpackPlugin = require('compression-webpack-plugin');
//打包之前删除某个文件夹
//const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    path:path.resolve(__dirname, './src/entry.js'),
    vendor: ['react','react-dom','react-router'] //在此处配置.加了拆分vendor，ie8会不兼容，不知道为啥
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    //filename: 'bundle.js',
    filename:'[name].js',
    publicPath: config.dev.assetsPublicPath
  },
  debug: true,
  devtool: 'false',
  devServer: {
    disableHostCheck: true,
    public: '192.168.1.1'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.css$/,
        //loader: 'style-loader!css-loader',
        loader: ExtractTextPlugin.extract("style-loader", "css-loader","less-loader"),
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|webp|webP)$/,
        loader: 'url-loader?limit=2000',
      },
      {
        test: /\.(mp4|ogg|svg|ttf|TTF|eot|otf|svg|woff(2))$/,
        loader: 'file-loader'
      }
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loaders: ['es3ify-loader'],
      },
    ],
  },
  plugins:[
    //在webpack.publish.config.js的plugins中配置
    //注意：最好把该插件放在plugins的最前面
    //new CleanWebpackPlugin("dist"),
    new HtmlWebpackPlugin({
      title:'PT. Kredit Plus Teknologi —— pinjam gampang',
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
      hash:true,
    }),
    new webpack.DefinePlugin({ // <-- 减少 React 大小的关键  
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(), //删除类似的重复代码
    //new webpack.optimize.UglifyJsPlugin(), //最小化一切
    new webpack.optimize.UglifyJsPlugin({ //压缩JS
      minimize: true,
      compress: {
        properties: false,
        warnings: false
      },
      output: {
        quote_keys: true,
        comments: false,
      },
      mangle: {
        screw_ie8: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({ 
        name: 'vendor', 
        filename: 'vendor.bundle.js' 
    }),
    //new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.optimize.AggressiveMergingPlugin(),//合并块
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new ExtractTextPlugin("[name].css")//分离css
 ]
};
