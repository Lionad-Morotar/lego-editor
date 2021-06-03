<template>
  <div class="cmpt-alioss">
    <input
      hidden
      ref="inputFile"
      type="file"
      style="display: none"
      :multiple="multiple"
      @change="handleFileChange"
    />
    <div v-loading.fullscreen="loading" @click="() => upload()">
      <slot />
    </div>
  </div>
</template>

<script>
const uuid = require('uuid')

export default {
  props: {
    options: Object,
    multiple: Boolean,
    beforeUpload: Function
  },
  data () {
    return {
      // todo loading template scoped value
      loading: false,
      temp: {
        callback: null
      }
    }
  },
  computed: {
    uploadOptions () {
      return Object.assign({
        maxFileSizeKB: {
          default: 1024
        },
        autoUpload: false,
        types: [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/gif',
          'image/webp'
        ]
      }, this.options)
    },
    callback () {
      return this.temp.callback || (() => {})
    }
  },
  methods: {
    upload (files, callback) {
      if (!files) {
        this.$refs.inputFile.click()
      } else {
        this.temp.callback = callback
        const rawFiles = files instanceof Array ? files : [files]
        this.uploadFiles(rawFiles)
      }
    },
    handleFileChange (e) {
      this.uploadFiles(e.target.files)
    },
    async uploadFiles (rawFiles) {
      const { beforeUpload } = this

      const wash = beforeUpload || (_ => _)
      const unwashFiles = [].slice.call(rawFiles)
      const files = await this.$utils.forAwait(unwashFiles, wash)

      try {
        await this.checkUploadFiles(files)
      } catch (error) {
        this.$message.error(error)
      }

      try {
        this.loading = true
        const uploadResult = await Promise
          .all(files.map(this.uploadFile))
          .then(data => {
            const dataWithFiles = data.map((x, i) => ({
              ...x,
              file: files[i]
            }))
            return this.handleUploadResult(dataWithFiles)
          })
        this.$emit('success', uploadResult, files)
        this.callback({
          isSuccess: true,
          res: uploadResult
        })
      } catch (error) {
        this.$emit('failed', error, files)
        this.callback({
          isSuccess: false,
          error
        })
      } finally {
        this.loading = false
      }
    },
    async checkUploadFiles (files, options = this.uploadOptions) {
      const { maxFileSizeKB } = options
      files.map(file => {
        if (file > maxFileSizeKB * 1024) {
          throw new Error(`请上传小于 ${options.maxFileSizeKB}KB 大小的图片`)
        }
        if (!options.types.includes(file.type)) {
          throw new Error(`不支持上传文件格式：${file.type}`)
        }
      })
    },
    handleUploadResult (res) {
      const results = res instanceof Array ? res : [res]
      return results.map(x => ({
        ...x,
        url: this.$utils.getPureURL(x.url)
      }))
    },
    async uploadFile (file) {
      const name = file.name || ''
      const extMatch = name.match(/\.[^.]*$/)
      const ext = extMatch ? extMatch[0] : ''

      const filename = uuid.v4() + ext
      const putPath = 'users/admin/' + filename

      return await this.$oss.put(putPath, file)
    }
  }
}
</script>
