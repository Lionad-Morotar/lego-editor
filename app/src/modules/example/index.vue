<template>
  <!-- eslint-disable -->
  <div class="lego-example">

    <el-alert title="简单文本" type="info" :closable="false" />
    <div @click="log(text)">{{ text }}</div>

    <el-alert title="简单数字" type="info" :closable="false" />
    <div @click="log(number)">{{ number }}</div>

    <el-alert title="简单数字 + 参数透传" type="info" :closable="false" />
    <div @click="log(numberWithProps)">{{ numberWithProps }}</div>
    <div class="des">定义该属性时，所有未经约定的属性都会透传给对应的动态表单。比如在此例中定义的 min: 0、max: 10 会透传给他的编辑面板。在右侧编辑面板编辑时，就会受到最大值、最小值的限制。</div>

    <el-alert title="带样式文本" type="info" :closable="false" />
    <div @click="log(styledText)" :style="styles.styledText">{{ styledText.text }}</div>
    <div class="des">带样式文本的值改变后，需要调用 Props.genStyles 方法生成内联样式以应用到文本才能有效果。</div>

    <!-- todo 图片上传组件，选色组件等示例 -->

    <el-alert title="简单数字 + 自定义编辑面板" type="info" :closable="false" />
    <div @click="log(numberWithCustomPanel)">{{ numberWithCustomPanel }}</div>
    <div class="des">写表单其实是一件体力活...</div></div>

  </div>
</template>

<script>
/* eslint-disable */
import Props from '../props'
import ConfigNumberWithCustomPanel from './panel/config-number-with-custom-panel'
export default {
  name: 'lego-example',
  props: {

    text: Props.string({
      label: '简单文本',
      default: '这是一行简单的文本，点击可查看数据结构'
    }),

    number: Props.number({
      label: '简单数字',
      default: 0
    }),

    numberWithProps: Props.number({
      label: '简单数字 + 参数透传',
      default: 0,
      min: 0,
      max: 10
    }),

    styledText: Props.text({
      label: '带样式文本',
      default: {
        text: '这是一行带样式的文本，可以调整加粗、斜体等常见样式',
        bold: true,
        italic: true
      },
      // 如果不需要指定默认的样式，也可以这样设置：
      // default: '这是一行简单的文本，点击可查看数据结构'
    }),

    numberWithCustomPanel: Props.custom({
      label: '简单数字 + 自定义编辑面板',
      default: 0,
      // 相关自定义编辑面板的约定请看表单 Readme 及示例文件
      // @see '@/pages/editor/forms/readme'
      // @see '@/pages/editor/forms/components/example'
      component: ConfigNumberWithCustomPanel
    }),

  },
  methods: {
    log (value) {
      console.clear()
      console.log('值为：', value)
    }
  },
  computed: {
    styles () {
      return {
        styledText: Props.genStyles(this.styledText)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lego-example {
  padding: 24px;
  background: white;
  word-break: break-all;
  white-space: break-spaces;

  .el-alert {
    margin: 10px 0;
    padding: 5px 0px;
    border: solid 1px currentColor;

    &:first-child {
      margin-top: 0;
    }
  }
  .el-alert + div {
    padding: 5px 0;
  }

  .des {
    font-size: 12px;
    color: #555;
  }
}
</style>
