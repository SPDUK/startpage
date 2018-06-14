import React, { Component } from 'react';
import './BookmarkItem.scss';

class BookmarkItem extends Component {
  render() {
    return (
      <a className="bookmarkitem" href={this.props.bookmark}>
        <i className={`${this.props.icon} bookmarkitem`} />
      </a>
    );
  }
}

export default BookmarkItem;
