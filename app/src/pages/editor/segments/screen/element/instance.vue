<script>
export default {
  props: ['module'],
  provide () {
    return {
      model: this.module.uuid
    }
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
    this.module.$outlines = [this.$children[0]?.$children[0]?.$children[0]]
  },
  render (h) {
    const { name, uuid } = this.$props.module
    return h(name, { key: uuid })
  }
}
</script>
