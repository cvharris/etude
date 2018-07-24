import React, { Component } from 'react'
import FlashCardEditor from '../containers/FlashCardEditor'
import FlashCardList from '../containers/FlashCardList'
import Sidebar from '../containers/Sidebar'

export default class Etude extends Component {
  constructor(props) {
    super(props)
    this.state = {
      flashCards: [],
      activeTag: 'all',
      currentlyEditing: null
    }

    this.handleFlashCardUpdates = this.handleFlashCardUpdates.bind(this)
    this.filterFlashCards = this.filterFlashCards.bind(this)
    this.handleAddNewCard = this.handleAddNewCard.bind(this)
    this.handleSwitchCard = this.handleSwitchCard.bind(this)
  }

  handleFlashCardUpdates(flashCard) {
    const found = this.state.flashCards.filter(card => card.id === flashCard.id)

    if (!found.length) {
      if (flashCard.front.rawText || flashCard.back.rawText) {
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

  render() {
    const { currentlyEditing } = this.state
    return (
      <div id="etude" className="avenir vh-100 overflow-hidden">
        <Sidebar />
        <FlashCardList />
        <FlashCardEditor activeFlashCard={currentlyEditing} />
      </div>
    )
  }
}
