import clone from 'lodash.clonedeep'

export default {
  getDefaultTemplateList () {
    const templateList = [
      /* 基础模块 */
      {
        title: '多组件测试模板',
        description: '多组件测试模板',
        cover: 'https://lego-editor.oss-cn-shanghai.aliyuncs.com/preview/templates/preview-dev-test.png',
        categories: ['混合测试'],
        data: require('./dev.normal.json')
      },
      {
        title: '长页面测试模板',
        description: '长页面测试模板',
        cover: 'https://lego-editor.oss-cn-shanghai.aliyuncs.com/preview/templates/preview-dev-long.png',
        categories: ['混合测试'],
        data: require('./dev.long.json')
      }
    ]
    return clone(templateList)
  }
}
