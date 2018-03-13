import React, { Component } from 'react'
import marked from 'marked'
import './App.css'
import CardBack from './components/CardBack'
import CardFront from './components/CardFront';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rawText: '',
      rendered: ''
    }
  }

  onTextChange = (rawText) => {
    this.setState({
      rawText: rawText,
      rendered: marked(rawText)
    })
  }

  render() {
    return (
      <div className="side-by-side">
        <CardBack rawText={this.state.rawText} handleUpdate={this.onTextChange} />
        <CardFront renderedText={this.state.rendered} />
      </div>
    )
  }
}

export default App
