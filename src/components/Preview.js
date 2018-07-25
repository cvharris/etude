import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Markdown from '../lib/markdown'

const textFit = window.textFit

export default class Preview extends Component {
  static propTypes = {
    rawText: PropTypes.string,
    hidden: PropTypes.bool,
    onRender: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.md = new Markdown()
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
    this.props.onRender(this.md.render(this.props.rawText))
  }

  componentDidUpdate() {
    textFit(document.getElementById('preview-box'), {
      alignHoriz: true,
      alignVert: true
    })
    this.props.onRender(this.md.render(this.props.rawText))
  }

  componentWillUnmount() {
    this.props.onRender(this.md.render(this.props.rawText))
  }

  render() {
    const { rawText, hidden } = this.props
    const rendered = this.md.render(rawText)

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
