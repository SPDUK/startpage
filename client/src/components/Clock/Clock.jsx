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
  clock: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    height: 400,
    width: 500,
    backgroundColor: 'red',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column'
  }
};

@inject('authStore')
@observer
class Clock extends Component {
  render() {
    const { authStore } = this.props;
    // fetches current user clock settings from DB when they are authenticated
    if (authStore.isAuthenticated) authStore.setClock();

    return (
      <div className="clock">
        <div className="clock-display">
          <h2>6:35PM</h2>
          <h4>Monday June 4th 2018</h4>
        </div>
        <Searchbar />
        <Bookmarks />
      </div>
    );
  }
}

export default Clock;
