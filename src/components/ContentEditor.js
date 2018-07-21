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
    const caret = document.getElementById('caret-position')
    if (caret && this.state.cursorCharacter) {
      const s = window.getSelection()
      if (s.rangeCount > 0) s.removeAllRanges()
      const range = document.createRange()
      range.setStart(caret, 0)
      range.collapse(true)
      s.addRange(range)
      caret.parentNode.removeChild(caret)
    }
  }

  removeCaretPosition = () => {
    const caret = document.getElementById('caret-position')
    if (caret) {
      caret.parentNode.removeChild(caret)
    }
  }

  emitChange = () => {
    if (!this.htmlEl) return
    this.removeCaretPosition()
    const html = this.htmlEl.innerHTML
    const sel = window.getSelection()
    const cursorCharacter = !sel.focusNode.localName
      ? sel.focusNode.data
      : sel.focusNode.innerText
    this.setState({
      cursorCharacter
    })
    if (this.props.onChange && this.lastHtml && html !== this.lastHtml) {
      const mathhtml = document.getElementsByClassName('katex-html')
      while (mathhtml[0]) {
        mathhtml[0].parentNode.removeChild(mathhtml[0])
      }
      const newText = cursorCharacter
        ? this.htmlEl.innerText.replace(
            cursorCharacter,
            `${cursorCharacter.substr(
              0,
              sel.focusOffset
            )}⌘⌘${cursorCharacter.substr(sel.focusOffset)}`
          )
        : this.htmlEl.innerText
      this.props.onChange(newText)
    }
    this.lastHtml = html
  }

  onBlur = () => {
    if (!this.htmlEl) return
    this.removeCaretPosition()
    const html = this.htmlEl.innerHTML
    if (this.props.onChange && this.lastHtml && html !== this.lastHtml) {
      const mathhtml = document.getElementsByClassName('katex-html')
      while (mathhtml[0]) {
        mathhtml[0].parentNode.removeChild(mathhtml[0])
      }
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
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }
}
