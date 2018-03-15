import React from 'react'

export default function CardListItem({ card, handleSelect }) {
  return (
    <div className="card-list-item" onClick={() => handleSelect(card)}>{card.title}</div>
  )
}