import React, { Component } from 'react'
import './App.css'
import { Provider } from 'react-redux';
import configureStore from './conf/store';
import Etude from './containers/Etude';

const store = configureStore({})

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Etude />
      </Provider>
    )
  }
}

export default App
