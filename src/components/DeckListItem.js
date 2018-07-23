import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Popup from 'reactjs-popup'
import DeckMenu from './DeckMenu'
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
    clickCount: 0,
    renameOpen: false,
    optionsOpen: false
  }

  componentWillUnmount() {
    this.clickTimeout && clearTimeout(this.clickTimeout)
    this.clickTimeout = false
  }

  toggleOptionsPopup = () => {
    this.setState({
      ...this.state,
      optionsOpen: !this.state.optionsOpen
    })
  }

  toggleRenamePopup = () => {
    this.setState({
      clickCount: 0, // NOTE: side-effect?
      renameOpen: !this.state.renameOpen
    })
  }

  renameDeck = renamed => {
    this.props.handleRenamingDeck({ ...this.props.deck, name: renamed })
    this.toggleRenamePopup()
  }

  handleMouseDown = e => {
    e.preventDefault()
    e.stopPropagation()
    if (e.target.classList.contains('popup-overlay')) {
      this.setState({
        ...this.state,
        renameOpen: false,
        optionsOpen: false
      })
    } else {
      if (e.button === 1 || e.button === 2) {
        this.toggleOptionsPopup(e)
      } else if (e.button === 0) {
        if (this.state.clickCount === 1) {
          this.toggleRenamePopup()
        } else {
          this.clickTimeout = setTimeout(() => {
            if (this.state.clickCount === 1) {
              this.props.toSwitchDeck(this.props.deck.id)
              this.setState({
                ...this.state,
                clickCount: 0
              })
            }
          }, 250)
          this.setState({
            ...this.state,
            clickCount: this.state.clickCount + 1
          })
        }
      }
    }
  }

  render() {
    const { deck, active, handleRemovingDeck } = this.props
    const { renameOpen, optionsOpen } = this.state
    return (
      <div
        className={`deck pv2 pointer relative z-1 ${
          active ? 'bg-darker-gray' : ''
        }`}
        onMouseDown={e => this.handleMouseDown(e)}
        onContextMenu={e => e.preventDefault()}
      >
        <div className="deck-name ph3 f6 fw3 z-2">{deck.name}</div>
        <Popup
          trigger={() => (
            <div className="absolute top-0 left-0 h-100 w-100 z--1" />
          )}
          open={renameOpen}
          position="bottom left"
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
        >
          <DeckMenu
            toggleOptionsPopup={this.toggleOptionsPopup}
            toggleRenamePopup={this.toggleRenamePopup}
            handleRemovingDeck={() => handleRemovingDeck(deck.id)}
          />
        </Popup>
      </div>
    )
  }
}
