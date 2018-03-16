import FlashCard from "../lib/FlashCard"
import { md } from '../lib/markdown'

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
    default:
      return state
  }
}