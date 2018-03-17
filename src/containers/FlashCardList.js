import React, { Component } from "react";
import CardListItem from "../components/CardListItem";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { connect } from "react-redux"
import { newFlashCard, switchCard, deleteCard } from '../actions/flashCardListActions'

class FlashCardList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterString: ''
    }

    this.filterCardList = this.filterCardList.bind(this)
  }

  filterCardList(e) {
    const filterString = e.target.value
    this.setState({
      flashCards: this.state.flashCards.filter(card => card.title.indexOf(filterString) > 0),
      filterString
    })
  }

  render() {
    return (
      <div className="bg-white flex-grow-1 b--black br">
        <div className="filter-cards flex items-center bb b--light-gray">
          <label>
            <input placeholder="Search..." className="input-reset ml3 mv2 br2 b--light-gray" value={this.state.filterString} onChange={this.filterCardList} />
          </label>
          <div className="pointer gray hover-dark-gray pv2 ph3" onClick={this.props.newFlashCard}>
            <FontAwesomeIcon icon="plus-square" />
          </div>
        </div>
        <div className="current-card-list">
          {this.props.flashCards.map((card, i) =>
            // TODO: add conditional rendering so we only show those with active tag
            <CardListItem handleSelect={this.props.switchCard} handleDelete={this.props.deleteCard} card={card} key={i} />
          )}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  activeTag: state.sidebar.activeTag,
  flashCards: state.flashCardList.flashCards,
  currentFlashCards: state.flashCardList.currentFlashCards
}), { newFlashCard, switchCard, deleteCard })(FlashCardList)