import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  deleteCard,
  newFlashCard,
  switchCard
} from '../actions/flashCardListActions'
import CardListItem from '../components/CardListItem'
import PrintCards from '../lib/PrintCards'

class FlashCardList extends Component {
  static propTypes = {
    activeCardId: PropTypes.string,
    newFlashCard: PropTypes.func,
    switchCard: PropTypes.func,
    deleteCard: PropTypes.func,
    flashCards: PropTypes.array
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
    new PrintCards(this.props.flashCards)
  }

  render() {
    return (
      <div className="flash-card-list bg-white flex-grow-1 b--black br">
        <div className="filter-cards flex items-center bb b--light-gray">
          <label>
            <input
              placeholder="Search..."
              className="input-reset ml3 mv2 br2 b--light-gray"
              value={this.state.filterString}
              onChange={this.filterCardList}
            />
          </label>
          <div
            className="pointer gray hover-dark-gray pv2 ph3"
            onClick={this.props.newFlashCard}
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
          {this.props.flashCards.map((card, i) => (
            // TODO: add conditional rendering so we only show those with active tag
            <CardListItem
              handleSelect={this.props.switchCard}
              handleDelete={this.props.deleteCard}
              card={card}
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
    activeTag: state.sidebar.activeTag,
    flashCards: state.flashCardList.flashCards,
    currentFlashCards: state.flashCardList.currentFlashCards,
    activeCardId: state.flashCardList.activeCardId
  }),
  { newFlashCard, switchCard, deleteCard }
)(FlashCardList)
