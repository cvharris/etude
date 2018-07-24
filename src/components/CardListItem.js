import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'

export default function CardListItem({
  card,
  handleSelect,
  handleDelete,
  handleRestore,
  activeCardId
}) {
  return (
    <div className="card-list-item bb b--light-gray pointer">
      <div className="flex items-stretch">
        <div
          className={`card-list-item-body pa3 flex-auto hover-bg-light-gray hover-black ${
            activeCardId === card.id ? 'bg-light-gray black fw5' : 'mid-gray'
          }`}
          onClick={() => handleSelect(card)}
        >
          {card.front.rawText && (
            <p className="mt0 mb1 pb1 truncate">{card.front.rawText}</p>
          )}
          {card.back.rawText && (
            <p className="mv0 pt1 truncate">{card.back.rawText}</p>
          )}
        </div>
        {card.isTrashed && (
          <div
            className="card-list-item-action dn pointer bg-light-blue white pa3 items-center"
            onClick={() => handleRestore(card)}
          >
            <FontAwesomeIcon icon="share" />
          </div>
        )}
        {!card.isTrashed && (
          <div
            className="card-list-item-action dn pointer bg-red white pa3 items-center"
            onClick={() => handleDelete(card.id)}
          >
            <FontAwesomeIcon icon="trash-alt" />
          </div>
        )}
      </div>
    </div>
  )
}

CardListItem.propTypes = {
  card: PropTypes.object,
  handleRestore: PropTypes.func,
  handleSelect: PropTypes.func,
  handleDelete: PropTypes.func,
  activeCardId: PropTypes.string
}
