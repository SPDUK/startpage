import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';

import './Weather.scss';

function handleClick() {
  console.log('haha'); // eslint-disable-line no-alert
}
@inject('authStore')
@observer
class Weather extends Component {
  componentDidMount() {
    this.props.authStore.fetchWeatherSettings();
    this.props.authStore.fetchWeather();
  }

  // icon url
  // grayscale it
  // `http://openweathermap.org/img/w/${authstore.weatherInfo.icon}.png`

  render() {
    const { authStore } = this.props;
    console.log(authStore.weatherInfo);
    return (
      <div className="weather">
        {authStore.weatherInfo.name ? (
          <Chip
            className="weather-preview"
            avatar={
              <Avatar style={{ marginRight: '20px', background: 'rgba(255,255,255, 0)' }}>
                <img
                  src={`http://openweathermap.org/img/w/${
                    authStore.weatherInfo.weather[0].icon
                  }.png`}
                  className="weather-icon"
                  alt={authStore.weatherInfo.main.temp}
                />
              </Avatar>
            }
            label={`${authStore.weatherInfo.main.temp.toFixed(0)} °C`}
            onClick={handleClick}
          />
        ) : (
          <CircularProgress color="secondary" />
        )}
      </div>
    );
  }
}

export default Weather;
