<template>
  <div class="test-dynamic-form">
    <form-header />
    <form-content />
    <div class="form-footer">
      a dynamic form for test
    </div>
  </div>
</template>

<script>
import FormHeader from './form-header'
import FormContent from './form-content'
export default {
  name: 'test-dynamic-form',
  components: {
    FormHeader,
    FormContent,
  },
}
</script>

<style lang="scss" scoped>
.test-dynamic-form {
  padding: 15px;
  background: #5200d1;
}
.form-footer {
  margin-top: 10px;
  font-size: 12px;
  color: #f0f3f7;
  text-align: center;
}
</style>
