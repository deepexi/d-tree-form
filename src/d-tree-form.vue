<template>
  <el-form
    ref="dTreeForm"
    :model="formData"
    class="d-tree-form"
    :style="styles"
    v-bind="formProps"
  >
    <el-tree
      v-show="treeFormData.length"
      :data="treeFormData"
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
            <el-input
              v-model="formData[data.prop]"
              v-bind="data.componentProps"
            >
            </el-input>
          </template>

          <template v-if="data.type === 'textarea'">
            <el-input
              type="textarea"
              resize="none"
              v-model="formData[data.prop]"
              v-bind="data.componentProps"
            ></el-input>
          </template>

          <template v-if="data.type === 'select'">
            <el-select
              v-model="formData[data.prop]"
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
            <el-radio-group v-model="formData[data.prop]">
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
import {flatCliParams, transform2TreeFormData, generateNode, NONE} from './util'
import {parseTrigger} from './triggers.js'

export default {
  name: 'DTreeForm',
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
      formData: {},
      cliParamsFlattenData: {},
      treeFormData: []
    }
  },
  watch: {
    cliParams: {
      immediate: true,
      deep: true,
      handler(val) {
        const {formData, cliParamsFlattenData} = flatCliParams(val)
        const treeFormData = transform2TreeFormData(val)
        this.formData = formData
        this.cliParamsFlattenData = cliParamsFlattenData
        this.treeFormData = treeFormData
      }
    }
  },
  methods: {
    getFlatFormData() {
      const cloneFormData = JSON.parse(JSON.stringify(this.formData))
      Object.keys(cloneFormData).forEach(key => {
        const parent = this.cliParamsFlattenData[key]
        const parentKey = parent.parentKey
        const parentValue = cloneFormData[parentKey]
        if (!parseTrigger(parent.trigger, cloneFormData)) {
          delete cloneFormData[key]
        }
      })
      return cloneFormData
    },
    onSelectChange(data) {
      const formDataValue = this.formData[data.prop]
      let children = []
      Object.keys(this.cliParamsFlattenData).forEach(key => {
        const param = this.cliParamsFlattenData[key]
        const shouldShow = parseTrigger(param.trigger, this.formData)
        this.treeFormData.forEach(treeFormItem => {
          if (shouldShow && treeFormItem.prop === param.parentKey) {
            if (!treeFormItem.children) {
              this.$set(treeFormItem, 'children', [])
            }
            const childNode = generateNode({}, key, param)
            children.push(childNode)
            treeFormItem.children = children
          }
        })
      })
    }
  }
}
</script>

<style lang="less">
.d-tree-form {
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
