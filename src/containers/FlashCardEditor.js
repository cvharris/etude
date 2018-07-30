import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import Editor from '../components/Editor'
import Preview from '../components/Preview'
import CardDifficulty from '../lib/CardDifficulty'
import FlashCard from '../lib/FlashCard'
import StudyNeed from '../lib/StudyNeed'
import { getDeckSelectList } from '../reducers/decks'
import {
  saveBack,
  saveFront,
  updateDeck,
  updateDifficulty,
  updateNeed
} from '../reducers/flashCardEditor'
import {
  createCard,
  getDecksCardsLength,
  newFlashCard,
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
    saveFront: PropTypes.func,
    saveBack: PropTypes.func,
    updateDeck: PropTypes.func,
    updateDifficulty: PropTypes.func,
    updateNeed: PropTypes.func,
    newFlashCard: PropTypes.func,
    activeDeckId: PropTypes.string
  }

  state = {
    editingFront: true,
    showingPreview: false
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
    if (flashCard && (flashCard.front || flashCard.back)) {
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

  saveRawText = newRawText => {
    this.state.editingFront
      ? this.props.saveFront(newRawText)
      : this.props.saveBack(newRawText)
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
      ...this.state,
      editingFront: side === 'front'
    })
  }

  togglePreview = () => {
    this.setState({
      ...this.state,
      showingPreview: !this.state.showingPreview
    })
  }

  onKeyCmdCreateNewCard = e => {
    if (e.metaKey && e.which === 13) {
      e.stopPropagation()
      e.preventDefault()
      this.props.newFlashCard(new FlashCard())
    }
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
        <div id="editor">
          <div />
          <div className="center tc">
            <div className="card-header mt5 fw7">{`${cardsInDeck} card${
              cardsInDeck === 1 ? '' : 's'
            }`}</div>
            <div className="serif i mt5 lh-title">
              <span>Click the </span>
              <FontAwesomeIcon icon="plus-square" />
              <span>
                {' '}
                button
                <br />
                to create your first card!
              </span>
            </div>
          </div>
        </div>
      )
    }
    const { editingFront, showingPreview } = this.state
    const side = editingFront ? flashCard.front : flashCard.back
    const selectedDeck = deckValues.filter(
      deck => flashCard.deckId === deck.value
    )[0]

    return (
      <div
        id="editor"
        className="mh3 vh-100 overflow-auto"
        onKeyDown={e => this.onKeyCmdCreateNewCard(e)}
      >
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
        <div id="card-grid">
          <div id="the-card" className="card card-size relative z-1">
            <div
              onClick={() => this.switchSide(!editingFront ? 'front' : 'back')}
              className="absolute pa2 ma2 top-0 left-0 z-2 light-silver hover-mid-gray pointer"
            >
              {!editingFront ? 'Front' : 'Back'}
              <FontAwesomeIcon
                className="pl1"
                icon={!editingFront ? 'level-up-alt' : 'level-down-alt'}
              />
            </div>
            <div
              onClick={() => this.togglePreview()}
              className="absolute pa2 ma2 top-0 right-0 z-2 light-silver hover-mid-gray pointer"
            >
              <FontAwesomeIcon
                className="pr1"
                icon={!showingPreview ? 'eye' : 'edit'}
              />
              {!showingPreview ? 'Preview' : 'Edit'}
            </div>
            <Editor
              hidden={showingPreview}
              rawText={side}
              handleUpdate={this.saveRawText}
            />
            <Preview hidden={!showingPreview} rawText={side} />
          </div>
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
    saveFront,
    saveBack,
    newFlashCard,
    createCard,
    saveCard,
    updateDifficulty,
    updateDeck,
    updateNeed
  }
)(FlashCardEditor)
