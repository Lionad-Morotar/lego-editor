<script>
import Module from '@/models/module'
import Outline from './outline'
import ClickCapture from './click-capture'

export default {
  inject: ['model'],
  props: [
    // 是否是根模块
    'isRoot',
    // 待渲染的内容
    'component',
    // 是否包裹一层高亮选框
    'outline',
    // 是否捕获点击以阻止传播
    'captureClick',
    // 透传给组件属性
    'pass',
    // 额外的渲染属性
    'extras'
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
      const updatedProps = this._.cloneDeep(this.receivedUpdate)
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
    // eslint-disable-next-line no-unused-vars
    const { isRoot, component, outline, captureClick } = this.$props

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
        ...this.extras,
        props: {
          props: component.props
        }
      }, [cmptWithCaptureClick])

    return cmptWithOutline
  }
}
</script>
