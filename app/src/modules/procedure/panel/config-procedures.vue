<template>
  <div>
    <div v-for="(procedure, idx) in v" :key="idx+procedure.title">
      <div class="label">流程名称</div>
      <base-text v-model="procedure.title" />
      <div class="label">流程内容</div>
      <base-text v-model="procedure.content" />
      <div class="label">流程图片</div>
      <base-text v-model="procedure.image" />
    </div>
  </div>
</template>

<script>
import Forms from '../../forms'
export default {
  props: ['value', 'props'],
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
  },
  components: {
    BaseText: Forms.BaseText
  }
}
</script>

<style lang="scss" scoped></style>
