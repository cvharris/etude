import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Popup from 'reactjs-popup'
import RenameDeck from './RenameDeck'

export default class DeckListItem extends Component {
  static propTypes = {
    deck: PropTypes.object,
    active: PropTypes.bool,
    toSwitchDeck: PropTypes.func,
    handleRemovingDeck: PropTypes.func,
    handleRenamingDeck: PropTypes.func
  }

  state = {
    renameOpen: false,
    optionsOpen: false
  }

  toggleOptionsPopup = e => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    this.setState({
      ...this.state,
      optionsOpen: !this.state.optionsOpen
    })
  }

  toggleRenamePopup = () => {
    this.setState({
      ...this.state,
      renameOpen: !this.state.renameOpen
    })
  }

  renameDeck = renamed => {
    this.props.handleRenamingDeck({ ...this.props.deck, name: renamed })
  }

  render() {
    const { deck, active, toSwitchDeck, handleRemovingDeck } = this.props
    const { renameOpen, optionsOpen } = this.state
    return (
      <div
        className={`deck pv2 pointer relative z-1 ${
          active ? 'bg-darker-gray' : ''
        }`}
        onClick={() => toSwitchDeck(deck.id)}
        onContextMenu={e => this.toggleOptionsPopup(e)}
        onDoubleClick={this.toggleRenamePopup}
      >
        <div className="deck-name ph3 f6 fw3 z-2">{deck.name}</div>
        <Popup
          trigger={() => (
            <div className="absolute top-0 left-0 h-100 w-100 z--1" />
          )}
          open={renameOpen}
          position="bottom left"
          onClose={this.toggleRenamePopup}
        >
          <RenameDeck
            deckName={deck.name}
            toggleRenamePopup={this.toggleRenamePopup}
            renameDeck={this.renameDeck}
          />
        </Popup>
        <Popup
          trigger={() => (
            <div className="absolute top-0 left-0 h-100 w-100 z--1" />
          )}
          open={optionsOpen}
          position="right top"
          onClose={this.toggleOptionsPopup}
        >
          <div className="black">
            <div
              onClick={() => {
                this.toggleOptionsPopup()
                this.toggleRenamePopup()
              }}
            >
              Rename Deck
            </div>
            <div onClick={handleRemovingDeck}>Delete Deck</div>
          </div>
        </Popup>
      </div>
    )
  }
}
