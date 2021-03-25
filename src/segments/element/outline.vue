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
          @mousemove="(e, p) => calcWH(r.split(' ')[2], p)">
          <div :class="r" />
        </Gesture>
      </template>
      <template v-if="showRotater">
        <Gesture
          :invoke="stopEvent"
          @mousedown="calcAnchor"
          @mousemove="calcRotate">
          <div class="point" id="rotater">
            <i class="iconfont icon-reload" />
          </div>
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
    curLayout () {
      return this.curModel.props.layout
    },
    isSelected () {
      return this.selected === this.curModel
    },
    isActive () {
      return this.selectedOutline === this
    },
    selectedTopOutline () {
      return this === this.curModel.$outlines[0]
    },
    showResizer () {
      const resizable = this.curModel.component.resizable
      return resizable && this.selectedTopOutline
    },
    showRotater () {
      return !this.curLayout.auto && this.selectedTopOutline
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
      const isFree = !this.curLayout.auto
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
      const $target = this.$utils.findParentByClass(e.target, 'module-block')
      this.initElementWH($target)
      this.anchor.start = { x: e.x, y: e.y }
      this.anchor.offset = {
        x: this.curLayout.left,
        y: this.curLayout.top
      }
      this.anchor.size = {
        w: this.curLayout.width,
        h: this.curLayout.height
      }
      const $pos = $target.getBoundingClientRect()
      this.anchor.center = {
        x: $pos.x + (this.anchor.size.w / 2),
        y: $pos.y + (this.anchor.size.h / 2)
      }

      const [offsetX, offsetY] = [
        this.anchor.start.x - this.anchor.center.x,
        this.anchor.start.y - this.anchor.center.y
      ]
      // 初始角度即点击位置与模块中心位置的夹角 + 90°（由于 Y 轴正向向下）
      const initialDegree = (Math.atan2(offsetY, offsetX) / (Math.PI / 180))
      this.anchor.rotate = initialDegree - this.curLayout.degree
    },
    initElementWH ($target) {
      this.lockPropsChangingTick = true
      this.curLayout.width = $target.offsetWidth
      this.curLayout.height = $target.offsetHeight
      this.curLayout.top = $target.offsetTop
      this.curLayout.left = $target.offsetLeft
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
      this.curLayout.top = this.anchor.offset.y + offsetY
      this.curLayout.left = this.anchor.offset.x + offsetX
    },

    /* Resizer & Rotater */

    calcWH (direction, offset) {
      const { offsetX, offsetY } = offset
      const safe = n => Math.max(0, n)
      switch (direction) {
        case 'left':
          this.curLayout.left = this.anchor.offset.x + offsetX
          this.curLayout.width = safe(this.anchor.size.w - offsetX)
          break
        case 'right':
          this.curLayout.width = safe(this.anchor.size.w + offsetX)
          break
        case 'top':
          this.curLayout.top = this.anchor.offset.y + offsetY
          this.curLayout.height = safe(this.anchor.size.h - offsetY)
          break
        case 'bottom':
          this.curLayout.height = safe(this.anchor.size.h + offsetY)
          break
      }
    },
    calcRotate (_, { x, y }) {
      const [offsetX, offsetY] = [
        x - this.anchor.center.x,
        y - this.anchor.center.y
      ]
      const initial = this.anchor.rotate
      const degree = (Math.atan2(offsetY, offsetX) / (Math.PI / 180)) - initial
      this.curLayout.degree = (+degree.toFixed(1)) % 360
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
        & + #rotater {
          bottom: -32px;
        }
      }

      &#rotater {
        display: flex;
        justify-content: center;
        align-items: center;
        left: calc(50% - 7px);
        bottom: -25px;
        padding: 2px;
        width: 12px;
        height: 12px;
        line-height: 15px;
        border-radius: 50%;
        background: white;
        box-shadow: 0 1px 2px 1px #666;
        cursor: grab;
        opacity: 0;

        &:active {
          cursor: grabbing;
        }

        .iconfont {
          color: #666;
          font-size: 12px
        }
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
        &#rotater {
          width: 18px;
          height: 18px;
          opacity: 1;
        }
      }
    }
  }
  &.props-changing {
    .outline {
      opacity: 0;
    }
  }

  & > *:first-child {
    width: 100%;
  }
}
</style>
