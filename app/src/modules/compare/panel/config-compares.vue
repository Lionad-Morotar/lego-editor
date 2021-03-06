<template>
  <div class="container">
    <div class="item-con" v-for="idx in props.counts" :key="idx">
      <div class="idx-con"><span class="idx">第{{idx}}项</span></div>
      <div class="label">左侧标题</div>
      <base-text v-model="v[idx-1].left.title" />
      <div class="label">左侧描述</div>
      <base-text v-model="v[idx-1].left.description" />
      <div class="label">右侧标题</div>
      <base-text v-model="v[idx-1].right.title" />
      <div class="label">右侧描述</div>
      <base-text v-model="v[idx-1].right.description" />
    </div>
  </div>
</template>

<script>
import Form from '../../form'
export default {
  props: ['value', 'props'],
  components: {
    BaseText: Form.BaseText
  },
  data () {
    return {
      v: this.value,
    }
  },
  watch: {
    v: {
      deep: true,
      handler (newValue) {
        this.$emit('change', newValue)
      }
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .item-con {
    width: 100%;
  }
  .idx {
    margin: 15px 0;
    padding: 5px 10px;
    border: solid 1px #555;
  }
}
</style>
