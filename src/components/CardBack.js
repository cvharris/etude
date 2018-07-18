import PropTypes from 'prop-types'
import React from 'react'
import ContentEditor from './ContentEditor'

export default function CardBack({ rawText, handleUpdate, renderedText }) {
  return (
    <div className="card-back">
      <h1>Back</h1>
      <div className="card">
        <ContentEditor
          rawText={rawText}
          html={renderedText}
          onChange={handleUpdate}
        />
      </div>
    </div>
  )
}

CardBack.propTypes = {
  rawText: PropTypes.string,
  handleUpdate: PropTypes.func,
  renderedText: PropTypes.string
}
