// webpack基于node.js建立
var path = require('path')
//自动根据指定路径生成内存页面，自动把bundle.js追加到内存页面底部，同时所有的插件配置都要挂载到plugins节点上
var htmlWebpackPlugin = require('html-webpack-plugin')
//自动清理上次打包的dist文件
var cleanWebpackPlugin = require('clean-webpack-plugin')
var webpack = require('webpack')
// 通过 Node 中的模块操作，向外暴露了一个 配置对象，进行打包构建
module.exports = {
  mode: 'development',
  devtool: 'cheap-module-inline-source-map',
  entry: {
    // main: './src/index.js',
    bundle: './src/index.js'
  },
  output: {
    // path: path.resolve(__dirname, './dist'),
    // filename: 'bundle.js'
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
    // publicPath: 'http://cdn.com.cn'
  },
  module: {
    rules: [
      { 
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'] //css-loader会把多个css文件合成一段css，style-loader会把这段css挂载在内存html页面的header元素上
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', 
          {
            loader: 'css-loader', 
            options: {
              importLoaders: 2,
              modules: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
              outputPath: 'images',
              limit: 32000
            }
          }
        ]
      },
      { 
        test: /\.(ttf|eot|svg|woff|woff2)$/, 
        use: 'file-loader' 
      },
      { test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
        options: {
          // presets: ['@babel/preset-env']
          presets: [
            [
              "@babel/preset-env", 
              {
                useBuiltIns: "usage",// or "entry"
                corejs: 3
              }
            ]
          ]
        }
        // options: {
        //   "plugins": [
        //     [
        //       "@babel/plugin-transform-runtime",
        //       {
        //         "corejs": 3,
        //         "helpers": true,
        //         "regenerator": true,
        //         "useESModules": false
        //       }
        //     ]
        //   ]
        // }
      } 
    ]
  },
  plugins: [  //配置插件的节点
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html'
    }),
    new cleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin() //开启热更新
  ],
  devServer: {  //webpack-dev-server实现自动打包
    contentBase: './dist',
    open: true,         
    port: 3000,
    hot: true,
    hotOnly: true
  }
}