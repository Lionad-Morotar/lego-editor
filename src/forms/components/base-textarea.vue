<template>
  <div class="config-item-content">
    <el-input type="textarea" v-model="v" :rows="5" spellcheck="false" />
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
