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

/**
 * 找到某一个符合条件子元素
 */
const findChild = ($ele, condFn) => {
  const $toFinds = $ele instanceof Array ? $ele : [$ele]
  let $next
  $toFinds.push(...[...($ele.children || [])])
  while (($next = $toFinds.shift(), $next)) {
    if (condFn($next)) {
      return $next
    } else {
      $toFinds.push(...($next.children || []))
    }
  }
}

/**
 * 视窗滚动到某元素
 */
const scrollIntoView = ($el) => {
  if ($el.scrollIntoViewIfNeeded) {
    $el.scrollIntoViewIfNeeded()
  } else if ($el.scrollIntoView) {
    $el.scrollIntoView()
  } else {
    // noop
  }
}

export default {
  findParentByClass,
  findChild,
  scrollIntoView
}
