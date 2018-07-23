import throttle from 'lodash/throttle'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import decks from '../reducers/decks'
import flashCardEditor from '../reducers/flashCardEditor'
import flashCards from '../reducers/flashCards'
import sidebar from '../reducers/sidebar'
import { saveState } from './localStorage'

const configureStore = persistedState => {
  const store = createStore(
    combineReducers({
      flashCardEditor,
      flashCards,
      sidebar,
      decks
    }),
    persistedState,
    composeWithDevTools(applyMiddleware(thunk))
  )

  store.subscribe(
    throttle(() => {
      saveState({
        flashCardEditor: store.getState().flashCardEditor,
        sidebar: store.getState().sidebar,
        decks: store.getState().decks,
        flashCards: store.getState().flashCards
      })
    }, 1000)
  )

  return store
}

export default configureStore
