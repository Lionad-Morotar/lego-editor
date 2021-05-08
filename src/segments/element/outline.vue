<template>
  <!-- TODO 迁移到 Gesture  -->
  <div
    class="box-outline"
    :class="[
      isActive && 'active',
      propsChangingTick && 'props-changing',
      active.resizer && 'active-resizer',
      active.rotater && 'active-rotater'
    ]"
    @mousedown="initElementProps"
    @dblclick="logElement"
    @click.capture="selectElement"
    @click.stop="stopMask">
    <slot />
    <!-- TODO 使用 Portal，不然会影响元素宽高的计算 -->
    <!-- https://github.com/LinusBorg/portal-vue -->
    <div class="outline">
      <!-- 暂时隐藏 scaler -->
      <!-- <div
        v-for="r in [
          'point scaler left top',
          'point scaler left bottom',
          'point scaler right top',
          'point scaler right bottom'
        ]"
        :class="r"
        :key="r"
      /> -->
      <!-- FIXME 旋转后缩放出现诡异的问题 -->
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
          @mousedown="activeResizer"
          @mousemove="(e, p) => calcWH(r.split(' ')[2], p)">
          <div :class="r" />
        </Gesture>
      </template>
      <!-- FIXME Rotater 的动画会导致子模块变模糊 ╮(╯▽╰)╭ -->
      <Gesture
        v-if="showRotater"
        :invoke="stopEvent"
        @mousedown="activeRotater"
        @mousemove="calcRotate">
        <div class="point" id="rotater">
          <i class="iconfont icon-reload" />
        </div>
      </Gesture>
    </div>
  </div>
</template>

<script>
import isEqual from 'lodash.isequal'
import { mapMutations, mapState, mapActions } from 'vuex'
import Module from '@/models/module'

const PropsChangingProtectCount = 1

