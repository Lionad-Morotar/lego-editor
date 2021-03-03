<script>
export default {
  props: ['module'],
  computed: {
    // 界面显示的值和右侧面板的动态表单直接绑定，
    // 但是右侧面板表单值为空时，
    // 界面上不能为空，需要展示默认值
    propsWithDefaultValue() {
      const props = this.$props.module.props
      const propsConfig = this.$props.module.propsConfig
      // console.log(props, propsConfig)
      const getDefaultPropsValue = k => propsConfig[k].default
      return Object.entries(props).reduce((h, [k, v]) => {
        h[k] = v || getDefaultPropsValue(k)
        return h
      }, {})
    },
  },
  mounted () {
    this.module.setInstance(this.$children[0])
  },
  render(h) {
    const { name, uuid } = this.$props.module
    return h(name, {
      key: uuid,
      props: {
        ...this.propsWithDefaultValue,
      }
    })
  },
}
</script>
