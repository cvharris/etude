import PropTypes from 'prop-types'
import React from 'react'
import Editor from './Editor'
import Preview from './Preview'

export default function Card({ side, handleUpdate }) {
  return (
    <div className="card-side">
      <Editor rawText={side.rawText} handleUpdate={handleUpdate} />
      <Preview renderedText={side.renderedText} />
    </div>
  )
}

Card.propTypes = {
  handleUpdate: PropTypes.func,
  side: PropTypes.object
}
