<template>
  <div class="con">

  </div>
</template>

<script>

export default {
  props: ['value'],
  data() {
    return {
      v: this.value,
      min: 0,
      max: 10,
    }
  },
  watch: {
    v(newValue) {
      this.$emit('change', newValue)
    },
  },
  methods: {
    add() {
      this.v = Math.min(this.max, this.v + 1)
    },
    subtract() {
      this.v = Math.max(this.min, this.v - 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.con {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
