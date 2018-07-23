import { v4 } from 'uuid'

export default function Deck(options) {
  this.id = v4()
  this.name = ''
  this.isTrashed = false
  Object.assign(this, options)
}
