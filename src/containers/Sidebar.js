import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import DeckListItem from '../components/DeckListItem'
import Deck from '../lib/Deck'
import {
  createDeck,
  getActiveDecks,
  removeDeck,
  updateDeck
} from '../reducers/decks'
import { switchDeck } from '../reducers/sidebar'

export class Sidebar extends Component {
  static propTypes = {
    decks: PropTypes.array,
    activeDeckId: PropTypes.string,
    switchDeck: PropTypes.func,
    createDeck: PropTypes.func,
    updateDeck: PropTypes.func,
    removeDeck: PropTypes.func
  }

  componentDidMount() {
    if (!this.props.decks.length) {
      this.createADeck()
    }
  }

  componentDidUpdate() {
    if (!this.props.decks.length) {
      this.createADeck()
    }
  }

  createADeck = () => {
    const newDeck = new Deck({ name: 'New Deck' })
    this.props.createDeck(newDeck)
    this.props.switchDeck(newDeck.id)
  }

  render() {
    const {
      decks,
      activeDeckId,
      switchDeck,
      updateDeck,
      removeDeck
    } = this.props

    return (
      <div id="sidebar" className="bg-dark-gray white vh-100 overflow-hidden">
        <h4 className="white f4 mv2 ph3 pv2 fw1">Etude</h4>
        <h4 className="bg-red fw4 mv2 f5 ph3 pv2 nowrap pointer">
          <FontAwesomeIcon icon="window-restore" />
          <span className="pl2">Flash Cards</span>
        </h4>
        <h4 className="fw4 mv2 f5 ph3 pv2 nowrap pointer gray">
          <FontAwesomeIcon icon="dumbbell" />
          <span className="pl2">Practice</span>
        </h4>
        <div id="side-flex-area" className="flex flex-column flex-grow-1">
          <div className="deck-list bt b--gray pt3 flex-flex-grow-1">
            <h5 className="fw6 f6 flex justify-between ph2 mb2 mt0">
              <span>Decks</span>
              <span className="pointer hover-red" onClick={this.createADeck}>
                <FontAwesomeIcon icon="plus-square" />
              </span>
            </h5>
            {decks.map(deck => (
              <DeckListItem
                deck={deck}
                active={activeDeckId === deck.id}
                toSwitchDeck={switchDeck}
                handleRemovingDeck={removeDeck}
                handleRenamingDeck={updateDeck}
                key={deck.id}
              />
            ))}
          </div>
          <div
            className="trash-box bt b--gray pt3 pointer"
            onClick={() => switchDeck('trash')}
          >
            <h5 className="fw6 f6 flex justify-between ph2 mb2 mt0">
              <span>Trash</span>
              <FontAwesomeIcon icon="trash-alt" />
            </h5>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    decks: getActiveDecks(state),
    activeDeckId: state.sidebar.activeDeckId
  }),
  // TODO: handle deleting a deck, should delete all cards in the deck
  {
    switchDeck,
    createDeck,
    updateDeck,
    removeDeck
  }
)(Sidebar)
