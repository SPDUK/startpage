import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import weatherIcons from './weatherIcons';
import './Weather.scss';
import './WeatherIcons/weather-icons.min.css';

function handleClick() {
  console.log('haha'); // eslint-disable-line no-alert
}
@inject('authStore')
@observer
class Weather extends Component {
  componentDidMount() {
    if (this.props.authStore.clock.isLoading) {
      this.props.authStore.fetchWeatherSettings();
    }
    // this.props.authStore.fetchWeather();
  }

  findWeatherIcon = () => {
    const prefix = 'wi wi-';
    const code = this.props.authStore.weatherInfo.weather[0].id;
    // eslint-disable-next-line
    let icon = weatherIcons[code].icon;

    // If we are not in the ranges mentioned above, add a day/night prefix.
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      icon = `day-${icon}`;
    }
    // Finally tack on the prefix.
    icon = prefix + icon;
    return icon;
  };

  render() {
    const { authStore } = this.props;
    if (authStore.weatherInfo.name) {
      // const var = this.findWeatherIcon();
    }
    console.log(authStore.weatherInfo);
    return (
      // eslint-disable-next-line
      <div className="weather">
        {authStore.weatherInfo.name ? (
          <Chip
            className="weather-preview"
            avatar={
              <Avatar
                style={{ marginRight: '20px', background: 'rgba(255,255,255, 0)', color: 'white' }}
              >
                <span className="weather-icon">
                  <i className={this.findWeatherIcon()} />
                  alt={authStore.weatherInfo.main.temp}
                </span>
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
