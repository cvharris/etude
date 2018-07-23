import {
  CHANGE_DECK,
  DELETE_CARD,
  DELETE_DECK,
  NEW_CARD,
  RESTORE_CARD,
  SWITCH_CARD,
  UPDATE_CARD_BACK,
  UPDATE_CARD_DECK,
  UPDATE_CARD_FRONT,
  UPDATE_DIFFICULTY,
  UPDATE_NEED
} from '../conf/ActionTypes'
import Markdown from '../lib/markdown'

export const handleCardFrontUpdate = cardFront => ({
  type: UPDATE_CARD_FRONT,
  payload: cardFront
})
export const handleCardBackUpdate = cardBack => ({
  type: UPDATE_CARD_BACK,
  payload: cardBack
})
export const updateDeck = deckId => ({
  type: UPDATE_CARD_DECK,
  payload: deckId
})
export const updateDifficulty = difficulty => ({
  type: UPDATE_DIFFICULTY,
  payload: difficulty
})
export const updateNeed = need => ({ type: 'UPDATE_NEED', payload: need })

const md = new Markdown()
export const initialState = null

export default (state = initialState, action) => {
  const { type, payload } = action
  if (!state && ![NEW_CARD, SWITCH_CARD, RESTORE_CARD].includes(type)) {
    return state
  }
  switch (type) {
    case NEW_CARD:
      return Object.assign({}, payload)
    case SWITCH_CARD:
      return payload.isTrashed ? null : Object.assign({}, payload)
    case RESTORE_CARD:
      return Object.assign({}, payload)
    case UPDATE_CARD_DECK:
      return {
        ...state,
        deckId: payload
      }
    case UPDATE_DIFFICULTY:
      return {
        ...state,
        difficulty: payload
      }
    case UPDATE_NEED:
      return {
        ...state,
        studyNeed: payload
      }
    case UPDATE_CARD_BACK:
      return {
        ...state,
        back: {
          rawText: payload,
          renderedText: md.render(payload)
        }
      }
    case UPDATE_CARD_FRONT:
      return {
        ...state,
        front: {
          rawText: payload,
          renderedText: md.render(payload)
        }
      }
    case DELETE_CARD:
      return payload === state.id ? null : state
    case DELETE_DECK:
      return payload === state.deckId ? null : state
    case CHANGE_DECK:
      return null
    default:
      return state
  }
}
