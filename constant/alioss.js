let accessKeyId
let accessKeySecret
try {
  accessKeyId = require('./private/lego-admin-access-key').default
  accessKeySecret = require('./private/lego-admin-access-secret').default
} catch (error) {
  exit()
}
if (!accessKeyId || !accessKeySecret) {
  exit()
}

function exit () {
  throw new Error('[ERR] 请配置上传组件所需要的阿里云 OSS Secrets')
}

export const config = {
  accessKeyId,
  accessKeySecret,
  bucket: 'lego-editor',
  region: 'oss-cn-shanghai'
  // endpoint: 'oss-accelerate.aliyuncs.com'
}
