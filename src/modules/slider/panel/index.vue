<template>
  <div class="content">
    <el-button
      class="action-button"
      :disabled="len === max"
      type="text"
      @click="add"
      >增加轮播</el-button
    >
    <el-button
      class="action-button"
      :disabled="len === min"
      type="text"
      @click="subtract"
      >减少轮播</el-button
    >
  </div>
</template>

<script>
import Props from '@/models/props'
export default {
  props: ['value', 'props'],
  data () {
    return {
      v: this.value,
      min: 0,
      max: 5
    }
  },
  computed: {
    len () {
      return this.v.length
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
      this.v.push(Props.merge(Props.DS.image, {
        url: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/spark.png'
      }))
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
