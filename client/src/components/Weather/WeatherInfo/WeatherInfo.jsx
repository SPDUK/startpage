import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';

import './WeatherInfo.scss';

export default class WeathrInfo extends Component {
  render() {
    return (
      <Card className="weatherinfo">
        <Typography className="weatherinfo-title" variant="title">
          {/* TODO: set up opacity to be 0 then 0.8 when hover */}
          <span>
            London
            <span className="weatherinfo-title-country">, GB </span>
          </span>
          <i
            role="button"
            onKeyDown={this.editClock}
            tabIndex="-1"
            onClick={this.editClock}
            className="fas fa-pencil-alt weatherinfo-title-edit"
          />
        </Typography>
        <Typography variant="subheading">Thunder Storm</Typography>
        <div className="weatherinfo-minmax">
          <Typography>16°C / 18°C</Typography>
        </div>
      </Card>
    );
  }
}
