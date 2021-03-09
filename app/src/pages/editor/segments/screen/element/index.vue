<script>
import clone from 'lodash.clonedeep'
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
    'captureClick'
  ],
  computed: {
    curModel () {
      return Module.getModel(this.model)
    },
    // 组件依赖（props）需要响应来自实例的外部依赖数据的更新
    // todo FIXME 每次 props 更新，这个 computed 会发生三次，
    // todo 数据流可能存在问题，需要排查
    receivedUpdate () {
      return this.curModel.props
    },
    propsWithDefaultValue () {
      const propsConfig = this.curModel.propsConfig
      // 为了防止右侧编辑面板的值和当前值粘连需将更新深拷贝一份出来
      const updatedProps = clone(this.receivedUpdate)
      return Object.entries(updatedProps).reduce((h, [k, v]) => {
        const item = propsConfig[k]
        if (item.getDisplayValue) {
          const hasDisplayValue = !!item.getDisplayValue(v)
          h[k] = hasDisplayValue ? v : item.injectDisplayValueFallbackMaybe(v)
        } else {
          h[k] = v
        }
        return h
      }, {})
    }
  },
  render (h) {
    const component = this.$props.component
    const captureClick = this.$props.captureClick

    // console.log(this.$attrs, this.$props)
    // console.log(this.$attrs, this.$props, this.propsWithDefaultValue)
    // console.log(this.$slots, this.$children, this.$scopedSlots)
    const $slots = this.$parent.$slots.default || []
    const $cmpt = h(
      component,
      {
        props: {
          ...this.$attrs,
          ...this.propsWithDefaultValue
        }
      },
      $slots
    )
    const $child = captureClick ? h(ClickCapture, {}, [$cmpt]) : $cmpt

    // ! 谨慎修改，模块实例在获取 Vue 组件实例以及组件的 Outline 实例时，依赖了当前组件的层级结构
    return h(
      Outline,
      {
        props: {
          props: component.props
        }
      },
      [$child]
    )
  }
}
</script>
