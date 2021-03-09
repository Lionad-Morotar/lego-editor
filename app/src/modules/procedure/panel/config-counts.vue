<template>
  <div class="segment">
    <div class="content">
      <el-button
        class="action-button"
        :disabled="v === max"
        type="text"
        @click="add"
        >增加流程</el-button
      >
      <el-button
        class="action-button"
        :disabled="v === min"
        type="text"
        @click="subtract"
        >减少流程</el-button
      >
    </div>
    <hr style="width: 68%" />
    <div class="content">
      <el-button
        v-for="idx in props.counts"
        class="action-button"
        type="text"
        :disabled="v === min"
        :key="idx"
        @click="() => remove(idx-1)"
        >删除{{props.procedures[idx-1].title}}</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'compare',
  props: ['value', 'props'],
  data () {
    return {
      v: this.value,
      min: 1,
      max: 10
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
    add () {
      if (this.v !== this.max) {
        this.props.procedures.push({
          title: '流程' + (this.props.procedures.length + 1),
          content: '流程内容',
          image: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/pic.png'
        })
        this.v += 1
      }
    },
    subtract () {
      if (this.v !== this.min) {
        this.v -= 1
        this.$nextTick(() => {
          this.props.procedures.splice(this.props.procedures.length - 1, 1)
        })
      }
    },
    remove (idx) {
      this.v -= 1
      this.$nextTick(() => {
        this.props.procedures.splice(idx, 1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.segment {
  padding: 0 20px;
  width: 100%;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px 0;

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
        color: #0058ff;
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
}
</style>
