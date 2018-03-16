import React, { Component } from 'react'
import './App.css'
import { Provider } from 'react-redux';
import configureStore from './conf/store';
import Etude from './containers/Etude';
import { loadState } from './conf/localStorage';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isStoreLoading: true,
      store: null,
    }
  }

  componentWillMount() {
    const persistedState = loadState()
    console.log(persistedState)
    this.setState({
      store: configureStore(persistedState),
      isStoreLoading: false,
    })
  }

  render() {
    if (this.state.isStoreLoading) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <Provider store={this.state.store}>
        <Etude />
      </Provider>
    )
  }
}

export default App
