import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import Editor from '../components/Editor'
import Preview from '../components/Preview'
import CardDifficulty from '../lib/CardDifficulty'
import StudyNeed from '../lib/StudyNeed'
import { getDeckSelectList } from '../reducers/decks'
import {
  handleCardBackUpdate,
  handleCardFrontUpdate,
  updateDeck,
  updateDifficulty,
  updateNeed
} from '../reducers/flashCardEditor'
import {
  createCard,
  getDecksCardsLength,
  saveCard
} from '../reducers/flashCards'

class FlashCardEditor extends Component {
  static propTypes = {
    flashCard: PropTypes.object,
    deckValues: PropTypes.array,
    cardsInDeck: PropTypes.number,
    activeCardId: PropTypes.string,
    createCard: PropTypes.func,
    saveCard: PropTypes.func,
    handleCardBackUpdate: PropTypes.func,
    handleCardFrontUpdate: PropTypes.func,
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

  componentDidMount() {
    if (this.props.flashCard) {
      this.useActiveDeckAsDeckId()
    }
  }

  componentDidUpdate() {
    if (this.props.flashCard) {
      this.useActiveDeckAsDeckId()
    }
  }

  handleUpdateCard() {
    const { activeCardId, createCard, saveCard, flashCard } = this.props
    if (flashCard.front.rawText || flashCard.back.rawText) {
      if (activeCardId !== flashCard.id) {
        createCard(flashCard)
      } else {
        saveCard(flashCard)
      }
    }
  }

  useActiveDeckAsDeckId = () => {
    const { flashCard, activeDeckId, deckValues } = this.props
    if (!flashCard.deckId && activeDeckId) {
      this.updateDeck(deckValues.filter(deck => deck.value === activeDeckId)[0])
    }
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
    const {
      flashCard,
      updateDifficulty,
      updateNeed,
      deckValues,
      cardsInDeck
    } = this.props
    if (!flashCard) {
      return (
        <div id="editor" className="center">
          <div className="card-header mt5 fw7">{`${cardsInDeck} card${
            cardsInDeck === 1 ? '' : 's'
          }`}</div>
        </div>
      )
    }
    const { editingFront } = this.state
    const side = editingFront ? flashCard.front : flashCard.back
    const selectedDeck = deckValues.filter(
      deck => flashCard.deckId === deck.value
    )[0]

    return (
      <div id="editor" className="flex-auto mh3">
        <div className="card-header flex items-center">
          <Select
            className="flex-auto"
            classNamePrefix=""
            options={deckValues}
            placeholder="Deck..."
            value={selectedDeck}
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
    deckValues: getDeckSelectList(state),
    cardsInDeck: getDecksCardsLength(state),
    activeCardId: state.flashCards.activeCardId,
    flashCard: state.flashCardEditor,
    activeDeckId: state.sidebar.activeDeckId
  }),
  {
    handleCardFrontUpdate,
    handleCardBackUpdate,
    createCard,
    saveCard,
    updateDifficulty,
    updateDeck,
    updateNeed
  }
)(FlashCardEditor)
