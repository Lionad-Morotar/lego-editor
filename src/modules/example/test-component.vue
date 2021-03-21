<template>
  <fragment>
    <div>这是一个只有两行文本的组件。选中当前模块后再点击此文本，会在文本周围显示高亮框。</div>
    <div style="height: 10px" />
    <div>文本内容：{{ testComponentText }}</div>
  </fragment>
</template>

<script>
import Props from '@/models/props'
export default {
  props: {
    testComponentText: Props.string({
      label: '简单文本',
      default: '这是一行简单的文本'
    })
  }
}
</script>
