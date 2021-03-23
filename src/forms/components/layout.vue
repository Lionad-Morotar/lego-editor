<template>
  <div>
    <div class="config-item" v-if="display('padding')">
      <div class="config-item-header">内边距</div>
      <div class="config-item-content">
        <transition name="fade-fast">
          <span class="close-tip" v-if="editiPaddingKey" @click="editPadding('')">关闭</span>
        </transition>
        <template v-for="icon in options.paddingIcons">
          <div
            class="icon"
            :title="icon.title"
            :key="icon.key"
            @click="editPadding(icon.key)">
            <i class="iconfont" :class="[icon.icon, when(editiPaddingKey === icon.key) && 'active']" />
          </div>
        </template>
        <base-slider
          v-if="editiPaddingKey"
          v-model="v[editiPaddingKey]"
          :min="0"
          :max="30"
          :step="1"
        />
      </div>
    </div>

    <div class="config-item" v-if="display('radius')">
      <div class="config-item-header">圆角</div>
      <div class="config-item-content">
        <base-slider
          v-if="editiPaddingKey"
          v-model="v.radius"
          :min="0"
          :max="maxRadius"
          :step="1"
        />
      </div>
    </div>

    <div class="config-item" v-if="display('color')">
      <div class="config-item-header">背景颜色</div>
      <div class="config-item-content">
        <div class="icon" title="文字颜色" @click="showColor=!showColor">
          <i class="iconfont icon-bg-colors" :style="{ color: v.bgColor }" />
        </div>
      </div>
      <div v-if="showColor" class="fullscreen-mask" @click="showColor=false" @mousewheel="showColor=false" />
      <chrome-picker v-model="bgColor" :class="when(showColor)" />
    </div>
  </div>
</template>

<script>
import { Chrome } from 'vue-color'
import Props from '@/models/props'
import BaseSlider from './base-slider'
export default {
  props: ['value', 'disable'],
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      v: {
        ...(this.value || Props.DS.layout)
      },
      bgColor: this.value.bgColor || Props.DS.layout.bgColor,
      showColor: false,
      editiPaddingKey: '',
      options: {
        paddingIcons: [
          { title: '上边距', icon: 'icon-border-top', key: 'paddingTop' },
          { title: '下边距', icon: 'icon-border-bottom', key: 'paddingBottom' },
          { title: '左边距', icon: 'icon-border-left', key: 'paddingLeft' },
          { title: '右边距', icon: 'icon-border-right', key: 'paddingRight' }
        ]
      }
    }
  },
  computed: {
    maxRadius () {
      // todo 根据宽高自动设置圆角最大值
      return 30
    }
  },
  watch: {
    v: {
      deep: true,
      handler (newValue) {
        this.$emit('change', newValue)
      }
    },
    bgColor (newValue) {
      this.v.bgColor = newValue.hex8
    }
  },
  methods: {
    when (valid) {
      return valid ? 'active' : ''
    },
    display (key) {
      return !(this.disable || []).includes(key)
    },
    editPadding (key) {
      this.editiPaddingKey = key
    }
  },
  components: {
    ChromePicker: Chrome,
    BaseSlider
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
      color: #0058ff;
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
