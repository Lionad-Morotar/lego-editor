module.exports = {
  pages: {
    index: {
      entry: 'src/pages/browser/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'index'
    },
    edit: {
      // page的入口
      entry: 'src/pages/edit/main.js',
      // 模版来源
      template: 'public/index.html',
      // 在dist/edit.html的输出
      filename: 'edit.html',
      title: 'edit'
    }
  }
}