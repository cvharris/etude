import React, { Component } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import { loadState } from './conf/localStorage'
import configureStore from './conf/store'
import Etude from './containers/Etude'

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
    if (this.state.isStoreLoading) {
      return <div>Loading...</div>
    }

    return (
      <Provider store={this.state.store}>
        <Etude />
      </Provider>
    )
  }
}

export default App
