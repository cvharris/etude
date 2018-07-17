import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import React from 'react'

export default function CardListItem({ card, handleSelect, handleDelete }) {
  return (
    <div className="card-list-item bb b--light-gray">
      <div className="flex items-stretch">
        <div
          className="card-list-item-body pa3 flex-auto hover-bg-light-gray"
          onClick={() => handleSelect(card)}
        >
          <h3 className="fw6 f5 mt0 mb3">{card.title}</h3>
          {card.front.rawText && (
            <p className="mt0 mb1 truncate">
              <span className="fw6 pr2">Q:</span>
              {card.front.rawText}
            </p>
          )}
          {card.back.rawText && (
            <p className="mv0 truncate">
              <span className="fw6 pr2">A:</span>
              {card.back.rawText}
            </p>
          )}
        </div>
        <div
          className="card-list-item-delete bg-red white pa3 flex items-center"
          onClick={() => handleDelete(card)}
        >
          <FontAwesomeIcon icon="trash-alt" />
        </div>
      </div>
    </div>
  )
}
