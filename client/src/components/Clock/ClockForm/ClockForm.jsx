import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import moment from 'moment-timezone';

const styles = {};

// an incredibly inefficient and stupid way of finding the input city
// TODO: consider making this better somehow, maybe a form/input picker thing
// basically loops through the entire array of timezones and compares
// the input  to the timezone/city/country, works for most things
function findCity(city) {
  const arr = moment.tz.names();
  try {
    // eslint-disable-next-line
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i].split('/');
      if (city.toLowerCase() === element[0].toLowerCase()) {
        console.log(element.join('/'));
        return element.join('/');
      } else if (element[1]) {
        if (city.toLowerCase() === element[1].toLowerCase()) {
          console.log(element.join('/'));
          return element.join('/');
        }
      } else if (element[2]) {
        if (city.toLowerCase() === element[2].toLowerCase()) {
          console.log(element.join('/'));
          return element.join('/');
        } else if (element[3]) {
          if (city.toLowerCase() === element[3].toLowerCase()) {
            console.log(element.join('/'));
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

findCity('europe');

class ClockForm extends Component {
  render() {
    return (
      <div>
        <p>hi</p>
      </div>
    );
  }
}

export default withStyles(styles)(ClockForm);
