import { CHANGE_DECK, DELETE_DECK } from '../conf/ActionTypes'

export const switchDeck = deckId => ({ type: 'CHANGE_DECK', payload: deckId })

export const initialState = {
  activeDeckId: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DECK:
      return { activeDeckId: action.payload }
    case DELETE_DECK:
      return { activeDeckId: '' }
    default:
      return state
  }
}
