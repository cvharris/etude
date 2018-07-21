import PropTypes from 'prop-types'
import React, { Component } from 'react'

let stripNbsp = str => str.replace(/&nbsp;|\u202F|\u00A0/g, ' ')

export default class Editor extends Component {
  static propTypes = {
    handleUpdate: PropTypes.func,
    onBlur: PropTypes.func,
    rawText: PropTypes.string
  }

  shouldComponentUpdate(nextProps) {
    let { props, htmlEl } = this

    if (!htmlEl) {
      return true
    }

    if (
      stripNbsp(nextProps.rawText) !== stripNbsp(htmlEl.innerHTML) &&
      nextProps.rawText !== props.rawText
    ) {
      return true
    }

    return false
  }

  componentDidUpdate() {
    if (this.htmlEl && this.props.rawText !== this.htmlEl.innerHTML) {
      this.htmlEl.innerHTML = this.props.rawText
    }
  }

  emitChange = () => {
    if (!this.htmlEl) return
    const html = this.htmlEl.innerHTML
    if (this.props.handleUpdate && this.lastHtml && html !== this.lastHtml) {
      this.props.handleUpdate(this.htmlEl.innerText)
    }
    this.lastHtml = html
  }

  focusEditorArea = () => {
    document.getElementById('card-editor').focus()
  }

  render() {
    const { rawText } = this.props

    return (
      <div
        className="card card-size card-editor"
        onClick={this.focusEditorArea}
      >
        <div
          id="card-editor"
          ref={e => (this.htmlEl = e)}
          contentEditable="true"
          dangerouslySetInnerHTML={{ __html: rawText }}
          onInput={this.emitChange}
          onBlur={this.props.onBlur || this.emitChange}
        />
      </div>
    )
  }
}
