import PropTypes from 'prop-types'
import React from 'react'
import ContentEditor from './ContentEditor'

export default function Card({ rawText, handleUpdate, renderedText, side }) {
  return (
    <div className="card-back">
      <h1>{side}</h1>
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

Card.propTypes = {
  rawText: PropTypes.string,
  handleUpdate: PropTypes.func,
  renderedText: PropTypes.string,
  side: PropTypes.string
}
