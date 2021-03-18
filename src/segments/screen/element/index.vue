<script>
import clone from 'lodash.clonedeep'
import Module from '@/models/module'
import Outline from './outline'
import ClickCapture from './click-capture'

export default {
  inject: ['model'],
  props: [
    // 子元素
    'component',
    // 是否包裹一层高亮选框
    'outline',
    // 是否捕获点击以阻止传播
    'captureClick',
    // 透传的属性
    'pass'
  ],
  computed: {
    curModel () {
      return Module.getModel(this.model)
    },
    // 组件依赖（props）需要响应来自实例的外部依赖数据的更新
    // todo FIXME 每次 props 更新，这个 computed 会发生三次，
    // todo 数据流可能存在问题，需要排查
    receivedUpdate () {
      return this.curModel?.props
    },
    // TODO 解耦
    propsWithDefaultValue () {
      if (!this.receivedUpdate) return {}

      const propsConfig = this.curModel.propsConfig
      // 为了防止右侧编辑面板的值和当前值粘连需将更新深拷贝一份出来
      const updatedProps = clone(this.receivedUpdate)
      return Object.entries(updatedProps).reduce((h, [k, v]) => {
        const item = propsConfig[k]
        if (item && item.getDisplayValue) {
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
    const { component, outline, captureClick } = this.$props

    const $slots = this.$parent.$slots.default || []
    const cmptWithProps = h(component, {
      props: {
        ...this.pass,
        ...this.propsWithDefaultValue
      }
    }, $slots)

    const cmptWithCaptureClick = captureClick
      ? h(ClickCapture, {}, [cmptWithProps])
      : cmptWithProps

    const cmptWithOutline = !outline
      ? cmptWithCaptureClick
      : h(Outline, {
        props: {
          props: component.props
        }
      }, [cmptWithCaptureClick])

    return cmptWithOutline
  }
}
</script>
