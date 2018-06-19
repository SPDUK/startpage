import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { inject, observer } from 'mobx-react';
import { Typography } from '@material-ui/core';

import './WeatherInfo.scss';
import ReactAux from '../../../hoc/ReactAux';

@inject('authStore')
@observer
class WeatherInfo extends Component {
  render() {
    const { authStore } = this.props;
    return (
      <Card className="weatherinfo">
        {authStore.weatherInfo.name ? (
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
                onKeyDown={this.editClock}
                tabIndex="-1"
                onClick={this.editClock}
                className="fas fa-pencil-alt weatherinfo-title-edit"
              />
            </Typography>
            <Typography className="weatherinfo-description" variant="subheading">
              {authStore.weatherInfo.weather[0].description}
            </Typography>
          </ReactAux>
        ) : (
          <div />
        )}
      </Card>
    );
  }
}

export default WeatherInfo;