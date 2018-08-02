import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import RunListItem from '../components/RunListItem'
import PracticeRun from '../lib/PracticeRun'
import { getCurrentDeck } from '../reducers/decks'
import { getDecksCards } from '../reducers/flashCards'
import { startRun } from '../reducers/practiceRun'
import {
  allRuns,
  createRun,
  deleteRun,
  switchRun
} from '../reducers/practiceRuns'

class RunSummaryList extends Component {
  static propTypes = {
    runs: PropTypes.array,
    selectedRunId: PropTypes.string,
    deckToPractice: PropTypes.object,
    cardsToPractice: PropTypes.array,
    switchRun: PropTypes.func,
    createRun: PropTypes.func,
    startRun: PropTypes.func,
    switchView: PropTypes.func,
    deleteRun: PropTypes.func
  }

  openCreateNewRunModal = () => {
    const {
      createRun,
      startRun,
      switchView,
      deckToPractice,
      cardsToPractice
    } = this.props
    const newPractice = new PracticeRun()
    newPractice.deck = deckToPractice
    newPractice.cards = cardsToPractice
    createRun(newPractice)
    startRun(newPractice)
    switchView('practice')
  }

  render() {
    const { runs, switchRun, selectedRunId, deleteRun } = this.props

    return (
      <div className="flash-card-list bg-white flex-grow-1 b--black br vh-100 overflow-auto">
        <div className="filter-cards flex items-center justify-end bb b--light-gray">
          {/* TODO: filters */}
          <div
            className="pointer gray hover-dark-gray pv2 ph3"
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
    selectedRunId: state.practiceRuns.selectedRunId,
    deckToPractice: getCurrentDeck(state),
    cardsToPractice: getDecksCards(state)
  }),
  {
    switchRun,
    deleteRun,
    startRun,
    createRun
  }
)(RunSummaryList)
