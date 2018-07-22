import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { cardSaved } from '../actions/flashCardListActions'
import Editor from '../components/Editor'
import Preview from '../components/Preview'
import CardDifficulty from '../lib/CardDifficulty'
import StudyNeed from '../lib/StudyNeed'
import {
  handleCardBackUpdate,
  handleCardFrontUpdate,
  updateDeck,
  updateDifficulty,
  updateNeed
} from '../reducers/flashCardEditor'

class FlashCardEditor extends Component {
  static propTypes = {
    flashCard: PropTypes.object,
    decks: PropTypes.array,
    cardSaved: PropTypes.func,
    handleCardBackUpdate: PropTypes.func,
    handleCardFrontUpdate: PropTypes.func,
    handleCardTitleUpdate: PropTypes.func,
    updateDeck: PropTypes.func,
    updateDifficulty: PropTypes.func,
    updateNeed: PropTypes.func,
    activeDeckId: PropTypes.string
  }

  state = {
    editingFront: true
  }

  constructor(props) {
    super(props)

    this.needs = Object.entries(StudyNeed.properties).map(need => need[1])
    this.difficulties = Object.entries(CardDifficulty.properties).map(
      diff => diff[1]
    )
    this.handleUpdateCard = debounce(this.handleUpdateCard.bind(this), 1250)
  }

  handleUpdateCard() {
    this.props.cardSaved(this.props.flashCard)
  }

  updateAttribute = (opt, cb) => {
    cb(opt.value)
    this.handleUpdateCard()
  }

  updateDeck = deck => {
    this.props.updateDeck(deck.value)
    this.handleUpdateCard()
  }

  renderRawText = newRawText => {
    this.state.editingFront
      ? this.props.handleCardFrontUpdate(newRawText)
      : this.props.handleCardBackUpdate(newRawText)
    this.handleUpdateCard()
  }

  switchSide = side => {
    if (
      (this.state.editingFront && side === 'front') ||
      (!this.state.editingFront && side === 'back')
    ) {
      return
    }

    this.setState({
      editingFront: side === 'front'
    })
  }

  render() {
    const { flashCard, decks, updateDifficulty, updateNeed } = this.props
    const { editingFront } = this.state
    const side = editingFront ? flashCard.front : flashCard.back

    return (
      <div id="editor" className="app-background flex-auto mh3">
        <div className="card-header flex items-center">
          <Select
            className="flex-auto"
            classNamePrefix=""
            options={decks}
            placeholder="Deck..."
            value={decks.filter(deck => deck.value === flashCard.deckId)[0]}
            onChange={this.updateDeck}
            isClearable={false}
            isSearchable={true}
          />
          <Select
            className="flex-auto"
            classNamePrefix=""
            options={this.needs}
            placeholder="Know/Don't Know..."
            value={StudyNeed.properties[flashCard.studyNeed]}
            onChange={e => this.updateAttribute(e, updateNeed)}
            isClearable={false}
            isSearchable={true}
          />
          <Select
            className="flex-auto"
            classNamePrefix=""
            options={this.difficulties}
            placeholder="Difficulty..."
            value={CardDifficulty.properties[flashCard.difficulty]}
            onChange={e => this.updateAttribute(e, updateDifficulty)}
            isClearable={false}
            isSearchable={true}
          />
        </div>
        <div className="side-toggle flex justify-center">
          <div
            onClick={() => this.switchSide('front')}
            className={`bt br bl b--black br2 pv2 ph3 ${
              editingFront
                ? 'bg-white black'
                : 'bg-gray dark-gray hover-bg-light-gray pointer'
            }`}
          >
            Front
          </div>
          <div
            onClick={() => this.switchSide('back')}
            className={`bt br bl b--black br2 pv2 ph3 ${
              !editingFront
                ? 'bg-white black'
                : 'bg-gray dark-gray hover-bg-light-gray pointer'
            }`}
          >
            Back
          </div>
        </div>
        <div id="card-grid">
          <Editor rawText={side.rawText} handleUpdate={this.renderRawText} />
          <Preview renderedText={side.renderedText} />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    decks: state.decks.allIds.map(deckId => ({
      label: state.decks.byId[deckId].name,
      value: deckId
    })),
    flashCard: state.flashCardEditor,
    activeDeckId: state.sidebar.activeDeckId
  }),
  {
    handleCardFrontUpdate,
    handleCardBackUpdate,
    cardSaved,
    updateDifficulty,
    updateDeck,
    updateNeed
  }
)(FlashCardEditor)
