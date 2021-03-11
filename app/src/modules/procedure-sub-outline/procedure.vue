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
/* eslint-disable */
// TODO  48:20  error  Strings must use singlequote  quotes
import Props from '@/modules/props'
import ConfigProcedure from './panel/config-procedure'
export default {
  props: ['idx', 'procedures', 'procedure']
}
</script>
