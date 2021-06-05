<template>
  <div class="config-item-segment">
    <!-- 应该跟随模块的宽高变化 min、max -->
    <div class="config-item" v-if="display('padding')">
      <div class="config-item-label">边距</div>
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
          <forms-slider
            v-model="curSelectPadding"
            :min="0"
            :max="30"
            :step="1"
            :key="editPaddingKey"
          />
        </template>
      </div>
    </div>

    <div class="config-item" v-if="display('border')">
      <div class="config-item-label">边框</div>
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
        <div v-if="hasBorderValue"
          class="icon"
          title="边框颜色"
          :style="{ background: value.borderColor, border: `solid 1px ${clearColor(value.borderColor, 0.1)}` }"
          @click="showBorderColor=!showBorderColor">
          <i class="iconfont icon-bg-colors"
            :style="{ color: clearColor(value.borderColor) }"
          />
        </div>
        <template v-if="editBorderKey">
          <forms-slider
            v-model="curSelectBorder"
            :min="0"
            :max="10"
            :step="1"
            :key="editBorderKey"
          />
        </template>
      </div>
      <transition name="zoom">
        <chrome-picker
          v-if="showBorderColor"
          v-model="borderColor"
          v-clickoutside="closeBorderColorSelector"
        />
      </transition>
    </div>

    <div class="config-item" v-if="display('height')">
      <div class="config-item-label">高度</div>
      <div class="config-item-content">
        <forms-slider
          v-model="valueHeight"
          :min="minHeight"
          :max="maxHeight"
          :step="1"
        />
      </div>
    </div>

    <div class="config-item" v-if="display('radius')">
      <div class="config-item-label">圆角</div>
      <div class="config-item-content">
        <forms-slider
          v-model="valueRadius"
          :min="0"
          :max="maxRadius"
          :step="1"
        />
      </div>
    </div>

    <div class="config-item config-color" v-if="display('color')">
      <div class="config-item-label">颜色</div>
      <div class="config-item-content">
        <div
          class="icon"
          title="颜色"
          :style="{ width: '80px', background: value.color, border: `solid 1px ${clearColor(value.color, 0.1)}` }"
          @click="showColor=!showColor">
          <i class="iconfont icon-bg-colors"
            :style="{ color: clearColor(value.color) }"
          />
        </div>
      </div>
      <transition name="zoom">
        <chrome-picker
          v-if="showColor"
          v-model="color"
          v-clickoutside="closeColorSelector"
        />
      </transition>
    </div>

    <div class="config-item config-color" v-if="display('bgColor')">
      <div class="config-item-label">背景颜色</div>
      <div class="config-item-content">
        <div
          class="icon"
          title="背景颜色"
          :style="{ width: '80px', background: value.bgColor, border: `solid 1px ${clearColor(value.bgColor, 0.1)}` }"
          @click="showBgColor=!showBgColor">
          <i class="iconfont icon-bg-colors"
            :style="{ color: clearColor(value.bgColor) }"
          />
        </div>
      </div>
      <transition name="zoom">
        <chrome-picker
          v-if="showBgColor"
          v-model="bgColor"
          v-clickoutside="closeBgColorSelector"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { Chrome } from 'vue-color'
import Props from 'wox-props'

const half = n => Math.floor(n / 2)

export default {
  props: ['value', 'enable', 'disable', 'use'],
  data () {
    return {
      paddingAll: 0,
      borderAll: 0,
      borderColor: this.value.borderColor || Props.DS.layout.borderColor,
      bgColor: this.value.bgColor || Props.DS.layout.bgColor,
      color: this.value.color || Props.DS.layout.color,
      showColor: false,
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
    minHeight () {
      const { padding = [0, 0, 0, 0], minHeight } = this.value
      return (minHeight != null)
        ? minHeight
        : (padding[0] + padding[2])
    },
    maxHeight () {
      return 100
    },
    maxRadius () {
      const { width, height } = this.value
      return Math.max(10, Math.min(half(width), half(height)))
    },
    hasBorderValue () {
      const borders = this.value.border || []
      return borders.find(x => x)
    },
    curSelectPadding: {
      get () {
        return this.value.padding[this.editPaddingKey]
      },
      set (val) {
        this.$emit('change', Object.assign(this.value, {
          padding: {
            ...this.value.padding,
            [this.editPaddingKey]: val
          }
        }))
      }
    },
    curSelectBorder: {
      get () {
        return this.value.border[this.editBorderKey]
      },
      set (val) {
        this.$emit('change', Object.assign(this.value, {
          border: {
            ...this.value.border,
            [this.editBorderKey]: val
          }
        }))
      }
    },
    valueHeight: {
      get () {
        return this.value.height
      },
      set (val) {
        this.$emit('change', Object.assign(this.value, {
          height: val
        }))
      }
    },
    valueRadius: {
      get () {
        return this.value.radius
      },
      set (val) {
        this.$emit('change', Object.assign(this.value, {
          radius: val
        }))
      }
    }
  },
  watch: {
    borderColor (newValue) {
      this.$emit('change', Object.assign(this.value, {
        borderColor: newValue.hex8
      }))
    },
    bgColor (newValue) {
      this.$emit('change', Object.assign(this.value, {
        bgColor: newValue.hex8
      }))
    },
    color (newValue) {
      this.$emit('change', Object.assign(this.value, {
        color: newValue.hex8
      }))
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
    },
    closeColorSelector () {
      this.showColor = false
    },
    closeBorderColorSelector () {
      this.showBorderColor = false
    },
    closeBgColorSelector () {
      this.showBgColor = false
    },

    /* Computed */

    // 获得和背景色颜色反差大的颜色
    clearColor (cStr, ratio = 0.68) {
      const dark = '#000'
      const white = '#fff'
      const color = this.$color(cStr)
      const targetDark = this.$color.mix(color, dark, ratio * 100)
      const targetWhite = this.$color.mix(color, white, ratio * 100)

      if (!color.isValid()) {
        return targetDark
      }
      const isLightColor = color.isLight()
      return isLightColor
        ? targetDark
        : targetWhite
    }
  },
  components: {
    ChromePicker: Chrome
  }
}
</script>

<style lang="scss" scoped>
.vc-chrome {
  margin-left: auto;
  position: absolute;
  right: 10px;
  top: 40px;
}
</style>
