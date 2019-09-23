<template>
  <el-form
    ref="dForm"
    :model="flatFormValue"
    class="d-form"
    :style="styles"
    v-bind="formProps"
  >
    <el-tree
      v-show="formData.length"
      :data="formData"
      :default-expand-all="true"
      v-bind="treeProps"
    >
      <div slot-scope="{node, data}">
        <el-form-item
          :prop="data.prop"
          :rules="data.rules"
          :label-width="data.labelWidth"
        >
          <span slot="label" class="label-wrap">
            {{ data.label }}
            <helper-tips
              v-if="data.tooltips"
              :content="data.tooltips"
              class="helper-tips"
            ></helper-tips>
          </span>
          <template v-if="data.type === 'input'">
            <el-input v-model="data.value" v-bind="data.componentProps">
            </el-input>
          </template>

          <template v-if="data.type === 'textarea'">
            <el-input
              type="textarea"
              resize="none"
              v-model="data.value"
              v-bind="data.componentProps"
            ></el-input>
          </template>

          <template v-if="data.type === 'select'">
            <el-select
              v-model="data.value"
              v-bind="data.componentProps"
              @change="onSelectChange(data)"
            >
              <el-option
                v-for="item in data.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>

          <template v-if="data.type === 'radio'">
            <el-radio-group v-model="data.value">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
      </div>
    </el-tree>
  </el-form>
</template>

<script>
import HelperTips from './components/tips.vue'
import {transform2FormData, flat} from './util'

export default {
  name: 'DForm',
  components: {
    HelperTips
  },
  props: {
    /**
     * 作用于 el-form 的 prop，参考
     * @see https://element.eleme.cn/#/zh-CN/component/form
     */
    formProps: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * 作用于 el-tree 的 prop，参考
     * @see https://element.eleme.cn/#/zh-CN/component/tree
     */
    treeProps: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * 作用于 el-form 的 style
     */
    styles: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * 脚手架参数 json
     */
    cliParams: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      formData: []
    }
  },
  watch: {
    cliParams: {
      immediate: true,
      handler(val) {
        this.formData = (val && transform2FormData(val)) || []
      }
    }
  },
  computed: {
    /**
     * @computed 扁平化的表单数据
     */
    flatFormValue() {
      return flat(this.formData, {})
    }
  },
  methods: {
    onSelectChange(data) {
      let {value, children, options} = data
      let currentOption = options.filter(option => {
        return option.value === value
      })

      const childNodes = currentOption.length
        ? currentOption[0].childNodes
        : null

      if (!children) {
        this.$set(data, 'children', [])
      }

      if (childNodes && childNodes.length) {
        if (data.children.length) {
          return
        }
        data.children = [...JSON.parse(JSON.stringify(childNodes))]
      } else {
        data.children = []
      }
    }
  }
}
</script>

<style lang="less">
.d-form {
  .el-tree-node__content {
    height: 60px;

    > .el-tree-node__expand-icon {
      margin-right: -24px;
      margin-top: -24px;
    }

    > div {
      width: 100%;
    }
  }

  .el-tree-node__content:hover {
    background-color: transparent;
  }

  .el-form-item__content {
    > div {
      width: 100%;
    }
  }

  .label-wrap {
    display: inline-block;
  }
}
</style>
