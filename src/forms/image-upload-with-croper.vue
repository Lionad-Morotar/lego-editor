<template>
  <div class="config-item-segment">
    <div slot="text" class="config-item full-content">
      <div class="config-item-content uploader flex-center"
        :style="{ backgroundColor: image ? 'inherit' : '#e6e8eb' }">
        <Uploader
          v-show="!image"
          ref="uploader"
          @success="success"
          @failed="failed">
          <el-button
            class="action-button"
            type="text"
            icon="el-icon-upload2"
          >上传图片</el-button>
        </Uploader>
        <!-- 当前裁剪不能精确到像素 -->
        <vue-croppie
          v-show="image"
          ref="croppieRef"
          :key="reRenderKey"
          :showZoomer="true"
          :enableResize="false"
          :boundary="boundary"
          :viewport="calcViewport"
          @update="result"
        />
      </div>
    </div>
    <template name="el-fade-in">
      <div slot="text" class="config-item compact transparent" v-if="image">
        <div class="config-item-content">
          <el-button
            type="text"
            @click="() => $refs.uploader.upload()"
          >上传</el-button>
          <el-divider direction="vertical" />
          <el-popconfirm
            title="确定删除该图片？"
            confirm-button-text='删除'
            cancel-button-text='取消'
            icon="el-icon-info"
            icon-color="red"
            @confirm="deleteURL">
            <el-button
              slot="reference"
              type="text"
              class="color-danger"
            >删除</el-button>
          </el-popconfirm>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

// TODO refactor 酒后驾驶
// FIXME 比例计算导致点击图片后，points 会增大 1px 的问题

import isEqual from 'lodash.isequal'

export default {
  props: ['value', 'options'],
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      viewport: {},
      image: null,
      boundary: {
        width: 298,
        height: 208
      }
    }
  },
  computed: {
    defViewport () {
      const {
        width = 100,
        height = 100
      } = this.boundary
      return {
        width: width * 0.62,
        height: height * 0.62
      }
    },
    calcViewport () {
      return Object.assign(
        { ...this.defViewport },
        { ...this.initViewport() }
      )
    },
    reRenderKey () {
      const { width, height } = this.calcViewport
      return String(width) + String(height)
    }
  },
  watch: {
    // 当 Props.image.points 改变时,
    // 不会触发重新赋值
    value (n, o) {
      if (!isEqual(n, o) && (n && o && (n.url !== o.url))) {
        const { url } = n || {}
        this.image = url
        this.initCroppie()
      }
    },
    options () {
      this.initViewport()
    }
  },
  created () {
    if (!this.image && this.value) {
      this.image = this.value.url
    }
    this.initCroppie()
  },
  methods: {
    success (file) {
      this.$emit('change', {
        ...this.value,
        url: file[0].url
      })
    },
    failed (error) {
      console.error(error)
      this.$message.error('请稍后重试', '上传失败')
    },
    deleteURL () {
      this.$emit('change', {
        ...this.value,
        url: null
      })
    },
    result (e) {
      const { points = [] } = e
      this.$emit('change', {
        ...this.value,
        points: points.map(x => +x)
      })
    },
    initViewport (options = this.options) {
      const { viewport, ratio } = options || {}
      if (viewport) {
        this.viewport = viewport
      } else if (ratio) {
        const defaultWidth = this.defViewport.width
        this.viewport = {
          width: defaultWidth,
          height: defaultWidth / ratio
        }
      }
      return this.viewport
    },
    async initCroppie (target = this.image) {
      if (target) {
        const binary = await this.getBinary(target)
        this.$refs.croppieRef.bind({
          url: binary,
          points: this.options.points
        })
      }
    },
    async getBinary (target) {
      if (target instanceof File) {
        return await this.getBinaryFromFile(target)
      } else {
        const { u8arr, mime } = await this.getBinaryFromURL(target)
        const $img = document.querySelector(`[src="${target}"]`)
        const imageName = ($img && $img.title) || 'image-name'
        const file = new File([u8arr], imageName, {
          type: mime
        })
        return await this.getBinaryFromFile(file)
      }
    },
    // 从图片地址获取二进制数据
    async getBinaryFromURL (url) {
      return new Promise(resolve => {
        const $img = new Image()
        $img.onerror = err => {
          throw new Error(err)
        }
        $img.onload = _ => {
          const { width, height } = $img
          const $cvs = document.createElement('canvas')
          $cvs.width = width
          $cvs.height = height
          const ctx = $cvs.getContext('2d')
          ctx.drawImage($img, 0, 0, width, height)
          resolve(this.$utils.base64ToBin($cvs.toDataURL()))
        }
        $img.setAttribute('crossOrigin', 'Anonymous')
        $img.src = url
      }).catch(error => {
        this.$message.error(error)
        console.error(error)
      })
    },
    // 从文件对象获取图片二进制数据
    async getBinaryFromFile (file) {
      return await new Promise(resolve => {
        const reader = new FileReader()
        reader.onerror = err => {
          throw new Error(err)
        }
        reader.onload = e => {
          resolve(e.target.result)
        }
        reader.readAsDataURL(file)
      }).catch(error => {
        this.$message.error(error)
        console.error(error)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.config-item-content.uploader {
  min-height: 243px;
  flex: unset;
  width: 100%;
}
.action-button {
  display: block;
  margin: 25px auto;
  padding: 0;
  width: 130px;
  height: 40px;
  background: white;
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
