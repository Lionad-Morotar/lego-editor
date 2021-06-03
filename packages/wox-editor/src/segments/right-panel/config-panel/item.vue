<script>
export default {
  // TODO refactor
  props: ['name', 'config', 'selected', 'selectedOutline'],
  render (h) {
    const { name, config, selected, selectedOutline } = this.$props

    /* 获取动态表单 v-model 绑定的值 */
    const usePassValue = config.pass
    const value = selected.props[name]
    const $child = selectedOutline.$children[0].$children[0]
    const getPassValue = () => config.bindProps
      ? config.bindProps.bind($child)({ ...selected.props })
      : $child.props[name]

    return h(config.component, {
      key: selected.uuid + '_' + selectedOutline._uid,
      props: {
        ...config,
        config,
        value: usePassValue ? getPassValue() : value,
        props: selected.props
      },
      attrs: {
        ...config
      },
      on: {
        change: newVal => {
          const isBindProps = config.bindProps
          if (!isBindProps) {
            selected.setProp(name, newVal)
          }
        }
      }
    })
  }
}
</script>
