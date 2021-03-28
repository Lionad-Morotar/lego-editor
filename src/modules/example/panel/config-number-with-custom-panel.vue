<template>
  <div class="content">
    <el-button
      class="action-button"
      :disabled="v >= max"
      type="text"
      @click="add10"
      >增加 10</el-button
    >
    <el-button
      class="action-button"
      :disabled="v <= min"
      type="text"
      @click="subtract10"
      >减少 10</el-button
    >
  </div>
</template>

<script>
export default {
  name: 'compare',
  props: ['value', 'props'],
  data () {
    return {
      v: this.value,
      min: 0,
      max: 100
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
  methods: {
    add10 () {
      if (this.v !== this.max) {
        this.v += 10
      }
    },
    subtract10 () {
      if (this.v !== this.min) {
        this.v -= 10
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 20px;
  width: 100%;

  .action-button {
    margin: 25px 0 0 0;
    padding: 0;
    width: 180px;
    height: 40px;
    line-height: 40px;
    color: #444;
    border: solid 1px #eee;
    border-radius: 20px;
    transition: 0.25s;
    &:first-child {
      margin-top: 0;
    }
    &:hover {
      color: #409eff;
    }
    &:active {
      background: rgba(0, 88, 255, 0.03);
    }
    &:disabled {
      color: #999;
      pointer-events: none;
    }
  }
}
</style>
