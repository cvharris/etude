import { SWITCH_VIEW } from '../conf/ActionTypes'

export const switchView = view => ({ type: SWITCH_VIEW, payload: view })

export const initialState = {
  currentView: 'cards' // 'runner'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_VIEW:
      return { currentView: action.payload }
    default:
      return state
  }
}
