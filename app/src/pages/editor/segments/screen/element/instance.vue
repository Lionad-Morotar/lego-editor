<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    module: Object,
  },
  computed: {
    ...mapState('screen', {}),
    // 界面显示的值和右侧面板的动态表单直接绑定，
    // 但是右侧面板表单值为空时，
    // 界面上不能为空，需要展示默认值
    propsWithDefaultValue() {
      const { props, component } = this.$props.module
      const getDefaultPropsValue = k => component.props[k].default
      return Object.entries(props).reduce((h, [k, v]) => {
        h[k] = v || getDefaultPropsValue(k)
        return h
      }, {})
    },
  },
  mounted() {
    // 给模块实例回传 Vue 实例
    this.$props.module.setInstance(this.$children[0])
  },
  methods: {
    ...mapActions('screen', []),
  },
  render(h) {
    const { name, uuid } = this.$props.module
    return h(name, {
      props: {
        key: uuid,
        ...this.propsWithDefaultValue,
      },
    })
  },
}
</script>

<style></style>
