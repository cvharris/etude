import throttle from 'lodash/throttle'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import decks from '../reducers/decks'
import flashCardEditor from '../reducers/flashCardEditor'
import flashCards from '../reducers/flashCards'
import nav from '../reducers/nav'
import practiceRun from '../reducers/practiceRun'
import practiceRuns from '../reducers/practiceRuns'
import sidebar from '../reducers/sidebar'
import tooltips from '../reducers/tooltips'
import { saveState } from './localStorage'

const configureStore = persistedState => {
  const store = createStore(
    combineReducers({
      flashCardEditor,
      flashCards,
      sidebar,
      decks,
      practiceRun,
      practiceRuns,
      tooltips,
      nav
    }),
    persistedState,
    composeWithDevTools(applyMiddleware(thunk))
  )

  store.subscribe(
    throttle(() => {
      const state = store.getState()
      saveState({
        flashCardEditor: state.flashCardEditor,
        sidebar: state.sidebar,
        decks: state.decks,
        flashCards: state.flashCards,
        practiceRuns: state.practiceRuns
      })
    }, 1000)
  )

  return store
}

export default configureStore
