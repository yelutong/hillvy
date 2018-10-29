'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const env = require('../config/prod.env')
const enInfo = JSON.parse(process.env.npm_config_argv).original;
const mode = {sit:/build/.test(enInfo.toString()), local: /dev/.test(enInfo.toString())};
console.info("mode_________")
console.info(mode)
// const HOST = '0.0.0.0'//兼容本地和外网
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const Plugins = [
  new webpack.DefinePlugin({
    'process.env': require('../config/dev.env')
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
  new webpack.NoEmitOnErrorsPlugin(),
  // https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: true
  }),
  // copy custom static assets
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../static'),
      to: config.dev.assetsSubDirectory,
      ignore: ['.*']
    }
  ])
];


const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
    //   ],
    // },
    historyApiFallback: true,
    /*开发模式代理相应Ajax请求到指定服务器*/
    proxy: {
      '/mockjs/*': {
        target: 'http://10.118.239.34:8080/', //RAP数据
      },
      // URL: 'https://sfpay-sit.sf-pay.com',
      // CONTEXT: '/syf-finance/api',
      '/syf-finance/*': {
        target: "https://sfpay-sit.sf-pay.com/", //测试地址  http.request.uri contains "cfs-api"
        secure: false,
        changeOrigin: true
      },
      '/img/*': {
        target: "https://sfpay-sit.sf-pay.com/", //测试地址  http.request.uri contains "cfs-api"
        secure: false,
        changeOrigin: true
      }
      // http://10.118.206.77:8085/cfs-api/api/credit/registerUser
      //
      // http://10.118.206.77:8085/cfs-api/api/credit/check?kindNo=5004
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: false,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? {warnings: false, errors: true}
      : false,
    publicPath: config.dev.assetsPublicPath,
    // proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: Plugins
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
