import { v4 } from 'uuid'
import CardDifficulty from './CardDifficulty'
import StudyNeed from './StudyNeed'

export default function FlashCard() {
  this.id = v4()
  this.deckId = ''
  this.difficulty = CardDifficulty.NORMAL
  this.studyNeed = StudyNeed.KNOW
  this.front = {
    rawText: '',
    renderedText: ''
  }
  this.back = {
    rawText: '',
    renderedText: ''
  }
}
