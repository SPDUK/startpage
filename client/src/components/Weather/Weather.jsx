import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import './Weather.scss';

function handleClick() {
  console.log('haha'); // eslint-disable-line no-alert
}

class Weather extends Component {
  render() {
    return (
      <div className="weather">
        <Chip
          className="weather-preview"
          avatar={
            <Avatar style={{ marginRight: '20px', background: 'rgba(255,255,255, 0)' }}>
              <i className="fas fa-bolt weather-icon" />{' '}
            </Avatar>
          }
          label="30°C"
          onClick={handleClick}
        />
      </div>
    );
  }
}

export default Weather;
