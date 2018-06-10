import React, { Component } from 'react';
import axios from 'axios';
import { inject, observer, computed } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import moment from 'moment-timezone';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import ReactAux from '../../hoc/ReactAux';

import Bookmarks from './Bookmarks/Bookmarks';
import Searchbar from './Searchbar/Searchbar';

// send the user with this request
const styles = {
  wrapper: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    height: 400,
    width: 500,
    border: '2px solid red',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column'
  },
  // when changing 24 hr etc change the padding to make it fit.
  clockwrapper: {
    padding: '0 19%'
  },
  clock: {
    fontSize: '5em',
    color: '#FAFAFA',
    fontWeight: 400,
    fontFamily: 'Roboto',
    textAlign: 'center',
    opacity: '0.9',
    textShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    marginBottom: 0
  },
  date: {
    fontSize: '1.02em',
    color: '#FAFAFA',
    fontFamily: 'Roboto',
    marginTop: -10,
    fontWeight: 300,
    paddingLeft: 20,
    opacity: '0.9'
  }
};

@inject('authStore')
@observer
class Clock extends Component {
  componentDidMount() {
    if (this.props.authStore.isAuthenticated) {
      this.props.authStore.setClock();
    }
    if (!this.props.authStore.clock.isLoading) {
      if (this.props.authStore.clock.format === 'h:mm A') {
        console.log('hi');
      }
      console.log(this.props.authStore.time);
      console.log(this.props.authStore.date);
    }
  }

  render(props) {
    const { classes, authStore } = this.props;

    // fetches current user clock settings from DB when they are authenticated
    return (
      <div className={classes.wrapper}>
        <div className={classes.clockwrapper}>
          <Fade in={!authStore.clock.isLoading} timeout={300}>
            <h1 className={classes.clock}>{this.props.authStore.time}</h1>
          </Fade>
          <Fade in={!authStore.clock.isLoading} timeout={300}>
            <h4 className={classes.date}>{this.props.authStore.timezone}</h4>
          </Fade>
        </div>
        <Searchbar />
        <Bookmarks />
      </div>
    );
  }
}

export default withStyles(styles)(Clock);
