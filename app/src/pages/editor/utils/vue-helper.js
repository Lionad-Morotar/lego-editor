/**
 * 判断 B 是否是 A 的子组件
 * @param {VueInstance} parent
 * @param {VueInstance} toFind
 */
const contains = (parent, toFind) => {
  function findMatch (target) {
    const targets = target instanceof Array ? target : [target]
    const isFind = targets.find(x => x === toFind)
    if (isFind) {
      return true
    }
    if (target.$children) {
      return findMatch(target.$children)
    }
    return false
  }
  return findMatch(parent.$children)
}

export default {
  contains
}
