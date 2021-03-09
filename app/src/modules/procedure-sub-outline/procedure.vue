<template>
  <div class="procedure">
    asdfasdfsadf
    <!-- <div class="content-con">
      <div class="title">{{ procedures[idx].title }}</div>
      <div class="content">{{ procedures[idx].content }}</div>
    </div>
    <img
      class="image"
      :src="procedures[idx].image"
      :alt="procedures[idx].content"
      :title="procedures[idx].title"
    /> -->
  </div>
</template>

<script>
/* eslint-disable */
// TODO  48:20  error  Strings must use singlequote  quotes
import Props from '@/modules/props'
import ConfigProcedure from './panel/config-procedure'
export default {
  props: ['idx', 'procedures']
}
</script>