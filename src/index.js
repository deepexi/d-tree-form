// Import vue component
import Component from './d-tree-form.vue'
import {
  Form,
  Tree,
  Input,
  Radio,
  Select,
  FormItem,
  Option,
  RadioGroup,
  Tooltip
} from 'element-ui'

// install function executed by Vue.use()
export function install(Vue) {
  if (install.installed) return
  install.installed = true
  Vue.use(Form)
  Vue.use(Tree)
  Vue.use(Input)
  Vue.use(Radio)
  Vue.use(Select)
  Vue.use(FormItem)
  Vue.use(Option)
  Vue.use(RadioGroup)
  Vue.use(Tooltip)
  Vue.component('DTreeForm', Component)
}

// Create module definition for Vue.use()
const plugin = {
  install
}

// To auto-install when vue is found
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

// To allow use as module (npm/webpack/etc.) export component
export default Component

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
