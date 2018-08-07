import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import TooltipProvider from '../components/tooltips/TooltipProvider'
import { switchView } from '../reducers/nav'
import FlashCardEditor from './FlashCardEditor'
import FlashCardList from './FlashCardList'
import PracticeRunner from './PracticeRunner'
import RunSummary from './RunSummary'
import RunSummaryList from './RunSummaryList'
import Sidebar from './Sidebar'

class Etude extends Component {
  static propTypes = {
    currentView: PropTypes.string,
    switchView: PropTypes.func
  }

  state = {
    flashCards: [],
    activeTag: 'all',
    currentlyEditing: null,
    activeRun: null
  }

  handleFlashCardUpdates = flashCard => {
    const found = this.state.flashCards.filter(card => card.id === flashCard.id)

    if (!found.length) {
      if (flashCard.front || flashCard.back) {
        this.setState({
          ...this.state,
          flashCards: [...this.state.flashCards, flashCard],
          currentFlashCards: [...this.state.currentFlashCards, flashCard],
          currentlyEditing: flashCard
        })
      }
    } else {
      const newList = this.state.flashCards.map(
        card => (card.id === flashCard.id ? flashCard : card)
      )

      this.setState({
        ...this.state,
        flashCards: newList,
        currentFlashCards: this.filterFlashCards(newList),
        currentlyEditing: flashCard
      })
    }
  }

  handleAddNewCard = () => {
    this.setState({
      ...this.state,
      currentlyEditing: null
    })
  }

  handleSwitchCard = flashCard => {
    this.setState({
      ...this.state,
      currentlyEditing: flashCard
    })
  }

  filterFlashCards = newList => {
    if (this.state.activeTag === 'all') {
      return newList
    }

    return newList.filter(card =>
      card.tags.some(tag => tag.name === this.state.activeTag)
    )
  }

  render() {
    const { currentlyEditing, activeRun } = this.state
    const { switchView, currentView } = this.props

    if (currentView === 'cards') {
      return (
        <div id="etude" className="avenir vh-100 overflow-hidden relative z-1">
          <Sidebar switchView={switchView} currentView={currentView} />
          <FlashCardList />
          <FlashCardEditor activeFlashCard={currentlyEditing} />
          <TooltipProvider />
        </div>
      )
    } else if (currentView === 'runner') {
      return (
        <div id="etude" className="avenir vh-100 overflow-hidden">
          <Sidebar switchView={switchView} currentView={currentView} />
          <RunSummaryList switchView={switchView} />
          <RunSummary activeRun={activeRun} />
          <TooltipProvider />
        </div>
      )
    } else if (currentView === 'practice') {
      return (
        <div className="avenir vh-100 overflow-hidden">
          <PracticeRunner closeSession={switchView} />
          <TooltipProvider />
        </div>
      )
    }
  }
}

export default connect(
  state => ({
    tooltipClosed: !state.tooltips.whichTooltip,
    currentView: state.nav.currentView
  }),
  {
    switchView
  }
)(Etude)
