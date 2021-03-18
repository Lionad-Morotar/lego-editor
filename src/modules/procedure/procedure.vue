<template>
  <div class="procedure">
    <div class="content-con">
      <div class="title">{{ procedure.title }}</div>
      <div class="content">{{ procedure.content }}</div>
    </div>
    <img
      class="image"
      :src="procedure.image"
      :alt="procedure.content"
      :title="procedure.title"
    />
  </div>
</template>

<script>
import Props from '@/modules/props'
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
  }
}
</script>
