<template>
  <div class="compare">
    <form-header />
    <form-content />
  </div>
</template>

<script>
import FormHeader from './form-header'
import FormContent from './form-content'
export default {
  name: 'compare',
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
