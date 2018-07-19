import PropTypes from 'prop-types'
import React from 'react'
import ContentEditor from './ContentEditor'

export default function CardFront({ rawText, handleUpdate, renderedText }) {
  return (
    <div className="card-back">
      <h1>Front</h1>
      <div className="card card-size">
        <ContentEditor
          rawText={rawText}
          html={renderedText}
          onChange={handleUpdate}
        />
      </div>
    </div>
  )
}

CardFront.propTypes = {
  rawText: PropTypes.string,
  handleUpdate: PropTypes.func,
  renderedText: PropTypes.string
}
