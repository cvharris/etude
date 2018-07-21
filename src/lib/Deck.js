import { v4 } from 'uuid'

export default function Deck(options) {
  this.id = v4()
  this.title = ''
  Object.assign(this, options)
}
