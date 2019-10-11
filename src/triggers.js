function anyAnswerTrigger(answer, value, formData) {
  return value.includes(formData[answer])
}

function noAnyAnswerTrigger(answer, value, formData) {
  return !anyAnswerTrigger(answer, value, formData)
}

export const triggerFns = {
  anyAnswerTrigger,
  noAnyAnswerTrigger
}

export function parseTrigger(triggers, formData) {
  if (!triggers) return true
  const result = triggers.every(trigger => {
    if (triggerFns[trigger.type]) {
      return triggerFns[trigger.type](trigger.answer, trigger.value, formData)
    }
    return true
  })
  return result
}
