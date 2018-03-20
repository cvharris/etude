import React from 'react'
import Card from './Card'

export default function CardFront({ rawText, handleUpdate, renderedText }) {
  return (
    <div className="card-back">
      <h1>Front</h1>
      <Card rawText={rawText} handleUpdate={(value) => handleUpdate(value)} renderedText={renderedText} />
    </div>
  )
}