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
  render() {
    return (
      <a className="bookmarkitem" href={this.props.bookmark}>
        <i className={`${this.props.icon}`} />
        <p className="bookmarkitem-text">
          <i
            role="button"
            onKeyDown={this.props.authStore.deleteBookmark}
            tabIndex="-1"
            onClick={this.deleteBookmark}
            className="fa fa-times bookmarkitem-text-delete"
          />
          {this.props.name}
        </p>
      </a>
    );
  }
}

export default BookmarkItem;
