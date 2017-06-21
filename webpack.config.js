module.exports = {
  entry: './src/assets/_javascripts/app.js',
  output: {
    path: './src/assets/bundles/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
