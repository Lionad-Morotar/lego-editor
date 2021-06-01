/**
 * 开发环境错误提示函数
 * @todo NODE_ENV
 */
const warn = (...args) => {
  console.warn('[WARN]', ...args)
}

export default {
  warn
}
