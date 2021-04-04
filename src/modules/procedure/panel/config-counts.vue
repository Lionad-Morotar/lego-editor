<template>
  <div class="segment">
    <div class="content">
      <el-button
        class="action-button"
        :disabled="len === max"
        type="text"
        @click="add"
        >增加流程</el-button
      >
      <el-button
        class="action-button"
        :disabled="len === min"
        type="text"
        @click="subtract"
        >减少流程</el-button
      >
    </div>
    <hr style="width: 68%" />
    <div class="content">
      <el-button
        v-for="(procedure, idx) in v"
        class="action-button"
        type="text"
        :disabled="len === min"
        :key="idx"
        @click="() => remove(idx)"
        >删除{{procedure.title}}</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'props'],
  data () {
    return {
      v: this.value,
      min: 1,
      max: 10
    }
  },
  computed: {
    len () {
      return this.v?.length
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
      this.v.push({
        title: '流程' + (this.v.length + 1),
        content: '流程内容',
        image: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/pic.png'
      })
    },
    subtract () {
      this.v.splice(this.v.length - 1, 1)
    },
    remove (idx) {
      this.v.splice(idx, 1)
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
}
</style>
