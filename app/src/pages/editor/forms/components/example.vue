<template>
  <div>
    <el-input v-bind="$attrs" v-model="v" />
  </div>
</template>

<script>
export default {
  // 动态表单接受两个属性
  // value 指向当前模块中正在编辑的依赖项
  // props 指向当前模块所有依赖项
  // 剩余未接受的属性可以通过 $attrs 获取到
  // @see https://cn.vuejs.org/v2/api/#vm-attrs
  props: ['value', 'props'],
  // 自定义组件的 v-model，
  // 统一使用 change 事件向外传播 value 的变化的事件
  // @see https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model
  model: {
    prop: 'value',
    event: 'change'
  },
  // 为了不直接修改 props，
  // 需要设置一个本地变量（如 v）做中转
  data () {
    return {
      v: this.value
    }
  },
  // 当本地变量改变时，触发 change 事件
  watch: {
    v: {
      deep: true,
      handler (newValue) {
        this.$emit('change', newValue)
      }
    }
  }
}
</script>
