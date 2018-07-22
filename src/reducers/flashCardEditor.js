import FlashCard from '../lib/FlashCard'
import Markdown from '../lib/markdown'

export const handleCardFrontUpdate = cardFront => ({
  type: 'UPDATE_CARD_FRONT',
  payload: cardFront
})
export const handleCardBackUpdate = cardBack => ({
  type: 'UPDATE_CARD_BACK',
  payload: cardBack
})
export const updateDeck = deckId => ({
  type: 'UPDATE_CARD_DECK',
  payload: deckId
})
export const updateDifficulty = difficulty => ({
  type: 'UPDATE_DIFFICULTY',
  payload: difficulty
})
export const updateNeed = need => ({ type: 'UPDATE_NEED', payload: need })

const md = new Markdown()
export const initialState = new FlashCard()

export default (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_CARD':
      return new FlashCard()
    case 'SWITCH_CARD':
      return { ...action.payload }
    case 'UPDATE_CARD_DECK':
      return {
        ...state,
        deckId: action.payload
      }
    case 'UPDATE_DIFFICULTY':
      return {
        ...state,
        difficulty: action.payload
      }
    case 'UPDATE_NEED':
      return {
        ...state,
        studyNeed: action.payload
      }
    case 'UPDATE_CARD_BACK':
      return {
        ...state,
        back: {
          rawText: action.payload,
          renderedText: md.render(action.payload)
        }
      }
    case 'UPDATE_CARD_FRONT':
      return {
        ...state,
        front: {
          rawText: action.payload,
          renderedText: md.render(action.payload)
        }
      }
    case 'DELETE_CARD':
      return action.payload.id === state.id ? new FlashCard() : state
    default:
      return state
  }
}
