export const createDeck = newDeck => ({ type: 'ADD_DECK', payload: newDeck })
export const updateDeck = revisedDeck => ({
  type: 'UPDATE_DECK',
  payload: revisedDeck
})
export const removeDeck = removedDeck => ({
  type: 'DELETE_DECK',
  payload: removedDeck
})

export const initialState = {
  byId: {},
  allIds: []
}

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'ADD_DECK':
      return {
        byId: { ...state.byId, [payload.id]: payload },
        allIds: [...state.allIds, payload.id]
      }
    case 'DELETE_DECK':
      const { [payload.id]: deletedDeck, ...newState } = state.byId
      return {
        byId: newState,
        allIds: state.allIds.filter(cId => cId !== deletedDeck.id)
      }
    case 'UPDATE_DECK':
      return {
        ...state,
        byId: { ...state.byId, [payload.id]: payload }
      }
    default:
      return state
  }
}
