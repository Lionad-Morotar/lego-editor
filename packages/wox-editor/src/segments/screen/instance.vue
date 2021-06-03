<script>
// 用作绑定 Model/Module
export default {
  props: ['module', 'bindModule'],
  provide () {
    return {
      model: this.module.uuid
    }
  },
  created () {
    if (this.bindModule) {
      this.module.bindModel(this.module.uuid)
    }
  },
  mounted () {
    if (this.bindModule) {
      this.module.bindInstance(this.$children[0])
      // FIXME
      // 目前没存子模块的选框实例，
      // 需要一个广搜全存下来
      this.module.$outlines = [this.$children[0]?.$children[0]?.$children[0]]
    }
  },
  render (h) {
    const { name, uuid } = this.$props.module

    // 注意，这里用 name 而不直接用 module.component，
    // 因为实际安装的模块可能是 module.component 包了其它功能的新组件，
    // 但注册模块时，无论包了多少层组件，新组件名称统一沿用 module.component.name
    return h(name, { key: uuid })
  }
}
</script>
