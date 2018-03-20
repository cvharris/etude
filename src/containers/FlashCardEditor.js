import React, { Component } from 'react'
import CardBack from '../components/CardBack'
import CardFront from '../components/CardFront'
import debounce from 'lodash/debounce'
import { connect } from 'react-redux'
import { handleCardTitleUpdate, handleCardFrontUpdate, handleCardBackUpdate } from '../actions/flashCardEditorActions'
import { saveCard } from '../actions/flashCardListActions'

class FlashCardEditor extends Component {

  constructor(props) {
    super(props)

    this.handleUpdateCard = debounce(this.handleUpdateCard.bind(this), 1250)
  }

  componentWillUpdate(newProps) {
    if (newProps.flashCard.id !== this.props.flashCard.id) {
      this.props.saveCard(this.props.flashCard)
    }
  }

  handleUpdateCard() {
    this.props.saveCard(this.props.flashCard)
  }

  render() {
    const { flashCard } = this.props
    return (
      <div id="editor" className="app-background flex-auto mh3">
        <div className="card-header flex items-center">
          <label>
            <input placeholder="Title..." className="input-reset ml3 mv2 br2 b--light-gray" value={flashCard.title} onChange={(e) => {
              this.props.handleCardTitleUpdate(e.target.value)
              this.handleUpdateCard()
            }
            } />
          </label>
        </div>
        <CardFront rawText={flashCard.front.rawText} handleUpdate={(frontText) => {
          this.props.handleCardFrontUpdate(frontText)
          this.handleUpdateCard()
        }
        } renderedText={flashCard.front.renderedText} />
        <CardBack rawText={flashCard.back.rawText} handleUpdate={(backText) => {
          this.props.handleCardBackUpdate(backText)
          this.handleUpdateCard()
        }
        } renderedText={flashCard.back.renderedText} />
      </div>
    )
  }
}

export default connect(state => ({
  flashCard: state.flashCardEditor
}), { handleCardTitleUpdate, handleCardFrontUpdate, handleCardBackUpdate, saveCard })(FlashCardEditor)
