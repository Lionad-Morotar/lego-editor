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
          :invoke="stopEvent"
          :key="r"
          @mousedown="setAnchor"
          @move="setPositionByOffset">
          <div :class="r" />
        </Gesture>
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
      anchor: { x: 0, y: 0 },
      oldXY: { x: 0, y: 0 }
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
        this.initElementWH(e.target)
        this.setAnchor(e)
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
    setAnchor (e) {
      this.anchor = { x: e.x, y: e.y }
      this.oldXY = {
        x: this.curModel.layout.left,
        y: this.curModel.layout.top
      }
    },
    initElementWH (target) {
      this.lockPropsChangingTick = true
      const $moduleElem = this.$utils.findParentByClass(target, 'module-block')
      this.curModel.layout.width = $moduleElem.offsetWidth
      // this.curModel.layout.height = $moduleElem.offsetHeight
      this.curModel.layout.top = $moduleElem.offsetTop
      this.curModel.layout.left = $moduleElem.offsetLeft
      this.$nextTick(() => (this.lockPropsChangingTick = false))
    },
    calcMove (newPosition) {
      this.SET_MOVING(true)
      this.setPositionByOffset(this.calcOffset(newPosition))
    },
    calcOffset (newPosition) {
      const offsetX = newPosition.x - this.anchor.x
      const offsetY = newPosition.y - this.anchor.y
      return { offsetX, offsetY }
    },
    setPositionByOffset ({ offsetX, offsetY }) {
      this.curModel.layout.top = this.oldXY.y + offsetY
      this.curModel.layout.left = this.oldXY.x + offsetX
    },

    /* Resizer Functions */

    test (offset) {
      console.log(offset)
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
      border: solid 1px #a1caff88;
      transition: none;
    }
  }

  .outline {
    position: absolute;
    left: -2px;
    top: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 2px);
    border: solid 0 #a1caff;
    z-index: -1;
    transition: none;

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
    }
  }
  &.active {
    & > .outline {
      border: solid 2px #a1caff;
      transition: .1s;

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
