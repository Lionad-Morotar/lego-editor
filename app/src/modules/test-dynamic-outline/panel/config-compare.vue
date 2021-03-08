<template>
  <div class="container">
    <!-- left -->
    <div class="label">左侧标题</div>
    <base-text v-model="v.left.title" />
    <div class="label">左侧图片</div>
    <styled-image v-model="v.left.url" />
    <div class="label">左侧描述</div>
    <styled-text v-model="v.left.description" />
    <!-- right -->
    <div class="label">右侧标题</div>
    <base-text v-model="v.right.title" />
    <div class="label">右侧图片</div>
    <styled-image v-model="v.right.url" />
    <div class="label">右侧描述</div>
    <styled-text v-model="v.right.description" />
  </div>
</template>

<script>
import Forms from '../../forms'
export default {
  props: ['value', 'props'],
  components: {
    BaseText: Forms.BaseText,
    StyledText: Forms.StyledText,
    StyledImage: Forms.StyledImage
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
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .label {
    width: 100%;
    line-height: 40px;
    text-align: left;
    font-size: 14px;
    color: #606266;
    vertical-align: middle;
  }
}
</style>
