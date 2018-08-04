import PropTypes from 'prop-types'
import React, { Component } from 'react'
import positionTooltip from '../../lib/positionTooltip'

class Tooltip extends Component {
  state = {
    style: { top: 0, left: 0 }
  }

  componentDidMount() {
    const { element, position } = this.props
    if (this.tooltipWrapper) {
      this.setState({
        style: positionTooltip(element, this.tooltipWrapper, position)
      })
    }
  }

  onOk = () => {
    this.props.onOk()
    this.props.closeTooltip()
  }

  render() {
    const { style } = this.state
    const { children, okDisabled, okText } = this.props
    return (
      <div
        className="tooltip-overlay z-2 absolute bg-white pa3 ma2"
        style={style}
        ref={el => (this.tooltipWrapper = el)}
        onClick={e => e.stopPropagation()}
      >
        {children}
        <button className="pointer" onClick={this.onOk} disabled={okDisabled}>
          {okText}
        </button>
      </div>
    )
  }
}

Tooltip.propTypes = {
  okText: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  element: PropTypes.object,
  position: PropTypes.string,
  closeTooltip: PropTypes.func,
  okDisabled: PropTypes.bool,
  onOk: PropTypes.func
}

Tooltip.defaultProps = {
  okText: 'OK',
  okDisabled: false,
  onOk: () => {}
}

export default Tooltip
