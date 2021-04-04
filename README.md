# 乐高H5编辑器（WIP Warning）

![预览](https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/dev-assets/preview/preview-20210404.png)

## 开发环境

```bash
cnpm install
cnpm run serve
```

## 项目结构

* segments：页面逻辑结构拆分。整个编辑器划分为导航头部、左侧模块预览面板、屏幕（或画布）、右侧编辑面板结构，分别对应 header、left-panel、screen、right-panel 这四个子文件夹。
* forms：右侧编辑面板区域使用到的动态表单（及规范）。
* modules：模块文件，每一个文件夹对应一个模块（TODO index.js 会自动导出所有模块）。
* models：开发乐高H5的模块需要遵循的约定。module.js、props.js，分别对模块运行时数据及模块编写规范做了约定。

乐高 H5 与常见开源页面编辑器的最大的不同是，乐高 H5 使用开发约定而不是数据结构约定（JSON），这可以减少心智成本，降低编写模块以及调试时的复杂度。

## 需要协助

如果有任何想法，欢迎 Issue 以及 PR~
