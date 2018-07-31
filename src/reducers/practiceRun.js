import { START_RUN } from '../conf/ActionTypes'
import PracticeRun from '../lib/PracticeRun'

export const initialState = new PracticeRun()

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case START_RUN:
      return payload
    default:
      return state
  }
}
