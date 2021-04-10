<template>
  <div>
    <el-input v-bind="$attrs" v-model="v" />
  </div>
</template>

<script>
export default {
  props: ['value'],
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      v: this.value
    }
  },
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
