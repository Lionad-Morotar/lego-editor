<template>
  <div>
    <div class="config-item" v-if="display('padding')">
      <div class="config-item-header">边距</div>
      <div class="config-item-content">
        <transition name="fade-fast">
          <span class="close-tip" v-if="editPaddingKey" @click="editPadding('')">关闭</span>
        </transition>
        <div
          class="icon"
          title="所有边距"
          @click="editPadding('all')">
          <i class="iconfont icon-border-outer" :class="[when(editPaddingKey === 'all') && 'active']" />
        </div>
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
          <base-slider
            v-if="editPaddingKey === 'all'"
            v-model="paddingAll"
            :min="0"
            :max="30"
            :step="1"
            :key="'all'"
          />
          <base-slider
            v-else
            v-model="v.padding[editPaddingKey]"
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
        <div
          class="icon"
          title="所有边框"
          @click="editBorder('all')">
          <i class="iconfont icon-border-outer" :class="[when(editBorderKey === 'all') && 'active']" />
        </div>
        <template v-for="icon in options.borderIcons">
          <div
            class="icon"
            :title="icon.title"
            :key="icon.icon"
            @click="editBorder(icon.key)">
            <i class="iconfont" :class="[icon.icon, when(editBorderKey === icon.key) && 'active']" />
          </div>
        </template>
        <template v-if="editBorderKey">
          <base-slider
            v-if="editBorderKey === 'all'"
            v-model="borderAll"
            :min="0"
            :max="10"
            :step="1"
            :key="'all'"
          />
          <base-slider
            v-else
            v-model="v.border[editBorderKey]"
            :min="0"
            :max="10"
            :step="1"
            :key="editBorderKey"
          />
        </template>
      </div>
    </div>

    <div class="config-item" v-if="display('radius')">
      <div class="config-item-header">圆角</div>
      <div class="config-item-content">
        <base-slider
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
      paddingAll: 0,
      borderAll: 0,
      bgColor: this.value.bgColor || Props.DS.layout.bgColor,
      showColor: false,
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
    paddingAll (newValue) {
      this.v.padding = Array(4).fill(newValue)
    },
    borderAll (newValue) {
      this.v.border = Array(4).fill(newValue)
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
      this.editPaddingKey = key
    },
    editBorder (key) {
      this.editBorderKey = key
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
