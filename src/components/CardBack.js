import React from 'react'
import Card from './Card';

export default function CardBack({ side, rawText, handleUpdate, renderedText }) {
  return (
    <div className="card-back">
      <h1>Back</h1>
      <Card rawText={rawText} handleUpdate={(value) => handleUpdate(side, value)} renderedText={renderedText} />
    </div>
  )
}