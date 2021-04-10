<template>
  <div class="segment">
    <div class="header">
      <span class="label">{{title}}</span>
    </div>
    <i v-if="closable" class="el-icon el-icon-arrow-down" @click="toggleFold" />
    <div ref="content" class="content-wrapper" :style="styles">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    closable: {
      type: Boolean,
      default: true
    },
    time: {
      type: Number,
      default: 0.2
    }
  },
  data () {
    return {
      fold: false,
      height: null,
      tick: null
    }
  },
  computed: {
    styles () {
      return {
        opacity: this.fold ? '0' : '1',
        marginTop: this.fold ? '0' : '25px',
        height: this.fold ? 0
          : this.height == null
            ? 'auto'
            : String(this.height) + 'px',
        overflow: 'hidden',
        transition: String(this.time) + 's'
      }
    }
  },
  methods: {
    toggleFold () {
      if (this.height == null) {
        this.height = this.$refs.content.scrollHeight

        if (this.tick) {
          clearTimeout(this.tick)
        }
        this.tick = setTimeout(() => {
          this.$nextTick(() => {
            this.height = null
          })
        }, this.time * 1000)
      } else {
        this.height = 0
      }
      setTimeout(() => {
        this.fold = !this.fold
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.segment {
  position: relative;
  padding: 0 20px;
  width: 100%;

  & + .segment {
    margin-top: 25px;
  }

  .el-icon-arrow-down {
    position: absolute;
    right: 20px;
    top: -2px;
    padding: 5px;
    font-size: 18px;
    cursor: pointer;
  }

  .header {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.4px;

    .label {
      margin-left: 1px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
