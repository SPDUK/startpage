import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import moment from 'moment-timezone';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';

// todo : make it work better on mobile, needs to be quite a bit smaller
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

@inject('authStore')
@observer
class ClockForm extends Component {
  constructor() {
    super();
    this.state = {
      format: '',
      dateformat: '',
      clocklocation: ''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const clockForm = {
      clocklocation: this.findCity(this.state.clocklocation),
      format: this.state.format,
      dateformat: this.state.dateformat,
      displayclock: true
    };
    this.props.authStore.setUpClock(clockForm);
  };

  findCity(city) {
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
      console.log(this.props.authStore.errors);
      return error;
    }

    return '';
  }
  closeClock = () => {
    this.props.authStore.toggleClockLoading();
  };

  render() {
    const { classes, authStore } = this.props;
    return (
      <Fade in={authStore.clock.isLoading} timeout={2000}>
        <Card className={classes.card}>
          <div className={classes.clockform}>
            <form onSubmit={this.handleSubmit}>
              <FormControl>
                <TextField
                  onChange={this.onChange}
                  className={classes.input}
                  id="full-width"
                  name="clocklocation"
                  placeholder={
                    `Current Location: ${authStore.clock.clocklocation}` ||
                    `Enter a timezone EG. GMT+1 or a Capital City / State`
                  }
                  margin="normal"
                />
                <Fade in={Boolean(authStore.errors.clocklocation)} timeout={600}>
                  <FormHelperText style={{ color: 'red' }}>
                    {authStore.errors.clocklocation}
                  </FormHelperText>
                </Fade>
              </FormControl>
              <div className={classes.selects}>
                <FormControl className={classes.formControl}>
                  <Select
                    value={this.state.format || authStore.clock.format}
                    onChange={this.onChange}
                    className={classes.select}
                    input={<Input name="format" id="format-helper" />}
                  >
                    <MenuItem value="h:mm:a">6:30 PM</MenuItem>
                    <MenuItem value="hh:mm:ss A">6:30:28 PM</MenuItem>
                    <MenuItem value="hh:mm">18:30</MenuItem>
                    <MenuItem value="hh:mm:ss">18:30:28</MenuItem>
                  </Select>
                  {!authStore.errors.format ? (
                    <FormHelperText>Time Format</FormHelperText>
                  ) : (
                    <Fade in={Boolean(authStore.errors.format)} timeout={600}>
                      <FormHelperText style={{ color: 'red' }}>
                        {authStore.errors.format}{' '}
                      </FormHelperText>
                    </Fade>
                  )}
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Select
                    value={this.state.dateformat || authStore.clock.dateformat}
                    onChange={this.onChange}
                    className={classes.select}
                    input={<Input name="dateformat" value="hi" id="dateformat-helper" />}
                  >
                    <MenuItem value="dddd MMMM Do YYYY">Wednesday June 13th 2018</MenuItem>
                    <MenuItem value="dddd MMMM Do">Wednesday June 13th</MenuItem>
                    <MenuItem value="dddd D">Wednesday 13</MenuItem>
                    <MenuItem value="dddd ">Wednesday</MenuItem>
                  </Select>
                  {!authStore.errors.dateformat ? (
                    <FormHelperText>Date Format</FormHelperText>
                  ) : (
                    <Fade in={Boolean(authStore.errors.dateformat)} timeout={400}>
                      <FormHelperText style={{ color: 'red' }}>
                        {authStore.errors.dateformat}
                      </FormHelperText>
                    </Fade>
                  )}
                </FormControl>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  margin: '15px 55px 0px 55px'
                }}
              >
                <Button onClick={this.closeClock}>Cancel</Button>
                <Button variant="raised" color="secondary" onClick={this.handleSubmit}>
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </Fade>
    );
  }
}

export default withStyles(styles)(ClockForm);
