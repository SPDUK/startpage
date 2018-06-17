import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import './Weather.scss';

function handleClick() {
  console.log('haha'); // eslint-disable-line no-alert
}
@inject('authStore')
@observer
class Weather extends Component {
  componentDidMount() {
    this.props.authStore.fetchWeather();
  }
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
