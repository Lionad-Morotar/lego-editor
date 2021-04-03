<template>
  <div class="config-item-segment">
    <header>轮播图设置</header>
    <div class="config-item">
      <el-collapse v-model="active">
        <el-collapse-item
          v-for="(image, idx) in v"
          :title="`第<${idx+1}>张轮播`"
          :name="image.url+idx"
          :key="image.url+idx">
          <div class="image-preview">
            <img class="image" :src="image.url" />
            <div class="icons-group">
              <i class="icon el-icon-edit" @click="edit(idx)" />
              <i class="icon el-icon-delete" @click="remove(idx)" />
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

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
      active: [] // (this.value || []).map((x, idx) => x.url + idx)
    }
  },
  computed: {
    len () {
      return this.v?.length
    }
    // first () {
    //   return this.len
    //     ? [this.v[0].url + '0']
    //     : []
    // }
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
        url: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/slider/default.png'
      }))
    },
    subtract () {
      this.v.splice(this.v.length - 1, 1)
    },
    edit (idx) {
      this.$prompt('请输入图片地址', '编辑', {
        inputValue: this.v[idx].url,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
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
.image-preview {
  display: flex;
  flex-grow: 0;
  position: relative;
  // width: 210px;
  height: 135px;
  background: white;
  border: solid 1px #ebeef5;

  .image {
    width: 100%;
    object-fit: contain;
  }
  .icons-group {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5em;
    padding-right: 0.8em;
    position: absolute;
    bottom: 0;
    border: unset;
    background: unset;

    .icon {
      border: unset;
    }
  }
}
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
