<template>
  <div class="config-item-segment">
    <slot name="text" v-if="display('text')">
      <div class="config-item">
        <div class="config-item-label">内容</div>
        <div class="config-item-content">
          <el-input v-model="v.text" spellcheck="false" />
        </div>
      </div>
    </slot>

    <div class="config-item" v-if="display('fontSize')">
      <div class="config-item-label">字体大小</div>
      <div class="config-item-content">
        <el-input-number v-model="v.fontSize" controls-position="right" :min="12" :max="99" />
      </div>
    </div>

    <div class="config-item" v-if="display('letterSpacing')">
      <div class="config-item-label">字距</div>
      <div class="config-item-content">
        <slider
          v-model="v.letterSpacing"
          :min="-3"
          :max="3"
          :step="0.1"
        />
      </div>
    </div>

    <div class="config-item" v-if="display('lineHeight')">
      <div class="config-item-label">行高</div>
      <div class="config-item-content">
        <slider
          v-model="v.lineHeight"
          :min="1"
          :max="3"
          :step="0.1"
        />
      </div>
    </div>

    <div class="config-item" v-if="display('styles')">
      <div class="config-item-label">样式</div>
      <div class="config-item-content">
        <div class="icon" title="加粗（Ctrl+B）" @click="v.bold = !v.bold">
          <i class="iconfont icon-bold" :class="when(v.bold)" />
        </div>
        <div class="icon" title="斜体（Ctrl+I）" @click="v.italic = !v.italic">
          <i class="iconfont icon-italic" :class="when(v.italic)" />
        </div>
        <div class="icon" title="中划线" @click="v.strikeThrough = !v.strikeThrough">
          <i class="iconfont icon-strikethrough" :class="when(v.strikeThrough)" />
        </div>
        <div class="icon" title="下划线" @click="v.underLine = !v.underLine">
          <i class="iconfont icon-underline" :class="when(v.underLine)" />
        </div>
      </div>
    </div>

    <div class="config-item" v-if="display('align')">
      <div class="config-item-label">对齐</div>
      <div class="config-item-content">
        <div class="icon" title="左对齐" @click="v.textAlign = 'left'">
          <i class="iconfont icon-align-left" :class="when(v.textAlign === 'left')" />
        </div>
        <div class="icon" title="居中对齐" @click="v.textAlign = 'center'">
          <i class="iconfont icon-align-center" :class="when(v.textAlign === 'center')" />
        </div>
        <div class="icon" title="右对齐" @click="v.textAlign = 'right'">
          <i class="iconfont icon-align-right" :class="when(v.textAlign === 'right')" />
        </div>
      </div>
    </div>

    <div class="config-item" v-if="display('color')">
      <div class="config-item-label">颜色</div>
      <div class="config-item-content">
        <div class="icon" title="文字颜色（Ctrl+C）" @click="showColor=!showColor">
          <i class="iconfont icon-bg-colors" :style="{ color: v.color }" />
        </div>
      </div>
      <div v-if="showColor" class="fullscreen-mask" @click="showColor=false" @mousewheel="showColor=false" />
      <chrome-picker v-model="color" :class="when(showColor)" />
    </div>
  </div>
</template>

<script>
import { Chrome } from 'vue-color'
import Props from 'wox-props'
import Slider from '../slider'
export default {
  props: ['value', 'disable'],
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      v: {
        ...(this.value || Props.DS.text)
      },
      color: this.value?.color || Props.DS.text.color,
      showColor: false
    }
  },
  watch: {
    v: {
      deep: true,
      handler (newValue) {
        this.$emit('change', newValue)
      }
    },
    color (newValue) {
      this.v.color = newValue.hex8
    }
  },
  mounted () {
    const type = '编辑字体'
    this.$keyboards.watch('ctrl+b', { type, title: '加粗' }, () => (this.v.bold = !this.v.bold))
    this.$keyboards.watch('ctrl+i', { type, title: '倾斜' }, () => (this.v.italic = !this.v.italic))
    this.$keyboards.watch('ctrl+c', { type, title: '设置颜色' }, () => (this.showColor = !this.showColor))
    this.$keyboards.watch('esc', { type, title: '关闭颜色' }, () => (this.showColor = false))
  },
  methods: {
    when (valid) {
      return valid ? 'active' : ''
    },
    display (key) {
      return !(this.disable || []).includes(key)
    }
  },
  components: {
    ChromePicker: Chrome,
    Slider
  }
}
</script>

<style lang="scss" scoped>
.icon {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: solid 1px #eee;
  cursor: pointer;
  background: white;

  &:hover {
    background: #fafafa;
  }
  &:active {
    background: #eee;
  }
  & + & {
    margin-left: -1px;
  }

  .iconfont {
    font-size: 18px;
    &.active {
      // color: #409eff;
      font-weight: bold;
    }
  }
}
.vc-chrome {
  margin-left: auto;
  position: absolute;
  right: 10px;
  top: 40px;
  transition: .25s;
  clip-path: polygon(-10% -10%, 110% -10%, 110% -10%, -10% -10%);

  &.active {
    clip-path: polygon(-10% -10%, 110% -10%, 110% 110%, -10% 110%);
  }
}
</style>
