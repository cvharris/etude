import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  handleCardBackUpdate,
  handleCardFrontUpdate,
  handleCardTitleUpdate
} from '../actions/flashCardEditorActions'
import { cardSaved } from '../actions/flashCardListActions'
import Card from '../components/Card'

class FlashCardEditor extends Component {
  static propTypes = {
    flashCard: PropTypes.object,
    cardSaved: PropTypes.func,
    handleCardBackUpdate: PropTypes.func,
    handleCardFrontUpdate: PropTypes.func,
    handleCardTitleUpdate: PropTypes.func
  }

  state = {
    editingFront: true
  }

  constructor(props) {
    super(props)

    this.handleUpdateCard = debounce(this.handleUpdateCard.bind(this), 1250)
  }

  handleUpdateCard() {
    this.props.cardSaved(this.props.flashCard)
  }

  renderRawText = newRawText => {
    this.state.editingFront
      ? this.props.handleCardFrontUpdate(newRawText)
      : this.props.handleCardBackUpdate(newRawText)
    this.handleUpdateCard()
  }

  switchSide = side => {
    if (
      (this.state.editingFront && side === 'front') ||
      (!this.state.editingFront && side === 'back')
    ) {
      return
    }

    this.setState({
      editingFront: side === 'front'
    })
  }

  render() {
    const { flashCard } = this.props
    const { editingFront } = this.state

    return (
      <div id="editor" className="app-background flex-auto mh3">
        <div className="card-header flex items-center">
          <label>
            <input
              placeholder="Title..."
              className="input-reset ml3 mv2 br2 b--light-gray"
              value={flashCard.title}
              onChange={e => {
                this.props.handleCardTitleUpdate(e.target.value)
                this.handleUpdateCard()
              }}
            />
          </label>
        </div>
        <div className="side-toggle flex justify-center">
          <div
            onClick={() => this.switchSide('front')}
            className={`bt br bl b--black br2 pv2 ph3 ${
              editingFront
                ? 'bg-white black'
                : 'bg-gray dark-gray hover-bg-light-gray pointer'
            }`}
          >
            Front
          </div>
          <div
            onClick={() => this.switchSide('back')}
            className={`bt br bl b--black br2 pv2 ph3 ${
              !editingFront
                ? 'bg-white black'
                : 'bg-gray dark-gray hover-bg-light-gray pointer'
            }`}
          >
            Back
          </div>
        </div>
        <div className="">
          <Card
            side={editingFront ? flashCard.front : flashCard.back}
            handleUpdate={this.renderRawText}
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    flashCard: state.flashCardEditor
  }),
  {
    handleCardTitleUpdate,
    handleCardFrontUpdate,
    handleCardBackUpdate,
    cardSaved
  }
)(FlashCardEditor)
