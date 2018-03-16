export const initialState = {
  activeTag: 'all'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_TAG':
      return { activeTag: action.payload }
    default:
      return state
  }
}