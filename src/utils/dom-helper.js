/**
 * 根据类(HTML Tag Classname)找到父元素
 */
const findParentByClass = ($ele, classname) => {
  let target = $ele
  while (target && target.parentElement) {
    target = target.parentElement
    const isTarget = [...(target.classList || [])].includes(classname)
    if (isTarget) {
      return target
    }
  }
  return null
}

export default {
  findParentByClass
}
