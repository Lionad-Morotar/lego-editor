import Text from './components/text'
import Image from './components/image'

/**
 * 约定
 * ***
 * 1.组件接受 value 作为默认值（需做好防空处理）
 * 2.组件可向外触发改变 props 或改变 style 两种事件，
 * 分别对应修改模块的依赖数据的值和样式，
 * @example
 * this.$emit('change', 'new value')
 * @todo ？？this.$emit('changeProps', { key: value })
 * @todo ？？this.$emit('changeStyles', { key: value })
 */

export default {
  Text,
  Image,
}
