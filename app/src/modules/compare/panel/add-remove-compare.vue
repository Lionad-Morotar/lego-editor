<template>
  <div class="con">
    <el-button class="button" :disabled="v === max" type="text" @click="add"
      >增加对比</el-button
    >
    <el-button class="button" :disabled="v === min" type="text" @click="subtract"
      >减少对比</el-button
    >
  </div>
</template>

<script>
import Props from '../../props'
export default {
  props: ['value', 'props'],
  data() {
    return {
      v: this.value,
      min: 0,
      max: 10,
    }
  },
  watch: {
    v(newValue) {
      this.$emit('change', newValue)
    },
  },
  methods: {
    add() {
      if (this.v !== this.max) {
        this.props.compares.push({
          left: {
            title: '浩瀚家装',
            description: Props.merge(Props.DS.text, { text: '免费出效果图，提前看到家的样子' }),
            url: Props.merge(Props.DS.image, { url: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/left.png' })
          },
          right: {
            title: '普通家装',
            description: Props.merge(Props.DS.text, { text: '看个鬼鬼' }),
            url: Props.merge(Props.DS.image, { url: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/right.png' })
          }
        })
        this.$nextTick(() => {
          this.v += 1
        })
      }
    },
    subtract() {
      if (this.v !== this.min) {
        this.v -= 1
        this.$nextTick(() => {
          this.props.compares.splice(this.props.compares.length - 1, 1)
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.con {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button {
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
    // cursor: not-allowed;
  }
}
</style>
