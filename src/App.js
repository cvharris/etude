import React, { Component } from 'react'
import './App.css'
import FlashCardEditor from './containers/FlashCardEditor';
import Sidebar from './containers/Sidebar'
import FlashCardList from './containers/FlashCardList';

class App extends Component {

  render() {
    return (
      <div className="avenir flex items-stretch">
        <Sidebar />
        <FlashCardList />
        <FlashCardEditor />
      </div>
    )
  }
}

export default App
