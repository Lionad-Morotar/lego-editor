/**
 * @file 常用工具函数
 */

/**
 * polyfill for "for await ... of"
 */
async function forAwait (datas, cb) {
  let i = -1
  const isArr = Array.isArray(datas)
  const len = isArr ? datas.length : datas
  const ret = []
  async function handleNext () {
    if (len > 0 && ++i < len) {
      const res = isArr ? datas[i] : i
      ret.push(await cb(res))

      await handleNext()
    }
  }
  await handleNext()
  return ret
}

/**
 * base64 string to binary arrays
 * @param {String} base64
 * @returns { u8arr: Arrays, mime: String }
 */
export const base64ToBin = base64 => {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return {
    u8arr,
    mime
  }
}

/**
 * get url string without 'https:' or 'http:' prefix
 */
export const getPureURL = (url = '') => {
  const parts = url.split(/https?:/)
  return parts[1] || parts[0]
}

/**
 * shadow clone
 */
export function clonevalue (obj) {
  if (obj instanceof Object) {
    if (obj instanceof Array) {
      return obj.map(x => clonevalue(x))
    } else {
      const res = {}
      Object.entries(obj).map(([k, v]) => {
        res[k] = clonevalue(v)
      })
      return res
    }
  }
  return obj
}

export default {
  forAwait,
  base64ToBin,
  getPureURL,
  clonevalue
}
