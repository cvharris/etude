import { createSelector } from 'reselect'
import {
  ADD_DECK,
  DELETE_DECK,
  RESTORE_CARD,
  UPDATE_DECK
} from '../conf/ActionTypes'

export const createDeck = newDeck => ({ type: ADD_DECK, payload: newDeck })
export const updateDeck = revisedDeck => ({
  type: UPDATE_DECK,
  payload: revisedDeck
})
export const removeDeck = removedDeckId => ({
  type: DELETE_DECK,
  payload: removedDeckId
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
      return {
        allIds: [...state.allIds],
        byId: {
          ...state.byId,
          [payload]: { ...state.byId[payload], isTrashed: true }
        }
      }
    case UPDATE_DECK:
      return {
        ...state,
        byId: { ...state.byId, [payload.id]: payload }
      }
    case RESTORE_CARD:
      return {
        ...state,
        byId: {
          ...state.byId,
          [payload.deckId]: { ...state.byId[payload.deckId], isTrashed: false }
        }
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
