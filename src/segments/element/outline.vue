<template>
  <!-- TODO 迁移到 Gesture  -->
  <div
    class="box-outline"
    :class="[isActive && 'active', propsChangingTick && 'props-changing']"
    @click.capture="selectElement"
    @click.stop="_ => _"
    @mousedown="checkDraggable">
    <slot />
    <!-- 也许不应该用 DOM ？ -->
    <div class="outline">
      <div
        v-for="r in [
          'point scaler left top',
          'point scaler left bottom',
          'point scaler right top',
          'point scaler right bottom'
        ]"
        :class="r"
        :key="r"
      />
      <template v-if="showResizer">
        <Gesture
          v-for="r in [
            'point resizer top',
            'point resizer left',
            'point resizer right',
            'point resizer bottom'
          ]"
          :key="r"
          :invoke="stopEvent"
          @mousedown="calcAnchor"
          @move="e => calcWH(r.split(' ')[2], e)">
          <div :class="r" />
        </Gesture>
        <!-- <Gesture
          :invoke="stopEvent"
          @mousedown="calcAnchor"
          @move="e => calcWH(r.split(' ')[2], e)">
          <div class="point rotater">
            <i class="iconfont icon-reload" />
          </div>
        </Gesture> -->
      </template>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import Module from '@/models/module'
