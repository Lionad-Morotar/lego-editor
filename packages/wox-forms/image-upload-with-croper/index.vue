<template>
  <div class="config-item-segment">
    <div slot="text" class="config-item full-content">
      <div class="config-item-content uploader flex-center"
        :style="{ backgroundColor: image ? 'inherit' : '#e6e8eb' }">
        <Uploader
          v-show="!image"
          ref="uploader"
          @success="changeImage"
          @failed="uploadFailed">
          <el-button
            class="action-button"
            type="text"
            icon="el-icon-upload2"
          >上传图片</el-button>
        </Uploader>
        <vue-croppie
          v-show="image"
          ref="croppieRef"
          :key="reRenderKey"
          :showZoomer="true"
          :enableResize="false"
          :boundary="boundary"
          :viewport="calcViewport"
          :mouseWheelZoom="false"
          @update="result"
        />
      </div>
    </div>
    <template name="el-fade-in">
      <div slot="text" class="config-item compact transparent" v-if="image">
        <div class="config-item-content">

          <el-button
            type="text"
            @click="openPixabayDialog"
          >在线搜索</el-button>
          <pixabay-dialog
            :visible="visible.pixabay"
            @select="selectPixabayImage"
          />

          <el-divider direction="vertical" />

          <el-button
            type="text"
            @click="() => $refs.uploader.upload()"
          >本地上传</el-button>

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
import PixabayDialog from './pixabay-dialog.vue'
export default {
  props: ['value', 'options'],
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {
    PixabayDialog
  },
  data () {
    return {
      viewport: {},
      image: null,
      boundary: {
        width: 298,
        height: 208
      },
      store: {
        imageWidth: null,
        imageHeight: null
      },
      visible: {
        pixabay: false
      }
    }
  },
  computed: {
    // TODO 计算屏幕宽度以便求 Module.image.scale
    defaultScreenWidth () {
      // const width = document.query('.page').style.width
      return 375
    },
    defaultViewport () {
      const { width, height } = this.boundary
      return {
        width: width * 0.62,
        height: height * 0.62
      }
    },
    calcViewport () {
      return Object.assign(
        { ...this.defaultViewport },
        { ...this.initViewport() }
      )
    },
    // 当 viewport 改变，重新触发 croppie 的渲染
    reRenderKey () {
      const { width, height } = this.calcViewport
      return String(width) + String(height)
    }
  },
  watch: {
    // 仅当 URL 变化时重新初始化裁剪框
    value (n, o) {
      if (n && o && (n.url !== o.url)) {
        this.image = n.url
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
    // ---------------------------------------------------- actions
    async changeImage (files) {
      if (!files) {
        return
      }
      const file = files instanceof Array
        ? files[0]
        : files instanceof String
          ? { url: files }
          : files
      {
        // pixabay 返回的宽高不准，所以重新计算
        const { width, height } = await this.getImageWH(file.url)
        ;[file.width, file.height] = [width, height]
      }
      const { url, width, height } = file
      this.store.imageWidth = width
      this.store.imageHeight = height
      this.$emit('change', {
        ...this.value,
        url: url,
        scale: 1,
        points: [0, 0, width, height]
      })
    },
    selectPixabayImage (images) {
      this.changeImage(images)
      this.closePixabayDialog()
    },
    uploadFailed (error) {
      // TODO image uploader
      console.error(error)
      this.$message.error('请稍后重试', '上传失败')
    },
    openPixabayDialog () {
      this.visible.pixabay = true
    },
    closePixabayDialog () {
      this.visible.pixabay = false
    },
    deleteURL () {
      this.$emit('change', {
        ...this.value,
        url: null,
        points: null
      })
    },
    // ---------------------------------------------------- internal methods
    getImageWH (url) {
      return new Promise(resolve => {
        const $image = new Image()
        $image.src = url
        $image.onload = () => {
          resolve({
            width: $image.width,
            height: $image.height
          })
        }
        $image.onerror = error => {
          throw new Error(error)
        }
      }).catch(error => {
        console.error(error)
      })
    },
    result (e) {
      const { points = [] } = e
      const [x1,, x2] = points
      const ratio = this.store.imageWidth / (+x2 - x1)
      this.$emit('change', {
        ...this.value,
        scale: ratio,
        zoom: this.store.imageWidth / this.defaultScreenWidth,
        points: points.map(x => +x)
      })
    },
    // 根据外部图片的比例，计算出 croppie 白色框框遮罩的宽高
    initViewport (options = this.options) {
      const { ratio } = options || {}
      if (ratio) {
        const defaultWidth = this.defaultViewport.width
        this.viewport = {
          width: Math.ceil(defaultWidth),
          height: Math.ceil(defaultWidth / ratio)
        }
      }
      return this.viewport
    },
    async initCroppie (target = this.image) {
      if (target) {
        const binary = await this.getBinary(target)
        const { width, height } = await this.getImageWH(binary)
        this.store.imageWidth = width
        this.store.imageHeight = height
        // @see https://foliotek.github.io/Croppie/
        this.$refs.croppieRef.bind({
          url: binary,
          points: this.value.points
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
