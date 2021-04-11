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

const checkUploadFiles = function (files, options) {
  return new Promise(resolve => {
    files.map(file => {
      if (file > options.maxFileSizeKB * 1024) {
        resolve(`请上传小于 ${options.maxFileSizeKB}KB 大小的图片`)
      }
      if (!options.types.includes(file.type)) {
        resolve(`不支持上传文件格式：${file.type}`)
      }
    })
    resolve()
  })
}

const handleUploadResult = function (res) {
  const results = res instanceof Array ? res : [res]
  return results.map(x => ({
    ...x,
    url: this.$utils.getPureURL(x.url)
  }))
}

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
      const {
        uploadOptions,
        beforeUpload
      } = this

      const wash = beforeUpload || (_ => _)
      const unwashFiles = [].slice.call(rawFiles)
      const files = await this.$utils.forAwait(unwashFiles, wash)

      const error = await checkUploadFiles(files, uploadOptions)
      if (error) {
        return this.$message.error(error)
      }

      try {
        this.loading = true
        const uploadResult = await Promise
          .all(files.map(this.uploadFile))
          .then(data => handleUploadResult.bind(this)(data))
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
