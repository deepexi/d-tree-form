function anyAnswerTrigger(answer, value, formData) {
  return value.includes(formData[answer])
}

export const triggerFns = {
  anyAnswerTrigger
}

export function parseTrigger(triggers, formData) {
  if (!triggers) return true
  const result = triggers.every(trigger => {
    return triggerFns[trigger.type](trigger.answer, trigger.value, formData)
  })
  return result
}
