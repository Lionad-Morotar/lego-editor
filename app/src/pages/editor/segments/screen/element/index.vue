<script>
import Outline from './outline'
import ClickCapture from './click-capture'

// 术语，Element，即“屏幕中的元素”，
// 给模块（以及子模块）附加编辑时用的功能，
// 如聚焦时高亮的选框
export default {
  props: [
    // 被包裹的模块
    'component',
    // 是否捕获点击以阻止传播
    'captureClick'
  ],
  render (h) {
    const component = this.$props.component
    const captureClick = this.$props.captureClick

    const $child = captureClick 
      ? h(ClickCapture, {}, [h(component)])
      : h(component)

    return h(
      Outline,
      {
        props: { 
          props: component.props
        },
      },
      [$child],
    )
  }
}
</script>