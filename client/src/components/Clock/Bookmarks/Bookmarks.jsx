import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';
import FormHelperText from '@material-ui/core/FormHelperText';
import Fade from '@material-ui/core/Fade';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
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

  componentDidUpdate() {
    if (this.props.authStore.errors === '') {
      this.props.authStore.clearErrors();
      this.handleClose();
    }
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

    // if the form has no errors remove the form from the screen

    this.props.authStore.handleBookmark(bookmarkForm);
  };

  // fetch the id , add id as props.. use id to update / delete?
  render() {
    const { classes, authStore } = this.props;
    let bookmarks;
    console.log('update');
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

    // eslint-disable-next-line
    return (
      <div>
        <h1>{`${this.props.authStore.errors.name} `}</h1>
        <h1>{`${this.props.authStore.errors.icon} `}</h1>
        <h1>{`${this.props.authStore.errors.bookmark} `}</h1>

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
        <Dialog open={this.state.open}>
          <DialogTitle>Add a Bookmark {this.props.authStore.errors.name}</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit} className={classes.container}>
              <TextField
                label="Bookmark Name"
                name="name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange}
                margin="normal"
                required
              />

              {authStore.errors.name ? (
                <FormHelperText style={{ color: 'red' }}>{authStore.errors.name}</FormHelperText>
              ) : null}

              <TextField
                name="bookmark"
                label="Website Link"
                className={classes.textField}
                value={this.state.bookmark}
                onChange={this.handleChange}
                margin="normal"
                required
              />
              {authStore.errors.bookmark ? (
                <FormHelperText style={{ color: 'red' }}>
                  {authStore.errors.bookmark}
                </FormHelperText>
              ) : null}
              <TextField
                label="Icon Class"
                name="icon"
                className={classes.textField}
                value={this.state.icon}
                placeholder="eg. fas fa-heart"
                onChange={this.handleChange}
                margin="normal"
                required
              />

              {authStore.errors.icon ? (
                <FormHelperText style={{ color: 'red' }}>{authStore.errors.icon}</FormHelperText>
              ) : null}

              <input style={{ display: 'none' }} type="submit" />
            </form>
          </DialogContent>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button onClick={this.handleSubmit} variant="raised" color="secondary">
              Submit
            </Button>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Bookmarks);
