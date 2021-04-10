# 乐高H5编辑器（WIP Warning）

![预览](https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/dev-assets/preview/preview-20210404.png)

乐高H5编辑器是一款基于 Vue 的可视化搭建编辑器。与常见开源页面编辑器的最大的不同是，乐高H5使用开发约定而不是数据结构约定（[JSON Schema](https://json-schema.org/understanding-json-schema/)）编写模板，可以最大程度减少心智成本，降低编写模块以及调试时的复杂度。乐高H5并不关心你在编写模块时用不用 TypeScript 或者写了哪些业务逻辑，你只需正常编写 Vue 组件，它会自动帮你处理编辑时和渲染时一系列恼人问题，比如编辑时禁用点击、模块可设置的最大圆角可动态根据组件高度调整...

举个例子，编写文本区域模块，只需要以下几行代码：

```vue
<template>
  <div class="lego-textarea" :style="styles">{{ text.text }}</div>
</template>

<script>
import Props from '@/models/props'
export default {
  name: 'lego-textarea',
  props: {
    text: Props.textarea({
      label: '文本内容',
      default: {
        text: 'Elpsy Congroo Voluptate cillum ullamco ea occaecat.',
        fontSize: 12,
        lineHeight: 1.6,
        color: '#666'
      }
    })
  },
  computed: {
    styles () {
      return Props.genStyles(this.text)
    }
  }
}
</script>

<style lang="scss" scoped>
.lego-textarea {
  word-break: break-all;
  white-space: break-spaces;
}
</style>
```

## 项目结构

* segments：页面逻辑结构拆分。整个编辑器划分为导航头部、左侧模块预览面板、屏幕（或画布）、右侧编辑面板结构，分别对应 header、left-panel、screen、right-panel 这四个子文件夹。
* forms：右侧编辑面板区域使用到的动态表单（及规范）。
* modules：模块文件，每一个文件夹对应一个模块（TODO index.js 会自动导出所有模块）。
* models：开发乐高H5的模块需要遵循的约定。module.js、props.js，分别对模块运行时数据及模块编写规范做了约定。

## 开发环境

```bash
cnpm install
cnpm run serve
```

## 需要协助

如果有任何想法，欢迎 Issue 以及 PR~
