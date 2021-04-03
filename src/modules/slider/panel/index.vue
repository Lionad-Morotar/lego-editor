<template>
  <div class="config-item-segment">
    <header>轮播图设置</header>
    <div class="config-item">
      <el-collapse accordion>
        <el-collapse-item
          v-for="(image, idx) in v"
          :title="`第 ${idx+1} 张图片`"
          :key="image.url+idx">
          <div class="image-preview">
            <img class="image" :src="image.url" />
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import Props from '@/models/props'
export default {
  props: ['value', 'props'],
  data () {
    return {
      v: this.value,
      min: 0,
      max: 5
    }
  },
  computed: {
    len () {
      return this.v.length
    }
  },
  watch: {
    v: {
      deep: true,
      handler (newValue) {
        this.$emit('change', newValue)
      }
    }
  },
  methods: {
    add () {
      this.v.push(Props.merge(Props.DS.image, {
        url: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/slider/default.png'
      }))
    },
    subtract () {
      this.v.splice(this.v.length - 1, 1)
    },
    remove (idx) {
      this.v.splice(idx, 1)
    }
  }
}
</script>