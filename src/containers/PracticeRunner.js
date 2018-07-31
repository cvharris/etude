import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentRun } from '../reducers/practiceRuns'

class PracticeRunner extends Component {
  static propTypes = {
    thisRun: PropTypes.object
  }

  render() {
    return <div>Practice Run</div>
  }
}

export default connect(state => ({
  thisRun: getCurrentRun(state)
}))(PracticeRunner)
