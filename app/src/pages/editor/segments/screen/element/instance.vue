<script>
export default {
  props: ['module'],
  provide () {
    return {
      model: this.module.uuid
    }
  },
  computed: {
    // 界面显示的值和右侧面板的动态表单直接绑定，
    // 但是右侧面板表单值为空时，
    // 界面上不能为空，需要展示默认值
    propsWithDefaultValue() {
      const props = this.$props.module.props
      const propsConfig = this.$props.module.propsConfig
      const getDefaultPropsValue = k => propsConfig[k].default
      return Object.entries(props).reduce((h, [k, v]) => {
        h[k] = v || getDefaultPropsValue(k)
        return h
      }, {})
    },
  },
  created () {
    this.module.bindModel(this.module.uuid)
  },
  // TODO refactor
  mounted () {
    this.module.bindInstance(this.$children[0])
    // FIXME
    // 目前没存子模块的选框实例，
    // 需要一个广搜全存下来
    this.module.$outlines = [this.$children[0].$children[0].$children[0]]
  },
  render(h) {
    const { name, uuid } = this.$props.module
    // console.log(this.propsWithDefaultValue.subTitle)
    return h(name, {
      key: uuid,
      props: {
        ...this.propsWithDefaultValue,
      },
    })
  },
}
</script>
