import PropTypes from 'prop-types'
import React, { Component } from 'react'
import md from '../lib/markdown'

const textFit = window.textFit

export default class Preview extends Component {
  static propTypes = {
    rawText: PropTypes.string,
    hidden: PropTypes.bool
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.rawText === this.props.rawText &&
      nextProps.hidden === this.props.hidden
    ) {
      return false
    }

    return true
  }

  componentDidMount() {
    textFit(document.getElementById('preview-box'), {
      alignHoriz: true,
      alignVert: true
    })
  }

  componentDidUpdate() {
    textFit(document.getElementById('preview-box'), {
      alignHoriz: true,
      alignVert: true
    })
  }

  render() {
    const { rawText, hidden } = this.props
    const rendered = md.render(rawText)

    return (
      <div className={hidden ? 'clip' : ''}>
        <div
          id="preview-box"
          style={{ padding: '1pc' }}
          ref={e => (this.htmlEl = e)}
          dangerouslySetInnerHTML={{ __html: rendered }}
        />
      </div>
    )
  }
}
