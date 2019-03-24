import React from 'react';
import './WeatherBox.css';

const WeatherBox = (props) => {
    return (
            <div className='weatherBox' onClick={props.clicked}>
                <h3>{props.day}</h3>
                <img alt='' src={props.icon} />
                <h3><span id='daySmall'>{props.dayTemp}</span> / <span id='nightSmall'>{props.nightTemp}</span></h3>
            </div>
    );
}

export default WeatherBox;