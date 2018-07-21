export const switchDeck = deckId => ({ type: 'CHANGE_DECK', payload: deckId })

export const initialState = {
  activeDeckId: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_DECK':
      return { activeDeckId: action.payload }
    default:
      return state
  }
}
