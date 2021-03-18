<template>
  <div class="vs">
    <div class="left">
      <div class="title">{{ compare.left.title }}</div>
      <img
        :src="compare.left.url.url"
        :style="styles.leftImage"
      />
      <div class="description" :style="styles.leftDes">
        {{ compare.left.description.text }}
      </div>
    </div>
    <div class="right">
      <div class="title">{{ compare.right.title }}</div>
      <img
        :src="compare.right.url.url"
        :style="styles.rightImage"
      />
      <div class="description" :style="styles.rightDes">
        {{ compare.right.description.text }}
      </div>
    </div>
  </div>
</template>

<script>
import Props from '@/modules/props'
import ConfigCompare from './panel/config-compare'
export default {
  props: {
    idx: Props.pass(),
    compare: Props.pass({
      component: ConfigCompare,
      bindProps (props) {
        return props.compares[this.idx]
      }
    })
  },
  computed: {
    styles () {
      return {
        leftDes: Props.genStyles(this.compare.left.description),
        rightDes: Props.genStyles(this.compare.right.description),
        leftImage: Props.genStyles(this.compare.left.url),
        rightImage: Props.genStyles(this.compare.right.url)
      }
    }
  }
}
</script>
