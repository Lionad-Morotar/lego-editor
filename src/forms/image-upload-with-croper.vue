<template>
  <div class="config-item-segment">
    <div slot="text" class="config-item full-content">
      <div class="config-item-content flex-center">
        <transition name="fade-enter">
          <Uploader
            v-if="!image"
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
            v-else
            ref="croppieRef"
            :key="reRenderKey"
            :showZoomer="true"
            :enableResize="false"
            :boundary="boundary"
            :viewport="calcViewport"
            @update="result"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
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
    defaultVP () {
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
        { ...this.defaultVP },
        { ...this.initViewport() }
      )
    },
    reRenderKey () {
      const { width, height } = this.calcViewport
      return String(width) + String(height)
    }
  },
  watch: {
    value (newVal) {
      const { url } = newVal || {}
      if (!this.image && url) {
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
    success (_, raws) {
      this.initCroppie(raws[0])
    },
    failed (error) {
      console.error(error)
      this.$message.error('请稍后重试', '上传失败')
    },
    result (e) {
      const { points = [] } = e
      // console.log(e)
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
        const defaultWidth = this.defaultVP.width
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
.config-item-content {
  // background: #e6e8ebaa;
  min-height: 208px;
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
