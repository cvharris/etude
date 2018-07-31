import { v4 } from 'uuid'

export default class PracticeRun {
  constructor(opts) {
    this.id = v4()
    this.startDate = new Date()
    this.endDate = null
    this.deckIds = []
    this.cardIds = []
    this.durationByCardId = {}
    this.knewByCardId = {}
    Object.assign(this, opts)
  }

  set decks(decks) {
    this.title = decks.map(deck => deck.name).join(', ')
    this.deckIds = decks.map(deck => deck.id)
  }

  set cards(cards) {
    this.cardIds = cards.map(card => card.id)
  }
}
