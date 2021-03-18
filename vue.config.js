const path = require('path')

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    // proxy: 'http://localhost:7500'
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'index'
    },
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve('src'))
  }
}
