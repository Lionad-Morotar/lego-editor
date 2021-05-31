<template>
  <div class="config-item-segment">
    <header>轮播图设置</header>
    <el-collapse v-model="active">
      <template v-for="(img, idx) in v">
        <forms-image
          v-model="v[idx]"
          :width="375"
          :height="200"
          :key="idx"
        />
      </template>
    </el-collapse>
    <el-button
      class="action-button"
      type="text"
      :disabled="len === max"
      @click="add"
    >增加轮播</el-button>
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
      max: 4,
      active: []
    }
  },
  computed: {
    len () {
      return this.v?.length
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
    test (e) {
      console.log(e)
    },
    add () {
      this.v.push(Props.merge(Props.DS.image, {
        url: 'https://lego-editor.oss-cn-shanghai.aliyuncs.com/preview/modules/slider/default.png'
      }))
    },
    subtract () {
      this.v.splice(this.v.length - 1, 1)
    },
    edit (idx) {
      this.$prompt('请输入图片地址', '编辑', {
        inputValue: this.v[idx].url,
        confirmButtonString: '确定',
        cancelButtonString: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.v[idx].url = value
      })
    },
    remove (idx) {
      this.v.splice(idx, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.action-button {
  display: block;
  margin: 25px auto;
  padding: 0;
  width: 180px;
  height: 40px;
  line-height: 40px;
  color: #444;
  border: solid 1px #eee;
  border-radius: 20px;
  transition: 0.25s;

  &:hover {
    color: #409eff;
  }
  &:active {
    background: rgba(0, 88, 255, 0.03);
  }
  &:disabled {
    color: #999;
    pointer-events: none;
  }
}
</style>
