<script>
// TODO refactor 可以和 screen.vue 合二为一
import Module from 'editor/models/module'
export default {
  inject: ['model'],
  props: ['component'],
  computed: {
    curModel () {
      return Module.getModel(this.model)
    }
  },
  render (h) {
    const component = this.$props.component

    return h(component, {
      props: {
        ...this.$attrs,
        ...this.curModel?.props
      }
    })
  }
}
</script>
