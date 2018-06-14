import React, { Component } from 'react';
import './BookmarkItem.scss';

class BookmarkItem extends Component {
  render() {
    return (
      <a className="bookmarkitem" href={this.props.bookmark}>
        <i className={`${this.props.icon} bookmarkitem`} />
        <p className="bookmarkitem-text">{this.props.name}</p>
      </a>
    );
  }
}

export default BookmarkItem;
