import { HIDE_TOOLTIP, SHOW_TOOLTIP } from '../conf/ActionTypes'

// actions
export const openTooltip = (whichTooltip, element, position) => ({
  type: SHOW_TOOLTIP,
  payload: { whichTooltip, element, position }
})
export const closeTooltip = () => ({ type: HIDE_TOOLTIP })

// initial state
export const initialState = {
  whichTooltip: null,
  element: null,
  position: ''
}

// reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_TOOLTIP:
      return { ...action.payload }
    case HIDE_TOOLTIP:
      return {
        ...initialState
      }
    default:
      return state
  }
}
