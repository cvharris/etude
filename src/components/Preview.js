import PropTypes from 'prop-types'
import React, { Component } from 'react'

const textFit = window.textFit

export default class Preview extends Component {
  static propTypes = {
    renderedText: PropTypes.string
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
    const { renderedText } = this.props
    return (
      <div
        id="preview-box"
        className="card card-size"
        dangerouslySetInnerHTML={{ __html: renderedText }}
      />
    )
  }
}
