import { v4 } from 'node-uuid'
import markdownToHTML from '../markdowner'

export default function FlashCard() {
  this.id = v4()
  this.title = ''
  this.tags = []
  this.front = {
    rawText: '',
    renderedText: markdownToHTML('')
  }
  this.back = {
    rawText: '',
    renderedText: markdownToHTML('')
  }
}
