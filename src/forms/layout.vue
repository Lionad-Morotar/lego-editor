<template>
  <div class="config-item-segment">
    <!-- 应该跟随模块的宽高变化 min、max -->
    <div class="config-item" v-if="display('padding')">
      <div class="config-item-header">边距</div>
      <div class="config-item-content">
        <transition name="fade-fast">
          <span class="close-tip" v-if="editPaddingKey" @click="editPadding('')">关闭</span>
        </transition>
        <template v-for="icon in options.paddingIcons">
          <div
            class="icon"
            :title="icon.title"
            :key="icon.icon"
            @click="editPadding(icon.key)">
            <i class="iconfont" :class="[icon.icon, when(editPaddingKey === icon.key) && 'active']" />
          </div>
        </template>
        <template v-if="editPaddingKey">
          <slider
            v-model="value.padding[editPaddingKey]"
            :min="0"
            :max="30"
            :step="1"
            :key="editPaddingKey"
          />
        </template>
      </div>
    </div>

    <div class="config-item" v-if="display('border')">
      <div class="config-item-header">边框</div>
      <div class="config-item-content">
        <transition name="fade-fast">
          <span class="close-tip" v-if="editBorderKey" @click="editBorder('')">关闭</span>
        </transition>
        <template v-for="icon in options.borderIcons">
          <div
            class="icon"
            :title="icon.title"
            :key="icon.icon"
            @click="editBorder(icon.key)">
            <i class="iconfont" :class="[icon.icon, when(editBorderKey === icon.key) && 'active']" />
          </div>
        </template>
        <div v-if="hasBorderValue" class="icon" title="边框颜色" @click="showBorderColor=!showBorderColor">
          <i class="iconfont icon-bg-colors" :style="{ color: value.borderColor }" />
        </div>
        <template v-if="editBorderKey">
          <slider
            v-model="value.border[editBorderKey]"
            :min="0"
            :max="10"
            :step="1"
            :key="editBorderKey"
          />
        </template>
      </div>
      <!-- 为了覆盖 el-slider -->
      <div style="z-index: 9999; position: absolute; top: 5px; right: 0">
        <div v-if="showBorderColor" class="fullscreen-mask" @click="showBorderColor=false" @mousewheel="showBorderColor=false" />
        <chrome-picker v-model="borderColor" :class="when(showBorderColor)" />
      </div>
    </div>

    <div class="config-item" v-if="display('radius')">
      <div class="config-item-header">圆角</div>
      <div class="config-item-content">
        <slider
          v-model="value.radius"
          :min="0"
          :max="maxRadius"
          :step="1"
        />
      </div>
    </div>

    <div class="config-item config-color" v-if="display('bgColor')">
      <div class="config-item-header">背景颜色</div>
      <div class="config-item-content">
        <div
          class="icon"
          title="背景颜色"
          :style="{ width: '80px', background: value.bgColor }"
          @click="showBgColor=!showBgColor">
          <i v-if="isWhiteBgColorOrNull" class="iconfont icon-bg-colors" />
        </div>
      </div>
      <!-- 为了覆盖 el-slider -->
      <div style="z-index: 9999">
        <div v-if="showBgColor" class="fullscreen-mask" @click="showBgColor=false" @mousewheel="showBgColor=false" />
        <chrome-picker v-model="bgColor" :class="when(showBgColor)" />
      </div>
    </div>
  </div>
</template>

<script>
import { Chrome } from 'vue-color'
import Props from '@/models/props'
import Slider from './slider'

const half = n => Math.floor(n / 2)

export default {
  props: ['value', 'enable', 'disable', 'use'],
  data () {
    return {
      paddingAll: 0,
      borderAll: 0,
      borderColor: this.value.borderColor || Props.DS.layout.borderColor,
      bgColor: this.value.bgColor || Props.DS.layout.bgColor,
      showBgColor: false,
      showBorderColor: false,
      editPaddingKey: '',
      editBorderKey: '',
      options: {
        paddingIcons: [
          { title: '上边距', icon: 'icon-border-top', key: '0' },
          { title: '下边距', icon: 'icon-border-bottom', key: '2' },
          { title: '左边距', icon: 'icon-border-left', key: '3' },
          { title: '右边距', icon: 'icon-border-right', key: '1' }
        ],
        borderIcons: [
          { title: '上边框', icon: 'icon-border-top', key: '0' },
          { title: '下边框', icon: 'icon-border-bottom', key: '2' },
          { title: '左边框', icon: 'icon-border-left', key: '3' },
          { title: '右边框', icon: 'icon-border-right', key: '1' }
        ]
      }
    }
  },
  computed: {
    maxRadius () {
      const { width, height } = this.value
      return Math.max(10, Math.min(half(width), half(height)))
    },
    isWhiteBgColorOrNull () {
      const isNull = !this.value.bgColor
      const isWhite = this.value.bgColor === 'white' ||
        this.value.bgColor.toLowerCase().includes('#ffffff') ||
        /00$/.test(this.value.bgColor)
      return isNull || isWhite
    },
    hasBorderValue () {
      const borders = this.value.border || []
      return borders.find(x => x)
    }
  },
  watch: {
    borderColor (newValue) {
      this.value.borderColor = newValue.hex8
    },
    bgColor (newValue) {
      this.value.bgColor = newValue.hex8
    }
  },
  methods: {
    when (valid) {
      return valid ? 'active' : ''
    },
    display (key) {
      const { enable = [], disable = [], use = [] } = this
      if (use.length) {
        return use.includes(key)
      } else {
        if (disable.includes(key)) return false
        if (enable.includes(key)) return true
        return true
      }
    },
    editPadding (key) {
      this.editPaddingKey = key
    },
    editBorder (key) {
      this.editBorderKey = key
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
  opacity: 1;
  transition: opacity .1s;

  &:hover {
    background: #fafafa;
  }
  &:active {
    opacity: .8;
  }
  & + & {
    margin-left: -1px;
  }

  .iconfont {
    font-size: 18px;
    &.active {
      color: #409eff;
      font-weight: bold;
    }
  }
}
.vc-chrome {
  margin-left: auto;
  position: absolute;
  right: 10px;
  top: 40px;
}
</style>
