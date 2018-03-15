import React, { Component } from 'react'
import CardBack from '../components/CardBack'
import CardFront from '../components/CardFront';
import markdownit from 'markdown-it';
import FlashCard from '../lib/FlashCard';
import { debounce } from 'lodash'

const md = new markdownit()

class FlashCardEditor extends Component {
  constructor(props) {
    super(props)

    this.state = this.props.currentlyEditing || new FlashCard()

    this.broadcastChanges = debounce(this.broadcastChanges.bind(this), 2000)
  }

  onCardTextChange = (key, rawText) => {
    this.setState({
      ...this.state,
      [key]: {
        rawText: rawText,
        rendered: md.render(rawText)
      }
    }, this.broadcastChanges)
  }

  onTitleChange = (e) => {
    this.setState({
      ...this.state,
      title: e.target.value
    }, this.broadcastChanges)
  }

  broadcastChanges() {
    this.props.handleFlashCardUpdates(this.state)
  }

  render() {
    return (
      <div className="app-background flex-auto mh3">
        <div className="card-header flex items-center">
          <label>
            <input placeholder="Title..." className="input-reset ml3 mv2 br2 b--light-gray" value={this.state.title} onChange={this.onTitleChange} />
          </label>
        </div>
        <CardBack side="back" rawText={this.state.back.rawText} handleUpdate={this.onCardTextChange} renderedText={this.state.back.rendered} />
        <CardFront side="front" rawText={this.state.front.rawText} handleUpdate={this.onCardTextChange} renderedText={this.state.front.rendered} />
      </div>
    )
  }
}

export default FlashCardEditor
