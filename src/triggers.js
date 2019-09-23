function answerTrigger(answer, value, formData) {
  return value.includes(formData[answer])
}

export const triggerFns = {
  answerTrigger
}

export function parseTrigger(triggers, formData) {
  if (!triggers) return true
  const result = triggers.every(trigger => {
    return triggerFns[trigger.type](trigger.answer, trigger.value, formData)
  })
  return result
}
