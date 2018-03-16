export const initialState = {
  flashCards: [],
  activeCardId: '',
  currentFlashCards: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_CARD':
      const found = state.flashCards.filter(card => card.id === action.payload.id)
      const newCardList = !found.length
        ? [...state.flashCards, action.payload]
        : state.flashCards.map(card => card.id === action.payload.id ? action.payload : card)
      return {
        ...state,
        flashCards: newCardList,
        activeCardId: action.payload.id,
        currentFlashCards: !found.length
          ? [...state.currentFlashCards, action.payload]
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
    default:
      return state
  }
}