export default {
  name: 'box-outline',
  inject: ['model'],
  props: ['props'],
  data () {
    return {
      lockPropsChangingTick: false,
      propsChangingTick: null,
      propsChangingProtectCount: PropsChangingProtectCount,
      propsChangingProtectCountTick: null,
      anchor: {},
      active: {
        resizer: false,
        rotater: false
      },
      store: {
        e: null
      }
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
    curLayout: {
      get () {
        return this.curModel.props.layout
      },
      set (newValue) {
        const keys = Object.keys(newValue)
        const notSame = keys.find(k => !isEqual(this.curLayout[k], newValue[k]))
        if (notSame) {
          this.curModel.setProp('layout', newValue)
        }
      }
    },
    isSelected () {
      return this.selected === this.curModel
    },
    isActive () {
      return this.selectedOutline === this
    },
    isFreeLayout () {
      return !this.curModel.layout.auto
    },
    isSelectTopOutline () {
      return this === this.curModel.$outlines[0]
    },
    showResizer () {
      const resizable = this.curModel.component.resizable
      // const resizable = this.curModel.component.resizable && (this.curLayout.degree > -50) && (this.curLayout.degree < 50)
      return this.isFreeLayout && resizable && this.isSelectTopOutline
    },
    showRotater () {
      return this.isFreeLayout && this.isSelectTopOutline
    }
  },
  watch: {
    // ? FIXME 同一个模块内若包含多个 outline 则会触发多次
    // 切换到自由布局时初始化模块的相关属性
    'curLayout.auto': {
      handler (isAuto, oldValue) {
        console.log('isAuto:', isAuto, oldValue)
        if (isAuto == null || oldValue == null) {
          return
        }
        if (isAuto) {
          const $el = this.selected.$instance.$el
          const $parent = $el.offsetParent
          if (this.selected.layout.top == null) {
            this.curLayout = { top: $parent.offsetTop }
          }
          if (this.selected.layout.left == null) {
            this.curLayout = { left: $parent.offsetLeft }
          }
        } else if (!oldValue) {
          this.curLayout = { width: null, height: null }
        }
      }
    },
    // 当依赖项的值在一定时间内变化多次时，再通知外部
    curProps: {
      deep: true,
      handler (n, o) {
        if (!this.lockPropsChangingTick && !isEqual(n, o)) {
          if (this.propsChangingProtectCount) {
            this.propsChangingProtectCount -= 1
            if (this.propsChangingProtectCountTick) {
              clearTimeout(this.propsChangingProtectCountTick)
            }
            this.propsChangingProtectCountTick = setTimeout(() => {
              this.propsChangingProtectCount = PropsChangingProtectCount
            }, 300)
          } else {
            if (this.propsChangingTick) {
              // TODO perf by sum time
              clearTimeout(this.propsChangingTick)
            }
            if (this.propsChangingProtectCountTick) {
              clearTimeout(this.propsChangingProtectCountTick)
            }
            this.propsChangingTick = setTimeout(() => {
              this.propsChangingTick = null
              this.propsChangingProtectCount = PropsChangingProtectCount
            }, 300)
          }
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

    logElement () {
      console.log(this.curModel.genStore())
    },
    selectElement () {
      if (!this.moving && !this.isActive) {
        this.lockPropsChangingTick = true
        this.SELECT_MODULE(this.curModel)
        this.SELECT_OUTLINE(this)
        this.$nextTick(() => (this.lockPropsChangingTick = false))
      }
    },
    initElementProps (e) {
      if (this.active.resizer) {
        return null
      }
      this.store.e = e
      const isFree = !this.curLayout.auto
      const $target = this.$utils.findParentByClass(e.target, 'module-block')
      this.initElementWH($target)
      if (isFree) {
        this.calcAnchor(e, $target)
        // const calcMove = (...args) => !this.active.resizer && this.calcMove(...args)
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
    initElementWH ($target) {
      this.lockPropsChangingTick = true
      this.curLayout = { width: $target.offsetWidth }
      this.curLayout = { height: $target.offsetHeight }
      this.curLayout = { top: $target.offsetTop }
      this.curLayout = { left: $target.offsetLeft }
      this.$nextTick(() => (this.lockPropsChangingTick = false))
    },
    // REFACT 把 calcAnchor 移到 Gesture
    calcAnchor (e, $target) {
      if (!$target) {
        $target = this.$utils.findParentByClass(e.target, 'module-block')
        this.initElementWH($target)
      }

      // 点击的坐标位置
      this.anchor.clickPos = { x: e.x, y: e.y }
      // 元素的绝对定位偏移量
      this.anchor.elemPos = {
        x: this.curLayout.left,
        y: this.curLayout.top
      }
      // 元素宽高
      this.anchor.elemSize = {
        w: this.curLayout.width,
        h: this.curLayout.height
      }
      // FIXME outline 也会计算到 bounding 中
      // 元素边界
      const elemBounding = $target.getBoundingClientRect()
      // 元素中心坐标
      this.anchor.elemBoundingCenter = {
        x: elemBounding.x + (this.anchor.elemSize.w / 2),
        y: elemBounding.y + (this.anchor.elemSize.h / 2)
      }

      // 点击坐标到元素中心坐标的偏移量
      const [offsetCenterX, offsetCenterY] = [
        this.anchor.clickPos.x - this.anchor.elemBoundingCenter.x,
        this.anchor.clickPos.y - this.anchor.elemBoundingCenter.y
      ]
      const initialDegree = (Math.atan2(offsetCenterY, offsetCenterX) / (Math.PI / 180))
      this.anchor.rotate = initialDegree - this.curLayout.degree
    },
    calcMove (newPosition) {
      this.SET_MOVING(true)
      this.setPositionByOffset(this.calcOffset(newPosition))
    },
    calcOffset (newPosition) {
      const offsetX = newPosition.x - this.anchor.clickPos.x
      const offsetY = newPosition.y - this.anchor.clickPos.y
      return { offsetX, offsetY }
    },
    setPositionByOffset ({ offsetX, offsetY }) {
      this.curLayout = { top: this.anchor.elemPos.y + offsetY }
      this.curLayout = { left: this.anchor.elemPos.x + offsetX }
    },

    /* Resizer & Rotater */

    activeResizer (e) {
      this.active.resizer = true
      this.calcAnchor(e)
    },
    activeRotater (e) {
      this.active.rotater = true
      this.calcAnchor(e)
    },
    calcWH (direction, offsets) {
      const { sin, cos, sqrt } = Math
      const { degree } = this.curLayout
      const { offsetX, offsetY } = offsets
      const offset = sqrt(offsetX ** 2, offsetY ** 2)
      const { x: anchorX, y: anchorY } = this.anchor.elemPos
      const { w, h } = this.anchor.elemSize

      const safe = n => {
        const safeNum = 0
        const isSafe = n === safeNum || (Math.max(safeNum, n) > safeNum)
        if (!isSafe) {
          throw new Error('break')
        } else {
          return Math.max(safeNum, n)
        }
      }
      const getArc = (fn, d) => fn(d * Math.PI / 180)

      try {
        let offsetVector = null
        switch (direction) {
          case 'left':
            this.curLayout = {
              top: anchorY + getArc(sin, degree) * offsetX / 2,
              left: anchorX + getArc(cos, degree) * offsetX,
              width: safe(w - getArc(cos, degree) * offsetX)
            }
            break
          case 'right':
            this.curLayout = {
              // top: anchorY + getArc(sin, degree) * offset / 2,
              // left: anchorX + getArc(cos, degree) * offset / 2,
              width: safe(w + getArc(sin, degree) * offsetY + getArc(cos, degree) * offsetX)
            }
            break
          case 'top':
            this.curLayout = {
              top: anchorY + getArc(sin, degree + 90) * offsetY,
              left: anchorX + getArc(cos, degree + 90) * offsetY / 2,
              height: safe(h - getArc(sin, degree + 90) * offsetY)
            }
            break
          case 'bottom':
            offsetVector = getArc(sin, degree + 90) * offsetY + getArc(cos, degree + 90) * offsetX
            this.curLayout = {
              // top: anchorY - (2 * offsetVector - getArc(cos, degree) * offsetVector - getArc(cos, degree + 180) * offsetVector),
              // left: anchorX + getArc(cos, degree + 90) * offsetY / 2,
              // top: anchorY - (1 / 2) * offsetVector,
              top: anchorY - offsetVector / (1 / sqrt(2)),
              height: safe(h + offsetVector)
            }
            break
        }
      } catch (error) {
        // noop
      }
    },
    calcRotate (e, { x, y }) {
      const [offsetX, offsetY] = [
        x - this.anchor.elemBoundingCenter.x,
        y - this.anchor.elemBoundingCenter.y
      ]
      const initial = this.anchor.rotate
      const degree = (Math.atan2(offsetY, offsetX) / (Math.PI / 180)) - initial

      /**
       * 吸附坐标系方向
       * 按下 Shift 键时吸附度数为 15 度，
       * 正常情况下仅吸附 0.9 度
       */
      const preferDegree = n => {
        const abs = Math.abs
        const isPressShiftKey = e.shiftKey
        const preferThreshold = isPressShiftKey ? 15 : 0.9
        const toCheck = n > 0
          ? [270, 180, 90, 0, -90, -180, -270]
          : [-270, -180, -90, 0, 90, 180, 270]
        const preferDegree = toCheck.find(x => (abs(abs(n) - abs(x)) < preferThreshold))
        return preferDegree == null ? n : preferDegree
      }
      this.curLayout = {
        degree: preferDegree(+degree % 360)
      }
    },
    stopEvent (e) {
      e.stopPropagation()
      e.preventDefault()
    },
    stopMask () {
      this.active.resizer = false
      this.active.rotater = false
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
      outline: solid 1px #79bbff88;
    }
  }

  &.active-resizer,
  &.active-rotater {
    & > .outline {
      &::before {
        position: absolute;
        content: '';
        width: 100vw;
        height: 100vw;
        left: -50vw;
        top: -50vw;
      }
    }
  }

  .outline {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    outline: solid 0 #79bbff;
    z-index: -1;

    &::before {
      position: absolute;
      content: '';
    }

    .point {
      position: absolute;
      width: 0;
      height: 0;
      border: solid 0 #79bbff;
      background: white;
      transition: .1s ease-out;

      // 暂时隐藏 scaler
      &.scaler {
        border-radius: 50%;
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
          left: -4.5px;
          top: calc(50% - 5px);
          cursor: w-resize;
        }
        &.right {
          right: -4.5px;
          top: calc(50% - 4px);
          cursor: e-resize;
        }
        &.top {
          top: -4.5px;
          left: calc(50% - 4px);
          cursor: n-resize;
        }
        &.bottom {
          bottom: -4.5px;
          left: calc(50% - 5px);
          cursor: s-resize;
        }
      }

      &#rotater {
        display: flex;
        justify-content: center;
        align-items: center;
        left: calc(50% - 8px);
        bottom: -32px;
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
      outline: solid 2px #79bbff;

      .point {
        width: 12px;
        height: 12px;

        &.scaler {
          border: solid 1px #79bbff;

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
          border: solid 1px #79bbff;
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
      outline-color: transparent;
    }
    .point:not(#rotater) {
      opacity: 0;
    }
  }

  & > *:first-child {
    width: 100%;
  }
}
</style>
