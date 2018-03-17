export const initialState = {
  flashCards: [],
  activeCardId: '',
  currentFlashCards: [],
  previouslyDeletedCard: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_CARD':
      if (state.previouslyDeletedCard && state.previouslyDeletedCard.id === action.payload.id) {
        return state
      }
      const found = state.flashCards.filter(card => card.id === action.payload.id)
      const newCardList = !found.length
        ? (action.payload.title || action.payload.back.rawText || action.payload.front.rawText ? [...state.flashCards, action.payload] : state.flashCards)
        : state.flashCards.map(card => card.id === action.payload.id ? action.payload : card)
      return {
        ...state,
        flashCards: newCardList,
        activeCardId: action.payload.id,
        currentFlashCards: !found.length
          ? (action.payload.title || action.payload.back.rawText || action.payload.front.rawText ? [...state.currentFlashCards, action.payload] : state.flashCards)
          : state.currentFlashCards.map(card => card.id === action.payload.id ? action.payload : card)
      }
    case 'CHANGE_TAG':
      return {
        ...state,
        currentFlashCards: action.payload === 'all'
          ? state.flashCards
          : state.flashCards.filter(cards => cards.tags.some(tag => tag.name === action.payload))
      }
    case 'SWITCH_CARD':
      return {
        ...state,
        activeCardId: action.payload.id
      }
    case 'NEW_CARD':
      return {
        ...state,
        activeCardId: ''
      }
    case 'DELETE_CARD':
      return {
        ...state,
        previouslyDeletedCard: action.payload,
        activeCardId: state.activeCardId === action.payload.id ? '' : state.activeCardId,
        flashCards: state.flashCards.filter(card => card.id !== action.payload.id),
        currentFlashCards: state.currentFlashCards.filter(card => card.id !== action.payload.id)
      }
    default:
      return state
  }
}