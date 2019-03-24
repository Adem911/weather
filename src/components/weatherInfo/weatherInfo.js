import React from 'react';
import './WeatherInfo.css';

const WeatherInfo = (props) => {
    return (
        <div className='weatherInfo'>
            <img alt='' src={props.icon} id='icon'/>
            <h2>Day: <span id='day'>{props.dayTemp}</span> / Night <span id='night'>{props.nightTemp}</span></h2>
        </div>
    );
}

export default WeatherInfo;