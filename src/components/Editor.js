import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Editor extends Component {
  static propTypes = {
    handleUpdate: PropTypes.func,
    onBlur: PropTypes.func,
    rawText: PropTypes.string
  }

  componentDidMount() {
    this.calcTextAreaHeight()
    this.onInput()
  }

  componentDidUpdate() {
    this.calcTextAreaHeight()
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
    const { rawText } = this.props

    return (
      <div
        className="card card-size card-editor"
        onClick={this.focusEditorArea}
      >
        <textarea
          ref={e => (this.textAreaEl = e)}
          value={rawText}
          style={{ height: `${this.calcTextAreaHeight()}px` }}
          placeholder="start typing"
          onChange={this.emitChange}
          onInput={this.onInput}
          onBlur={this.props.onBlur || this.emitChange}
        />
      </div>
    )
  }
}
