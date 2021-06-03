<template>
  <div class="procedure">
    <div class="content-con">
      <div class="title">{{ procedure.title }}</div>
      <div class="content">{{ procedure.content }}</div>
    </div>
    <div class="clip-rect">
      <img
        class="image"
        :src="procedure.image.url"
        :alt="procedure.content"
        :title="procedure.title"
        :style="styles"
      />
    </div>
  </div>
</template>

<script>
import Props from 'wox-props'
import ConfigProcedure from './panel/config-procedure'
export default {
  props: {
    idx: Props.pass(),
    procedure: Props.pass({
      component: ConfigProcedure,
      bindProps (props) {
        return props.procedures[this.idx]
      }
    })
  },
  computed: {
    styles () {
      return Props.genStyles({
        ...this.procedure.image,
        width: 165
      })
    }
  }
}
</script>
