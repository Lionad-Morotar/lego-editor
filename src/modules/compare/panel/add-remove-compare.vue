<template>
  <div class="segment">
    <div class="content">
      <el-button
        class="action-button"
        :disabled="len === max"
        type="text"
        @click="add"
        >增加对比</el-button
      >
      <el-button
        class="action-button"
        :disabled="len === min"
        type="text"
        @click="subtract"
        >减少对比</el-button
      >
    </div>
  </div>
</template>

<script>
import Props from '../../props'
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
      this.v.push({
        left: {
          title: '浩瀚家装',
          description: Props.merge(Props.DS.text, {
            text: '免费出效果图，提前看到家的样子'
          }),
          url: Props.merge(Props.DS.image, {
            url:
              'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/left.png'
          })
        },
        right: {
          title: '普通家装',
          description: Props.merge(Props.DS.text, {
            text: '没效果图，看个鬼鬼啊'
          }),
          url: Props.merge(Props.DS.image, {
            url:
              'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/right.png'
          })
        }
      })
    },
    subtract () {
      this.v.splice(this.v.length - 1, 1)
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
