import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './SearchBar.scss';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      anchorEl: null,
      searchType: 'Google'
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // handle errors, if errors then show them , if not close the modal
  onSubmit = e => {
    e.preventDefault();
    if (this.state.searchType === 'Google') {
      window.location.href = `https://www.google.com/search?q=${this.state.searchInput}`;
    }
    if (this.state.searchType === 'Wikipedia') {
      window.location.href = `https://en.wikipedia.org/wiki/${this.state.searchInput}`;
    }
    if (this.state.searchType === 'Reddit') {
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
    this.setState({ searchType: e.target.id || 'Google' });
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div className="searchbar">
        <form onSubmit={this.onSubmit}>
          <input
            name="searchInput"
            onSubmit={this.onSubmit}
            placeholder={this.state.searchType}
            onChange={this.onChange}
            className="searchbar-input"
            type="text"
          />
        </form>

        <i
          onClick={this.handleClick}
          onKeyDown={this.handleClick}
          className="fas fa-sort-up searchbar-changer"
          role="menu"
          tabIndex={0}
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem id="Google" onClick={this.handleClose}>
            Google
          </MenuItem>
          <MenuItem id="Wikipedia" onClick={this.handleClose}>
            Wikipedia
          </MenuItem>
          <MenuItem id="Reddit" onClick={this.handleClose}>
            Reddit
          </MenuItem>
        </Menu>
      </div>
    );
  }
}
export default SearchBar;
