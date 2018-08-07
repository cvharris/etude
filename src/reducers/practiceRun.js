import {
  GRADE_CARD,
  PICK_NEXT_CARD,
  SET_CARD_DURATION,
  START_RUN
} from '../conf/ActionTypes'
import PracticeRun from '../lib/PracticeRun'

// Actions
export const startRun = run => ({ type: START_RUN, payload: run })
export const gradeCard = (cardId, grade) => ({
  type: GRADE_CARD,
  payload: { cardId, grade }
})
export const setCardDuration = (cardId, mss) => ({
  type: SET_CARD_DURATION,
  payload: { cardId, mss }
})
export const pickNextCard = cardId => ({
  type: PICK_NEXT_CARD,
  payload: cardId
})

// Initial State
export const initialState = new PracticeRun()

// Reducer
export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case START_RUN:
      return payload
    case SET_CARD_DURATION:
      return {
        ...state,
        unpracticedCardIds: state.unpracticedCardIds.filter(
          cardId => cardId !== payload.cardId
        ),
        durationByCardId: {
          ...state.durationByCardId,
          [payload.cardId]: payload.mss
        }
      }
    case GRADE_CARD:
      return {
        ...state,
        resultsByCardId: {
          ...state.resultsByCardId,
          [payload.cardId]: payload.grade
        }
      }
    case PICK_NEXT_CARD:
      return {
        ...state,
        cardIdsPracticeOrder: [...state.cardIdsPracticeOrder, payload]
      }
    default:
      return state
  }
}
