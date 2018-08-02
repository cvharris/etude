import React, { Component } from 'react'
import FlashCardEditor from '../containers/FlashCardEditor'
import FlashCardList from '../containers/FlashCardList'
import Sidebar from '../containers/Sidebar'
import PracticeRunner from './PracticeRunner'
import RunSummary from './RunSummary'
import RunSummaryList from './RunSummaryList'

export default class Etude extends Component {
  state = {
    flashCards: [],
    activeTag: 'all',
    currentlyEditing: null,
    activeRun: null,
    currentView: 'runner'
  }

  constructor(props) {
    super(props)

    this.handleFlashCardUpdates = this.handleFlashCardUpdates.bind(this)
    this.filterFlashCards = this.filterFlashCards.bind(this)
    this.handleAddNewCard = this.handleAddNewCard.bind(this)
    this.handleSwitchCard = this.handleSwitchCard.bind(this)
  }

  handleFlashCardUpdates(flashCard) {
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

  handleAddNewCard() {
    this.setState({
      ...this.state,
      currentlyEditing: null
    })
  }

  handleSwitchCard(flashCard) {
    this.setState({
      ...this.state,
      currentlyEditing: flashCard
    })
  }

  filterFlashCards(newList) {
    if (this.state.activeTag === 'all') {
      return newList
    }

    return newList.filter(card =>
      card.tags.some(tag => tag.name === this.state.activeTag)
    )
  }

  switchView = view => {
    this.setState({
      ...this.state,
      currentView: view
    })
  }

  render() {
    const { currentlyEditing, currentView, activeRun } = this.state

    if (currentView === 'cards') {
      return (
        <div id="etude" className="avenir vh-100 overflow-hidden">
          <Sidebar switchView={this.switchView} currentView={currentView} />
          <FlashCardList />
          <FlashCardEditor activeFlashCard={currentlyEditing} />
        </div>
      )
    } else if (currentView === 'runner') {
      return (
        <div id="etude" className="avenir vh-100 overflow-hidden">
          <Sidebar switchView={this.switchView} currentView={currentView} />
          <RunSummaryList switchView={this.switchView} />
          <RunSummary activeRun={activeRun} />
        </div>
      )
    } else if (currentView === 'practice') {
      return (
        <div className="avenir vh-100 overflow-hidden">
          <PracticeRunner closeSession={this.switchView} />
        </div>
      )
    }
  }
}
