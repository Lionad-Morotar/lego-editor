/**
 * how to use
 * 1. import KeyboardListener from '@/plugins/keyboards'
 * 2. Vue.use(KeyboardListener)
 * 3. this.$keyboards.watch('ctrl+s', yourCallback)
 * @todo watch scope
 * @todo page visibible change
 * @fix order
 */

const simpRemoveDump = arrs => [...new Set(arrs)]
const remaps = Object.entries({
  Control: ['Control', 'Ctrl', 'Cmd'],
  Tab: ['Tab'],
  Alt: ['Alternate', 'Alt'],
  Shift: ['Shift'],
  CapsLock: ['CapsLock', 'Caps', 'Lock'],
  Escape: ['Escape', 'Esc'],
  Delete: ['Delete', 'Del'],
  Enter: ['Enter', 'Go'],
  ArrowUp: ['ArrowUp', 'Up'],
  ArrowDown: ['ArrowDown', 'Down'],
  ArrowLeft: ['ArrowLeft', 'Left'],
  ArrowRight: ['ArrowRight', 'Right']
}).reduce((h, [k, v]) => {
  simpRemoveDump(
    v.concat(v.map(x => x.toLowerCase()))
  ).map(nk => (h[nk] = k))
  return h
}, {})
const stdKeyName = k => remaps[k]

/* Init */

const $body = document &&
  document.querySelector &&
  document.querySelector('body')
if ($body) {
  // TODO clean
  $body.addEventListener('keydown', keydown)
  $body.addEventListener('keyup', keyup)
}

// 若是组合按键，会被拆分成单个按键存入，缓存以提高性能
const unTrigger = {}
// 储存回调函数
let callbacks = []

// eslint-disable-next-line no-prototype-builtins
const inList = k => unTrigger.hasOwnProperty(k)
const curTriggered = () => Object.entries(unTrigger).reduce((h, [k, v]) => h.concat(v ? [k] : []), [])
const getCombines = () => curTriggered().join('+')
const record = k => (unTrigger[k] = (unTrigger[k] || 0) + 1)
const clear = k => (unTrigger[k] = unTrigger[k] - 1)

function keydown (e) {
  if (inList(e.key)) {
    record(e.key)
    const curKeys = getCombines()
    const callback = callbacks.find(x => x._keyboards_keys === curKeys)
    if (callback) {
      e.preventDefault()
      e.stopPropagation()
      callback()
    }
  }
}

function keyup (e) {
  if (inList(e.key)) {
    clear(e.key)
    e.preventDefault()
  }
}

const getKeys = keys => {
  const joinKey = '+'
  const washedKeys = keys instanceof Array
    ? keys.map(x => stdKeyName(x) || x)
    : keys.split(joinKey).map(x => stdKeyName(x) || x)
  washedKeys.map(k => (unTrigger[k] = unTrigger[k] || 0))
  return washedKeys.join(joinKey)
}

function watch (keys, callback) {
  const washedKeys = getKeys(keys)
  callback._keyboards_keys = washedKeys
  callbacks.push(callback)
}

function unwatch (keys, callback) {
  const washedKeys = getKeys(keys)
  const find = callbacks.find(x => x._keyboards_keys === washedKeys)
  if (find) {
    if (callback) {
      if (callback === find) {
        callbacks = callbacks.filter(x => x !== find)
      }
    } else {
      callbacks = callbacks.filter(x => x !== find)
    }
  }
}

/* Install */

export default {
  install (vue) {
    vue.prototype.$keyboards = {
      callbacks,
      watch,
      unwatch
    }
  }
}
