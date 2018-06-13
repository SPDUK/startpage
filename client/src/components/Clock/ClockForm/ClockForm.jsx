import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import moment from 'moment-timezone';
import { Typography } from '@material-ui/core';
import { color } from '@material-ui/core/colors';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    height: 250,
    padding: '30px 0px'
  },
  clockform: {
    // same height as clock
    height: 147,
    fontSize: '1.7em',
    fontWeight: 400,
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: 'white'
  },
  input: {
    fontSize: '40',
    width: 400
  },
  selects: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '10px',
    textAlign: 'left'
  },
  select: {
    width: 150
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
      // splits each element so the input could possibly match any part
      // of the city name
      const element = arr[i].split('/');
      // replaces any spaces with underscores to match timezone options
      const _city = city.replace(/ /g, '_');
      if (_city.toLowerCase() === element[0].toLowerCase()) {
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

// findCity('costa rica');

@inject('authStore')
@observer
class ClockForm extends Component {
  state = {
    format: '',
    formatdate: 'hai'
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const clockForm = {
      clocklocation: this.state.clocklocation,
      format: this.state.format,
      dateformat: this.state.formatdate
    };

    // this.props.authStore.
  };
  render() {
    const { classes, authStore } = this.props;
    // console.log(moment().format('HH:mm dddd MMMM D YYYY'));
    // console.log(moment().format('hh:mm'));
    // console.log(moment().format('hh:mm:ss'));
    // console.log(moment().format('h:mm:ss A'));

    return (
      <Card className={classes.card}>
        <div className={classes.clockform}>
          <form onSubmit={this.onSubmit}>
            <TextField
              onChange={this.onChange}
              className={classes.input}
              id="full-width"
              color="secondary"
              placeholder="Enter Location eg. London, New York, Paris,"
              margin="normal"
            />
            <div className={classes.selects}>
              <FormControl className={classes.formControl}>
                <Select
                  value={this.state.format}
                  onChange={this.onChange}
                  className={classes.select}
                  input={<Input name="format" id="format-helper" />}
                >
                  <MenuItem value="h:mm:a">6:30 PM</MenuItem>
                  <MenuItem value="hh:mm:ss A">6:30:28 PM</MenuItem>
                  <MenuItem value="hh:mm">18:30</MenuItem>
                  <MenuItem value="hh:mm:ss">18:30:28</MenuItem>
                </Select>
                <FormHelperText>Time Format</FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl}>
                <Select
                  value={this.state.dateformat}
                  onChange={this.onChange}
                  className={classes.select}
                  input={<Input name="dateformat" id="dateformat-helper" />}
                >
                  <MenuItem value="dddd MMMM Do YYYY">Wednesday June 13th 2018</MenuItem>
                  <MenuItem value="dddd MMMM Do">Wesnesday June 13th</MenuItem>
                  <MenuItem value="dddd D">Wesnesday 13</MenuItem>
                </Select>
                <FormHelperText>Date Format</FormHelperText>
              </FormControl>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 40px' }}>
              <Button>Submit</Button>
            </div>
          </form>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(ClockForm);
