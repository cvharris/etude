export const initialState = {
  flashCards: [],
  activeCardId: '',
  currentFlashCards: [],
  previouslyDeletedCard: null
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'SAVE_CARD':
      return {
        ...state,
        flashCards: payload.newCardList,
        activeCardId: payload.updatedCard.id,
        currentFlashCards: payload.currentCardList
      }
    case 'CHANGE_TAG':
      return {
        ...state,
        currentFlashCards:
          payload === 'all'
            ? state.flashCards
            : state.flashCards.filter(cards =>
                cards.tags.some(tag => tag.name === payload)
              )
      }
    case 'SWITCH_CARD':
      return {
        ...state,
        activeCardId: payload.id
      }
    case 'NEW_CARD':
      return {
        ...state,
        activeCardId: ''
      }
    case 'DELETE_CARD':
      return {
        ...state,
        previouslyDeletedCard: payload,
        activeCardId:
          state.activeCardId === payload.id ? '' : state.activeCardId,
        flashCards: state.flashCards.filter(card => card.id !== payload.id),
        currentFlashCards: state.currentFlashCards.filter(
          card => card.id !== payload.id
        )
      }
    default:
      return state
  }
}
