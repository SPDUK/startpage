import React, { Component } from 'react';

import './SearchBar.scss';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      googleSearch: ''
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const googleURL = `https://www.google.com/search?q=${this.state.googleSearch}`;
    window.location.href = googleURL;
  };
  render() {
    return (
      <div className="searchbar">
        <form onSubmit={this.onSubmit}>
          <input
            name="googleSearch"
            onSubmit={this.onSubmit}
            placeholder="Google"
            onChange={this.onChange}
            className="searchbar-input"
            type="text"
          />
        </form>
        <i className="material-icons searchbar-changer">arrow_drop_down </i>
      </div>
    );
  }
}
export default SearchBar;
