<template>
  <div class="lego-procedure">
    <procedure-header />
    <procedure-content />
  </div>
</template>

<script>
import Props from '../props'
import ProcedureHeader from './procedure-header'
import ProcedureContent from './procedure-content'
import ConfigCounts from './panel/config-counts'
export default {
  name: 'lego-procedure',
  props: {
    counts: Props.custom({
      type: Number,
      default: 4,
      component: ConfigCounts
    })
  },
  components: {
    ProcedureHeader,
    ProcedureContent
  }
}
</script>

<style lang="scss" scoped>
.lego-procedure {
  padding: 24px 16px;
}
</style>
