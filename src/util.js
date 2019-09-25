import {parseTrigger} from './triggers.js'
export const NONE = 'none'

// 映射脚手架的类型
const typeMap = {
  confirm: 'radio',
  list: 'select',
  input: 'input'
}

function goTransform2FlatCliParams(cliParams, cliParamsFlattenData, parentKey) {
  Object.keys(cliParams).forEach(key => {
    const value = cliParams[key]
    cliParamsFlattenData[key] = value
    if (parentKey) {
      cliParamsFlattenData[key].parentKey = parentKey
    }
    const child = cliParams[key].child
    if (child) {
      return goTransform2FlatCliParams(child, cliParamsFlattenData, key)
    }
  })
}
export function transform2FlatCliParams(cliParams) {
  const cliParamsFlattenData = {}
  goTransform2FlatCliParams(cliParams, cliParamsFlattenData)
  return cliParamsFlattenData
}

function goTransform2FormData(cliParams, formData) {
  Object.keys(cliParams).forEach(key => {
    const value = cliParams[key]
    formData[key] = value.default
    const child = cliParams[key].child
    if (child) {
      return goTransform2FormData(child, formData)
    }
  })
}

export function transform2FormData(cliParams) {
  const formData = {}
  goTransform2FormData(cliParams, formData)
  return formData
}

export function transform2TreeFormData(cliParams, formData) {
  if (!cliParams) return null
  const treeForm = []
  Object.keys(cliParams).forEach(key => {
    const value = cliParams[key]
    const node = generateNode(key, value, formData)
    treeForm.push(node)
  })
  return treeForm
}

export function generateNode(key, value, formData) {
  return {
    prop: key,
    label: key,
    type: typeMap[value.type],
    options: generateSelectOptions(value.child, value.choices),
    value: value.default,
    tooltips: value.tips,
    componentProps: {
      placeholder: value.message
    },
    rules: [{required: !!value.require, message: value.message}],
    trigger: value.trigger,
    children: value.child
      ? Object.keys(value.child)
          .map(key => {
            return generateNode(key, value.child[key])
          })
          .filter(child => {
            return parseTrigger(child.trigger, formData)
          })
      : []
  }
}

function generateSelectOptions(child, choices) {
  if (!choices) return null

  return choices.map(choice => {
    return {
      label: choice,
      value: choice
    }
  })
}
