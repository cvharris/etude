import React, { Component } from 'react'
import CardBack from '../components/CardBack'
import CardFront from '../components/CardFront';
import markdownit from 'markdown-it';

const md = new markdownit()

class FlashCardEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      front: {
        rawText: '',
        rendered: ''
      },
      back: {
        rawText: '',
        rendered: ''
      }
    }
  }

  onTextChange = (key, rawText) => {
    const newState = {
      ...this.state, [key]: {
        rawText: rawText,
        rendered: md.render(rawText)
      }
    }
    this.setState(newState)
  }

  render() {
    return (
      <div className="app-background flex-auto mh3">
        <CardBack side="back" rawText={this.state.back.rawText} handleUpdate={this.onTextChange} renderedText={this.state.back.rendered} />
        <CardFront side="front" rawText={this.state.front.rawText} handleUpdate={this.onTextChange} renderedText={this.state.front.rendered} />
      </div>
    )
  }
}

export default FlashCardEditor