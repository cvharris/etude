import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PracticeRun from '../../lib/PracticeRun'
import { getCurrentDeck } from '../../reducers/decks'
import { getDecksCards } from '../../reducers/flashCards'
import { switchView } from '../../reducers/nav'
import { startRun } from '../../reducers/practiceRun'
import { createRun } from '../../reducers/practiceRuns'
import Tooltip from './Tooltip'

class NewPracticeTooltip extends Component {
  static propTypes = {
    onCreate: PropTypes.func,
    createRun: PropTypes.func,
    startRun: PropTypes.func,
    switchView: PropTypes.func,
    deckToPractice: PropTypes.object,
    cardsToPractice: PropTypes.array,
    element: PropTypes.object
  }

  state = {
    randomOrder: true,
    showTimer: true
  }

  handleSubmission = () => {
    const { randomOrder, showTimer } = this.state
    const {
      createRun,
      startRun,
      switchView,
      deckToPractice,
      cardsToPractice
    } = this.props
    const newPractice = new PracticeRun({ randomOrder, showTimer })
    newPractice.deck = deckToPractice
    newPractice.cards = cardsToPractice
    createRun(newPractice)
    startRun(newPractice)
    switchView('practice')
  }

  updateRandomOrder = () => {
    this.setState({
      ...this.state,
      randomOrder: !this.state.randomOrder
    })
  }

  updateShowTimer = () => {
    this.setState({
      ...this.state,
      showTimer: !this.state.showTimer
    })
  }

  render() {
    const { randomOrder, showTimer } = this.state

    return (
      <Tooltip onOk={this.handleSubmission} {...this.props}>
        <p className="mt0">Practice this deck</p>
        <div>
          <input
            type="checkbox"
            value="randomOrder"
            checked={randomOrder}
            id="random-order"
            name="randomOrder"
            onChange={this.updateRandomOrder}
          />
          <label htmlFor="random-order">Random Order</label>
        </div>
        <div>
          <input
            type="checkbox"
            value="showTimer"
            checked={showTimer}
            id="show-timer"
            name="showTimer"
            onChange={this.updateShowTimer}
          />
          <label htmlFor="show-timer">Show Timer</label>
        </div>
      </Tooltip>
    )
  }
}

export default connect(
  state => ({
    deckToPractice: getCurrentDeck(state),
    cardsToPractice: getDecksCards(state)
  }),
  {
    createRun,
    startRun,
    switchView
  }
)(NewPracticeTooltip)
