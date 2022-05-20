<template>
  <div class="config-item">
    <div class="config-item-label">图标</div>
    <div class="config-item-content">
      <div class="icon" title="背景颜色" @click="showIconDialog">
        <i class="iconfont" :class="props.icon" />
      </div>
    </div>
    <div class="config-item-dialog" v-if="visible.iconDialog" v-clickoutside="closeIconDialog">
      <template v-for="cate in iconCates">
        <div class="header" :key="cate.header + 1">{{cate.header}}</div>
        <div class="icons-con" @click="selectIcon" :key="cate.header + 2">
          <template v-for="icon in cate.icons">
            <i class="iconfont clicked-white" :class="icon" :data-icon="icon" :key="icon"/>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>

/* 获得所有 ant-design 图标 */
// eslint-disable-next-line
import cssRaw from '!!raw-loader!../icons/ant-design.css'
const icons = cssRaw
  .match(/\.icon-([^:]+):before/g)
  .map(x => x.replace('.', ''))
  .map(x => x.replace(':before', ''))
const iconsFilled = icons.filter(x => x.endsWith('-fill'))
const iconsNotFilled = icons.filter(x => !iconsFilled.includes(x))
const iconsFilledCircled = iconsFilled.filter(x => x.endsWith('-circle-fill'))
const iconsFilledNotCircled = iconsFilled.filter(x => !iconsFilledCircled.includes(x))
const iconsCircled = iconsNotFilled.filter(x => x.endsWith('-circle'))
const iconsNotCircled = iconsNotFilled.filter(x => !iconsCircled.includes(x))

export default {
  props: ['value', 'props'],
  data () {
    return {
      iconCates: [
        {
          header: '空心图标',
          icons: Object.freeze(iconsNotCircled)
        },
        {
          header: '空心圆形',
          icons: Object.freeze(iconsCircled)
        },
        {
          header: '实心图标',
          icons: Object.freeze(iconsFilledNotCircled)
        },
        {
          header: '实心圆形',
          icons: Object.freeze(iconsFilledCircled)
        }
      ].filter(x => x.icons.length > 0),
      visible: {
        iconDialog: false
      }
    }
  },
  methods: {
    showIconDialog () {
      this.visible.iconDialog = true
    },
    closeIconDialog () {
      this.visible.iconDialog = false
    },
    selectIcon (e) {
      const $el = e.target
      const icon = $el?.dataset?.icon
      if (icon) {
        this.$emit('change', icon)
        this.closeIconDialog()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  width: 80px !important;

  .iconfont {
    font-size: 14px;
    color: #333;
  }
}
.config-item-dialog {
  .icons-con {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
  }
  .iconfont {
    font-size: 20px;
    padding: 5px;
    border-radius: 3px;
    border: solid 1px #f3f3f3;
    cursor: pointer;
  }
}
</style>
