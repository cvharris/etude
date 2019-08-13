import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentDeck } from '../reducers/decks'
import { getCurrentRun } from '../reducers/practiceRuns'

class RunSummary extends Component {
  static propTypes = {
    currentRun: PropTypes.object,
    currentDeck: PropTypes.object
  }

  render() {
    const { currentRun, currentDeck } = this.props
    if (!currentRun && !!currentDeck) {
      return (
        <div id="editor">
          <div className="center tc">
            <div className="card-header mt5 fw7">{currentDeck.name}</div>
            <div className="serif i mt5 lh-title">
              <FontAwesomeIcon icon="stopwatch" />
              <span className="pl1">Practice Deck</span>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div id="editor" className="mh3 vh-100 overflow-auto">
        <h1>Here be the results of the selected Run</h1>
      </div>
    )
  }
}

export default connect(state => ({
  currentRun: getCurrentRun(state),
  currentDeck: getCurrentDeck(state)
}))(RunSummary)
