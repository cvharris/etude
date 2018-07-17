import PropTypes from 'prop-types'
import React from 'react'

export default function TagListItem({ tag, key }) {
  return (
    <div className="tag">
      <div className="tag-name">{tag.name}</div>
    </div>
  )
}

TagListItem.propTypes = {
  tag: PropTypes.string,
  key: PropTypes.string
}
