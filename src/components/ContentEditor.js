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
    cursorCharacter: null
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
    const derp = document.getElementById('caret-position')
    if (derp && this.state.cursorCharacter) {
      const s = window.getSelection()
      if (s.rangeCount > 0) s.removeAllRanges()
      const range = document.createRange()
      range.setStart(derp, this.state.cursorCharacter.endOffset)
      range.collapse(true)
      s.addRange(range)
      derp.parentNode.removeChild(derp)
    }
  }

  emitChange = () => {
    if (!this.htmlEl) return
    const derp = document.getElementById('caret-position')
    if (derp) {
      derp.parentNode.removeChild(derp)
    }
    const html = this.htmlEl.innerHTML
    let caretPosition = null
    if (window.getSelection().rangeCount > 0) {
      const derp = window.getSelection().getRangeAt(0)
      const cursorCharacter = !derp.endContainer.localName
        ? derp.endContainer.data
        : derp.endContainer.innerText
      caretPosition = cursorCharacter
      this.setState({
        cursorCharacter
      })
    }
    if (this.props.onChange && html !== this.lastHtml) {
      const newText = caretPosition
        ? this.htmlEl.innerText.replace(caretPosition, `${caretPosition}⌘⌘`)
        : this.htmlEl.innerText
      this.props.onChange(newText)
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
