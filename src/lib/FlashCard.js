import { v4 } from 'uuid'

export default function FlashCard() {
  this.id = v4()
  this.title = ''
  this.tags = []
  this.front = {
    rawText: '',
    renderedText: ''
  }
  this.back = {
    rawText: '',
    renderedText: ''
  }
}
