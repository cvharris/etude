export const switchTag = tagName => ({ type: 'CHANGE_TAG', payload: tagName })
export const saveCard = (updatedCard, newCardList, currentCardList) => ({
  type: 'SAVE_CARD',
  payload: { updatedCard, newCardList, currentCardList }
})
export const switchCard = switchedCard => ({
  type: 'SWITCH_CARD',
  payload: switchedCard
})
export const deleteCard = deletedCard => ({
  type: 'DELETE_CARD',
  payload: deletedCard
})
export const newFlashCard = () => ({ type: 'NEW_CARD' })

export function cardSaved(updatedCard) {
  return (dispatch, getState) => {
    const { flashCardList: state } = getState()
    if (
      state.previouslyDeletedCard &&
      state.previouslyDeletedCard.id === updatedCard.id
    ) {
      return state
    }

    const found = state.flashCards.filter(card => card.id === updatedCard.id)
    const newCardList = !found.length
      ? updatedCard.title ||
        updatedCard.back.rawText ||
        updatedCard.front.rawText
        ? [...state.flashCards, updatedCard]
        : state.flashCards
      : state.flashCards.map(
          card => (card.id === updatedCard.id ? updatedCard : card)
        )

    const currentCardList = !found.length
      ? updatedCard.title ||
        updatedCard.back.rawText ||
        updatedCard.front.rawText
        ? [...state.currentFlashCards, updatedCard]
        : state.flashCards
      : state.currentFlashCards.map(
          card => (card.id === updatedCard.id ? updatedCard : card)
        )
    dispatch(saveCard(updatedCard, newCardList, currentCardList))
  }
}
