import React, { Component } from 'react'

export default class Editor extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { handleUpdate, rawText } = this.props
    return (
      <div style={{ display: 'table' }}>
        <div ref={(e) => this.htmlEl = e} contentEditable="true" style={{ display: 'table-cell', verticalAlign: 'middle' }} className="card" dangerouslySetInnerHTML={{ __html: rawText }} onInput={(e) => {
          console.log(this.htmlEl.innerHTML)
          handleUpdate(this.htmlEl.innerText)
        }
        }></div>
      </div>
    )
  }
}