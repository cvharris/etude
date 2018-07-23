import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class RenameDeck extends Component {
  state = {
    renamed: ''
  }

  componentDidMount() {
    this.typeName(this.props.deckName)
  }

  typeName = newName => {
    this.setState({
      renamed: newName
    })
  }

  render() {
    const { toggleRenamePopup, renameDeck } = this.props
    return (
      <div>
        <div className="black">
          <input
            autoFocus
            value={this.state.renamed}
            onChange={e => this.typeName(e.target.value)}
          />
        </div>
        <div>
          <button
            className="f6 link dim br1 ph3 pv2 mb2 dib white bg-mid-gray pointer"
            onClick={toggleRenamePopup}
          >
            Cancel
          </button>
          <button
            className="f6 link dim br1 ph3 pv2 mb2 dib white bg-mid-gray pointer"
            onClick={() => renameDeck(this.state.renamed)}
          >
            Rename
          </button>
        </div>
      </div>
    )
  }
}

RenameDeck.propTypes = {
  deckName: PropTypes.string,
  toggleRenamePopup: PropTypes.func,
  renameDeck: PropTypes.func
}
