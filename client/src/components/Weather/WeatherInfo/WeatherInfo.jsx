import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { inject, observer } from 'mobx-react';
import { Typography } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';
import './WeatherInfo.scss';
import ReactAux from '../../../hoc/ReactAux';

@inject('authStore')
@observer
class WeatherInfo extends Component {
  render() {
    const { authStore } = this.props;
    return (
      <ReactAux>
        {authStore.showWeatherInfo ? (
          <div
            style={{
              outline: 'none',
              height: '100vh',
              width: '100vw',
              hightlight: 'none',
              zIndex: 500
            }}
            onKeyDown={authStore.toggleWeatherInfo}
            tabIndex="-1"
            role="button"
            onClick={authStore.toggleWeatherInfo}
          />
        ) : (
          <div />
        )}
        <Grow in={authStore.showWeatherInfo}>
          {authStore.weatherInfo.name && authStore.showWeatherInfo ? (
            <Card className="weatherinfo">
              <ReactAux>
                <Typography className="weatherinfo-title" variant="title">
                  {/* TODO: set up opacity to be 0 then 0.8 when hover */}
                  <span>
                    {authStore.weatherInfo.name}
                    <span className="weatherinfo-title-country">
                      , {authStore.weatherInfo.sys.country}
                      <i className={this.props.findWeatherIcon()} />
                    </span>
                  </span>
                  <i
                    role="button"
                    onKeyDown={authStore.toggleEditWeatherSettings}
                    tabIndex="-1"
                    onClick={authStore.toggleEditWeatherSettings}
                    className="fas fa-pencil-alt weatherinfo-title-edit"
                  />
                </Typography>
                <Typography className="weatherinfo-description" variant="subheading">
                  {authStore.weatherInfo.weather[0].description}
                </Typography>
              </ReactAux>
            </Card>
          ) : (
            <div />
          )}
        </Grow>
      </ReactAux>
    );
  }
}

export default WeatherInfo;
