import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import RunListItem from '../components/RunListItem'
import { NEW_PRACTICE } from '../conf/ActionTypes'
import { allRuns, deleteRun, switchRun } from '../reducers/practiceRuns'
import { openTooltip } from '../reducers/tooltips'

class RunSummaryList extends Component {
  static propTypes = {
    runs: PropTypes.array,
    selectedRunId: PropTypes.string,
    switchRun: PropTypes.func,
    deleteRun: PropTypes.func,
    openTooltip: PropTypes.func
  }

  openCreateNewRunModal = () => {
    this.props.openTooltip(NEW_PRACTICE, this.menuTarget, 'bottom center')
  }

  render() {
    const { runs, switchRun, selectedRunId, deleteRun } = this.props

    return (
      <div className="flash-card-list bg-white flex-grow-1 b--black br vh-100 overflow-auto">
        <div className="filter-cards flex items-center justify-end bb b--light-gray">
          {/* TODO: filters */}
          <div
            className="pointer gray hover-dark-gray pv2 ph3"
            ref={e => (this.menuTarget = e)}
            onClick={() => this.openCreateNewRunModal()}
          >
            <FontAwesomeIcon icon="stopwatch" />
          </div>
        </div>
        <div className="current-card-list">
          {runs.map((run, i) => (
            <RunListItem
              handleSelect={switchRun}
              handleDelete={deleteRun}
              run={run}
              selectedRunId={selectedRunId}
              key={i}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    runs: allRuns(state),
    selectedRunId: state.practiceRuns.selectedRunId
  }),
  {
    switchRun,
    deleteRun,
    openTooltip
  }
)(RunSummaryList)
