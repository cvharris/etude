import PropTypes from 'prop-types'
import React, { Component } from 'react'

let stripNbsp = str => str.replace(/&nbsp;|\u202F|\u00A0/g, ' ')

export default class ContentEditable extends Component {
  static propTypes = {
    html: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func
  }

  state = {
    cursorCharacter: ''
  }

  shouldComponentUpdate(nextProps) {
    let { props, htmlEl } = this

    // We need not rerender if the change of props simply reflects the user's edits.
    // Rerendering in this case would make the cursor/caret jump

    // Rerender if there is no element yet... (somehow?)
    if (!htmlEl) {
      return true
    }

    // ...or if html really changed... (programmatically, not by user edit)
    if (
      stripNbsp(nextProps.html) !== stripNbsp(htmlEl.innerHTML) &&
      nextProps.html !== props.html
    ) {
      return true
    }

    return false
  }

  componentDidUpdate() {
    if (this.htmlEl && this.props.html !== this.htmlEl.innerHTML) {
      // Perhaps React (whose VDOM gets outdated because we often prevent
      // rerendering) did not update the DOM. So we update it manually now.
      this.htmlEl.innerHTML = this.props.html
    }
  }

  emitChange = () => {
    if (!this.htmlEl) return
    const html = this.htmlEl.innerHTML
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange(this.htmlEl.innerText)
    }
    this.lastHtml = html
  }

  render() {
    let { html } = this.props

    return (
      <div
        ref={e => (this.htmlEl = e)}
        onInput={this.emitChange}
        onBlur={this.props.onBlur || this.emitChange}
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }
}