export const NONE = 'none'

// 映射脚手架的类型
const typeMap = {
  confirm: 'radio',
  list: 'select',
  input: 'input'
}

const formData = {}
const cliParamsFlattenData = {}
export function flatCliParams(cliParams, parentKey) {
  Object.keys(cliParams).forEach(key => {
    const value = cliParams[key]
    formData[key] = value.default
    cliParamsFlattenData[key] = value
    if (parentKey) {
      cliParamsFlattenData[key].parentKey = parentKey
    }
    const child = cliParams[key].child
    if (child) {
      return flatCliParams(child, key)
    }
  })
  return {
    formData,
    cliParamsFlattenData
  }
}

export function transform2TreeFormData(cliParams) {
  if (!cliParams) return null
  const treeForm = []
  Object.keys(cliParams).forEach(key => {
    const value = cliParams[key]
    const node = generateNode(cliParams, key, value)
    treeForm.push(node)
  })
  return treeForm
}

export function generateNode(parent, key, value) {
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
    rules: [{required: !!value.required, message: value.message}],
    trigger: value.trigger,
    children: value.child
      ? Object.keys(value.child)
          .map(key => {
            return generateNode(parent, key, value.child[key])
          })
          .filter(child => {
            return !child.trigger || !child.trigger.length
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
