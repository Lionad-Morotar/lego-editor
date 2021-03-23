<template>
  <div class="slider-con">
    <el-slider
      v-model="v"
      class="slider"
      :show-tooltip="false"
      v-bind="$attrs"
    />
    <span class="slider-des">{{v}}</span>
  </div>
</template>

<script>
export default {
  props: ['value'],
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      v: this.value
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

<style lang="scss">
.slider-con {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  height: 30px;

  .slider {
    width: 165px !important;

    .el-slider__runway {
      margin: 10px 0;
    }
  }
  .slider-des {
    margin-right: 5px;
    width: 25px;
    line-height: 30px;
    text-align: right;
    font-size: 12px;
  }
}
</style>
