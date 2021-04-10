<template>
  <forms-text v-model="v">
    <div slot="text" class="config-item">
      <div class="config-item-content">
        <el-input type="textarea" v-model="v.text" :rows="5" spellcheck="false" />
      </div>
    </div>
  </forms-text>
</template>

<script>
import Props from '@/models/props'
export default {
  props: ['value'],
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      v: {
        ...(this.value || Props.DS.text)
      }
    }
  },
  watch: {
    v: {
      deep: true,
      handler (newValue) {
        this.$emit('change', newValue)
      }
    }
  }
}
</script>
