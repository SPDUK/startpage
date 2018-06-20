import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grow from '@material-ui/core/Grow';
import ReactAux from '../../../hoc/ReactAux';
import './WeatherForm.scss';

@inject('authStore')
@observer
class WeatherForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const WeatherNameForm = {
      name: this.state.name
    };
    this.props.authStore.changeWeatherName(WeatherNameForm);
  };

  render() {
    const { authStore } = this.props;
    return (
      <ReactAux>
        {authStore.editWeather ? (
          <div
            style={{
              outline: 'none',
              height: '100vh',
              width: '100vw',
              hightlight: 'none',
              zIndex: 50
            }}
            onKeyDown={authStore.toggleEditWeatherSetting}
            tabIndex="-1"
            role="button"
            onClick={authStore.toggleEditWeatherSettings}
          />
        ) : (
          <div />
        )}
        {(!authStore.weatherLoading && authStore.editWeather) || !authStore.weatherInfo.name ? (
          <Grow in={authStore.editWeather}>
            <Card className="weatherform">
              <ReactAux>
                <Typography className="weatherform-name" variant="title">
                  <form onSubmit={this.handleSubmit} noValidate autoComplete="on">
                    <Typography color="secondary" variant="subheading">
                      {authStore.weatherInfo.message}
                    </Typography>
                    <TextField
                      id="name"
                      fullWidth
                      label={`Current Location: ${authStore.weather.name
                        .charAt(0)
                        .toUpperCase()}${authStore.weather.name.slice(1)}`}
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      margin="normal"
                    />
                    {authStore.weatherLoading ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      <div className="weatherform-switch">
                        {authStore.weather.temptype === 'metric' ? (
                          <span>°C</span>
                        ) : (
                          <span>°F</span>
                        )}
                        <Switch
                          disabled={authStore.weatherLoading}
                          checked={authStore.weather.temptype === 'metric'}
                          onChange={authStore.toggleTemptype}
                          value={authStore.weather.temptype}
                          color="secondary"
                        />
                      </div>
                    )}
                  </form>
                </Typography>
              </ReactAux>
            </Card>
          </Grow>
        ) : (
          <div />
        )}
      </ReactAux>
    );
  }
}

export default WeatherForm;
