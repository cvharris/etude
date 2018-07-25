import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Editor extends Component {
  static propTypes = {
    handleUpdate: PropTypes.func,
    hidden: PropTypes.bool,
    onBlur: PropTypes.func,
    rawText: PropTypes.string
  }

  componentDidMount() {
    this.calcTextAreaHeight()
    this.onInput()
  }

  componentDidUpdate() {
    this.calcTextAreaHeight()
    this.focusEditorArea()
    this.onInput()
  }

  emitChange = e => {
    this.props.handleUpdate(this.textAreaEl.value)
  }

  focusEditorArea = () => {
    this.textAreaEl.focus()
  }

  calcTextAreaHeight = () => {
    return this.textAreaEl ? this.textAreaEl.scrollHeight : 30
  }

  onInput = () => {
    this.textAreaEl.style.height = 'auto'
    this.textAreaEl.style.height = this.textAreaEl.scrollHeight + 'px'
  }

  render() {
    const { rawText, hidden } = this.props

    return (
      <textarea
        ref={e => (this.textAreaEl = e)}
        autoFocus={true}
        className={hidden ? 'clip' : ''}
        value={rawText}
        style={{ height: `${this.calcTextAreaHeight()}px` }}
        placeholder="start typing"
        onChange={this.emitChange}
        onInput={this.onInput}
      />
    )
  }
}
