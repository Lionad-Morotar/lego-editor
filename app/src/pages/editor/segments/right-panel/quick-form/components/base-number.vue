<template>
  <el-input-number v-bind="$attrs" v-model="v" />
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      v: this.value,
    }
  },
  watch: {
    v (newValue) {
      this.$emit('change', newValue)
    }
  }
}
</script>