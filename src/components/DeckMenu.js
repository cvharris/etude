import PropTypes from 'prop-types'
import React from 'react'

export default function DeckMenu({
  toggleOptionsPopup,
  toggleRenamePopup,
  handleRemovingDeck
}) {
  return (
    <div className="black">
      <div
        className="pointer hover-bg-red hover-white ph2 pv1"
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          toggleOptionsPopup()
          toggleRenamePopup()
        }}
      >
        Rename Deck
      </div>
      <div
        className="pointer hover-bg-red hover-white ph2 pv1"
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          handleRemovingDeck()
        }}
      >
        Delete Deck
      </div>
    </div>
  )
}

DeckMenu.propTypes = {
  toggleOptionsPopup: PropTypes.func,
  toggleRenamePopup: PropTypes.func,
  handleRemovingDeck: PropTypes.func
}
