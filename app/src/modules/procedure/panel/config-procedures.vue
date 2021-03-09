<template>
  <fragment>
    <div v-for="idx in props.counts" :key="idx">
      <div class="label">流程名称</div>
      <base-text v-model="v[idx - 1].title" />
      <div class="label">流程内容</div>
      <base-text v-model="v[idx - 1].content" />
      <div class="label">流程图片</div>
      <base-text v-model="v[idx - 1].image" />
    </div>
  </fragment>
</template>

<script>
import Forms from '../../forms'
export default {
  name: 'compare',
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
