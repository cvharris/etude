import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'

export default function RunListItem({
  run,
  handleSelect,
  handleDelete,
  selectedRunId
}) {
  return (
    <div className="card-list-item bb b--light-gray pointer">
      <div className="flex items-stretch">
        <div
          className={`card-list-item-body pa3 flex-auto hover-bg-light-gray hover-black ${
            selectedRunId === run.id ? 'bg-light-gray black fw5' : 'mid-gray'
          }`}
          onClick={() => handleSelect(run.id)}
        >
          {run.title && <p className="mt0 mb1 pb1 truncate">{run.title}</p>}
        </div>
        <div
          className="card-list-item-action dn pointer bg-red white pa3 items-center"
          onClick={() => handleDelete(run.id)}
        >
          <FontAwesomeIcon icon="trash-alt" />
        </div>
      </div>
    </div>
  )
}

RunListItem.propTypes = {
  run: PropTypes.object,
  handleRestore: PropTypes.func,
  handleSelect: PropTypes.func,
  handleDelete: PropTypes.func,
  selectedRunId: PropTypes.string
}
