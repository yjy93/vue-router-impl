/**
 * @author: Gene
 * @age: 永远18岁的美少年
 * @Email： Genejob@163.com
 * @date: 2020-10-31 20:45:18
 * @description: router-link 组件
 */
export default {
  name: 'router-link',
  props: {
    to: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    }
  },
  render(h) {// 组件渲染方法
    let tag = this.tag;
    return <tag onClick={() => {
      this.$router.push(this.to)
    }}>{this.$slots.default}</tag>
    // return h(this.tag, {}, this.$slots.default);
  }
}
