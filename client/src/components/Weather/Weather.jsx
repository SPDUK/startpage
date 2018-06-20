import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import WeatherForm from './WeatherForm/WeatherForm';
import ReactAux from '../../hoc/ReactAux';
import WeatherIcons from './WeatherIcons/WeatherIcons';
import WeatherInfo from './WeatherInfo/WeatherInfo';
import './Weather.scss';
import './WeatherIcons/weather-icons.min.css';

@inject('authStore')
@observer
class Weather extends Component {
  componentDidMount() {
    if (this.props.authStore.clock.isLoading) {
      this.props.authStore.fetchWeatherSettings();
    }
  }

  findWeatherIcon = () => {
    const prefix = 'wi wi-';
    const code = this.props.authStore.weatherInfo.weather[0].id;
    // eslint-disable-next-line
    let icon = WeatherIcons[code].icon;

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
    return (
      <ReactAux>
        {/* eslint-disable-next-line */}
        <div className="weather">
          {authStore.weatherInfo.name && !authStore.weatherLoading ? (
            <Chip
              className="weather-preview"
              avatar={
                <Avatar
                  style={{
                    marginRight: '20px',
                    background: 'rgba(255,255,255, 0)',
                    color: 'white'
                  }}
                >
                  <span className="weather-icon">
                    <i className={this.findWeatherIcon()} />
                    alt={authStore.weatherInfo.main.temp}
                  </span>
                </Avatar>
              }
              label={`${authStore.weatherInfo.main.temp.toFixed(0)} °C`}
              onClick={authStore.toggleWeatherInfo}
            />
          ) : (
            <CircularProgress color="secondary" />
          )}
        </div>
        <WeatherInfo findWeatherIcon={this.findWeatherIcon} />
        <WeatherForm />
      </ReactAux>
    );
  }
}

export default Weather;
