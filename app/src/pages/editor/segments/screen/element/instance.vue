<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    module: Object,
  },
  computed: {
    ...mapState('screen', {
      modules: state => state.modules,
      selected: state => state.selected,
    }),
    isSelected() {
      return this.selected === this.module
    },
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
  methods: {
    ...mapActions('screen', []),
  },
  render(h) {
    const { name, uuid } = this.$props.module
    // TODO 綁定字组件的 props
    return h(name, {
      props: {
        ...this.propsWithDefaultValue,
        key: uuid,
      },
    })
  },
}
</script>

<style></style>
