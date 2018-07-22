import PropTypes from 'prop-types'
import React from 'react'

export default function DeckListItem({ deck, active, toSwitchDeck }) {
  return (
    <div
      className={`deck pv2 pointer ${active ? 'bg-darker-gray' : ''}`}
      onClick={() => toSwitchDeck(deck.id)}
    >
      <div className="deck-name ph3 f6 fw3">{deck.name}</div>
    </div>
  )
}

DeckListItem.propTypes = {
  deck: PropTypes.object,
  active: PropTypes.bool,
  toSwitchDeck: PropTypes.func
}
