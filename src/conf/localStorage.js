export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('etude-state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('etude-state', serializedState)
  } catch (err) {
    console.error('could not save state!')
  }
}