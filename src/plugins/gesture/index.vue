<script>
const eventNameRemap = {
  touchstart: 'onMouseDown',
  mousedown: 'onMouseDown',
  touchend: 'onMouseUp',
  mouseup: 'onMouseUp',
  touchmove: 'onMouseMove',
  mousemove: 'onMouseMove',
  touchcancel: 'onMouseUp',
  wheel: 'onMouseWheel',
  mousewheel: 'onMouseWheel',
  mouseenter: 'onMouseEnter',
  mouseleave: 'onMouseLeave'
}
const gestures = [
  'hover',
  'hoverOut',
  'tap',
  // 'longtap',
  // 'doubletap',
  // 'swipe',
  // 'swipeLeft',
  // 'swipeRight',
  'swipeUp',
  'swipeDown'
  // 'swipeTopLeft',
  // 'swipeTopRight',
  // 'swipeDownLeft',
  // 'swipeDownRight'
  // 'rotate'
]

// TODO
// function useEventInvoke (fn)

export default {
  name: 'gesture-cmpt',
  props: {
    ...gestures.reduce((h, c) => {
      h[c] = Function
      return h
    }, {}),
    // 标记需要兼听移动端还是PC端的事件
    isMobile: {
      type: Boolean,
      default: false
    },
    enableMouseWheel: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object,
      default: () => ({
        // 多少毫秒内的相邻点击算双击
        tapTimeInterval: 300,
        // 相距多少像素内的点击算同一次点击
        tapOffsetThresholdSquared: 25,
        // 鼠标偏移多少像素就算作滑动
        swipeOffsetThreshold: 80,
        // 悬停事件的触发时间
        hoverTime: 100
      })
    },
    // 事件防抖的时间基数（时间触发后有多少冷冻时间）
    freezeTime: {
      type: [Number, String],
      default: 1000 / 30
    },
    // 事件钩子，由外部传入的事件处理函数
    invoke: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      touchStartTime: 0,
      touchEndTime: 0,
      touchStartCoord: {},
      touchEndCoord: {},
      moveCoord: {},
      wheelOffset: 0,
      mouseEnterTime: null,
      mouseLeaveTime: null,
      hoverTick: null,
      lastTouchendTime: 0,
      lastTouchStartTime: 0,
      lastTouchStartCoord: {},
      lastTouchEndCoord: {},
      lastMoveCoord: {},
      lastWheelOffset: 0,
      $ele: null,
      events: {
        listens: [],
        moves: []
      },
      eventInvoke: e => {
        const params = e.type.includes('move')
          ? {
            x: e.pageX,
            y: e.pageY,
            offsetX: this.moveOffsetX,
            offsetY: this.moveOffsetY
          }
          : {
            x: e.pageX,
            y: e.pageY,
            offsetX: this.touchOffsetX,
            offsetY: this.touchOffsetY
          }
        this.$emit(e.type, e, params)
        this.invoke(e)
      }
    }
  },
  computed: {
    touchTimeInterval () {
      return this.touchEndTime - this.touchStartTime
    },
    touchOffsetX () {
      return this.touchEndCoord.pageX - this.touchStartCoord.pageX
    },
    touchOffsetXABS () {
      return Math.abs(this.touchOffsetX)
    },
    touchOffsetY () {
      return this.touchEndCoord.pageY - this.touchStartCoord.pageY
    },
    touchOffsetYABS () {
      return Math.abs(this.touchOffsetY)
    },
    moveOffsetX () {
      return this.moveCoord.pageX - this.touchStartCoord.pageX
    },
    moveOffsetY () {
      return this.moveCoord.pageY - this.touchStartCoord.pageY
    },
    hoverTime () {
      return this.mouseLeaveTime - this.mouseEnterTime
    }
  },
  render () {
    return this.$slots.default
  },
  mounted () {
    // TODO watch 以支持动态绑定
    this.calcEventsName()
    this.$ele = this.$slots.default[0].elm

    this.events.listens.map(x => {
      this.$ele.addEventListener(x, this.getEvent(x))
    })
  },
  beforeDestroy () {
    this.events.listens.map(x => {
      this.$ele.removeEventListener(x, this.getEvent(x))
    })
  },
  methods: {

    // 获得由 DOM 事件名到 Gesture 示例方法名的映射
    // 如 tapMove 和 mouseMove 都使用 onMoveMove 方法进行监听
    getEvent (name) {
      return this[eventNameRemap[name]]
    },

    /* Enter Events */

    onMouseEnter (e) {
      if (!this.mouseEnterTime && !this.mouseLeaveTime) {
        this.recordEnter(e)
      }
      this.eventInvoke(e)
    },
    recordEnter (e) {
      this.mouseEnterTime = e.timeStamp
      // 如果 Hover 时间到了，那么直接触发 Hover 事件，不需要再监听 MouseLeave
      // TODO refactor
      this.hoverTick = setTimeout(() => {
        this.recordLeave({
          timeStamp: +new Date() + Infinity
        })
      }, this.options.hoverTime)
    },

    /* Leave Events */

    onMouseLeave (e) {
      this.recordLeave(e)
    },
    recordLeave (e) {
      if (this.mouseEnterTime && !this.mouseLeaveTime) {
        this.mouseLeaveTime = e.timeStamp
      }
      this.calcGestures()
      this.hoverTick && clearTimeout(this.hoverTick)
    },

    /* Down Events */

    onMouseDown (e) {
      this.recordDown(e)
      this.triggerMove()
      this.eventInvoke(e)
    },
    recordDown (e) {
      this.lastTouchStartTime = this.touchStartTime
      this.touchStartTime = e.timeStamp
      const touch = e.touches ? e.touches[0] : e
      this.lastTouchStartCoord = this.touchStartCoord
      this.touchStartCoord = {
        pageX: touch.pageX,
        pageY: touch.pageY
      }
    },
    triggerMove () {
      this.events.moves.map(x => {
        document.body.addEventListener(x, this.getEvent(x))
      })
      const upEvents = this.isMobile ? ['touchend', 'touchcancel'] : ['mouseup']
      upEvents.map(x => {
        const clean = () => {
          document.body.removeEventListener(x, clean)
          this.unTriggerMove()
        }
        document.body.addEventListener(x, clean)
      })
    },

    /* Up Events */

    onMouseUp (e) {
      this.recordUp(e)
      this.calcGestures()
      this.unTriggerMove()
      this.eventInvoke(e)
    },
    recordUp (e) {
      this.lastTouchendTime = this.touchEndTime
      this.touchEndTime = e.timeStamp
      const touch = e.changedTouches ? e.changedTouches[0] : e
      this.lastTouchEndCoord = this.touchEndCoord
      this.touchEndCoord = {
        pageX: touch.pageX,
        pageY: touch.pageY
      }
    },
    unTriggerMove () {
      this.events.moves.map(x => {
        document.body.removeEventListener(x, this.getEvent(x))
      })
    },

    /* Move Events */

    onMouseMove (e) {
      this.recordMove(e)
      this.eventInvoke(e)
    },
    recordMove (e) {
      const touch = e.changedTouches ? e.changedTouches[0] : e
      this.lastMoveCoord = this.moveCoord
      this.moveCoord = {
        pageX: touch.pageX,
        pageY: touch.pageY
      }
    },

    /* Mouse Wheel Events */

    onMouseWheel (e) {
      this.lastWheelOffset = this.wheelOffset
      const offset = e.wheelDelta && e.deltaY ? e.wheelDelta * -1 : event.deltaY
      this.wheelOffset = offset
      this.calcGestures()
      this.eventInvoke(e)
    },

    // 计算需要触发的动作
    calcGestures: (function () {
      let lastTriggerTime = 0

      return function () {
        const dateNow = +Date.now()
        if (dateNow - lastTriggerTime < +this.freezeTime) return

        lastTriggerTime = dateNow

        const {
          tapTimeInterval,
          tapOffsetThresholdSquared,
          swipeOffsetThreshold,
          hoverTime
        } = this.options

        // 触发条件
        const judgement = {
          hover: () => this.hoverTime >= hoverTime,
          hoverOut: () => true,
          tap: () => {
            const inTime = this.touchTimeInterval < tapTimeInterval
            const inRange = this.touchOffsetX ** 2 < tapOffsetThresholdSquared
            return inTime && inRange
          },
          swipeUp: () => {
            const calcMouse =
              this.touchTimeInterval < tapTimeInterval &&
              this.touchOffsetYABS > this.touchOffsetXABS &&
              this.touchOffsetY > swipeOffsetThreshold
            const calcMouseWheel = this.wheelOffset < 0
            return calcMouse || calcMouseWheel
          },
          swipeDown: () => {
            const calcMouse =
              this.touchTimeInterval < tapTimeInterval &&
              this.touchOffsetYABS > this.touchOffsetXABS &&
              this.touchOffsetY < swipeOffsetThreshold
            const calcMouseWheel = this.wheelOffset > 0
            return calcMouse || calcMouseWheel
          }
        }

        // const canRelease = gestures.map(x => judgement[x] && judgement[x]())
        // gestures.forEach((x, xi) => {
        //   if (canRelease[xi]) {
        //     this.$emit(x)
        //   }
        // })
        gestures.find(x => {
          const canRelease = this[x] && judgement[x] && judgement[x]()
          const release = () => this[x]()

          if (canRelease) {
            release()
            this.reset()
          }
        })
      }
    })(),

    reset () {
      this.touchStartTime = null
      this.touchEndTime = null
      this.touchStartCoord = {}
      this.touchEndCoord = {}
      this.moveCoord = {}
      this.wheelOffset = 0
      this.mouseEnterTime = null
      this.mouseLeaveTime = null
      this.lastTouchendTime = null
      this.lastTouchStartTime = null
      this.lastTouchStartCoord = {}
      this.lastTouchEndCoord = {}
      this.lastMoveCoord = {}
      this.lastWheelOffset = 0
    },

    // 计算需要监听的方法
    calcEventsName () {
      const listens = [
        ...(this.isMobile
          ? ['touchstart', 'touchend', 'touchcancel']
          : ['mousedown', 'mouseup', 'mouseenter', 'mouseleave']),
        ...(this.enableMouseWheel ? ['onwheel' in document ? 'wheel' : 'mousewheel'] : [])
      ]
      // 某些事件需要同时开启 move 事件的监听
      const moves = [this.isMobile ? 'touchmove' : 'mousemove']
      this.events = {
        listens,
        moves
      }
    }
  }
}
</script>
