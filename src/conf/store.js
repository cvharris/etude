import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import throttle from 'lodash/throttle'
import flashCardEditor from '../reducers/flashCardEditor';
import flashCardList from '../reducers/flashCardList';
import sidebar from '../reducers/sidebar';
import { saveState } from './localStorage'

const configureStore = (persistedState) => {
  const store = createStore(combineReducers({
    flashCardEditor,
    flashCardList,
    sidebar,
  }), persistedState, composeWithDevTools())

  store.subscribe(throttle(() => {
    saveState({
      flashCardList: store.getState().flashCardList
    })
  }, 1000))

  return store
}

export default configureStore
