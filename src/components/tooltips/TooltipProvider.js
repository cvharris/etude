import React from 'react'
import { connect } from 'react-redux'
import { closeTooltip } from '../../reducers/tooltips'
import NewPracticeTooltip from './NewPracticeTooltip'

const TooltipProvider = props => {
  switch (props.whichTooltip) {
    case 'NEW_PRACTICE':
      return <NewPracticeTooltip {...props} />

    default:
      return null
  }
}

export default connect(
  state => state.tooltips,
  {
    closeTooltip
  }
)(TooltipProvider)
