// todo refactor
// Vue.prototype.$utils = Object.assign(
//   Vue.prototype.$utils || {},
//   {
//     keys (...args) {
//       return args.reduce((h, c) => {
//         switch (typeof c) {
//           case 'string': return h + c
//           case 'object': return h + Vue.prototype.$utils.values(c)
//           default: throw new Error('todo refactor')
//         }
//       }, '')
//     }
//   }
// )

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

/**
 * 透传参数的高阶组件
 */
export function pass (component, passed = {}) {
  return {
    functional: true,
    render (h, context) {
      const props = { ...context.data.props, ...passed }
      return h(component, { ...context.data, props })
    }
  }
}
