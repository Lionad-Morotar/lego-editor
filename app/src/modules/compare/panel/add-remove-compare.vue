<template>
  <div class="con">
    <el-button class="button" :disabled="v==max" type="text" @click="add">增加对比</el-button>
    <el-button class="button" :disabled="v==min" type="text" @click="subtract">减少对比</el-button>
  </div>
</template>

<script>
export default {
   props: ['value'],
   data() {
     return {
       v: this.value,
       min: 0,
       max: 10
     }
   },
   watch: {
    v (newValue) {
      this.$emit('change', newValue)
    }
  },
  methods: {
    add () {
      this.v = Math.min(this.max, this.v + 1)
    },
    subtract () {
      this.v = Math.max(this.min, this.v - 1)
    }
  }
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
