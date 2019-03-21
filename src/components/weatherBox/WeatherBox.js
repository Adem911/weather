import React from 'react';
import './WeatherBox.css';

const WeatherBox = (props) => {
    return (
        <div className='weatherBox'>
            <h1>{props.day}</h1>
            <h3>{props.dayTemp} /<span> {props.nightTemp}</span></h3>
        </div>
    );
}

export default WeatherBox;