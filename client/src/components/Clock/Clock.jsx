import React, { Component } from 'react';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
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
  render(props) {
    const { classes, authStore } = this.props;
    // fetches current user clock settings from DB when they are authenticated
    if (authStore.isAuthenticated) authStore.setClock();

    return (
      <div className={classes.wrapper}>
        <div className={classes.clockwrapper}>
          <h1 className={classes.clock}>2:35PM</h1>
          <h4 className={classes.date}>Monday June 4th 2018</h4>
        </div>
        <Searchbar />
        <Bookmarks />
      </div>
    );
  }
}

export default withStyles(styles)(Clock);
