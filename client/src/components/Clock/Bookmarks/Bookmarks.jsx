import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import BookmarkItem from './BookmarkItem/BookmarkItem';

// set up post request to add a new bookmark &  edit / delete bookmark
// give user ability to enter a string and use it as classname for fontawesome icon // eg. <i class="fab fa-reddit"></i>
// map through bookmarks, display 1 component for each and use classname from input as a prop
// use bookmark string as another prop to redirect to that page
// limit to max of 9..
import './Bookmarks.scss';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});
@inject('authStore')
@observer
class Bookmarks extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      bookmark: '',
      name: '',
      icon: ''
    };
  }

  componentDidMount() {
    this.props.authStore.fetchBookmarks();
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    const bookmarkForm = {
      bookmark: this.state.bookmark,
      name: this.state.name,
      icon: this.state.icon
    };

    this.props.authStore.handleBookmark(bookmarkForm);
    this.setState({ open: false });
  };

  // fetch the id , add id as props.. use id to update / delete?
  render() {
    const { open } = this.state;
    const { classes, authStore } = this.props;
    let bookmarks;

    if (authStore.bookmarks[0]) {
      bookmarks = authStore.bookmarks.map(bookmark => (
        <BookmarkItem
          key={bookmark._id}
          icon={bookmark.icon}
          bookmark={bookmark.bookmark}
          name={bookmark.name}
        />
      ));
    }
    return (
      // eslint-disable-next-line
      <div onClick={this.findBookmarks}>
        <div className="bookmarks">
          {bookmarks}
          <i
            onClick={this.handleClickOpen}
            onKeyDown={this.handleClickOpen}
            className="fas fa-plus bookmarks-controller"
            role="menu"
            tabIndex={0}
          />
        </div>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Add a Bookmark</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <TextField
                label="Bookmark Name"
                name="name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                name="bookmark"
                label="Website Link"
                className={classes.textField}
                value={this.state.bookmark}
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                label="Icon Class"
                name="icon"
                className={classes.textField}
                value={this.state.icon}
                placeholder="eg. fas fa-heart"
                onChange={this.handleChange}
                margin="normal"
              />
            </form>
          </DialogContent>
          <DialogActions style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} variant="raised" color="secondary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Bookmarks);
