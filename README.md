# 乐高H5编辑器（WIP Warning）

![预览](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20210321135624.png)

## 开发环境

```bash
cnpm install
cnpm run serve
```

## 项目结构

所有相关编辑器的源码都存放在 SRC 目录中

* segments：页面组件（不同于公共组件，只是将页面按逻辑结构进行拆分得到的组件），整个编辑器划分为导航头部、左侧模块预览面板、屏幕（或画布）、右侧编辑面板结构，分别对应 header、left-panel、screen、right-panel 这四个子文件夹。
* forms：右侧编辑面板区域使用到的动态表单。
* modules：模块文件，每一个文件夹对应一个模块，index.js 会自动导出所有模块。
* constant：常量文件。
* models：开发乐高H5的模块需要遵循一套约定，详见 module.js 以及 props.js，分别对模块数据管理以及模块代码编写做出规范。使用开发约定而不是数据结构约定（JSON）是为了降低编写模块以及调试时的复杂度。

## 需要协助

* 项目文档以及 UML 图绘制；
* 项目官网以及宣传；
* 大量组件（基础组件以及组合组件）等待填充；
* 模块动画以及模块动作相关逻辑；

如果有任何想法，欢迎 Issue 以及 PR~