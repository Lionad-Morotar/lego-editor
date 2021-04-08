export const config = {
  accessKeyId: require('./private/lego-admin-access-key').default,
  accessKeySecret: require('./private/lego-admin-access-secret').default,
  bucket: 'lego-editor',
  region: 'oss-cn-shanghai'
  // endpoint: 'oss-accelerate.aliyuncs.com'
}
