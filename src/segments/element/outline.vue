<template>
  <div
    class="box-outline"
    :class="[isActive && 'active', propsChangingTick && 'props-changing']"
    @click.capture="selectElement"
    @click.stop="_ => _"
    @mousedown="checkDraggable"
  >
    <slot />
    <div class="outline">
      <div class="point left top" />
      <div class="point left bottom" />
      <div class="point right top" />
      <div class="point right bottom" />
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

        this.anchor = { x: e.x, y: e.y }
        this.oldXY = {
          x: this.curModel.layout.left,
          y: this.curModel.layout.top
        }
        document.body.addEventListener('mousemove', this.calcMove)
        document.body.addEventListener('mouseup', () => {
          document.body.removeEventListener('mousemove', this.calcMove)
          this.$nextTick(() => this.SET_MOVING(false))
        })
        // 自由布局的组件拖拽时不使用 vue-draggle 交换位置
        e.preventDefault()
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
      const offsetX = newPosition.x - this.anchor.x
      const offsetY = newPosition.y - this.anchor.y
      this.curModel.layout.top = this.oldXY.y + offsetY
      this.curModel.layout.left = this.oldXY.x + offsetX
    }
  }
}
</script>

<style lang="scss" scoped>
.box-outline {
  position: relative;

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
    z-index: 1;
    transition: none;
    // todo refactor
    pointer-events: none;

    .point {
      position: absolute;
      width: 0;
      height: 0;
      border: solid 0 #a1caff;
      border-radius: 50%;
      background: white;
      transition: .1s ease-out;
      // TODO 错开入场和出场动画
      // transition-delay: .1s;

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
  }
  &.active {
    & > .outline {
      border: solid 2px #a1caff;
      transition: .1s;

      .point {
        width: 16px;
        height: 16px;
        border: solid 2px #a1caff;

        &.left {
          left: -8px;
        }
        &.right {
          right: -8px;
        }
        &.top {
          top: -8px;
        }
        &.bottom {
          bottom: -10px;
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
