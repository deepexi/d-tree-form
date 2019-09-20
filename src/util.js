const NONE = 'none'

// 映射脚手架的类型
const typeMap = {
  confirm: 'radio',
  list: 'select',
  input: 'input'
}

function anyAnswerTrigger(answer, value) {
  return value.includes(answer)
}

const triggerFns = {
  anyAnswerTrigger
}

function parseTrigger(triggers) {
  if (!triggers) return true
  const results = triggers.map(trigger => {
    return triggerFns[trigger.type](trigger.answer, trigger.value)
  })
  return !results.includes(false)
}

function generateSelectOptions(child, choices) {
  if (!choices) return null

  return choices.map(choice => {
    return {
      label: choice,
      value: choice,
      childNodes: choice !== NONE ? transform2FormData(child) : null
    }
  })
}

function generateNode(parent, key, value) {
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
    rules: [{required: !!value.required, message: value.message}]
  }
}

export function transform2FormData(cliParams) {
  if (!cliParams) return null
  const dynamicForm = []
  Object.keys(cliParams).forEach(key => {
    const value = cliParams[key]
    const shouldHasChild = parseTrigger(value.trigger)
    if (!shouldHasChild) {
      delete cliParams[key]
      return
    }
    const node = generateNode(cliParams, key, value)
    dynamicForm.push(node)
  })
  return dynamicForm
}

export function flat(sourceForm, formObj) {
  sourceForm.forEach(({prop, value, children}) => {
    if (children && children.length) {
      flat(children, formObj)
    }
    formObj[prop] = value
  })
  return formObj
}
