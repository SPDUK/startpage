import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import moment from 'moment-timezone';
import { Typography } from '@material-ui/core';

const styles = {
  clockform: {
    // same height as clock
    height: 147,
    fontSize: '1.7em',
    fontWeight: 400,
    fontFamily: 'Roboto',
    textAlign: 'center'
  },
  title: {
    marginBottom: 0
  }
};

// an incredibly inefficient and stupid way of finding the input city
// TODO: consider making this better somehow, maybe a form/input picker thing
// basically loops through the entire array of timezones and compares
// the input  to the timezone/city/country, works for most things
function findCity(city) {
  const arr = moment.tz.names();
  try {
    for (let i = 0; i < arr.length; i += 1) {
      // splits each
      const element = arr[i].split('/');
      // replaces any spaces with underscores to match
      const _city = city.replace(/ /g, '_');
      if (_city.toLowerCase() === element[0].toLowerCase()) {
        // element[0].replace(' ', '_');
        return element.join('/');
      } else if (element[1]) {
        if (_city.toLowerCase() === element[1].toLowerCase()) {
          return element.join('/');
        }
      } else if (element[2]) {
        if (_city.toLowerCase() === element[2].toLowerCase()) {
          return element.join('/');
        } else if (element[3]) {
          if (_city.toLowerCase() === element[3].toLowerCase()) {
            return element.join('/');
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    return error;
  }
  console.log('error');
  return '';
}

findCity('costa rica');
@inject('authStore')
@observer
class ClockForm extends Component {
  render() {
    const { classes, authStore } = this.props;
    return (
      <div className={classes.clockform}>
        <TextField
          id="full-width"
          // label="Label"
          InputLabelProps={{
            shrink: true
          }}
          placeholder="Enter Location"
          helperText={authStore.clock.errors || 'eg. London, GMT+2, Paris, '}
          fullWidth
          margin="normal"
        />
      </div>
    );
  }
}

export default withStyles(styles)(ClockForm);
