import memoize from 'lodash/memoize'
import { v4 } from 'uuid'

export default class PracticeRun {
  constructor(opts) {
    this.id = v4()
    this.title = ''
    this.startDate = new Date()
    this.inOrder = false
    this.endDate = null
    this.deckId = ''
    this.allCardIds = []
    this.cardIdsPracticeOrder = []
    this.unpracticedCardIds = []
    this.durationByCardId = {}
    this.resultsByCardId = {}
    Object.assign(this, opts)

    this.getTotalTime = memoize(this.getTotalTime)
  }

  set deck(deck) {
    this.title = deck.name
    this.deckId = deck.id
  }

  set cards(cards) {
    this.allCardIds = cards.map(card => card.id)
    this.unpracticedCardIds = cards.map(card => card.id)
  }

  getTotalTime = () => {
    return Object.values(this.durationByCardId).reduce(
      (sum, dur) => sum + dur,
      0
    )
  }
}
