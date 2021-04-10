<template>
  <div>
    <image-croper
      v-model="v"
      :options="options"
    />
  </div>
</template>

<script>
// import debounce from 'lodash.debounce'
import Props from '@/models/props'
import ImageCroper from './image-upload-with-croper'
export default {
  props: ['value', 'props'],
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      v: {
        ...(this.value || Props.DS.image)
      }
    }
  },
  computed: {
    options () {
      const { width, height } = this.props
        ? this.props.layout
        : this.$attrs
      const { points } = this.value

      const max = 100
      const min = 0.01
      const safe = n => Math.max(Math.min(n, max), min)

      const ratio = safe(width / height)

      console.log(
        width, height
      )

      return {
        ratio,
        points: points || (width ? [0, 0, width, height] : [])
      }
    }
  },
  watch: {
    v: {
      deep: true,
      handler (newValue) {
        this.$emit('change', newValue)
      }
    }
  },
  components: {
    ImageCroper
  }
}
</script>

<style lang="scss" scoped>
.icons-con {
  display: flex;
  flex-wrap: wrap;

  .label {
    margin: 15px 15px 0 0;
    height: 40px;
    line-height: 38px;
  }
  .icon {
    margin: 15px 15px 0 0;
    width: 40px;
    height: 40px;
    line-height: 38px;
    text-align: center;
    border: solid 1px #eee;
    cursor: pointer;
    &:hover {
      background: #fafafa;
    }
    &:active {
      background: #eee;
    }

    .iconfont {
      font-size: 22px;
    }
    .active {
      font-weight: bold;
    }
  }
}
</style>
