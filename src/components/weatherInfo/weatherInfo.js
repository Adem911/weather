import React from 'react';
import './WeatherInfo.css';

const WeatherInfo = (props) => {
    return (
        <div className='weatherInfo'>
            <h1>something here!</h1>
            <h2>{props.dayTemp}</h2>
        </div>
    );
}

export default WeatherInfo;