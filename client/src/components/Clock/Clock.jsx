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
  // when changing 24 hr etc change the padding to make it fit maybe?
  clockwrapper: {
    padding: '0 0%'
  },
  clock: {
    fontSize: '5em',
    color: 'rgba(250,250,250, 0.8)',
    fontWeight: 400,
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginBottom: 0,
    fontVariant: 'small-caps'
  },
  date: {
    fontSize: '1.05em',
    fontFamily: 'Roboto',
    marginTop: -10,
    fontWeight: 300,
    color: 'rgba(250,250,250, 0.7)',
    textAlign: 'center'
  }
};

@inject('authStore')
@observer
class Clock extends Component {
  componentDidMount() {
    if (this.props.authStore.isAuthenticated) {
      this.props.authStore.setClock();
    }
  }

  render(props) {
    const { classes, authStore } = this.props;
    console.log(this.props.authStore.date);
    return (
      <div className={classes.wrapper}>
        <div className={classes.clockwrapper}>
          <Fade in={!authStore.clock.isLoading} timeout={600}>
            <h1 id="clock" className={classes.clock}>
              {this.props.authStore.time}
            </h1>
          </Fade>
          <Fade in={!authStore.clock.isLoading} timeout={600}>
            <h4 id="date" className={classes.date}>
              {this.props.authStore.date}
            </h4>
          </Fade>
        </div>
        <Searchbar />
        <Bookmarks />
      </div>
    );
  }
}

export default withStyles(styles)(Clock);
