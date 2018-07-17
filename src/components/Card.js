import PropTypes from 'prop-types'
import React from 'react'
import Editor from './Editor'
import Preview from './Preview'

export default function Card({ rawText, handleUpdate, renderedText }) {
  return (
    <div className="side-by-side">
      <Editor rawText={rawText} handleUpdate={handleUpdate} />
      <Preview renderedText={renderedText} />
    </div>
  )
}

Card.propTypes = {
  rawText: PropTypes.string,
  handleUpdate: PropTypes.func,
  renderedText: PropTypes.string
}
