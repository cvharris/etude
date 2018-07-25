import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import CardListItem from '../components/CardListItem'
import FlashCard from '../lib/FlashCard'
import PrintCards from '../lib/PrintCards'
import { getCurrentDeck } from '../reducers/decks'
import {
  deleteCard,
  getDecksCards,
  getTrashedCards,
  newFlashCard,
  restoreCard,
  switchCard
} from '../reducers/flashCards'

class FlashCardList extends Component {
  static propTypes = {
    activeCardId: PropTypes.string,
    newFlashCard: PropTypes.func,
    switchCard: PropTypes.func,
    deleteCard: PropTypes.func,
    flashCards: PropTypes.array,
    restoreCard: PropTypes.func,
    currentDeck: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      filterString: ''
    }

    this.filterCardList = this.filterCardList.bind(this)
    this.printFlashCards = this.printFlashCards.bind(this)
  }

  componentDidUpdate() {
    // if (this.props.activeCardId) {
    //   this.props.switchCard(
    //     this.props.flashCards.filter(
    //       card => card.id === this.props.activeCardId
    //     )[0]
    //   )
    // }
  }

  filterCardList(e) {
    const filterString = e.target.value
    this.setState({
      flashCards: this.state.flashCards.filter(
        card =>
          card.front.rawText.indexOf(filterString) > -1 ||
          card.back.rawText.indexOf(filterString) > -1
      ),
      filterString
    })
  }

  printFlashCards() {
    new PrintCards(this.props.flashCards, this.props.currentDeck.name)
  }

  render() {
    const {
      newFlashCard,
      switchCard,
      deleteCard,
      flashCards,
      restoreCard,
      activeCardId
    } = this.props
    return (
      <div className="flash-card-list bg-white flex-grow-1 b--black br vh-100 overflow-auto">
        <div className="filter-cards flex items-center justify-end bb b--light-gray">
          <label className="ml3 mv2 br2 b--light-gray flex-flex-auto">
            <input
              placeholder="Search..."
              className="input-reset w-100"
              value={this.state.filterString}
              onChange={this.filterCardList}
            />
          </label>
          <div
            className="pointer gray hover-dark-gray pv2 ph3"
            onClick={() => newFlashCard(new FlashCard())}
          >
            <FontAwesomeIcon icon="plus-square" />
          </div>
          <div
            className="pointer gray hover-dark-gray pv2 ph3"
            onClick={this.printFlashCards}
          >
            <FontAwesomeIcon icon="print" />
          </div>
        </div>
        <div className="current-card-list">
          {flashCards.map((card, i) => (
            <CardListItem
              handleSelect={switchCard}
              handleDelete={deleteCard}
              handleRestore={restoreCard}
              card={card}
              activeCardId={activeCardId}
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
    currentDeck: getCurrentDeck(state),
    flashCards:
      state.sidebar.activeDeckId === 'trash'
        ? getTrashedCards(state)
        : getDecksCards(state),
    activeCardId: state.flashCards.activeCardId
  }),
  { newFlashCard, switchCard, deleteCard, restoreCard }
)(FlashCardList)
