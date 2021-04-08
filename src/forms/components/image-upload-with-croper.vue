<template>
  <div class="config-item-segment">
    <div slot="text" class="config-item full-content">
      <div class="config-item-content flex-center">
        <Uploader @success="uploadSuccess">
          <el-button
            class="action-button"
            type="text"
            icon="el-icon-upload2"
          >上传图片</el-button>
        </Uploader>
        <vue-croppie
          v-show="false"
          ref="croppieRef"
          :showZoomer="true"
          :enableResize="false"
          :boundary="boundary"
          :viewport="viewport"
        />
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
      image: null,
      boundary: {
        width: 298,
        height: 208
      }
    }
  },
  computed: {
    viewport () {
      const {
        width = 100,
        height = 100
      } = this.boundary
      return {
        width: width * 0.62,
        height: height * 0.62
      }
    }
  },
  watch: {
    value (newVal) {
      if (!this.image) {
        this.image = newVal
        this.initCroppie()
      }
    },
    options (newVal) {
      if (newVal && newVal.viewport) {
        this.viewport = newVal.viewport
      }
    }
  },
  created () {
    if (!this.image && this.value) {
      this.image = this.value
      this.initCroppie()
    }
  },
  methods: {
    uploadSuccess (res) {
      console.log('res: ', res)
    },
    async initCroppie () {
      const binary = await this.getBinary(this.image)
      this.$refs.croppieRef.bind({
        url: binary
      })
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
  background: #e6e8ebaa;
  min-height: 208px;
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
