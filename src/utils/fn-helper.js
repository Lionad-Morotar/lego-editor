/**
 * @file 常用工具函数
 */

/**
 * polyfill for "for await ... of"
 */
export async function forAwait (datas, cb, step = 1) {
  let i = -1
  const isArr = Array.isArray(datas)
  const ret = []
  async function handleNext () {
    i += step
    const res = isArr ? datas[i] : i
    ret.push(await cb(res))

    if (i < (isArr ? datas.length : datas)) {
      await handleNext()
    }
  }
  await handleNext()
  return ret
}
