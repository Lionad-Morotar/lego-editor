<template>
  <div>
    <el-input v-bind="$attrs" v-model="v.url" />
    <!-- 这个代码太丑了，得怪格式化工具太差劲了 TWT -->
    <div class="icons-con">
      <div class="label">缩放：</div>
      <div class="icon" title="原尺寸" @click="v.objectFit = 'none'">
        <i :class="v.objectFit == 'none' ? 'active' : ''">1X</i>
      </div>
      <div class="icon" title="自适应缩小" @click="v.objectFit = 'scale-down'">
        <i
          class="iconfont icon-arrawsalt"
          :class="v.objectFit == 'scale-down' ? 'active' : ''"
        />
      </div>
      <div class="icon" title="自适应放大" @click="v.objectFit = 'contain'">
        <i
          class="iconfont icon-shrink"
          :class="v.objectFit == 'contain' ? 'active' : ''"
        />
      </div>

      <div style="width: 100%" />

      <div class="label">对齐：</div>
      <!-- <div class="icon" title="居中对齐" @click="v.objectPosition = 'center'">
        <i
          class="iconfont icon-border-inner"
          :class="v.objectPosition == 'center' ? 'active' : ''"
        />
      </div> -->
      <div class="icon" title="上对齐" @click="v.objectPosition = 'top'">
        <i
          class="iconfont icon-border-top"
          :class="v.objectPosition == 'top' ? 'active' : ''"
        />
      </div>
      <div class="icon" title="下对齐" @click="v.objectPosition = 'bottom'">
        <i
          class="iconfont icon-border-bottom"
          :class="v.objectPosition == 'bottom' ? 'active' : ''"
        />
      </div>
      <div class="icon" title="左对齐" @click="v.objectPosition = 'left'">
        <i
          class="iconfont icon-border-left"
          :class="v.objectPosition == 'left' ? 'active' : ''"
        />
      </div>
      <div class="icon" title="右对齐" @click="v.objectPosition = 'right'">
        <i
          class="iconfont icon-border-right"
          :class="v.objectPosition == 'right' ? 'active' : ''"
        />
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import Props from '@/models/props'
export default {
  props: ['value'],
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      v: {
        ...(this.value || Props.DS.image)
      }
    }
  },
  watch: {
    v: {
      deep: true,
      handler: debounce(function (newValue) {
        // todo check
        console.log('test decounce')
        this.$emit('change', newValue)
      }, 350)
    }
  }
}
</script>

<style lang="scss" scoped>
.icons-con {
  display: flex;
  flex-wrap: wrap;

  .label {
    margin: 15px 15px 0 0;
    height: 40px;
    line-height: 38px;
  }
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
    }
    .active {
      font-weight: bold;
    }
  }
}
</style>
