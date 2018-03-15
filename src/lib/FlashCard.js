import { v4 } from 'node-uuid'

export default function FlashCard() {
  this.id = v4()
  this.title = ''
  this.tags = []
  this.front = {
    rawText: '',
    rendered: ''
  }
  this.back = {
    rawText: '',
    rendered: ''
  }
}