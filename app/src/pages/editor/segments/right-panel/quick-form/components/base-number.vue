<template>
  <el-input-number v-bind="$attrs" v-model="v" />
</template>

<script>
export default {
  name: 'quick-form-base-number',
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
    v (newValue) {
      this.$emit('change', newValue)
    }
  }
}
</script>
