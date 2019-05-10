const path = require('path');
const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  devtool: 'cheap-module-source-map',
  entry: {
    app: './src/assets/_javascripts/app.js',
    news_svenskaskolan: './src/assets/_javascripts/news/svenskaskolan.js',
    'first-news-flash': './src/assets/_javascripts/news/first-news-flash.js',
    'summer-2018': './src/assets/_javascripts/news/summer-2018.js',
    // 'fully-hero': './src/assets/_javascripts/news/fully-hero.js',
    'qgroup': './src/assets/_javascripts/cases/qgroup.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'src/assets/bundles')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: [
            ["env", {
              "targets": [
                "last 2 version",
                "> 2%",
                "maintained node versions",
                "not dead",
                "IE 11"
              ]
            }]
          ]
        }
      }
    ]
  }
};