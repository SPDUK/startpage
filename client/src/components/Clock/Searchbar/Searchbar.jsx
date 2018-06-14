import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './SearchBar.scss';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      anchorEl: null,
      searchType: 'google'
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.searchType === 'google') {
      window.location.href = `https://www.google.com/search?q=${this.state.searchInput}`;
    }
    if (this.state.searchType === 'wikipedia') {
      window.location.href = `https://en.wikipedia.org/wiki/${this.state.searchInput}`;
    }
    if (this.state.searchType === 'reddit') {
      window.location.href = `https://www.reddit.com/search?q=${this.state.searchInput}`;
    }
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = e => {
    console.log(e.target);
    this.setState({ searchType: e.target.id });
    this.setState({ anchorEl: null });
  };

  render() {
    const { open } = this.state;
    const { anchorEl } = this.state;
    return (
      <div className="searchbar">
        <form onSubmit={this.onSubmit}>
          <input
            name="searchInput"
            onSubmit={this.onSubmit}
            placeholder="Google"
            onChange={this.onChange}
            className="searchbar-input"
            type="text"
          />
        </form>

        <i
          onClick={this.handleClick}
          onKeyDown={this.handleClick}
          className="material-icons searchbar-changer"
          role="menu"
          tabIndex={0}
        >
          arrow_drop_down{' '}
        </i>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem id="google" onClick={this.handleClose}>
            Google
          </MenuItem>
          <MenuItem id="wikipedia" onClick={this.handleClose}>
            Wikipedia
          </MenuItem>
          <MenuItem id="reddit" onClick={this.handleClose}>
            Reddit
          </MenuItem>
        </Menu>
      </div>
    );
  }
}
export default SearchBar;
