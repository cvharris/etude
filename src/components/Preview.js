import PropTypes from 'prop-types'
import React from 'react'

export default function Preview({ renderedText }) {
  return (
    <div
      className="card card-size"
      dangerouslySetInnerHTML={{ __html: renderedText }}
    />
  )
}

Preview.propTypes = {
  renderedText: PropTypes.string
}
