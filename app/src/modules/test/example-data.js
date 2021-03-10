export default [
  {
    meta: {
      uuid: '1615345174616_674747',
      title: '流程模块',
      description: '流程模块测试',
      name: 'lego-procedure'
    },
    counts: 4,
    title: '- 黄金回收 -',
    subTitle: '累计成交150万+件，是您最好的选择',
    procedures: [
      {
        title: '流程一',
        content: '专人快速鉴定',
        image: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/procedure-1-1.png'
      },
      {
        title: '流程二',
        content: '专家鉴定团队',
        image: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/procedure-1-2.png'
      },
      {
        title: '流程三',
        content: '全国品牌连锁店铺',
        image: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/procedure-1-3.png'
      },
      {
        title: '流程四',
        content: '现场签订合同',
        image: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/procedure-1-4.png'
      }
    ]
  },
  {
    meta: {
      uuid: '1615345172665_557862',
      title: '测试模块',
      description: '测试模块',
      name: 'lego-example'
    },
    text: '第一行文本',
    number: 1,
    numberWithProps: 2,
    styledText: {
      text: '第二行文本，带样式',
      textAlign: 'center',
      bold: true,
      italic: true,
      underLine: true,
      strikeThrough: true
    },
    numberWithCustomPanel: 30,
    testComponentText: '第三行文本'
  }
]
