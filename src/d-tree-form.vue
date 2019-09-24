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
              :disabled="disabled"
            >
            </el-input>
          </template>

          <template v-if="data.type === 'textarea'">
            <el-input
              type="textarea"
              resize="none"
              v-model="formData[data.prop]"
              v-bind="data.componentProps"
              :disabled="disabled"
            ></el-input>
          </template>

          <template v-if="data.type === 'select'">
            <el-select
              v-model="formData[data.prop]"
              v-bind="data.componentProps"
              @change="onSelectChange(data)"
              :disabled="disabled"
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
            <el-radio-group v-model="formData[data.prop]" :disabled="disabled">
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
import {
  transform2TreeFormData,
  transform2FlatCliParams,
  transform2FormData,
  generateNode,
  NONE
} from './util'
import {parseTrigger} from './triggers.js'
import {RadioGroup} from 'element-ui'

export default {
  name: 'DTreeForm',
  components: {
    HelperTips,
    [RadioGroup.name]: RadioGroup
  },
  props: {
    /**
     * 是否禁用所有的整个表单
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 用于已经有外部 formData 数据
     * 如果有值，则不会通过 cliParams 转化成 formData
     */
    formModelData: {
      type: Object,
      default() {
        return {}
      }
    },
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
    formModelData(val) {
      this.formData = val
    },
    cliParams: {
      // immediate: true,
      deep: true,
      handler(cliParams) {
        if (Object.keys(this.formModelData).length <= 0) {
          const formData = transform2FormData(cliParams)
          this.formData = formData
        }
        const cliParamsFlattenData = transform2FlatCliParams(cliParams)
        this.cliParamsFlattenData = cliParamsFlattenData
        const treeFormData = transform2TreeFormData(cliParams, this.formData)
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
      this.treeFormData.forEach(treeFormItem => {
        let children = []
        Object.keys(this.cliParamsFlattenData).forEach(key => {
          const cliParam = this.cliParamsFlattenData[key]
          const shouldShow = parseTrigger(cliParam.trigger, this.formData)
          if (shouldShow && treeFormItem.prop === cliParam.parentKey) {
            const childNode = generateNode(key, cliParam, this.formData)
            children.push(childNode)
          }
          treeFormItem.children = children
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
