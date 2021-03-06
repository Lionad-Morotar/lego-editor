<template>
  <div class="compare">
    <form-header />
    <form-content />
  </div>
</template>

<script>
import Props from '../props'
import FormHeader from './form-header'
import FormContent from './form-content'
import AddRemoveCompare from './panel/add-remove-compare'
export default {
  name: 'compare',
  props: {
    counts: Props.custom({
      type: Number,
      default: 2,
      component: AddRemoveCompare,
    }),
  },
  components: {
    FormHeader,
    FormContent,
  },
}
</script>

<style lang="scss" scoped>
.compare {
  background: white;
}
.form-sub-title {
  padding: 5px 0 15px 0;
  font-size: 12px;
  color: #f0f3f7;
  text-align: center;
}
</style>
