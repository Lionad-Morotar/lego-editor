<script>
import Module from '../../../models/module'
import Outline from './outline'
import ClickCapture from './click-capture'

// TODO refactor
// 使用函数式组件可以透传任意内容，
// 可以减少一层 props 嵌套

// 术语，Element，即“屏幕中的元素”，
// 给模块（以及子模块）附加编辑时用的功能，
// 如聚焦时高亮的选框
export default {
  inject: ['model'],
  props: [
    // 被包裹的模块
    'component',
    // 是否捕获点击以阻止传播
    'captureClick',
  ],
  render(h) {
    const component = this.$props.component
    const captureClick = this.$props.captureClick

    // 组件依赖（props）需要响应来自实例的外部依赖数据的更新
    const moduleModel = Module.getModel(this.model)
    const receivedProps = moduleModel.props

    const $cmpt = h(component, {
      props: {
        ...receivedProps,
      },
    })
    const $child = captureClick ? h(ClickCapture, {}, [$cmpt]) : $cmpt

    // 组件作为 Outline 的插槽内容渲染
    // ! 谨慎修改，获取 Vue 组件实例依赖当前组件层级结构
    return h(
      Outline,
      {
        props: {
          props: component.props,
        },
      },
      [$child],
    )
  },
}
</script>
