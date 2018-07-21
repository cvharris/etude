import FlashCard from '../lib/FlashCard'
import Markdown from '../lib/markdown'

const md = new Markdown()
export const initialState = new FlashCard()

export default (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_CARD':
      return new FlashCard()
    case 'SWITCH_CARD':
      return action.payload
    case 'UPDATE_CARD_TITLE':
      return {
        ...state,
        title: action.payload
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
