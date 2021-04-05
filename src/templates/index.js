import clone from 'lodash.clonedeep'

export default {
  getDefaultTemplateList () {
    const templateList = [
      /* 基础模块 */
      {
        title: '多组件测试模板',
        description: '多组件测试模板',
        cover: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/templates/preview-20210406.png',
        categories: ['混合测试'],
        data: require('./dev.template.json')
      }
    ]
    return clone(templateList)
  }
}
