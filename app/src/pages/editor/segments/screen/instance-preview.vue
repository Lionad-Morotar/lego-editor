<script>
import Module from 'editor/models/module'
export default {
  props: ['module'],
  provide () {
    return {
      model: this.module.uuid
    }
  },
  computed: {
    curModel () {
      return Module.getModel(this.module.uuid)
    }
  },
  render (h) {
    const { name } = this.$props.module.component
    return h(name, {
      props: {
        ...this.curModel?.props
      }
    })
  }
}
</script>
