import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import './BookmarkItem.scss';

@inject('authStore')
@observer
class BookmarkItem extends Component {
  deleteBookmark = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.authStore.deleteBookmark(this.props.id);
  };
  // makes the bookmark link work without https:// at the start
  bookmarkLink = () => {
    if (this.props.bookmark.slice(0, 8) === 'https://') {
      window.location.href = this.props.bookmark;
    } else if (this.props.bookmark.slice(0, 7) === 'http://') {
      window.location.href = this.props.bookmark;
    } else {
      window.location.href = `https://${this.props.bookmark}`;
    }
  };
  render() {
    return (
      <div
        tabIndex="-1"
        role="link"
        onKeyDown={this.bookmarkLink}
        onClick={this.bookmarkLink}
        className="bookmarkitem"
      >
        <i className={`${this.props.icon}`} />
        <p className="bookmarkitem-text">
          <i
            role="button"
            onKeyDown={this.deleteBookmark}
            tabIndex="-1"
            onClick={this.deleteBookmark}
            className="fa fa-times bookmarkitem-text-delete"
          />
          {this.props.name}
        </p>
      </div>
    );
  }
}

export default BookmarkItem;
