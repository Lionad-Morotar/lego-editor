<template>
  <div class="lego-procedure">
    <procedure-header />
    <procedure-content :procedures="procedures" />
  </div>
</template>

<script>
import Props from '../props'
import ProcedureHeader from './procedure-header'
import ProcedureContent from './procedure-content'
export default {
  name: 'lego-procedure',
  props: {
    procedures: Props.custom({})
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
