import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import TagListItem from '../components/TagListItem';

export default class Sidebar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tags: []
    }
  }


  render() {
    return (
      <div className="bg-dark-gray flex-grow-1 white">
        <h4 className="bg-red fw4 f5 ph3 pv2 nowrap pointer">
          <FontAwesomeIcon icon="window-restore" />
          <span className="pl2">Flash Cards</span>
        </h4>
        <div className="tags-list">
          {this.state.tags.map((tag, i) =>
            <TagListItem tag={tag} key={i} />
          )}
        </div>
      </div>
    );
  }
}