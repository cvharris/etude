export const switchTag = (tagName) => ({ type: 'CHANGE_TAG', payload: tagName })
export const saveCard = (updatedCard) => ({ type: 'SAVE_CARD', payload: updatedCard })
export const switchCard = (switchedCard) => ({ type: 'SWITCH_CARD', payload: switchedCard })
export const newFlashCard = () => ({ type: 'NEW_CARD' })