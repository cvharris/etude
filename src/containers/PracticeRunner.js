import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import shuffle from 'lodash/shuffle'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Preview from '../components/Preview'
import StudyNeed from '../lib/StudyNeed'
import {
  gradeCard,
  pickNextCard,
  setCardDuration
} from '../reducers/practiceRun'

class PracticeRunner extends Component {
  static propTypes = {
    thisRun: PropTypes.object,
    gradeCard: PropTypes.func,
    cardsById: PropTypes.object,
    setCardDuration: PropTypes.func,
    pickNextCard: PropTypes.func,
    closeSession: PropTypes.func
  }

  state = {
    currentCard: null,
    flipped: false,
    cardStart: null,
    secondsElapsed: 0,
    viewingBack: false
  }

  constructor(props) {
    super(props)

    this.cardTimer = null
  }

  componentDidMount() {
    this.getNextCard()
  }

  getNextCard = () => {
    if (!this.props.thisRun.unpracticedCardIds.length) {
      this.setState({
        ...this.state,
        flipped: false,
        currentCard: null
      })
    } else {
      const nextCard = this.props.thisRun.inOrder
        ? this.props.cardsById[this.props.thisRun.unpracticedCardIds[0]]
        : this.props.cardsById[this.chooseRandomCard()]
      this.setState({
        ...this.state,
        viewingBack: false,
        flipped: false,
        cardStart: new Date(),
        secondsElapsed: 0,
        currentCard: nextCard
      })
      this.props.pickNextCard(nextCard.id)
      this.cardTimer = setInterval(this.updateTimer, 1000)
    }
  }

  updateTimer = () => {
    this.setState({
      ...this.state,
      secondsElapsed: Math.floor(
        Math.abs(new Date().getTime() - this.state.cardStart.getTime()) / 1000
      )
    })
  }

  chooseRandomCard = () => {
    return shuffle(this.props.thisRun.unpracticedCardIds)[0]
  }

  flipCard = () => {
    const duration =
      Math.abs(new Date().getTime() - this.state.cardStart.getTime()) / 1000
    this.props.setCardDuration(this.state.currentCard.id, duration)
    if (this.cardTimer) {
      clearInterval(this.cardTimer)
    }
    this.setState({
      ...this.state,
      cardStart: null,
      viewingBack: true,
      flipped: true
    })
  }

  switchSide = () => {
    this.setState({
      ...this.state,
      viewingBack: !this.state.viewingBack
    })
  }

  render() {
    const { thisRun, closeSession, gradeCard } = this.props
    const { currentCard, flipped, viewingBack, secondsElapsed } = this.state

    if (!currentCard) {
      return (
        <div>
          <FontAwesomeIcon
            icon="times"
            onClick={() => closeSession('runner')}
          />
          <h1>You're Done!</h1>
        </div>
      )
    }
    const side = viewingBack ? currentCard.back : currentCard.front
    const timeElapsed = thisRun.getTotalTime(thisRun.durationByCardId)

    return (
      <div className="vh-100 w-100 relative">
        <FontAwesomeIcon
          icon="times"
          className="absolute right-0 top-0 pointer pa2"
          onClick={() => closeSession('runner')}
        />
        <h1 className="tc mv0 pv4">
          <span className="ph3">Practice Run</span>
          {this.cardTimer && (
            <span className="fw3 f5">
              {thisRun.cardIdsPracticeOrder.indexOf(currentCard.id) + 1}/
              {thisRun.allCardIds.length}
            </span>
          )}
          <span className="fw3 f5 ph2">{`${
            secondsElapsed / 60 >= 1
              ? `${Math.floor(secondsElapsed / 60)}m `
              : ''
          }${secondsElapsed % 60}s`}</span>
        </h1>
        <div className="practice-area flex justify-center flex-wrap">
          <div id="the-card" className="card card-size relative z-1">
            <Preview hidden={false} rawText={side} />
            {flipped && (
              <div
                onClick={this.switchSide}
                className="absolute pa2 ma2 top-0 left-0 z-2 light-silver hover-mid-gray pointer"
              >
                {!viewingBack ? 'Front' : 'Back'}
                <FontAwesomeIcon
                  className="pl1"
                  icon={!viewingBack ? 'level-up-alt' : 'level-down-alt'}
                />
              </div>
            )}
          </div>
          {!flipped && (
            <div className="flex-100 flex justify-center pv4">
              <button onClick={this.flipCard}>Show Back</button>
            </div>
          )}
          {flipped && (
            <div className="flex-100 flex justify-center pv4 flex-wrap">
              <div className="flex flex-100 justify-center pv2">
                <button
                  className={`${
                    thisRun.resultsByCardId[currentCard.id] === StudyNeed.KNOW
                      ? 'mh2 bg-dark-gray white'
                      : 'mh2'
                  }`}
                  onClick={() => gradeCard(currentCard.id, StudyNeed.KNOW)}
                >
                  {StudyNeed.properties[StudyNeed.KNOW].label}
                </button>
                <button
                  className={`${
                    thisRun.resultsByCardId[currentCard.id] === StudyNeed.REVIEW
                      ? 'mh2 bg-dark-gray white'
                      : 'mh2'
                  }`}
                  onClick={() => gradeCard(currentCard.id, StudyNeed.REVIEW)}
                >
                  {StudyNeed.properties[StudyNeed.REVIEW].label}
                </button>
                <button
                  className={`${
                    thisRun.resultsByCardId[currentCard.id] ===
                    StudyNeed.CLUELESS
                      ? 'mh2 bg-dark-gray white'
                      : 'mh2'
                  }`}
                  onClick={() => gradeCard(currentCard.id, StudyNeed.CLUELESS)}
                >
                  {StudyNeed.properties[StudyNeed.CLUELESS].label}
                </button>
              </div>
              {thisRun.resultsByCardId[currentCard.id] && (
                <div className="flex flex-100 justify-center pv2">
                  <button onClick={this.getNextCard}>Next Card</button>
                </div>
              )}
            </div>
          )}
          <h1>{`${
            timeElapsed / 60 >= 1 ? `${Math.floor(timeElapsed / 60)}m ` : ''
          }${Math.floor(timeElapsed % 60)}s`}</h1>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    thisRun: state.practiceRun,
    cardsById: state.flashCards.byId
  }),
  {
    gradeCard,
    setCardDuration,
    pickNextCard
  }
)(PracticeRunner)
