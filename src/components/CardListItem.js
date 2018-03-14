import React from 'react'

export default function CardListItem({ card, key }) {
  return (
    <div className="card-list-item">{card.title}</div>
  )
}