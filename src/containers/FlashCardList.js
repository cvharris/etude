import React, { Component } from "react";
import CardListItem from "../components/CardListItem";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

export default class FlashCardList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      flashCards: [],
      filterString: ''
    }

    this.filterCards = this.filterCards.bind(this)
  }

  filterCards(e) {
    const filterString = e.target.value
    this.setState({
      flashCards: this.state.flashCards.filter(card => card.title.indexOf(filterString) > 0),
      filterString
    })
  }

  render() {
    return (
      <div className="bg-white flex-grow-1 b--black br">
        <div className="filter-cards flex items-center">
          <label>
            <input placeholder="Search..." className="input-reset ml3 mv2 br2 b--light-gray" value={this.state.filterString} onChange={this.filterCards} />
          </label>
          <div className="pointer gray hover-dark-gray pv2 ph3">
            <FontAwesomeIcon icon="plus-square" />
          </div>
        </div>
        {this.state.flashCards.map((card, i) =>
          <CardListItem card={card} key={i} />
        )}
      </div>
    );
  }
}