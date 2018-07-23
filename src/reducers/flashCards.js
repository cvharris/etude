import { createSelector } from 'reselect'
import {
  ADD_CARD,
  CHANGE_DECK,
  DELETE_CARD,
  DELETE_DECK,
  NEW_CARD,
  RESTORE_CARD,
  SAVE_CARD,
  SWITCH_CARD
} from '../conf/ActionTypes'

// Actions
export const createCard = newCard => ({ type: ADD_CARD, payload: newCard })
export const saveCard = updatedCard => ({
  type: SAVE_CARD,
  payload: updatedCard
})
export const switchCard = switchedCard => ({
  type: SWITCH_CARD,
  payload: switchedCard
})
export const deleteCard = deletedCardId => ({
  type: DELETE_CARD,
  payload: deletedCardId
})
export const newFlashCard = newFlashCard => ({
  type: NEW_CARD,
  payload: newFlashCard
})
export const restoreCard = restoredCardId => ({
  type: RESTORE_CARD,
  payload: restoredCardId
})

// Initial State
export const initialState = {
  byId: {},
  allIds: [],
  activeCardId: ''
}

// Reducer
export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ADD_CARD:
      return {
        byId: { ...state.byId, [payload.id]: Object.assign({}, payload) },
        allIds: [...state.allIds, payload.id],
        activeCardId: payload.id
      }
    case SAVE_CARD:
      return {
        ...state,
        byId: { ...state.byId, [payload.id]: Object.assign({}, payload) }
      }
    case SWITCH_CARD:
      return {
        ...state,
        activeCardId: payload.id
      }
    case CHANGE_DECK:
    case NEW_CARD:
      return {
        ...state,
        activeCardId: ''
      }
    case DELETE_CARD:
      return {
        ...state,
        allIds: [...state.allIds],
        byId: Object.assign({}, state.byId, {
          [payload]: Object.assign({}, state.byId[payload], {
            isTrashed: true
          })
        })
      }
    case DELETE_DECK:
      return {
        ...state,
        allIds: [...state.allIds],
        byId: Object.keys(state.byId)
          .map(cardId => {
            const card = state.byId[cardId]
            return card.deckId === payload ? { ...card, isTrashed: true } : card
          })
          .reduce((newMap, card) => {
            newMap[card.id] = card
            return newMap
          }, {})
      }
    case RESTORE_CARD:
      return {
        activeCardId: payload.id,
        allIds: [...state.allIds],
        byId: {
          ...state.byId,
          [payload.id]: {
            ...state.byId[payload.id],
            isTrashed: false
          }
        }
      }
    default:
      return state
  }
}

// Selectors
const flashCardsById = state => state.flashCards.byId
const allFlashCardIds = state => state.flashCards.allIds
const activeDeckId = state => state.sidebar.activeDeckId

export const getActiveCards = createSelector(
  [allFlashCardIds, flashCardsById],
  (allIds, byId) =>
    allIds.map(cardId => byId[cardId]).filter(card => !card.isTrashed)
)

export const getDecksCards = createSelector(
  [getActiveCards, activeDeckId],
  (activeCards, deckId) => activeCards.filter(card => card.deckId === deckId)
)

export const getDecksCardsLength = createSelector(
  [getDecksCards],
  deckCards => deckCards.length
)

export const getTrashedCards = createSelector(
  [allFlashCardIds, flashCardsById],
  (allIds, byId) =>
    allIds.map(cardId => byId[cardId]).filter(card => card.isTrashed)
)
