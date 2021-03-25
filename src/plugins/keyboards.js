/**
 * 1. import KeyboardListener from '@/plugins/keyboards'
 * 2. Vue.use(KeyboardListener)
 * 3. Vue.prototype.keyboards.watch('ctrl+s', callback)
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
const getKeyRemap = k => remaps[k]

/* Init */

const $body = document &&
  document.querySelector &&
  document.querySelector('body')
if ($body) {
  // TODO clean
  $body.addEventListener('keydown', keydown)
  $body.addEventListener('keyup', keyup)
}

// 若是组合按键，会被拆分成单个按键存入
const unTrigger = {}
// 储存回调函数
const callbacks = {}

// eslint-disable-next-line no-prototype-builtins
const inList = k => unTrigger.hasOwnProperty(k)
const curTriggered = () => Object.entries(unTrigger).reduce((h, [k, v]) => h.concat(v ? [k] : []), [])
const getCombines = () => curTriggered().join('+')
const record = k => (unTrigger[k] = true)
const clear = k => (unTrigger[k] = false)

function keydown (e) {
  console.log(e.key)
  if (inList(e.key)) {
    record(e.key)
    const curKeys = getCombines()
    if (callbacks[curKeys]) {
      e.preventDefault()
      callbacks[curKeys]()
    }
  }
}

function keyup (e) {
  if (inList(e.key)) {
    clear(e.key)
    e.preventDefault()
  }
}

function watch (keys, callback) {
  const joinKey = '+'
  const remapedKeys = keys instanceof Array
    ? keys.map(x => getKeyRemap(x) || x)
    : keys.split(joinKey).map(x => getKeyRemap(x) || x)
  remapedKeys.map(k => (unTrigger[k] = false))
  callbacks[remapedKeys.join(joinKey)] = callback
}

/* Install */

export default {
  install (vue) {
    vue.prototype.$keyboards = {
      callbacks,
      watch
    }
  }
}
