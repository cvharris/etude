import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'

export default function CardListItem({ card, handleSelect, handleDelete }) {
  return (
    <div className="card-list-item bb b--light-gray">
      <div className="flex items-stretch">
        <div
          className="card-list-item-body pa3 flex-auto hover-bg-light-gray"
          onClick={() => handleSelect(card)}
        >
          {card.front.rawText && (
            <p className="mt0 mb1 truncate">
              <span className="fw6 pr2">F:</span>
              {card.front.rawText}
            </p>
          )}
          {card.back.rawText && (
            <p className="mv0 truncate">
              <span className="fw6 pr2">B:</span>
              {card.back.rawText}
            </p>
          )}
        </div>
        <div
          className="card-list-item-delete pointer bg-red white pa3 flex items-center"
          onClick={() => handleDelete(card)}
        >
          <FontAwesomeIcon icon="trash-alt" />
        </div>
      </div>
    </div>
  )
}

CardListItem.propTypes = {
  card: PropTypes.object,
  handleSelect: PropTypes.func,
  handleDelete: PropTypes.func
}
