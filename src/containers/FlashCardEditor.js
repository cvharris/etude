import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  handleCardBackUpdate,
  handleCardFrontUpdate,
  handleCardTitleUpdate
} from '../actions/flashCardEditorActions'
import { cardSaved } from '../actions/flashCardListActions'
import Card from '../components/Card'
import FlashCard from '../lib/FlashCard'

class FlashCardEditor extends Component {
  static propTypes = {
    cardSaved: PropTypes.func,
    flashCard: PropTypes.object,
    handleCardBackUpdate: PropTypes.func,
    handleCardFrontUpdate: PropTypes.func,
    handleCardTitleUpdate: PropTypes.func
  }

  state = {
    flashCard: new FlashCard()
  }

  constructor(props) {
    super(props)

    this.handleUpdateCard = debounce(this.handleUpdateCard.bind(this), 1250)
  }

  static getDerivedStateFromProps(props) {
    return { flashCard: props.flashCard }
  }

  handleUpdateCard() {
    this.props.cardSaved(this.state.flashCard)
  }

  render() {
    const { flashCard } = this.state
    return (
      <div id="editor" className="app-background flex-auto mh3">
        <div className="card-header flex items-center">
          <label>
            <input
              placeholder="Title..."
              className="input-reset ml3 mv2 br2 b--light-gray"
              value={flashCard.title}
              onChange={e => {
                this.props.handleCardTitleUpdate(e.target.value)
                this.handleUpdateCard()
              }}
            />
          </label>
        </div>
        <Card
          side="Front"
          rawText={flashCard.front.rawText}
          handleUpdate={frontText => {
            this.props.handleCardFrontUpdate(frontText)
            this.handleUpdateCard()
          }}
          renderedText={flashCard.front.renderedText}
        />
        <Card
          side="Back"
          rawText={flashCard.back.rawText}
          handleUpdate={backText => {
            this.props.handleCardBackUpdate(backText)
            this.handleUpdateCard()
          }}
          renderedText={flashCard.back.renderedText}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    flashCard: state.flashCardEditor
  }),
  {
    handleCardTitleUpdate,
    handleCardFrontUpdate,
    handleCardBackUpdate,
    cardSaved
  }
)(FlashCardEditor)
