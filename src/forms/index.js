import Example from './components/example'
import BaseText from './components/base-text'
import BaseTextarea from './components/base-textarea'
import BaseNumber from './components/base-number'
import BaseSlider from './components/base-slider'
import StyledText from './components/styled-text'
import StyledTextarea from './components/styled-textarea'
import StyledImage from './components/styled-image'
import Layout from './components/layout'

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
  Example,
  BaseText,
  BaseTextarea,
  BaseNumber,
  BaseSlider,
  StyledText,
  StyledTextarea,
  StyledImage,
  Layout
}
