import { createSelector } from 'reselect'
import { ADD_DECK, DELETE_DECK, UPDATE_DECK } from '../conf/ActionTypes'

export const createDeck = newDeck => ({ type: ADD_DECK, payload: newDeck })
export const updateDeck = revisedDeck => ({
  type: UPDATE_DECK,
  payload: revisedDeck
})
export const removeDeck = removedDeck => ({
  type: DELETE_DECK,
  payload: removedDeck
})

export const initialState = {
  byId: {},
  allIds: []
}

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case ADD_DECK:
      return {
        byId: { ...state.byId, [payload.id]: payload },
        allIds: [...state.allIds, payload.id]
      }
    case DELETE_DECK:
      const { [payload.id]: deletedDeck, ...newState } = state.byId
      return {
        byId: newState,
        allIds: state.allIds.filter(cId => cId !== deletedDeck.id)
      }
    case UPDATE_DECK:
      return {
        ...state,
        byId: { ...state.byId, [payload.id]: payload }
      }
    default:
      return state
  }
}

// Selectors
const allDecks = state =>
  state.decks.allIds.map(deckId => state.decks.byId[deckId])
const currentDeckId = state => state.sidebar.activeDeckId

export const getActiveDecks = createSelector([allDecks], decks =>
  decks.filter(deck => !deck.isTrashed)
)

export const getCurrentDeck = createSelector(
  [getActiveDecks, currentDeckId],
  decks => decks.find(deck => deck.id === currentDeckId)
)

export const getDecks = createSelector([getActiveDecks], decks => decks)

export const getDeckSelectList = createSelector([getActiveDecks], decks =>
  decks.map(deck => ({
    label: deck.name,
    value: deck.id
  }))
)