export default {
  name: 'box-outline',
  inject: ['model'],
  props: ['props'],
  data () {
    return {
      lockPropsChangingTick: false,
      propsChangingTick: null,
      anchor: {}
    }
  },
  computed: {
    ...mapState('screen', {
      moving: state => state.moving,
      selected: state => state.selected,
      selectedOutline: state => state.selectedOutline
    }),
    curModel () {
      return Module.getModel(this.model)
    },
    curProps () {
      return this.curModel.props
    },
    isSelected () {
      return this.selected === this.curModel
    },
    isActive () {
      return this.selectedOutline === this
    },
    showResizer () {
      const resizable = this.curModel.component.resizable
      // 目前只有最外层边框支持显示抓手
      const isTopOutline = this === this.curModel.$outlines[0]
      return resizable && isTopOutline
    }
  },
  watch: {
    curProps: {
      deep: true,
      handler () {
        if (!this.lockPropsChangingTick) {
          if (this.propsChangingTick) {
            // TODO perf by sum time
            clearTimeout(this.propsChangingTick)
          }
          this.propsChangingTick = setTimeout(() => {
            this.propsChangingTick = null
          }, 250)
        }
      }
    }
  },
  methods: {
    ...mapMutations('screen', [
      'SET_MOVING'
    ]),
    ...mapActions('screen', [
      'SELECT_MODULE',
      'SELECT_OUTLINE'
    ]),

    /* Module Functions */

    selectElement () {
      if (!this.moving && !this.isActive) {
        this.lockPropsChangingTick = true
        this.SELECT_MODULE(this.curModel)
        this.SELECT_OUTLINE(this)
        this.$nextTick(() => (this.lockPropsChangingTick = false))
      }
    },
    checkDraggable (e) {
      const isFree = !this.curModel.layout.auto
      if (isFree) {
        this.calcAnchor(e)
        document.body.addEventListener('mousemove', this.calcMove)
        const clean = () => {
          document.body.removeEventListener('mousemove', this.calcMove)
          document.body.removeEventListener('mouseup', clean)
          this.$nextTick(() => this.SET_MOVING(false))
        }
        document.body.addEventListener('mouseup', clean)
        // 自由布局的组件拖拽时不使用 vue-draggle 交换位置
        e.preventDefault()
      }
    },
    // 把 calcAnchor 移到 Gesture
    calcAnchor (e) {
      this.initElementWH(e.target)
      this.anchor.start = { x: e.x, y: e.y }
      this.anchor.offset = {
        x: this.curModel.layout.left,
        y: this.curModel.layout.top
      }
      this.anchor.size = {
        w: this.curModel.layout.width,
        h: this.curModel.layout.height
      }
    },
    initElementWH (target) {
      this.lockPropsChangingTick = true
      const $moduleElem = this.$utils.findParentByClass(target, 'module-block')
      this.curModel.layout.width = $moduleElem.offsetWidth
      this.curModel.layout.height = $moduleElem.offsetHeight
      this.curModel.layout.top = $moduleElem.offsetTop
      this.curModel.layout.left = $moduleElem.offsetLeft
      this.$nextTick(() => (this.lockPropsChangingTick = false))
    },
    calcMove (newPosition) {
      this.SET_MOVING(true)
      this.setPositionByOffset(this.calcOffset(newPosition))
    },
    calcOffset (newPosition) {
      const offsetX = newPosition.x - this.anchor.start.x
      const offsetY = newPosition.y - this.anchor.start.y
      return { offsetX, offsetY }
    },
    setPositionByOffset ({ offsetX, offsetY }) {
      this.curModel.layout.top = this.anchor.offset.y + offsetY
      this.curModel.layout.left = this.anchor.offset.x + offsetX
    },

    /* Resizer Functions */

    calcWH (direction, offset) {
      const { offsetX, offsetY } = offset
      const safe = n => Math.max(0, n)
      switch (direction) {
        case 'left':
          this.curModel.layout.left = this.anchor.offset.x + offsetX
          this.curModel.layout.width = safe(this.anchor.size.w - offsetX)
          break
        case 'right':
          this.curModel.layout.width = safe(this.anchor.size.w + offsetX)
          break
        case 'top':
          this.curModel.layout.top = this.anchor.offset.y + offsetY
          this.curModel.layout.height = safe(this.anchor.size.h - offsetY)
          break
        case 'bottom':
          this.curModel.layout.height = safe(this.anchor.size.h + offsetY)
          break
      }
    },
    stopEvent (e) {
      e.stopPropagation()
      e.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
.box-outline {
  position: relative;
  z-index: 1;

  &.inline {
    display: inline-block;
    width: unset;
  }

  &:hover {
    .outline {
      outline: solid 1px #a1caff88;
    }
  }

  .outline {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    outline: solid 0 #a1caff;
    z-index: -1;

    .point {
      position: absolute;
      width: 0;
      height: 0;
      border: solid 0 #a1caff;
      background: white;
      transition: .1s ease-out;
      // TODO 错开入场和出场动画
      // transition-delay: .1s;

      &.scaler {
        border-radius: 50%;
        // 暂时隐藏 scaler
        display: none;

        &.left {
          left: 0;
        }
        &.right {
          right: 0;
        }
        &.top {
          top: 0;
        }
        &.bottom {
          bottom: 0;
        }
      }

      // TODO 加大热区
      &.resizer {
        transition-delay: .1s;

        &.left {
          left: -5px;
          top: calc(50% - 4px);
          cursor: w-resize;
        }
        &.right {
          right: -5px;
          top: calc(50% - 4px);
          cursor: e-resize;
        }
        &.top {
          top: -5px;
          left: calc(50% - 4px);
          cursor: n-resize;
        }
        &.bottom {
          bottom: -7px;
          left: calc(50% - 4px);
          cursor: s-resize;
        }
      }

      &.rotater {
        transition-delay: .2s;
      }
    }
  }
  &.active {
    & > .outline {
      outline: solid 2px #a1caff;

      .point {
        width: 12px;
        height: 12px;

        &.scaler {
          border: solid 1px #a1caff;

          &.left {
            left: -6px;
          }
          &.right {
            right: -6px;
          }
          &.top {
            top: -6px;
          }
          &.bottom {
            bottom: -8px;
          }
        }
        &.resizer {
          border: solid 1px #a1caff;
          transition-delay: 0s;

          &.top,
          &.bottom {
            width: 12px;
            height: 8px;
          }
          &.left,
          &.right {
            width: 8px;
            height: 12px;
          }
        }

      }
    }
  }
  &.props-changing {
    .outline {
      // 这里用动画太卡了，因为节点过多，暂时去掉动画
      // 或者再用一个 tick 记动画时间做优化
      display: none;
      // opacity: 0;
    }
  }

  & > *:first-child {
    width: 100%;
  }
}
</style>
