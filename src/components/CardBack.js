import PropTypes from 'prop-types'
import React from 'react'
import Card from './Card'

export default function CardBack({ rawText, handleUpdate, renderedText }) {
  return (
    <div className="card-back">
      <h1>Back</h1>
      <Card
        rawText={rawText}
        handleUpdate={value => handleUpdate(value)}
        renderedText={renderedText}
      />
    </div>
  )
}

CardBack.propTypes = {
  rawText: PropTypes.string,
  handleUpdate: PropTypes.func,
  renderedText: PropTypes.string
}
