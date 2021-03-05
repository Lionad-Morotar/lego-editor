<template>
  <div>
    <el-input v-bind="$attrs" v-model="v.text" />
    <!-- 这个代码太丑了，得怪格式化工具太差劲了 TWT -->
    <div class="icons-con">
      <div class="icon" title="左对齐" @click="v.textAlign = 'left'">
        <i
          class="iconfont icon-align-left"
          :class="v.textAlign === 'left' ? 'active' : ''"
        />
      </div>
      <div class="icon" title="居中对齐" @click="v.textAlign = 'center'">
        <i
          class="iconfont icon-align-center"
          :class="v.textAlign === 'center' ? 'active' : ''"
        />
      </div>
      <div class="icon" title="右对齐" @click="v.textAlign = 'right'">
        <i
          class="iconfont icon-align-right"
          :class="v.textAlign === 'right' ? 'active' : ''"
        />
      </div>
      <div class="icon" title="加粗" @click="v.bold = !v.bold">
        <i class="iconfont icon-bold" :class="v.bold ? 'active' : ''" />
      </div>
      <div class="icon" title="斜体" @click="v.italic = !v.italic">
        <i class="iconfont icon-italic" :class="v.italic ? 'active' : ''" />
      </div>
      <div
        class="icon"
        title="中划线"
        @click="v.strikeThrough = !v.strikeThrough"
      >
        <i
          class="iconfont icon-strikethrough"
          :class="v.strikeThrough ? 'active' : ''"
        />
      </div>
      <div class="icon" title="下划线" @click="v.underLine = !v.underLine">
        <i
          class="iconfont icon-underline"
          :class="v.underLine ? 'active' : ''"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Props from '../props'
export default {
  props: ['value'],
  data() {
    return {
      v: {
        ...(this.value || Props.DS.text),
      },
    }
  },
  watch: {
    v: {
      deep: true,
      handler(newValue) {
        this.$emit('change', newValue)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.icons-con {
  display: flex;
  flex-wrap: wrap;

  .icon {
    margin: 15px 15px 0 0;
    width: 40px;
    height: 40px;
    line-height: 38px;
    text-align: center;
    border: solid 1px #eee;
    cursor: pointer;
    &:hover {
      background: #fafafa;
    }
    &:active {
      background: #eee;
    }

    .iconfont {
      font-size: 22px;
      &.active {
        font-weight: bold;
      }
    }
  }
}
</style>
