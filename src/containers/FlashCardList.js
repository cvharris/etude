import React, { Component } from "react";
import CardListItem from "../components/CardListItem";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

export default class FlashCardList extends Component {
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
        <div className="filter-cards flex items-center">
          <label>
            <input placeholder="Search..." className="input-reset ml3 mv2 br2 b--light-gray" value={this.state.filterString} onChange={this.filterCardList} />
          </label>
          <div className="pointer gray hover-dark-gray pv2 ph3" onClick={this.props.handleAddCard}>
            <FontAwesomeIcon icon="plus-square" />
          </div>
        </div>
        <div className="current-card-list">
          {this.props.flashCards.map((card, i) =>
            <CardListItem handleSelect={this.props.handleSwitchCard} card={card} key={i} />
          )}
        </div>
      </div>
    );
  }
}