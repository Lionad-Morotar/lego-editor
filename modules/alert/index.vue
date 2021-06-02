<template>
  <div class="m-alert" v-if="visible" :style="styles" role="alert">
    <div class="m-alert__content">
      <span class="m-alert__title" v-if="title">
        <title-label :title="title" />
      </span>
      <p class="m-alert__description" v-if="description">
        <description :description="description" />
      </p>
      <i class="m-alert__closebtn" :class="['el-icon-close', isCenterIcon ]" v-show="closable" @click="close()" />
    </div>
  </div>
</template>

<script>
import Props from '@/models/props'
import { pass } from 'modules/utils'
import Forms from '@/forms'
// TODO 没有 description 时，closebtn 和 title 同 line-height
export default {
  name: 'm-alert',
  props: {
    layout: Props.layout({
      default: {
        height: 56,
        padding: [8, 12, 8, 12],
        radius: 0
      },
      component: pass(Forms.Layout, {
        use: ['height', 'radius']
      })
    }),
    title: Props.string({
      component: null,
      label: '标题',
      default: '默认提示框'
    }),
    description: Props.string({
      component: null,
      label: '详细描述',
      default: '提示框可以带一行描述文本'
    }),
    closable: Props.bool({
      label: '关闭按钮',
      default: true
    })
    // TODO control showTimes with localStorage
    // showTimes: Props.number(0)
  },
  computed: {
    styles () {
      return Props.genStyles(this.layout, { removeTranslate: true })
    },
    isCenterIcon () {
      return (!this.title || !this.description) ? 'is-center' : ''
    }
  },
  data () {
    return {
      visible: true
    }
  },
  methods: {
    close () {
      this.visible = false
    }
  },
  components: {
    TitleLabel: TitleLabel(),
    Description: Description()
  }
}

function TitleLabel () {
  return {
    inline: true,
    props: {
      title: Props.string({
        label: '标题',
        default: '默认提示框'
      })
    },
    render () {
      return (
        <fragment>{this.$props.title}</fragment>
      )
    }
  }
}

function Description () {
  return {
    inline: true,
    props: {
      description: Props.string({
        label: '详细描述',
        default: '提示框可以带一行描述文本'
      })
    },
    render () {
      return (
        <fragment>{this.$props.description}</fragment>
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../mixins";
@include b(alert) {
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  margin: 0;
  width: 100%;
  color: #909399;
  background-color: mix(white, #909399, 83%);

  @include e(title) {
    font-size: 13px;
    font-weight: bold;
  }

  @include e(description) {
    margin-top: 9px;
    font-size: 12px;

    @include pseudo(first-child) {
      margin-top: 0;
    }
  }

  @include e(closebtn) {
    font-size: 13px;
    position: absolute;
    top: 9px;
    right: 11px;
    cursor: pointer;

    @include is(center) {
      top: calc(50% - 6px);
    }
  }
}
</style>
