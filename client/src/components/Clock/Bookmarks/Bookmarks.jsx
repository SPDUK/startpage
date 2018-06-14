import React, { Component } from 'react';
import BookmarkItem from './BookmarkItem/BookmarkItem';
// set up post request to add a new bookmark &  edit / delete bookmark
// give user ability to enter a string and use it as classname for fontawesome icon // eg. <i class="fab fa-reddit"></i>
// map through bookmarks, display 1 component for each and use classname from input as a prop
// use bookmark string as another prop to redirect to that page
// limit to max of 7?.
import './Bookmarks.scss';

class Bookmarks extends Component {
  render() {
    return (
      <div className="bookmarks">
        <BookmarkItem icon="fab fa-reddit" url="https://www.google.com" />
        <BookmarkItem icon="fab fa-reddit" url="https://www.google.com" />
        <BookmarkItem icon="fab fa-reddit" url="https://www.google.com" />
        <BookmarkItem icon="fab fa-reddit" url="https://www.google.com" />
        <BookmarkItem icon="fab fa-reddit" url="https://www.google.com" />
        <BookmarkItem icon="fab fa-reddit" url="https://www.google.com" />
        <BookmarkItem icon="fab fa-reddit" url="https://www.google.com" />
        <i className="bookmarks-controller fas fa-sort-down" />
      </div>
    );
  }
}

export default Bookmarks;
