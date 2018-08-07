import 'katex/dist/katex.min.css'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import { loadState } from './conf/localStorage'
import configureStore from './conf/store'
import Etude from './containers/Etude'
import './fonts.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isStoreLoading: true,
      store: null
    }
  }

  componentDidMount() {
    const persistedState = loadState()
    this.setState({
      store: configureStore(persistedState),
      isStoreLoading: false
    })
  }

  render() {
    const { isStoreLoading, store } = this.state

    if (isStoreLoading) {
      return <div>Loading...</div>
    }

    return (
      <Provider store={store}>
        <Etude />
      </Provider>
    )
  }
}

export default App
