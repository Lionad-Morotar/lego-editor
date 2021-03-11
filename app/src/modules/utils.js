/**
 * 将多个组件压缩为单个组件
 */
export function zip (...components) {
  return {
    functional: true,
    render (h, context) {
      // 单个组件接收到的所有属性等内容会同时分发到多个组件
      return h('fragment', {}, components.map(x => h(x, context.data)))
    }
  }
}
