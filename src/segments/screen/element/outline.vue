<template>
  <div
    class="box-outline"
    :class="isActive ? 'active' : ''"
    @click.stop="selectElement"
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
import { mapState, mapActions } from 'vuex'
import Module from '@/models/module'
export default {
  name: 'box-outline',
  inject: ['model'],
  props: ['props'],
  data () {
    return {
      // 记录当前点击周期内是否移动了元素位置
      moved: false,
      anchor: { x: 0, y: 0 },
      oldXY: { x: 0, y: 0 }
    }
  },
  computed: {
    ...mapState('screen', {
      selectedOutline: state => state.selectedOutline
    }),
    curModel () {
      return Module.getModel(this.model)
    },
    isActive () {
      return this.selectedOutline === this
    }
  },
  mounted () {
    // console.log(this.$attrs, this.$props)
  },
  methods: {
    ...mapActions('screen', [
      'SELECT_MODULE',
      'SELECT_OUTLINE'
    ]),
    selectElement () {
      if (!this.moved) {
        this.SELECT_MODULE(this.curModel)
        this.SELECT_OUTLINE(this)
      }
    },
    // 自由布局的组件拖拽时不使用 vue-draggle 交换位置，
    // 而是改变 top，left 的值
    checkDraggable (e) {
      const draggable = this.curModel.layout.auto
      if (!draggable) {
        const target = e.target
        this.initElementWH(target)

        this.anchor = { x: e.x, y: e.y }
        this.oldXY = {
          x: this.curModel.layout.left,
          y: this.curModel.layout.top
        }
        document.body.addEventListener('mousemove', this.calcMove)
        document.body.addEventListener('mouseup', () => {
          document.body.removeEventListener('mousemove', this.calcMove)
          setTimeout(() => {
            this.moved = false
          })
        })

        e.stopPropagation()
        e.preventDefault()
      }
    },
    initElementWH (target) {
      const $parent = target.offsetParent.offsetParent
      this.curModel.layout.width = target.offsetWidth
      this.curModel.layout.height = target.offsetHeight
      this.curModel.layout.top = $parent.offsetTop
      this.curModel.layout.left = $parent.offsetLeft
    },
    calcMove (newPosition) {
      this.moved = true
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

  & > *:first-child {
    width: 100%;
  }
}
</style>
