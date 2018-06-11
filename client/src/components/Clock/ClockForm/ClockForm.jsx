import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import moment from 'moment-timezone';

const styles = {};
function findCity(city) {
  const arr = moment.tz.names();
  console.log(arr);
  try {
    // eslint-disable-next-line
    for (let i = 0; i <= arr.length; i++) {
      const element = arr[i].split('/');
      if (city.toLowerCase() === element[0].toLowerCase()) {
        console.log(element.join('/'));
        return element.join('/');
      } else if (element[1]) {
        if (city.toLowerCase() === element[1].toLocaleLowerCase()) {
          console.log(element.join('/'));
          return element.join('/');
        }
      }
    }
  } catch (error) {
    console.log(error);
    return '';
  }
}

findCity('gmt+1');

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
