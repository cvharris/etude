import React, { Component } from 'react'
import CardBack from '../components/CardBack'
import CardFront from '../components/CardFront';
import debounce from 'lodash/debounce'
import { connect } from 'react-redux';
import { handleCardTitleUpdate, handleCardFrontUpdate, handleCardBackUpdate } from '../actions/flashCardEditorActions';
import { saveCard } from '../actions/flashCardListActions'

class FlashCardEditor extends Component {

  constructor(props) {
    super(props)

    this.handleUpdateCard = debounce(this.handleUpdateCard.bind(this), 2000)
  }

  handleUpdateCard() {
    this.props.saveCard(this.props.flashCard)
  }

  render() {
    const { flashCard } = this.props
    return (
      <div className="app-background flex-auto mh3">
        <div className="card-header flex items-center">
          <label>
            <input placeholder="Title..." className="input-reset ml3 mv2 br2 b--light-gray" value={flashCard.title} onChange={(e) => {
              this.props.handleCardTitleUpdate(e.target.value)
              this.handleUpdateCard()
            }
            } />
          </label>
        </div>
        <CardBack rawText={flashCard.back.rawText} handleUpdate={(backText) => {
          this.props.handleCardBackUpdate(backText)
          this.handleUpdateCard()
        }
        } renderedText={flashCard.back.renderedText} />
        <CardFront rawText={flashCard.front.rawText} handleUpdate={(frontText) => {
          this.props.handleCardFrontUpdate(frontText)
          this.handleUpdateCard()
        }
        } renderedText={flashCard.front.renderedText} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleCardTitleUpdate: (cardTitle) => {
      dispatch(handleCardTitleUpdate(cardTitle))
    },
    handleCardFrontUpdate: (cardFront) => {
      dispatch(handleCardFrontUpdate(cardFront))
    },
    handleCardBackUpdate: (cardBack) => {
      dispatch(handleCardBackUpdate(cardBack))
    },
    handleSaveCard: (flashCard) => {
      dispatch(saveCard(flashCard))
    }
  }
}

export default connect(state => ({
  flashCard: state.flashCardEditor
}), { handleCardTitleUpdate, handleCardFrontUpdate, handleCardBackUpdate, saveCard })(FlashCardEditor)
