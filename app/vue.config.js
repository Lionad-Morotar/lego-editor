module.exports = {
  pages: {
    index: {
      // page的入口
      entry: 'src/pages/editor/main.js',
      // 模版来源
      template: 'public/index.html',
      // 在dist/edit.html的输出
      filename: 'index.html',
      title: 'index'
    },
    browser: {
      entry: 'src/pages/browser/main.js',
      template: 'public/index.html',
      filename: 'browser.html',
      title: 'browser'
    }
  }
}
