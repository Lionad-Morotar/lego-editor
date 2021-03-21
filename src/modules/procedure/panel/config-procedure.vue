<template>
  <fragment>
    <div class="header">{{ v.title }}</div>
    <div class="label">流程名称</div>
    <base-text v-model="v.title" />
    <div class="label">流程内容</div>
    <base-text v-model="v.content" />
    <div class="label">流程图片</div>
    <base-text v-model="v.image" />
  </fragment>
</template>

<script>
import Forms from '@/forms'
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

<style lang="scss" scoped>
.header {
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.4px;
}
</style>
